import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData.js';
import { getQuestionsForChapter } from '../data/questionsData.js';
import { aiService } from '../services/api.js';

// --- MATH RENDERER IMPORTS ---
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// --- Helper Component to Render Math Inline safely ---
const MathText = ({ children }) => (
  <ReactMarkdown 
    remarkPlugins={[remarkMath]} 
    rehypePlugins={[rehypeKatex]}
    components={{ p: 'span' }} 
  >
    {children || ''}
  </ReactMarkdown>
);

const IconBack = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const IconBrain = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-emerald-400"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><circle cx="12" cy="12" r="10" /></svg>;
const IconGraph = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-sky-400"><path d="M18 20V10M12 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconLightbulb = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M9 18h6m-3-13a5 5 0 00-5 5c0 2.2 1.5 3.5 2 5h6c.5-1.5 2-2.8 2-5a5 5 0 00-5-5zM12 22v-1"/></svg>;

export default function DailyTest() {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dailyQuestions, setDailyQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [graphStats, setGraphStats] = useState({ totalMastered: 0, dueToday: 0, weakTopicsTargeted: 0 });

  const [hintText, setHintText] = useState(null);
  const [isGeneratingHint, setIsGeneratingHint] = useState(false);

  useEffect(() => {
    buildDailyTest();
  }, []);

  const buildDailyTest = async () => {
    setIsLoading(true);
    const srsData = JSON.parse(localStorage.getItem('zenjee-srs-graph') || '{}');
    const today = new Date().getTime();
    let allAvailableQs = [];
    let dueQs = [];
    let newQs = [];
    let weakTopicsList = [];

    Object.keys(allChaptersData).forEach(subjectId => {
      Object.keys(allChaptersData[subjectId]).forEach(chapterId => {
        if(chapterId === 'colorText' || chapterId === 'colorHex') return;
        const chapter = allChaptersData[subjectId][chapterId];
        const qList = getQuestionsForChapter(subjectId, chapterId, chapter.name);
        
        allAvailableQs = [...allAvailableQs, ...qList.map((q, idx) => ({...q, subjectId, chapterId, originalIndex: idx}))];

        const savedAns = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-ans`) || '{}');
        const savedChk = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-chk`) || '{}');
        
        (chapter.topics || []).forEach(topic => {
          const topicQs = qList.filter(q => q.topic === topic.id);
          let correct = 0; let attempted = 0;
          topicQs.forEach(q => {
            const idx = qList.findIndex(xq => xq.id === q.id);
            if (savedChk[idx]) { attempted++; if (savedAns[idx] === q.correctIndex) correct++; }
          });
          if (attempted > 0 && (correct / attempted) * 100 < 50) {
            weakTopicsList.push({ subjectId, chapterId, topicName: topic.name });
          }
        });
      });
    });

    let masteredCount = 0;
    allAvailableQs.forEach(q => {
      const node = srsData[q.id];
      if (node) {
        if (node.nextReview <= today) dueQs.push(q);
        if (node.reps >= 3) masteredCount++;
      } else { newQs.push(q); }
    });

    let aiGeneratedQs = [];
    if (weakTopicsList.length > 0) {
      try {
        const targetTopic = weakTopicsList[Math.floor(Math.random() * weakTopicsList.length)];
        // NEW BACKEND CALL
        const parsedQ = await aiService.generateWeaknessQuestion(targetTopic.topicName);
        aiGeneratedQs.push({ ...parsedQ, id: 'ai_gen_' + Date.now(), subjectId: targetTopic.subjectId, chapterId: targetTopic.chapterId, isAIGenerated: true });
      } catch (error) { 
        console.error("Backend AI Generation failed:", error); 
      }
    }

    dueQs = dueQs.sort(() => 0.5 - Math.random());
    newQs = newQs.sort(() => 0.5 - Math.random());
    const finalSet = [...aiGeneratedQs, ...dueQs.slice(0, 10), ...newQs.slice(0, 10 - Math.min(10, dueQs.length))];
    
    setDailyQuestions(finalSet);
    setGraphStats({ totalMastered: masteredCount, dueToday: dueQs.length, weakTopicsTargeted: aiGeneratedQs.length });
    setIsLoading(false);
  };

  const generateHint = async (questionText) => {
    setIsGeneratingHint(true);
    try {
      // NEW BACKEND CALL
      const data = await aiService.generateHint(questionText);
      setHintText(data.hint);
    } catch (error) { 
      setHintText("Failed to connect to backend for hint."); 
    }
    setIsGeneratingHint(false);
  };

  const handleCheckAnswer = () => {
    setIsChecked(true);
    const q = dailyQuestions[currentIndex];
    
    if (!q.isAIGenerated && q.originalIndex !== undefined) {
      const ansKey = `zenjee-answers-${q.chapterId}-ans`;
      const chkKey = `zenjee-answers-${q.chapterId}-chk`;
      const savedAns = JSON.parse(localStorage.getItem(ansKey) || '{}');
      const savedChk = JSON.parse(localStorage.getItem(chkKey) || '{}');
      
      savedAns[q.originalIndex] = answers[currentIndex];
      savedChk[q.originalIndex] = true;
      
      localStorage.setItem(ansKey, JSON.stringify(savedAns));
      localStorage.setItem(chkKey, JSON.stringify(savedChk));
    }
  };

  const handleNextQuestion = () => {
    const q = dailyQuestions[currentIndex];
    const isCorrect = answers[currentIndex] === q.correctIndex;

    if (!q.isAIGenerated) {
      const srsData = JSON.parse(localStorage.getItem('zenjee-srs-graph') || '{}');
      let node = srsData[q.id] || { reps: 0, interval: 1, ease: 2.5, nextReview: 0 };
      if (isCorrect) {
        if (node.reps === 0) node.interval = 1;
        else if (node.reps === 1) node.interval = 6;
        else node.interval = Math.round(node.interval * node.ease);
        node.reps += 1; node.ease += 0.1; 
      } else { node.reps = 0; node.interval = 1; node.ease = Math.max(1.3, node.ease - 0.2); }
      node.nextReview = new Date().getTime() + (node.interval * 24 * 60 * 60 * 1000);
      srsData[q.id] = node;
      localStorage.setItem('zenjee-srs-graph', JSON.stringify(srsData));
    }

    if (currentIndex < dailyQuestions.length - 1) {
      setCurrentIndex(p => p + 1);
      setIsChecked(false);
      setHintText(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleSelectOption = (idx) => {
    if(!isChecked) setAnswers(prev => ({ ...prev, [currentIndex]: idx }));
  };

  const calculateScore = () => dailyQuestions.filter((q, i) => answers[i] === q.correctIndex).length;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b1121] text-gray-100">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <p className="text-white/60 animate-pulse">Analyzing Knowledge Graph & Generating Custom Weakness Qs...</p>
      </div>
    );
  }

  const currentQ = dailyQuestions[currentIndex];

  if (isFinished) {
    const score = calculateScore();
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b1121] text-gray-100 p-6">
        <div className="w-full max-w-lg p-10 rounded-3xl bg-[#1f2937]/50 border border-white/5 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-sky-400"></div>
          <IconBrain className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Knowledge Graph Updated</h2>
          <p className="text-white/60 mb-8">Your next revision cycles have been automatically optimized based on your performance.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#111827] p-5 rounded-2xl border border-white/5">
              <div className="text-3xl font-bold text-sky-400">{score}/{dailyQuestions.length}</div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 mt-1">Today's Score</div>
            </div>
            <div className="bg-[#111827] p-5 rounded-2xl border border-white/5">
              <div className="text-3xl font-bold text-emerald-400">+{score}</div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 mt-1">Concepts Reinforced</div>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors w-full">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  if (isStarted && currentQ) {
    return (
      <div className="min-h-screen w-full bg-[#0b1121] text-gray-100 flex flex-col font-sans relative">
        <nav className="flex items-center justify-between px-8 py-4 bg-[#111827] border-b border-white/5 shadow-md">
          <button onClick={() => navigate('/')} className="text-white/50 hover:text-white transition-colors"><IconBack /></button>
          <div className="text-sm font-bold tracking-widest uppercase text-emerald-400 flex items-center gap-2">Daily Spaced Repetition</div>
          <div className="text-sm font-medium text-white/50">Q {currentIndex + 1}/{dailyQuestions.length}</div>
        </nav>
        <main className="flex-1 max-w-3xl mx-auto w-full py-10 px-6 flex flex-col">
          <div className="flex gap-2 mb-4">
            {currentQ.isAIGenerated && <span className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider">AI Generated Target</span>}
            <span className="bg-white/5 border border-white/10 text-white/60 text-xs px-2.5 py-1 rounded font-medium uppercase tracking-wider">{currentQ.subjectId}</span>
          </div>
          
          <div className="p-8 rounded-2xl bg-[#1f2937]/50 border border-white/5 mb-6 text-lg font-medium text-white/90 leading-relaxed">
            <MathText>{currentQ.text}</MathText>
          </div>
          
          <div className="flex flex-col gap-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentIndex] === idx;
              let btnStyle = "bg-[#1f2937]/30 border-white/5 hover:bg-[#1f2937]";
              if (isChecked) {
                if (idx === currentQ.correctIndex) btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-100";
                else if (isSelected) btnStyle = "bg-rose-500/20 border-rose-500/50 text-rose-100";
                else btnStyle = "opacity-30 bg-[#1f2937]/30 border-white/5";
              } else if (isSelected) {
                btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-100";
              }
              return (
                <button key={idx} onClick={() => handleSelectOption(idx)} disabled={isChecked} className={`p-4 rounded-xl border text-left transition-all ${btnStyle}`}>
                  <span className="inline-block w-8 opacity-50 font-mono">{['A','B','C','D'][idx]}.</span>
                  <MathText>{opt}</MathText>
                </button>
              );
            })}
          </div>

          {!isChecked && (
            <div className="mb-6 flex flex-col items-start gap-3">
              {!hintText && (
                <button onClick={() => generateHint(currentQ.text)} disabled={isGeneratingHint} className="flex items-center gap-2 text-sm text-yellow-400/80 hover:text-yellow-300 font-medium px-4 py-2 rounded-lg hover:bg-yellow-500/10 transition-colors">
                  <IconLightbulb /> {isGeneratingHint ? 'Generating...' : 'Need a hint?'}
                </button>
              )}
              {hintText && (
                <div className="p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-100/90 text-sm leading-relaxed w-full animate-fade-in-up">
                  <div className="font-bold text-yellow-400 mb-2 flex items-center gap-2">AI Hint</div>
                  <MathText>{hintText}</MathText>
                </div>
              )}
            </div>
          )}

          {isChecked && (
             <div className="mb-8 p-6 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-100/90 text-sm leading-relaxed animate-fade-in-up">
              <div className="font-bold text-sky-400 mb-2">Algorithm Explanation</div>
              <MathText>{currentQ.explanation}</MathText>
            </div>
          )}

          <div className="mt-auto pt-6 pb-6 text-right">
            {!isChecked ? (
              <button onClick={handleCheckAnswer} disabled={answers[currentIndex] === undefined} className="px-10 py-3 rounded-xl bg-emerald-500 text-black disabled:opacity-30 font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-400">
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNextQuestion} className="px-10 py-3 rounded-xl bg-sky-500 text-black font-bold transition-all hover:bg-sky-400">
                {currentIndex === dailyQuestions.length - 1 ? "Complete Review" : "Next Concept"}
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b1121] text-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="w-full max-w-lg p-10 rounded-3xl bg-[#1f2937]/50 border border-white/5 text-center shadow-2xl relative z-10">
        <IconGraph className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Daily Concept Review</h1>
        <p className="text-white/50 mb-8 leading-relaxed">Your dynamic knowledge graph has identified <strong className="text-white">{graphStats.dueToday} concepts</strong> you are at risk of forgetting today. {graphStats.weakTopicsTargeted > 0 && <span className="text-indigo-400 font-bold block mt-2">✨ Includes {graphStats.weakTopicsTargeted} custom AI question targeting your weak areas.</span>}</p>
        <button onClick={() => setIsStarted(true)} className="w-full px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">Start {dailyQuestions.length} Questions</button>
        <button onClick={() => navigate('/')} className="mt-4 text-sm font-medium text-white/30 hover:text-white/60 transition-colors">Maybe Later</button>
      </div>
    </div>
  );
}