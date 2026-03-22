import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData.js';
import { getQuestionsForChapter } from '../data/questionsData.js';
import { mockQuestions } from '../data/mockTests.js'; // <-- IMPORT MOCK QUESTIONS

// --- SVGs & Styling Helpers ---
const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1);
const listGlass = getGlassStyle(255, 255, 255, 0.02, 0.05);

const subjectLayout = {
  physics: { title: 'PHYSICS', colorText: 'text-sky-300', colorFill: 'bg-sky-400', hex: '#38bdf8', syllabus: { class11: ['p_u1', 'p_u2', 'p_u3', 'p_u4', 'p_u5', 'p_u6', 'p_u7', 'p_u8', 'p_u9', 'p_u10'], class12: ['p_u11', 'p_u12', 'p_u13', 'p_u14', 'p_u15', 'p_u16', 'p_u17', 'p_u18', 'p_u19', 'p_u20'] } },
  chemistry: { title: 'CHEMISTRY', colorText: 'text-emerald-300', colorFill: 'bg-emerald-400', hex: '#34d399', syllabus: { class11: ['c_u1', 'c_u2', 'c_u4', 'c_u6', 'c_u9', 'c_u3', 'c_u10', 'c_u13', 'c_u14', 'c_u15'], class12: ['c_u5', 'c_u7', 'c_u8', 'c_u10_2', 'c_u11', 'c_u12', 'c_u16', 'c_u17', 'c_u18', 'c_u19', 'c_u20'] } },
  mathematics: { title: 'MATHEMATICS', colorText: 'text-orange-300', colorFill: 'bg-orange-400', hex: '#fb923c', syllabus: { class11: ['m_u1', 'm_u2', 'm_u4', 'm_u5', 'm_u6', 'm_u10_1', 'm_u10_2', 'm_u14_1'], class12: ['m_u3', 'm_u7', 'm_u8', 'm_u9', 'm_u11', 'm_u12', 'm_u13', 'm_u14_2'] } }
};

