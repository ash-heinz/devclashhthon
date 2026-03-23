import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData.js';
import { getQuestionsForChapter } from '../data/questionsData.js';
import { aiService } from '../services/api.js'; // <-- Using your backend service!

const BackArrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>;
const SparkleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-indigo-400"><path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z" /></svg>;
const RefreshIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>;

export default function Planner() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAndGeneratePlan();
  }, []);

  const analyzeUserProgress = () => {
    let stats = { coverage: { completed: 0, total: 0 }, weakTopics: [], recentMistakes: 0 };

    Object.keys(allChaptersData).forEach(subject => {
      Object.keys(allChaptersData[subject]).forEach(chapterId => {
        if (chapterId === 'colorText' || chapterId === 'colorHex') return;
        const chapter = allChaptersData[subject][chapterId];
        const topics = chapter.topics || [];
        stats.coverage.total += topics.length;

        const ticked = JSON.parse(localStorage.getItem(`zenjee-progress-${subject}-${chapterId}`) || '[]');
        stats.coverage.completed += ticked.length;

        const questions = getQuestionsForChapter(subject, chapterId, chapter.name);
        const savedAns = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-ans`) || '{}');
        const savedChk = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-chk`) || '{}');

        topics.forEach(topic => {
          const topicQs = questions.filter(q => q.topic === topic.id);
          let correct = 0; let attempted = 0;
          topicQs.forEach(q => {
            const idx = questions.findIndex(xq => xq.id === q.id);
            if (savedChk[idx]) { attempted++; if (savedAns[idx] === q.correctIndex) correct++; else stats.recentMistakes++; }
          });
          // Track Weaknesses (< 50% Accuracy)
          if (attempted > 0 && (correct / attempted) * 100 < 50) {
            stats.weakTopics.push(`${subject.toUpperCase()}: ${chapter.name} - ${topic.name}`);
          }
        });
      });
    });

    stats.weakTopics = stats.weakTopics.sort(() => 0.5 - Math.random()).slice(0, 4);
    return stats;
  };

  const checkAndGeneratePlan = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    const userStats = analyzeUserProgress();
    const currentSignature = userStats.weakTopics.join('|');
    
    const cachedPlan = localStorage.getItem('zenjee-planner-data');
    const cachedSignature = localStorage.getItem('zenjee-planner-sig');

    // ONLY regenerate if the weak topics changed or user clicks refresh!
    if (!forceRefresh && cachedPlan && cachedSignature === currentSignature) {
      setPlan(JSON.parse(cachedPlan));
      setLoading(false);
      return;
    }

    try {
      const targetExam = localStorage.getItem('zenjee-exam') || 'mains';
      const selectedClass = localStorage.getItem('zenjee-class') || 'class12';
      const examDateStr = localStorage.getItem('zenjee-exam-date') || '2026-01-24';
      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const examDate = new Date(examDateStr);
      let daysLeft = Math.floor((examDate - new Date()) / (1000 * 60 * 60 * 24));
      if (daysLeft < 0) daysLeft = 300; 

      const coveragePct = userStats.coverage.total === 0 ? 0 : Math.round((userStats.coverage.completed / userStats.coverage.total) * 100);
      const weakAreasContext = userStats.weakTopics.length > 0 
        ? `YOU MUST PRIORITIZE THESE WEAK AREAS on Day 1 and Day 2: ${userStats.weakTopics.join(', ')}` 
        : `Student is performing well. Focus on advancing syllabus.`;

      // CALLING YOUR NODE.JS BACKEND
      const parsedPlan = await aiService.generatePlan({
        daysLeft,
        targetExam,
        coveragePct,
        weakAreasContext,
        selectedClass,
        currentDate
      });
      
      setPlan(parsedPlan);
      
      // Save Cache
      localStorage.setItem('zenjee-planner-data', JSON.stringify(parsedPlan));
      localStorage.setItem('zenjee-planner-sig', currentSignature);

    } catch (err) {
      console.error(err);
      setError("The autonomous agent failed to connect to the backend server. Is your Node.js server running?");
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = "bg-[#1C202B] border border-white/5 rounded-[1rem] p-5 shadow-sm";

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#141720] text-gray-100 font-sans antialiased px-8 py-8 md:px-12 lg:px-24">
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/80"><BackArrow /></button>
        <div className="flex items-center gap-4">
          <button onClick={() => checkAndGeneratePlan(true)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors">
            <RefreshIcon /> Refresh Plan
          </button>
          <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium">
            <SparkleIcon /> <span>Autonomous AI Active</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-medium text-white/90 mb-2">My Study Space</h1>
          <p className="text-white/50 text-sm">Your schedule strictly targets your actual weak areas based on your daily PYQ performance.</p>
        </div>

        {loading && (
          <div className={`${cardStyle} flex flex-col items-center justify-center py-20 gap-4`}>
            <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-white/60 animate-pulse text-sm">Analyzing syllabus coverage, targeting weak areas, and optimizing schedule via Secure Backend...</p>
          </div>
        )}

        {error && !loading && (
          <div className={`${cardStyle} border-red-500/30 bg-red-500/5 text-red-200 py-10 text-center`}>
            {error}
            <button onClick={() => checkAndGeneratePlan(true)} className="block mt-4 mx-auto px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">Retry</button>
          </div>
        )}

        {plan && !loading && (
          <div className="grid grid-cols-1 gap-4 relative mt-4">
            <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-white/5 z-0 hidden sm:block"></div>

            {plan.map((item, idx) => {
              const colorMap = { sky: 'text-sky-400 bg-sky-400/10 border-sky-400/20', emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20' };
              const theme = colorMap[item.color] || colorMap.sky;

              return (
                <div key={idx} className={`${cardStyle} flex flex-col sm:flex-row gap-6 relative z-10 hover:border-white/10 transition-colors`}>
                  <div className="flex flex-col items-center justify-center min-w-[80px] shrink-0 bg-[#141720] rounded-xl py-2 border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{item.day}</span>
                    <span className="text-lg font-bold text-white/90">{item.date}</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 pt-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${theme}`}>{item.subject}</span>
                      <span className="text-white/90 font-medium">{item.focus}</span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mt-1">{item.task}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}