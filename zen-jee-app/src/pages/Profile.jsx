import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData.js';
import { getQuestionsForChapter } from '../data/questionsData.js';

// --- Icons based on your design ---
const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/70">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

const QIcon = () => (
  <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  </div>
);

const CorrectIcon = () => (
  <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-500">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  </div>
);

const AccuracyIcon = () => (
  <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-orange-500">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  </div>
);

const ProgressNodes = ['✔', '✔', '✔', '✔', '✔'];

const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});
const listGlass = getGlassStyle(255, 255, 255, 0.02, 0.05);

export default function Profile() {
  const navigate = useNavigate();
  const [targetExam, setTargetExam] = useState('Mains');
  const [selectedClass, setSelectedClass] = useState('Class 12');
  const [chartView, setChartView] = useState('overall'); // 'overall', 'physics', 'chemistry', 'mathematics'

  useEffect(() => {
    const savedExam = localStorage.getItem('zenjee-exam') || 'mains';
    setTargetExam(savedExam.charAt(0).toUpperCase() + savedExam.slice(1));
    const savedClass = localStorage.getItem('zenjee-class') || 'class12';
    setSelectedClass(savedClass === 'class11' ? 'Class 11' : 'Class 12');
  }, []);

  // --- DIAGNOSTIC ENGINE FOR OVERALL PROFILE ---
  const { overallStats, subjectStats, weeklyStats } = useMemo(() => {
    let overall = { strong: 0, weak: 0, threat: 0, unattempted: 0, total: 0 };
    let subj = {
      physics: { strong: 0, weak: 0, threat: 0, unattempted: 0, total: 0 },
      chemistry: { strong: 0, weak: 0, threat: 0, unattempted: 0, total: 0 },
      mathematics: { strong: 0, weak: 0, threat: 0, unattempted: 0, total: 0 },
    };
    
    let totalQsSolved = 0; let totalQsCorrect = 0;

    ['physics', 'chemistry', 'mathematics'].forEach(subjectId => {
      Object.keys(allChaptersData[subjectId] || {}).forEach(chapterId => {
        if (chapterId === 'colorText' || chapterId === 'colorHex') return;
        const chapter = allChaptersData[subjectId][chapterId];
        const topics = chapter.topics || [];
        const questions = getQuestionsForChapter(subjectId, chapterId, chapter.name);
        
        const savedAns = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-ans`) || '{}');
        const savedChk = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-chk`) || '{}');

        topics.forEach(topic => {
          const topicQs = questions.filter(q => q.topic === topic.id);
          let correct = 0; let attempted = 0;
          
          topicQs.forEach(q => {
            const originalIndex = questions.findIndex(xq => xq.id === q.id);
            if (savedChk[originalIndex]) {
              attempted++; totalQsSolved++;
              if (savedAns[originalIndex] === q.correctIndex) { correct++; totalQsCorrect++; }
            }
          });

          if (attempted > 0) {
            const score = Math.round((correct / attempted) * 100);
            if (score >= 70) { overall.strong++; subj[subjectId].strong++; }
            else if (score >= 40) { overall.weak++; subj[subjectId].weak++; }
            else { overall.threat++; subj[subjectId].threat++; }
          } else {
            overall.unattempted++; subj[subjectId].unattempted++;
          }
          overall.total++; subj[subjectId].total++;
        });
      });
    });
    
    return { overallStats: overall, subjectStats: subj, weeklyStats: { solved: totalQsSolved, correct: totalQsCorrect } };
  }, []);

  const activeStats = chartView === 'overall' ? overallStats : subjectStats[chartView];
  const total = activeStats.total || 1;
  const radius = 60; const circumference = 2 * Math.PI * radius;
  const getOffset = (val) => circumference - (val / total) * circumference;

  const strengthOffset = getOffset(activeStats.strong);
  const weakOffset = getOffset(activeStats.weak);
  const threatOffset = getOffset(activeStats.threat);
  
  const accuracy = weeklyStats.solved > 0 ? Math.round((weeklyStats.correct / weeklyStats.solved) * 100) : 0;
  const cardStyle = "bg-[#1C202B] border border-white/5 rounded-[1rem] p-5 shadow-sm";

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#141720] text-gray-100 font-sans antialiased px-8 py-8 md:px-12 lg:px-24">
      <button onClick={() => navigate('/')} className="p-2 mb-6 hover:bg-white/5 rounded-full w-fit transition-colors text-white/80">
        <BackArrow />
      </button>

      {/* 70/30 SPLIT LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* LEFT 70%: PROFILE & ACTIVITY */}
        <div className="w-full lg:w-[70%] flex flex-col gap-8 pr-4">
          <div className="flex items-center gap-6 px-2">
            <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-b from-purple-400 to-fuchsia-600 flex flex-col items-center justify-center text-4xl shadow-lg relative overflow-hidden border-2 border-[#141720]">
               👾
            </div>
            <div className="flex flex-col gap-1 tracking-wide">
              <h1 className="text-[1.15rem] font-medium text-white/90">Nahin</h1>
              <p className="text-sm text-white/60">divyeagarwal436@gmail.com</p>
              <p className="text-sm text-white/60">Engineering Student</p>
              <p className="text-sm text-white/60">{selectedClass}</p>
              <p className="text-sm text-white/60">Target Year - 2026</p>
            </div>
          </div>

          <div className={cardStyle}>
            <div className="flex items-start gap-4">
              <div className="mt-0.5"><CalendarIcon /></div>
              <div>
                <div className="text-sm text-white/70 font-medium mb-1 tracking-wide">My Exams</div>
                <div className="text-[1.15rem] font-bold text-white/90">JEE {targetExam}</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[1.1rem] font-bold text-white/90 mb-4 px-1">My Learning Activity</h2>
            <div className={`${cardStyle} py-8`}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                <div className="text-[0.95rem] font-bold text-white/90 whitespace-nowrap">Your Daily Goal ({Math.min(25, weeklyStats.solved)}/25 Qs)</div>
                <div className="relative w-full flex items-center justify-between px-2 h-10">
                  <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[3px] bg-[#2A2E3B] rounded-full z-0"></div>
                  {ProgressNodes.map((icon, i) => (
                    <div key={i} className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs ${weeklyStats.solved > i * 5 ? 'bg-sky-500 text-white' : 'bg-[#2A2E3B] text-white/40 grayscale opacity-60'}`}>
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-1 gap-2">
              <h2 className="text-[1.1rem] font-bold text-white/90">My Weekly Activity</h2>
              <div className="text-[0.8rem] text-blue-400 font-medium">Past 7 Days Analytics</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`${cardStyle} flex items-center gap-4`}>
                <QIcon />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white/90">{weeklyStats.solved}</span>
                  <span className="text-[0.85rem] text-white/60">Question solved</span>
                </div>
              </div>
              <div className={`${cardStyle} flex items-center gap-4`}>
                <CorrectIcon />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white/90">{weeklyStats.correct}</span>
                  <span className="text-[0.85rem] text-white/60">Correct Questions</span>
                </div>
              </div>
              <div className={`${cardStyle} flex items-center gap-4`}>
                <AccuracyIcon />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white/90">{accuracy}%</span>
                  <span className="text-[0.85rem] text-white/60">Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 30%: OVERALL RING CHART */}
        <div className="w-full lg:w-[30%] shrink-0 flex flex-col items-center">
          <div style={listGlass} className="w-full p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center relative overflow-hidden">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500 opacity-20 blur-[60px] rounded-full pointer-events-none`} />

            <div className="flex flex-col items-center mb-8 w-full relative z-10">
              <h3 className="text-lg font-bold text-white tracking-wider uppercase mb-3">Overall Mastery</h3>
              <select 
                value={chartView} 
                onChange={(e) => setChartView(e.target.value)}
                className="bg-[#0f1523] border border-white/10 rounded-lg px-4 py-2 text-sm font-medium text-white/80 outline-none w-full text-center hover:bg-white/5 cursor-pointer"
              >
                <option value="overall">All Subjects</option>
                <option value="physics">Physics Only</option>
                <option value="chemistry">Chemistry Only</option>
                <option value="mathematics">Math Only</option>
              </select>
            </div>

            {/* SVG Ring Chart */}
            <div className="relative w-48 h-48 mb-8 z-10">
              <svg className="w-full h-full -rotate-90 transform drop-shadow-xl" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={getOffset(activeStats.total)} />
                {activeStats.threat > 0 && <circle cx="70" cy="70" r={radius} fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={threatOffset} strokeLinecap="round" className="transition-all duration-1000" />}
                {activeStats.weak > 0 && <circle cx="70" cy="70" r={radius} fill="none" stroke="#eab308" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={weakOffset} strokeLinecap="round" transform={`rotate(${(activeStats.threat/total)*360} 70 70)`} className="transition-all duration-1000" />}
                {activeStats.strong > 0 && <circle cx="70" cy="70" r={radius} fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={strengthOffset} strokeLinecap="round" transform={`rotate(${((activeStats.threat + activeStats.weak)/total)*360} 70 70)`} className="transition-all duration-1000" />}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{Math.round((activeStats.strong / total) * 100) || 0}%</span>
                <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest mt-1">Mastered</span>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="w-full space-y-3 z-10">
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span><span className="text-emerald-100">Strengths (&gt;70%)</span></div>
                <span className="text-white/80">{activeStats.strong} Topics</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span><span className="text-yellow-100">Weaknesses</span></div>
                <span className="text-white/80">{activeStats.weak} Topics</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span><span className="text-rose-100">Threats (&lt;40%)</span></div>
                <span className="text-white/80">{activeStats.threat} Topics</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium pt-3 border-t border-white/10 mt-3">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white/10"></span><span className="text-white/50">Unrated / Unattempted</span></div>
                <span className="text-white/40">{activeStats.unattempted} Topics</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}