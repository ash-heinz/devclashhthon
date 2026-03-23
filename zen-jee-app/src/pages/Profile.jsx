import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData.js';
import { getQuestionsForChapter } from '../data/questionsData.js';
import { mockQuestions } from '../data/mockTests.js'; // <-- IMPORT MOCK QUESTIONS
import { authService } from '../services/auth.js';

// --- SYLLABUS LAYOUT MAPPING (Matches Subject.jsx) ---
const subjectLayout = {
  physics: { syllabus: { class11: ['p_u1', 'p_u2', 'p_u3', 'p_u4', 'p_u5', 'p_u6', 'p_u7', 'p_u8', 'p_u9', 'p_u10'], class12: ['p_u11', 'p_u12', 'p_u13', 'p_u14', 'p_u15', 'p_u16', 'p_u17', 'p_u18', 'p_u19', 'p_u20'] } },
  chemistry: { syllabus: { class11: ['c_u1', 'c_u2', 'c_u4', 'c_u6', 'c_u9', 'c_u3', 'c_u10', 'c_u13', 'c_u14', 'c_u15'], class12: ['c_u5', 'c_u7', 'c_u8', 'c_u10_2', 'c_u11', 'c_u12', 'c_u16', 'c_u17', 'c_u18', 'c_u19', 'c_u20'] } },
  mathematics: { syllabus: { class11: ['m_u1', 'm_u2', 'm_u4', 'm_u5', 'm_u6', 'm_u10_1', 'm_u10_2', 'm_u14_1'], class12: ['m_u3', 'm_u7', 'm_u8', 'm_u9', 'm_u11', 'm_u12', 'm_u13', 'm_u14_2'] } }
};

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/70">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const QIcon = () => (
  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-400">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  </div>
);

const CorrectIcon = () => (
  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  </div>
);

const AccuracyIcon = () => (
  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-orange-400">
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

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1);
const cardGlass = getGlassStyle(255, 255, 255, 0.02, 0.05);