export default function Subject() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [activeGrade, setActiveGrade] = useState(() => {
    return localStorage.getItem('zenjee-class') || 'class11';
  });

  useEffect(() => {
    localStorage.setItem('zenjee-class', activeGrade);
  }, [activeGrade]);

  const layout = subjectLayout[subjectId] || subjectLayout.physics;

  // --- DIAGNOSTIC ENGINE: Calculate Topic Scores & Chapter Progress ---
  const { chapterList, ringStats } = useMemo(() => {
    let strongCount = 0; let weakCount = 0; let threatCount = 0; let unattemptedCount = 0;
    
    const chapters = layout.syllabus[activeGrade].map(chapterId => {
      const chapter = allChaptersData[subjectId]?.[chapterId];
      if (!chapter) return null;

      // 1. Chapter Progress (Based on Ticked Lectures)
      const tickedLectures = JSON.parse(localStorage.getItem(`zenjee-progress-${subjectId}-${chapterId}`) || '[]');
      const topics = chapter.topics || [];
      const totalLectures = topics.length;
      const completedLectures = tickedLectures.length;

      const questions = getQuestionsForChapter(subjectId, chapterId, chapter.name);
      const savedAns = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-ans`) || '{}');
      const savedChk = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-chk`) || '{}');

      // 2. Normal PYQ Topic Diagnostic Scoring
      const analyzedTopics = topics.map(topic => {
        const topicQs = questions.filter(q => q.topic === topic.id);
        let correct = 0; let attempted = 0;

        topicQs.forEach((q) => {
          const originalIndex = questions.findIndex(xq => xq.id === q.id);
          if (savedChk[originalIndex]) {
            attempted++;
            if (savedAns[originalIndex] === q.correctIndex) correct++;
          }
        });

        let score = null; let category = 'Unattempted';
        if (attempted > 0) {
          score = Math.round((correct / attempted) * 100);
          if (score >= 70) { category = 'Strength'; strongCount++; }
          else if (score >= 40) { category = 'Weakness'; weakCount++; }
          else { category = 'Threat'; threatCount++; }
        } else {
          unattemptedCount++;
        }

        return { ...topic, score, category, correct, attempted };
      });

      // 3. MOCK TEST INTEGRATION
      // Finds all mock questions associated with this specific chapter
      const mockQs = mockQuestions.filter(q => q.chapterId === chapterId);
      
      if (mockQs.length > 0) {
        let mockCorrect = 0; let mockAttempted = 0;
        
        mockQs.forEach(q => {
          const globalQId = `mock_${q.id}`;
          if (savedChk[globalQId]) {
            mockAttempted++;
            if (savedAns[globalQId] === q.correct) mockCorrect++;
          }
        });
        
        // If the student attempted mock questions for this chapter, add it as a new data point
        let score = null; let category = 'Unattempted';
        if (mockAttempted > 0) {
          score = Math.round((mockCorrect / mockAttempted) * 100);
          if (score >= 70) { category = 'Strength'; strongCount++; }
          else if (score >= 40) { category = 'Weakness'; weakCount++; }
          else { category = 'Threat'; threatCount++; }
        } else {
          unattemptedCount++;
        }
        
        // Push the mock test performance into the topic breakdown list
        analyzedTopics.push({
          id: 'mock_test_perf',
          name: '⭐ Mock Test Performance',
          score,
          category,
          correct: mockCorrect,
          attempted: mockAttempted
        });
      }

      return { id: chapterId, name: chapter.name, totalLectures, completedLectures, analyzedTopics };
    }).filter(Boolean);

    return { 
      chapterList: chapters, 
      ringStats: { strongCount, weakCount, threatCount, unattemptedCount, total: strongCount + weakCount + threatCount + unattemptedCount }
    };
  }, [subjectId, activeGrade, layout]);

  // --- RING CHART SVGS ---
  const total = ringStats.total || 1;
  const radius = 60; const circumference = 2 * Math.PI * radius;
  const getOffset = (val) => circumference - (val / total) * circumference;

  const strengthOffset = getOffset(ringStats.strongCount);
  const weakOffset = getOffset(ringStats.weakCount);
  const threatOffset = getOffset(ringStats.threatCount);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased">
      
      <nav style={defaultGlass} className="flex items-center justify-between px-10 py-5 shrink-0 rounded-b-3xl mx-3 shadow-lg z-50 relative">
        <div className="text-3xl font-semibold tracking-wider text-white flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={() => navigate('/')}>
          Zen<span className="text-sky-300 font-extralight">JEE</span>
        </div>
        <button onClick={() => navigate('/')} className="px-8 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm tracking-wide text-sky-50 shadow-lg">
          ← Back to Dashboard
        </button>
      </nav>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 flex flex-col pt-8 pb-8 overflow-hidden">
        
        <div className="flex items-end justify-between mb-8 shrink-0 border-b border-white/10 pb-6">
          <h1 className={`text-4xl font-semibold tracking-[0.2em] ${layout.colorText}`}>{layout.title}</h1>
          <div className="flex bg-black/40 p-1 rounded-full border border-white/10 shadow-inner">
            <button onClick={() => setActiveGrade('class11')} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeGrade === 'class11' ? `${layout.colorFill} text-black` : 'text-white/50 hover:text-white'}`}>11th Grade</button>
            <button onClick={() => setActiveGrade('class12')} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeGrade === 'class12' ? `${layout.colorFill} text-black` : 'text-white/50 hover:text-white'}`}>12th Grade</button>
          </div>
        </div>

        {/* 70/30 SPLIT LAYOUT */}
        <div className="flex-1 flex gap-10 overflow-hidden">
          
          {/* LEFT 70%: CHAPTERS & TOPICS */}
          <div className="w-[70%] overflow-y-auto custom-scrollbar pr-4 space-y-6 pb-20">
            {chapterList.map((chap) => {
              const progressPercent = chap.totalLectures === 0 ? 0 : (chap.completedLectures / chap.totalLectures) * 100;
              const isDone = chap.totalLectures > 0 && chap.completedLectures === chap.totalLectures;

              return (
                <div key={chap.id} style={listGlass} className="w-full rounded-2xl p-5 border border-white/5 hover:border-white/10 shadow-lg transition-all">
                  
                  {/* Chapter Header (Clickable) */}
                  <div onClick={() => navigate(`/subject/${subjectId}/chapter/${chap.id}`, { state: { chapterName: chap.name } })} className="flex items-center justify-between cursor-pointer group mb-5">
                    <div>
                      <h2 className={`text-xl font-semibold transition-colors ${isDone ? 'text-white/50' : 'text-white/90 group-hover:text-white'}`}>{chap.name}</h2>
                      <p className="text-xs text-white/40 mt-1 font-medium">{chap.completedLectures} of {chap.totalLectures} Lectures completed</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-32 h-2 rounded-full bg-black/40 border border-white/5 overflow-hidden shadow-inner">
                        <div className={`h-full rounded-full transition-all duration-1000 ${layout.colorFill} ${isDone ? 'opacity-50' : ''}`} style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Topic Diagnostic Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-white/5 pt-4">
                    {chap.analyzedTopics.map(topic => {
                      // Styling based on diagnostic score
                      let style = topic.category === 'Strength' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' :
                                    topic.category === 'Weakness' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200' :
                                    topic.category === 'Threat'   ? 'bg-rose-500/10 border-rose-500/30 text-rose-200' :
                                    'bg-white/5 border-white/10 text-white/50';

                      // Add a special glowing ring for the Mock Test row to make it stand out
                      if (topic.id === 'mock_test_perf') {
                        style += ' ring-1 ring-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]';
                      }

                      return (
                        <div key={topic.id} className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium ${style} transition-all`}>
                          <span className="truncate pr-4">{topic.name}</span>
                          <span className="shrink-0 font-bold">{topic.score !== null ? `${topic.score}%` : 'Unrated'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT 30%: DIAGNOSTIC RING CHART */}
          <div className="w-[30%] shrink-0 flex flex-col items-center">
            <div style={listGlass} className="w-full p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center relative overflow-hidden">
              
              {/* Glow Behind Ring */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[${layout.hex}] opacity-20 blur-[60px] rounded-full pointer-events-none`} />

              <h3 className="text-lg font-bold text-white mb-8 tracking-wider uppercase text-center">Mastery Analytics</h3>

              {/* SVG Ring Chart */}
              <div className="relative w-48 h-48 mb-8">
                <svg className="w-full h-full -rotate-90 transform drop-shadow-xl" viewBox="0 0 140 140">
                  {/* Background Track */}
                  <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                  
                  {/* Unattempted (Base Layer) */}
                  <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={getOffset(ringStats.total)} />
                  
                  {/* Threat (Red) */}
                  {ringStats.threatCount > 0 && (
                    <circle cx="70" cy="70" r={radius} fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={threatOffset} strokeLinecap="round" className="transition-all duration-1000" />
                  )}
                  
                  {/* Weakness (Yellow) */}
                  {ringStats.weakCount > 0 && (
                    <circle cx="70" cy="70" r={radius} fill="none" stroke="#eab308" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={weakOffset} strokeLinecap="round" transform={`rotate(${(ringStats.threatCount/total)*360} 70 70)`} className="transition-all duration-1000" />
                  )}
                  
                  {/* Strength (Green) */}
                  {ringStats.strongCount > 0 && (
                    <circle cx="70" cy="70" r={radius} fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={strengthOffset} strokeLinecap="round" transform={`rotate(${((ringStats.threatCount + ringStats.weakCount)/total)*360} 70 70)`} className="transition-all duration-1000" />
                  )}
                </svg>
                
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">{Math.round((ringStats.strongCount / total) * 100) || 0}%</span>
                  <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest mt-1">Mastered</span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span><span className="text-emerald-100">Strengths (&gt;70%)</span></div>
                  <span className="text-white/80">{ringStats.strongCount} Areas</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span><span className="text-yellow-100">Weaknesses</span></div>
                  <span className="text-white/80">{ringStats.weakCount} Areas</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span><span className="text-rose-100">Threats (&lt;40%)</span></div>
                  <span className="text-white/80">{ringStats.threatCount} Areas</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium pt-3 border-t border-white/10 mt-3">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white/10"></span><span className="text-white/50">Unrated / Unattempted</span></div>
                  <span className="text-white/40">{ringStats.unattemptedCount} Areas</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}