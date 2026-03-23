import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockQuestions } from '../data/mockTests';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini for AI Explanations
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// --- Icons ---
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-indigo-400">
    <path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z" />
  </svg>
);

export default function TestEngine() {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  // --- ADDED STATE FOR DYNAMIC QUESTIONS ---
  const [currentTestQuestions, setCurrentTestQuestions] = useState([]);
  
  const isAdvanced = testId?.startsWith('a');
  
  // Dynamic duration calculation based on test type
  const durationMinutes = testId === 'custom' ? (currentTestQuestions.length * 2) : (isAdvanced ? 360 : 180);
  const totalDurationSeconds = durationMinutes * 60;
  
  const [status, setStatus] = useState('instructions'); 
  const [timeLeft, setTimeLeft] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [explanations, setExplanations] = useState({});
  const [loadingAi, setLoadingAi] = useState(null);

  // --- ADDED EFFECT TO LOAD QUESTIONS ---
  useEffect(() => {
    if (testId === 'custom') {
      const customData = JSON.parse(localStorage.getItem('zenjee-custom-test') || '[]');
      if (customData.length === 0) {
        alert("No custom test found. Redirecting to builder...");
        navigate('/custom-test-builder');
      } else {
        setCurrentTestQuestions(customData);
      }
    } else {
      setCurrentTestQuestions(mockQuestions);
    }
  }, [testId, navigate]);

  useEffect(() => {
    let timer;
    if (status === 'active' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && status === 'active') {
      submitTest();
    }
    return () => clearInterval(timer);
  }, [timeLeft, status]);

  const startTest = () => {
    setTimeLeft(totalDurationSeconds);
    setStatus('active');
  };

  const handleOptionSelect = (qIndex, optionIndex) => {
    setUserAnswers({ ...userAnswers, [qIndex]: optionIndex });
  };

  const submitTest = () => {
    // 1. Save to local storage for mastery ring analytics
    currentTestQuestions.forEach((q, index) => {
      const chapterId = q.chapterId || 'general'; 
      const ansKey = `zenjee-answers-${chapterId}-ans`;
      const chkKey = `zenjee-answers-${chapterId}-chk`;
      
      const savedAns = JSON.parse(localStorage.getItem(ansKey) || '{}');
      const savedChk = JSON.parse(localStorage.getItem(chkKey) || '{}');
      const globalQId = `mock_${q.id}`; 
      
      if (userAnswers[index] !== undefined) {
        savedAns[globalQId] = userAnswers[index];
        savedChk[globalQId] = true;
        localStorage.setItem(ansKey, JSON.stringify(savedAns));
        localStorage.setItem(chkKey, JSON.stringify(savedChk));
      }
    });

    // 2. NEW: Update Daily Goal & Streak in Dashboard
    const attemptCount = Object.keys(userAnswers).length;
    if (attemptCount > 0) {
      const d = new Date();
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      
      const currentProgress = parseInt(localStorage.getItem(`zenjee-progress-${todayStr}`)) || 0;
      localStorage.setItem(`zenjee-progress-${todayStr}`, currentProgress + attemptCount);
    }

    setStatus('submitted');
  };

  const fetchAIExplanation = async (qIndex) => {
    if (!genAI) return;
    setLoadingAi(qIndex);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const q = currentTestQuestions[qIndex];
      const prompt = `Act as an expert JEE tutor. Explain the step-by-step solution to this question in under 150 words: "${q.text}". The correct answer is: "${q.options[q.correct]}".`;
      const result = await model.generateContent(prompt);
      setExplanations(prev => ({ ...prev, [qIndex]: result.response.text() }));
    } catch (e) {
      setExplanations(prev => ({ ...prev, [qIndex]: "AI Error: Could not fetch explanation at this time." }));
    }
    setLoadingAi(null);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Prevent rendering before questions are loaded
  if (currentTestQuestions.length === 0 && status !== 'submitted') {
    return <div className="min-h-screen bg-[#141720] flex items-center justify-center text-white">Loading...</div>;
  }

  // ==========================================
  // VIEW 1: INSTRUCTIONS
  // ==========================================
  if (status === 'instructions') {
    return (
      <div className="min-h-screen bg-[#141720] text-gray-200 p-8 flex flex-col items-center justify-center font-sans">
        <div className="max-w-4xl w-full bg-[#1C202B] p-10 rounded-3xl border border-white/10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-white border-b border-white/10 pb-6">Instructions</h1>
          <div className="space-y-4 text-white/70 text-sm leading-relaxed mb-10">
            <p>1. Total questions: {currentTestQuestions.length}</p>
            <p>2. Total duration: {durationMinutes} minutes.</p>
            <p>3. +4 Marks for Correct, -1 for Incorrect.</p>
            <p>4. After submission, you will receive a detailed performance analysis and AI-powered review options.</p>
            <p className="text-orange-300 font-medium">🔥 Bonus: Questions attempted here will automatically count towards your Daily Goal!</p>
          </div>
          <div className="flex justify-end border-t border-white/10 pt-6">
            <button onClick={startTest} className="px-10 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all shadow-lg">
              Begin Test →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: ACTIVE TEST
  // ==========================================
  if (status === 'active') {
    const q = currentTestQuestions[currentQuestion];
    return (
      <div className="h-screen w-full flex flex-col bg-white text-slate-800 font-sans overflow-hidden">
        <header className="bg-[#1E3A8A] text-white px-6 py-3 flex justify-between items-center shadow-md z-10">
          <div className="text-xl font-bold tracking-wider">
            {testId === 'custom' ? 'CUSTOM AI PAPER' : `JEE ${isAdvanced ? 'ADVANCED' : 'MAIN'} MOCK`}
          </div>
          <div className="flex items-center gap-4 bg-black/30 px-5 py-2 rounded-lg font-mono text-lg">
            <span>⏱️ Time Left: {formatTime(timeLeft)}</span>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col bg-slate-50">
            <div className="bg-white border-b px-8 py-3 flex gap-2">
              <span className="bg-sky-100 text-sky-800 px-4 py-1.5 rounded font-bold text-sm">{q.subject}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <h2 className="text-xl font-bold text-slate-700 mb-6 pb-4 border-b">Question {currentQuestion + 1}</h2>
              <div className="text-lg text-slate-800 mb-8 whitespace-pre-wrap">{q.text}</div>
              <div className="space-y-4">
                {q.options.map((opt, idx) => (
                  <label key={idx} className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${userAnswers[currentQuestion] === idx ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white'}`}>
                    <input type="radio" name="option" className="w-5 h-5 text-sky-600" checked={userAnswers[currentQuestion] === idx} onChange={() => handleOptionSelect(currentQuestion, idx)} />
                    <span className="text-base font-medium">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-white border-t p-4 px-8 flex justify-between shadow-sm">
              <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="px-6 py-2.5 border rounded-lg font-semibold text-slate-600 disabled:opacity-50">Previous</button>
              <button onClick={() => setCurrentQuestion(Math.min(currentTestQuestions.length - 1, currentQuestion + 1))} disabled={currentQuestion === currentTestQuestions.length - 1} className="px-8 py-2.5 bg-sky-600 text-white rounded-lg font-semibold disabled:opacity-50">Save & Next</button>
            </div>
          </div>

          <div className="w-[320px] bg-white border-l flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10">
            <div className="p-6 flex-1 overflow-y-auto">
              <h3 className="font-bold text-slate-700 mb-4">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {currentTestQuestions.map((_, i) => (
                  <button key={i} onClick={() => setCurrentQuestion(i)} className={`w-10 h-10 rounded-lg font-bold text-xs border-2 flex items-center justify-center ${userAnswers[i] !== undefined ? 'bg-[#22C55E] text-white border-[#22C55E]' : 'bg-white text-slate-600 border-slate-200'} ${currentQuestion === i ? 'ring-4 ring-sky-500/30 border-sky-500' : ''}`}>{i + 1}</button>
                ))}
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t">
              <button onClick={submitTest} className="w-full py-4 bg-[#EF4444] text-white font-bold rounded-xl shadow-lg">Submit Test</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: ANALYTICS DASHBOARD
  // ==========================================
  if (status === 'submitted') {
    let correct = 0; let wrong = 0; let unattempted = 0;
    
    // Default subject structures to ensure they map properly in charts
    const subjectAnalysis = {
      Physics: { correct: 0, wrong: 0, unattempted: 0, total: 0 },
      Chemistry: { correct: 0, wrong: 0, unattempted: 0, total: 0 },
      Mathematics: { correct: 0, wrong: 0, unattempted: 0, total: 0 }
    };

    currentTestQuestions.forEach((q, index) => {
      const subj = q.subject;
      if (!subjectAnalysis[subj]) subjectAnalysis[subj] = { correct: 0, wrong: 0, unattempted: 0, total: 0 };
      
      subjectAnalysis[subj].total += 1;
      const userAns = userAnswers[index];
      
      if (userAns === undefined) {
        unattempted++;
        subjectAnalysis[subj].unattempted++;
      } else if (userAns === q.correct) {
        correct++;
        subjectAnalysis[subj].correct++;
      } else {
        wrong++;
        subjectAnalysis[subj].wrong++;
      }
    });

    const totalQ = currentTestQuestions.length;
    const attempted = correct + wrong;
    const totalScore = (correct * 4) - (wrong * 1);
    const maxScore = totalQ * 4;
    const accuracy = attempted === 0 ? 0 : Math.round((correct / attempted) * 100);

    // --- Donut Chart Geometry ---
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const correctPercent = correct / totalQ;
    const wrongPercent = wrong / totalQ;
    const unattemptedPercent = unattempted / totalQ;

    const correctOffset = circumference - (correctPercent * circumference);
    const wrongOffset = circumference - (wrongPercent * circumference);
    const unattemptedOffset = circumference - (unattemptedPercent * circumference);

    const wrongStartRotation = correctPercent * 360;
    const unattemptedStartRotation = (correctPercent + wrongPercent) * 360;

    // --- Grouped Bar Chart Scaling ---
    const maxSubjQ = Math.max(...Object.values(subjectAnalysis).map(s => s.total), 1);
    const barHeightMultiplier = 150 / maxSubjQ; // SVG max height for bars is 150

    return (
      <div className="min-h-screen bg-[#000a24] text-gray-200 p-6 md:p-10 flex flex-col font-sans overflow-y-auto relative">
        
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center mb-8 relative z-10">
          <div>
            <h1 className="text-3xl font-light text-white tracking-wide">Test Analysis</h1>
            <p className="text-white/40 text-sm mt-1">Detailed breakdown of your performance</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStatus('review')} className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-full transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              Review Questions
            </button>
            <button onClick={() => navigate('/')} className="px-6 py-2 border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all">
              Exit to Dashboard
            </button>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
          
          {/* Top Info Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#141720] border border-white/5 rounded-2xl p-6 shadow-lg">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Overall Score</div>
              <div className="text-4xl font-bold text-white">{totalScore} <span className="text-lg text-white/30 font-medium">/ {maxScore}</span></div>
            </div>
            <div className="bg-[#141720] border border-emerald-500/20 rounded-2xl p-6 shadow-lg">
              <div className="text-[10px] uppercase tracking-widest text-emerald-400/60 font-bold mb-1">Total Correct</div>
              <div className="text-4xl font-bold text-emerald-400">{correct}</div>
            </div>
            <div className="bg-[#141720] border border-rose-500/20 rounded-2xl p-6 shadow-lg">
              <div className="text-[10px] uppercase tracking-widest text-rose-400/60 font-bold mb-1">Total Incorrect</div>
              <div className="text-4xl font-bold text-rose-400">{wrong}</div>
            </div>
            <div className="bg-[#141720] border border-sky-500/20 rounded-2xl p-6 shadow-lg">
              <div className="text-[10px] uppercase tracking-widest text-sky-400/60 font-bold mb-1">Overall Accuracy</div>
              <div className="text-4xl font-bold text-sky-400">{accuracy}%</div>
            </div>
          </div>

          {/* Graph 1: Distribution Donut Chart */}
          <div className="lg:col-span-1 bg-[#141720] border border-white/5 rounded-[2rem] p-6 shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest w-full text-left">Attempt Breakdown</h2>
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full -rotate-90 transform drop-shadow-xl" viewBox="0 0 140 140">
                {/* Correct - Green */}
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray={circumference} strokeDashoffset={correctOffset} />
                {/* Incorrect - Red */}
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#f43f5e" strokeWidth="16" strokeDasharray={circumference} strokeDashoffset={wrongOffset} transform={`rotate(${wrongStartRotation} 70 70)`} />
                {/* Unattempted - Gray */}
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#334155" strokeWidth="16" strokeDasharray={circumference} strokeDashoffset={unattemptedOffset} transform={`rotate(${unattemptedStartRotation} 70 70)`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{attempted}</span>
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">Attempted</span>
              </div>
            </div>
            <div className="w-full space-y-2 text-xs font-bold uppercase tracking-wider">
              <div className="flex justify-between"><span className="text-emerald-400 flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Correct</span><span className="text-white">{correct}</span></div>
              <div className="flex justify-between"><span className="text-rose-400 flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-sm"></div> Incorrect</span><span className="text-white">{wrong}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><div className="w-3 h-3 bg-slate-600 rounded-sm"></div> Skipped</span><span className="text-white">{unattempted}</span></div>
            </div>
          </div>

          {/* Graph 2: Subject-wise Grouped Bar Chart */}
          <div className="lg:col-span-3 bg-[#141720] border border-white/5 rounded-[2rem] p-8 shadow-lg relative">
            <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Subject-wise Question Analysis</h2>
            
            <div className="w-full h-[220px] flex items-end justify-around border-b border-white/10 pb-2 relative">
              {/* Y-Axis lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full h-[1px] bg-white/5"></div>
                <div className="w-full h-[1px] bg-white/5"></div>
                <div className="w-full h-[1px] bg-white/5"></div>
                <div className="w-full h-[1px] bg-white/5"></div>
              </div>

              {Object.entries(subjectAnalysis).map(([subject, stats], idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 z-10 w-1/3">
                  <div className="flex items-end gap-1 sm:gap-2 h-[150px]">
                    {/* Correct Bar */}
                    <div className="w-4 sm:w-8 bg-emerald-500 rounded-t-sm group relative" style={{ height: `${stats.correct * barHeightMultiplier}px` }}>
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">{stats.correct}</span>
                    </div>
                    {/* Wrong Bar */}
                    <div className="w-4 sm:w-8 bg-rose-500 rounded-t-sm group relative" style={{ height: `${stats.wrong * barHeightMultiplier}px` }}>
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">{stats.wrong}</span>
                    </div>
                    {/* Skipped Bar */}
                    <div className="w-4 sm:w-8 bg-slate-600 rounded-t-sm group relative" style={{ height: `${stats.unattempted * barHeightMultiplier}px` }}>
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{stats.unattempted}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white/60 uppercase tracking-widest mt-2">{subject}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6 text-xs font-bold text-white/50 uppercase tracking-wider">
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Correct</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-sm"></div> Incorrect</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-600 rounded-sm"></div> Skipped</span>
            </div>
          </div>

          {/* Graph 3: Detailed Segment Bars */}
          <div className="lg:col-span-4 bg-[#141720] border border-white/5 rounded-[2rem] p-8 shadow-lg">
            <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Subject-wise Score Breakdown</h2>
            <div className="space-y-6">
              {Object.entries(subjectAnalysis).map(([subject, stats], idx) => {
                const subScore = (stats.correct * 4) - (stats.wrong * 1);
                const subMax = stats.total * 4;
                const subAccuracy = stats.correct + stats.wrong > 0 ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100) : 0;

                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-white/90 text-sm uppercase tracking-wide">{subject}</span>
                      <div className="flex gap-4 text-xs font-bold text-white/50">
                        <span className="text-sky-400">Score: {subScore}/{subMax}</span>
                        <span>Acc: {subAccuracy}%</span>
                      </div>
                    </div>
                    
                    {/* Horizontal Multi-Segment Progress Bar */}
                    <div className="h-3 w-full bg-[#1e293b] rounded-full overflow-hidden flex">
                      <div style={{ width: `${(stats.correct / stats.total) * 100}%` }} className="bg-emerald-500 h-full"></div>
                      <div style={{ width: `${(stats.wrong / stats.total) * 100}%` }} className="bg-rose-500 h-full"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 4: QUESTION REVIEW & AI EXPLANATION
  // ==========================================
  if (status === 'review') {
    return (
      <div className="min-h-screen bg-[#000a24] text-gray-200 font-sans flex flex-col">
        <div className="bg-[#141720] border-b border-white/10 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-xl font-bold text-white tracking-wide">Review Answers</h1>
          <button onClick={() => setStatus('submitted')} className="px-6 py-2 border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all">
            Back to Analysis
          </button>
        </div>

        <div className="max-w-4xl mx-auto w-full p-8 flex flex-col gap-8">
          {currentTestQuestions.map((q, idx) => {
            const userAns = userAnswers[idx];
            const isCorrect = userAns === q.correct;
            const isAttempted = userAns !== undefined;
            
            const cardBorder = isAttempted ? (isCorrect ? 'border-emerald-500/50' : 'border-rose-500/50') : 'border-white/10';
            const badgeColor = isAttempted ? (isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400') : 'bg-white/10 text-white/50';
            const statusText = isAttempted ? (isCorrect ? 'Correct' : 'Incorrect') : 'Skipped';

            return (
              <div key={idx} className={`bg-[#141720] border ${cardBorder} rounded-[1.5rem] p-8 shadow-lg relative`}>
                <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded text-xs font-bold uppercase">{q.subject}</span>
                    <span className="text-white/50 font-bold">Q{idx + 1}</span>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${badgeColor}`}>{statusText}</span>
                </div>
                
                <div className="text-lg text-white/90 mb-6 whitespace-pre-wrap leading-relaxed">{q.text}</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userAns === oIdx;
                    const isActualCorrect = q.correct === oIdx;
                    
                    let bgStyle = "bg-[#0b1121] border border-white/5 text-white/50";
                    if (isActualCorrect) bgStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 ring-1 ring-emerald-500/50";
                    else if (isSelected && !isCorrect) bgStyle = "bg-rose-500/10 border-rose-500/30 text-rose-300 line-through";

                    return (
                      <div key={oIdx} className={`p-4 rounded-xl ${bgStyle}`}>
                        <span className="font-bold opacity-50 mr-2">{['A','B','C','D'][oIdx]}.</span> {opt}
                        {isSelected && <span className="float-right text-xs uppercase tracking-widest font-bold">Your Ans</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  {!explanations[idx] && loadingAi !== idx && (
                    <button onClick={() => fetchAIExplanation(idx)} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold text-sm transition-colors bg-indigo-500/10 px-4 py-2 rounded-lg hover:bg-indigo-500/20">
                      <SparkleIcon /> Explain with AI
                    </button>
                  )}
                  
                  {loadingAi === idx && (
                    <div className="text-indigo-400/50 text-sm font-mono animate-pulse flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div> Generating explanation...
                    </div>
                  )}

                  {explanations[idx] && (
                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-6 animate-fade-in-up">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-3 uppercase tracking-wider">
                        <SparkleIcon /> AI Solution
                      </div>
                      <div className="text-indigo-100/80 leading-relaxed text-sm whitespace-pre-wrap">
                        {explanations[idx]}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    );
  }
}