const getLocalDateStr = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Profile() {
  const navigate = useNavigate();
  
  const [examDate, setExamDate] = useState(() => 
    localStorage.getItem('zenjee-exam-date') || '2026-01-24'
  );

  const [targetExam, setTargetExam] = useState(() => {
    const savedExam = localStorage.getItem('zenjee-exam') || 'Mains';
    return savedExam.charAt(0).toUpperCase() + savedExam.slice(1);
  });
  
  const [selectedClass, setSelectedClass] = useState('Class 12');
  const [chartView, setChartView] = useState('overall'); 
  
  const user = authService.getCurrentUser();

  const todayStr = getLocalDateStr(new Date());
  const [dailyGoal, setDailyGoal] = useState(() => parseInt(localStorage.getItem('zenjee-daily-goal')) || 30);
  const [dailyProgress, setDailyProgress] = useState(() => parseInt(localStorage.getItem(`zenjee-progress-${todayStr}`)) || 0);

  useEffect(() => {
    const savedClass = localStorage.getItem('zenjee-class') || 'class12';
    setSelectedClass(savedClass === 'class11' ? 'Class 11' : savedClass === 'class12' ? 'Class 12' : 'Dropper');
    
    const handleStorageChange = () => {
      setDailyGoal(parseInt(localStorage.getItem('zenjee-daily-goal')) || 30);
      setDailyProgress(parseInt(localStorage.getItem(`zenjee-progress-${todayStr}`)) || 0);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [todayStr]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setExamDate(newDate);
    localStorage.setItem('zenjee-exam-date', newDate);
    window.dispatchEvent(new Event('storage'));
  };

  const handleExamChange = (examType) => {
    setTargetExam(examType);
    localStorage.setItem('zenjee-exam', examType.toLowerCase());
    window.dispatchEvent(new Event('storage'));
  };

  // --- DIAGNOSTIC ENGINE: Mirrored from Subject.jsx ---
  const { overallStats, subjectStats, weeklyStats } = useMemo(() => {
    let overall = { strong: 0, weak: 0, threat: 0, unattempted: 0, total: 0 };
    let subj = {
      physics: { strong: 0, weak: 0, threat: 0, unattempted: 0, total: 0 },
      chemistry: { strong: 0, weak: 0, threat: 0, unattempted: 0, total: 0 },
      mathematics: { strong: 0, weak: 0, threat: 0, unattempted: 0, total: 0 },
    };
    let totalQsSolved = 0; let totalQsCorrect = 0;

    // Determine which chapters to load based on the user's selected Class
    const classFilter = selectedClass === 'Class 11' ? ['class11'] : 
                        selectedClass === 'Class 12' ? ['class12'] : 
                        ['class11', 'class12'];

    ['physics', 'chemistry', 'mathematics'].forEach(subjectId => {
      let validChapters = [];
      classFilter.forEach(cls => {
        if (subjectLayout[subjectId]?.syllabus[cls]) {
           validChapters = validChapters.concat(subjectLayout[subjectId].syllabus[cls]);
        }
      });

      validChapters.forEach(chapterId => {
        const chapter = allChaptersData[subjectId]?.[chapterId];
        if (!chapter) return;
        
        const topics = chapter.topics || [];
        const questions = getQuestionsForChapter(subjectId, chapterId, chapter.name);
        
        const savedAns = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-ans`) || '{}');
        const savedChk = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-chk`) || '{}');

        // 1. Regular Topics (Lectures)
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

        // 2. Mock Tests Integration (Just like Subject.jsx)
        const mockQs = mockQuestions.filter(q => q.chapterId === chapterId);
        if (mockQs.length > 0) {
          let mockCorrect = 0; let mockAttempted = 0;
          mockQs.forEach(q => {
            const globalQId = `mock_${q.id}`;
            if (savedChk[globalQId]) {
              mockAttempted++; totalQsSolved++;
              if (savedAns[globalQId] === q.correct) { mockCorrect++; totalQsCorrect++; }
            }
          });

          if (mockAttempted > 0) {
            const score = Math.round((mockCorrect / mockAttempted) * 100);
            if (score >= 70) { overall.strong++; subj[subjectId].strong++; }
            else if (score >= 40) { overall.weak++; subj[subjectId].weak++; }
            else { overall.threat++; subj[subjectId].threat++; }
          } else {
            overall.unattempted++; subj[subjectId].unattempted++;
          }
          overall.total++; subj[subjectId].total++;
        }
      });
    });
    
    return { overallStats: overall, subjectStats: subj, weeklyStats: { solved: totalQsSolved, correct: totalQsCorrect } };
  }, [selectedClass]);

  const activeStats = chartView === 'overall' ? overallStats : subjectStats[chartView];
  const total = activeStats.total || 1;
  const radius = 60; const circumference = 2 * Math.PI * radius;
  const getOffset = (val) => circumference - (val / total) * circumference;

  const strengthOffset = getOffset(activeStats.strong);
  const weakOffset = getOffset(activeStats.weak);
  const threatOffset = getOffset(activeStats.threat);
  
  const accuracy = weeklyStats.solved > 0 ? Math.round((weeklyStats.correct / weeklyStats.solved) * 100) : 0;

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased overflow-y-auto custom-scrollbar">
      
      <nav style={defaultGlass} className="flex items-center justify-between px-10 py-4 shrink-0 rounded-b-3xl mx-3 shadow-lg z-50 relative">
        <div className="text-2xl font-semibold tracking-wider text-white flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
          Zen<span className="text-sky-300 font-extralight">JEE</span>
        </div>
        <button onClick={() => navigate('/')} className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 text-sm tracking-wide text-sky-50">
          ← Back to Dashboard
        </button>
      </nav>

      <main className="w-full max-w-[1400px] mx-auto p-6 md:p-10 flex flex-col lg:flex-row gap-10">
        
        <div className="w-full lg:w-[70%] flex flex-col gap-8 pr-4">
          <div className="flex items-center gap-6 px-2">
            <div className="w-[96px] h-[96px] rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 p-[3px] shadow-lg">
              <div className="w-full h-full bg-[#000a24] rounded-full flex items-center justify-center text-4xl">👨‍🎓</div>
            </div>
            <div className="flex flex-col gap-1 tracking-wide">
              <h1 className="text-2xl font-medium text-white/90">{user?.name || 'Student'}</h1>
              <p className="text-sm text-white/50">{user?.email || 'student@jee.com'}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white/70 tracking-wider uppercase">{selectedClass}</span>
                <span className="px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-300 tracking-wider uppercase">Target: {new Date(examDate).getFullYear() || 2026}</span>
              </div>
            </div>
          </div>

          <div style={cardGlass} className="rounded-2xl p-6 shadow-lg hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="mt-0.5"><CalendarIcon /></div>
                <div>
                  <div className="text-sm text-white/70 font-medium mb-1 tracking-wide">Target Exam Date</div>
                  <input 
                    type="date" 
                    style={{ colorScheme: 'dark' }}
                    value={examDate}
                    onChange={handleDateChange}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    className="bg-transparent text-[1.15rem] font-bold text-sky-400 outline-none cursor-pointer w-full"
                  />
                </div>
              </div>
              
              <div className="flex bg-black/40 p-1 rounded-full border border-white/10 shadow-inner">
                <button 
                  onClick={() => handleExamChange('Mains')} 
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    targetExam.toLowerCase() === 'mains' ? 'bg-sky-500 text-black shadow-[0_0_10px_rgba(14,165,233,0.4)]' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Mains
                </button>
                <button 
                  onClick={() => handleExamChange('Advanced')} 
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    targetExam.toLowerCase() === 'advanced' ? 'bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Advanced
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[1.1rem] font-bold text-white/90 mb-4 px-1">My Learning Activity</h2>
            <div style={cardGlass} className="rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                <div className="text-[0.95rem] font-bold text-white/90 whitespace-nowrap">Your Daily Goal ({Math.min(dailyGoal, dailyProgress)}/{dailyGoal} Qs)</div>
                <div className="relative w-full flex items-center justify-between px-2 h-10">
                  <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[3px] bg-white/5 rounded-full z-0"></div>
                  {ProgressNodes.map((icon, i) => {
                    const threshold = (i + 1) * (dailyGoal / ProgressNodes.length);
                    const isActive = dailyProgress >= threshold;
                    return (
                      <div key={i} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs border ${isActive ? 'bg-sky-500 border-sky-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]' : 'bg-[#000a24] border-white/10 text-white/20'}`}>
                        {icon}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-1 gap-2">
              <h2 className="text-[1.1rem] font-bold text-white/90">My Weekly Activity</h2>
              <div className="text-[0.8rem] text-sky-400 font-medium tracking-wider uppercase">Past 7 Days Analytics</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div style={cardGlass} className="rounded-2xl p-6 flex items-center gap-5 hover:bg-white/5 transition-colors">
                <QIcon />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white/90">{weeklyStats.solved}</span>
                  <span className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">Qs Solved</span>
                </div>
              </div>
              <div style={cardGlass} className="rounded-2xl p-6 flex items-center gap-5 hover:bg-white/5 transition-colors">
                <CorrectIcon />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-emerald-400">{weeklyStats.correct}</span>
                  <span className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">Correct Qs</span>
                </div>
              </div>
              <div style={cardGlass} className="rounded-2xl p-6 flex items-center gap-5 hover:bg-white/5 transition-colors">
                <AccuracyIcon />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-orange-400">{accuracy}%</span>
                  <span className="text-xs text-white/50 font-medium uppercase tracking-wider mt-1">Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%] shrink-0 flex flex-col items-center">
          <div style={cardGlass} className="w-full p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center relative overflow-hidden">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500 opacity-20 blur-[60px] rounded-full pointer-events-none`} />

            <div className="flex flex-col items-center mb-8 w-full relative z-10">
              <h3 className="text-lg font-bold text-white tracking-wider uppercase mb-3">Overall Mastery</h3>
              
              <div className="relative w-full">
                <select 
                  value={chartView} 
                  onChange={(e) => setChartView(e.target.value)}
                  className="bg-[#1C202B] border border-white/20 rounded-lg px-4 py-2.5 text-sm font-medium text-white outline-none w-full text-center hover:bg-[#2A2E3B] cursor-pointer appearance-none shadow-sm transition-colors"
                >
                  <option value="overall" className="bg-[#1C202B] text-white">All Subjects</option>
                  <option value="physics" className="bg-[#1C202B] text-white">Physics Only</option>
                  <option value="chemistry" className="bg-[#1C202B] text-white">Chemistry Only</option>
                  <option value="mathematics" className="bg-[#1C202B] text-white">Math Only</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs">
                  ▼
                </div>
              </div>
            </div>

            <div className="relative w-52 h-52 mb-10 z-10">
              <svg className="w-full h-full -rotate-90 transform drop-shadow-xl" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={getOffset(activeStats.total)} />
                {activeStats.threat > 0 && <circle cx="70" cy="70" r={radius} fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={threatOffset} strokeLinecap="round" className="transition-all duration-1000" />}
                {activeStats.weak > 0 && <circle cx="70" cy="70" r={radius} fill="none" stroke="#eab308" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={weakOffset} strokeLinecap="round" transform={`rotate(${(activeStats.threat/total)*360} 70 70)`} className="transition-all duration-1000" />}
                {activeStats.strong > 0 && <circle cx="70" cy="70" r={radius} fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={strengthOffset} strokeLinecap="round" transform={`rotate(${((activeStats.threat + activeStats.weak)/total)*360} 70 70)`} className="transition-all duration-1000" />}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{Math.round((activeStats.strong / total) * 100) || 0}%</span>
                <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest mt-1">Mastered</span>
              </div>
            </div>

            <div className="w-full space-y-4 z-10">
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span><span className="text-emerald-100">Strengths (&gt;70%)</span></div>
                <span className="text-white/80 bg-white/5 px-2.5 py-1 rounded-md">{activeStats.strong}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span><span className="text-yellow-100">Weaknesses</span></div>
                <span className="text-white/80 bg-white/5 px-2.5 py-1 rounded-md">{activeStats.weak}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span><span className="text-rose-100">Threats (&lt;40%)</span></div>
                <span className="text-white/80 bg-white/5 px-2.5 py-1 rounded-md">{activeStats.threat}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium pt-4 border-t border-white/10 mt-4">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white/10"></span><span className="text-white/50">Unattempted</span></div>
                <span className="text-white/40 bg-white/5 px-2.5 py-1 rounded-md">{activeStats.unattempted}</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}