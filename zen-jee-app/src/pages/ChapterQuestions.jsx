import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData.js';
import { getQuestionsForChapter } from '../data/questionsData.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// --- SVGs ---
const IconBack = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const IconOverview = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IconHistory = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const IconList = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M4 6h16M4 12h16M4 18h16M8 6h.01M8 12h.01M8 18h.01"/></svg>;
const IconBookmark = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>;
const IconWarning = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>;
const IconCalendar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>;
const IconFilter = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M4 6h16M6 12h12M8 18h8" strokeLinecap="round"/></svg>;
const IconSort = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconChevronDown = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 ml-1"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconChart = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-sky-400"><path d="M18 20V10M12 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconClock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
const IconLightbulb = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M9 18h6m-3-13a5 5 0 00-5 5c0 2.2 1.5 3.5 2 5h6c.5-1.5 2-2.8 2-5a5 5 0 00-5-5zM12 22v-1"/></svg>;
const IconRefresh = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const formatTime = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export const ChapterQuestions = () => {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const qParam = searchParams.get('q'); 
  const isStarted = qParam !== null;
  const currentIndex = isStarted ? parseInt(qParam, 10) : 0;

  const subjectData = allChaptersData[subjectId];
  const chapterDetails = subjectData?.[chapterId];
  const displayTitle = location.state?.chapterName || chapterDetails?.name || `Chapter ${chapterId}`;
  
  const [questions, setQuestions] = useState([]);
  
  // Persistent Storage
  const storageKey = `zenjee-answers-${chapterId}`;
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem(storageKey + '-ans') || '{}'));
  const [checkedStates, setCheckedStates] = useState(() => JSON.parse(localStorage.getItem(storageKey + '-chk') || '{}'));
  const [timeTaken, setTimeTaken] = useState(() => JSON.parse(localStorage.getItem(storageKey + '-time') || '{}'));

  // Timer & Hint States
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [currentTimeElapsed, setCurrentTimeElapsed] = useState(0);
  const [hintText, setHintText] = useState(null);
  const [isGeneratingHint, setIsGeneratingHint] = useState(false);

  // Filter & Sort States
  const [filterStatus, setFilterStatus] = useState('All'); 
  const [filterDiff, setFilterDiff] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    setQuestions(getQuestionsForChapter(chapterId, displayTitle));
  }, [chapterId, displayTitle]);

  useEffect(() => {
    localStorage.setItem(storageKey + '-ans', JSON.stringify(answers));
    localStorage.setItem(storageKey + '-chk', JSON.stringify(checkedStates));
    localStorage.setItem(storageKey + '-time', JSON.stringify(timeTaken));
  }, [answers, checkedStates, timeTaken, storageKey]);

  useEffect(() => {
    let interval;
    if (isStarted && isTimerEnabled && !checkedStates[currentIndex]) {
      interval = setInterval(() => setCurrentTimeElapsed(p => p + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isTimerEnabled, checkedStates, currentIndex]);

  useEffect(() => {
    setCurrentTimeElapsed(0);
    setHintText(null);
  }, [currentIndex]);

  const totalQs = questions.length;
  const topicsCount = chapterDetails?.topics?.length || 2;

  // --- FILTER & SORT LOGIC ---
  let filteredQuestions = questions.map((q, idx) => ({ ...q, originalIndex: idx })).filter((q) => {
    const isDone = checkedStates[q.originalIndex];
    const isCorrect = isDone && answers[q.originalIndex] === q.correctIndex;
    
    if (filterStatus === 'Attempted' && !isDone) return false;
    if (filterStatus === 'Unattempted' && isDone) return false;
    if (filterStatus === 'Incorrect' && (!isDone || isCorrect)) return false;
    
    if (filterDiff !== 'All' && q.difficulty !== filterDiff) return false;
    if (filterYear !== 'All' && q.year !== filterYear) return false;
    
    return true;
  });

  if (sortOrder === 'Newest') {
    filteredQuestions.sort((a, b) => parseInt(b.year || '0') - parseInt(a.year || '0'));
  } else {
    filteredQuestions.sort((a, b) => parseInt(a.year || '0') - parseInt(b.year || '0'));
  }

  // --- NAVIGATION ---
  const handleTabChange = (tab) => setSearchParams({ tab });
  const openQuestion = (idx) => setSearchParams({ tab: activeTab, q: idx });
  const closeQuestion = () => setSearchParams({ tab: activeTab });

  const handleBackNavigation = () => {
    if (isStarted) closeQuestion(); // Inside a question -> Back to list
    else if (activeTab !== 'overview') handleTabChange('overview'); // Inside a tab -> Back to overview
    else navigate('/previous-questions'); // At overview -> Back to main PYQ page
  };

  const handleReattempt = () => {
    setAnswers(prev => { const next = {...prev}; delete next[currentIndex]; return next; });
    setCheckedStates(prev => { const next = {...prev}; delete next[currentIndex]; return next; });
    setTimeTaken(prev => { const next = {...prev}; delete next[currentIndex]; return next; });
    setCurrentTimeElapsed(0);
  };

  const generateHint = async (questionText) => {
    if (!genAI) { setHintText("API Key missing."); return; }
    setIsGeneratingHint(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Provide ONE short, strategic hint to help start this problem. DO NOT give the answer. Under 3 sentences: "${questionText}"`;
      const result = await model.generateContent(prompt);
      setHintText(result.response.text());
    } catch (error) { setHintText("Failed to generate hint."); }
    setIsGeneratingHint(false);
  };

  // --- VIEW 1: INTERACTIVE QUIZ MODE ---
  if (isStarted) {
    const currentQ = questions[currentIndex];
    const isChecked = checkedStates[currentIndex] || false;
    
    const handleSelectOption = (idx) => {
      if (isChecked) return;
      setAnswers(prev => ({ ...prev, [currentIndex]: idx }));
    };

    const handleCheckAnswer = () => {
      if (answers[currentIndex] !== undefined) {
        setCheckedStates(prev => ({ ...prev, [currentIndex]: true }));
        setTimeTaken(prev => ({ ...prev, [currentIndex]: currentTimeElapsed }));
      }
    };

    return (
      <div className="h-screen w-full bg-[#0b1121] text-gray-100 flex flex-col font-sans relative">
        <nav className="flex items-center justify-between px-8 py-4 bg-[#111827] border-b border-white/5 shadow-md z-10">
          <div className="flex items-center gap-4">
            <button onClick={handleBackNavigation} className="text-white/50 hover:text-white transition-colors"><IconBack /></button>
            <div className="text-lg font-medium hidden md:block">{displayTitle} - Practice</div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-[#1f2937] px-4 py-1.5 rounded-full border border-white/5">
              <button onClick={() => setIsTimerEnabled(!isTimerEnabled)} className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isTimerEnabled ? 'text-sky-400' : 'text-white/30'}`}>
                <IconClock /> {isTimerEnabled ? 'Timer On' : 'Timer Off'}
              </button>
              {isTimerEnabled && <span className="font-mono text-white/90 w-12 text-right">{isChecked ? formatTime(timeTaken[currentIndex] || 0) : formatTime(currentTimeElapsed)}</span>}
            </div>
            <div className="text-sm font-medium text-sky-400 border-l border-white/10 pl-6">Question {currentIndex + 1} of {totalQs}</div>
          </div>
        </nav>
        
        <main className="flex-1 max-w-3xl mx-auto w-full py-8 px-6 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2.5 py-1 rounded text-xs font-bold ${currentQ?.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400' : currentQ?.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              {currentQ?.difficulty || 'Medium'}
            </span>
            <span className="bg-white/5 border border-white/10 text-white/60 text-xs px-2.5 py-1 rounded font-medium">{currentQ?.year || '2023'}</span>
          </div>

          <div className="p-8 rounded-2xl bg-[#1f2937]/50 border border-white/5 mb-6">
            <h3 className="text-lg font-medium text-white/90 leading-relaxed">{currentQ?.text}</h3>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            {currentQ?.options.map((opt, idx) => {
              const isSelected = answers[currentIndex] === idx;
              const isCorrect = currentQ.correctIndex === idx;
              let btnStyle = "bg-[#1f2937]/30 border-white/5 hover:bg-[#1f2937]";
              if (isChecked) {
                if (isCorrect) btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-100";
                else if (isSelected && !isCorrect) btnStyle = "bg-rose-500/20 border-rose-500/50 text-rose-100";
                else btnStyle = "opacity-40 bg-[#1f2937]/30 border-white/5";
              } else if (isSelected) {
                btnStyle = "bg-sky-500/20 border-sky-500/50 text-sky-100";
              }
              return (
                <button key={idx} onClick={() => handleSelectOption(idx)} disabled={isChecked} className={`p-4 rounded-xl border text-left transition-all ${btnStyle}`}>
                  <span className="inline-block w-8 opacity-50 font-mono">{['A','B','C','D'][idx]}.</span> {opt}
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
                  <div className="font-bold text-yellow-400 mb-2 flex items-center gap-2"><IconLightbulb /> AI Hint</div>{hintText}
                </div>
              )}
            </div>
          )}
          
          {isChecked && (
            <div className="mb-8 p-6 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-100/90 text-sm leading-relaxed animate-fade-in-up">
              <div className="flex items-center gap-2 font-bold text-sky-400 mb-2">Solution Explanation</div>
              {currentQ?.explanation}
            </div>
          )}

          <div className="mt-auto flex justify-between items-center border-t border-white/5 pt-6 pb-6">
            <button onClick={() => openQuestion(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className="px-6 py-2.5 rounded-xl bg-[#1f2937] hover:bg-white/10 disabled:opacity-30 font-medium transition-colors">Previous</button>
            
            <div className="flex items-center gap-4">
              {isChecked && (
                <button onClick={handleReattempt} className="px-5 py-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 flex items-center gap-2 font-medium transition-colors">
                  <IconRefresh /> Reattempt
                </button>
              )}

              {!isChecked ? (
                <button onClick={handleCheckAnswer} disabled={answers[currentIndex] === undefined} className="px-8 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 disabled:opacity-30 font-bold transition-colors">Check Answer</button>
              ) : (
                <button onClick={() => { if (currentIndex < totalQs - 1) openQuestion(currentIndex + 1); else closeQuestion(); }} className="px-8 py-2.5 rounded-xl bg-sky-500 text-black font-bold hover:bg-sky-400 transition-colors">
                  {currentIndex === totalQs - 1 ? "Finish" : "Next Question"}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- RENDER DASHBOARD TABS ---
  const renderOverview = () => (
    <div className="max-w-[1000px] mx-auto p-8 pt-12 animate-fade-in-up">
      <div className="text-center mb-10"><h2 className="text-2xl font-bold text-white mb-2">Overview</h2></div>
      <div className="bg-[#131b2c] border border-[#1e293b] rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div><h3 className="text-white font-bold text-sm mb-1">Your Progress</h3></div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><IconCheck /></div>
            <div><div className="text-white text-sm font-bold">{Object.keys(checkedStates).length}/{totalQs}</div><div className="text-[10px] text-white/40">PYQ Solved</div></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-8">
        <div onClick={() => handleTabChange('all')} className="group bg-[#131b2c] border border-[#1e293b] hover:border-sky-500/30 rounded-2xl p-6 cursor-pointer transition-all relative overflow-hidden">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors flex items-center gap-2">All Previous Year Qs <span className="text-lg">→</span></h3>
          <p className="text-xs text-white/40">{totalQs} PYQs</p>
          <div className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400"><IconHistory /></div>
        </div>
        <div onClick={() => handleTabChange('topic')} className="group bg-[#111c2e] border border-sky-500/20 hover:border-sky-500/40 rounded-2xl p-6 cursor-pointer transition-all relative overflow-hidden">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors flex items-center gap-2">Topic-Wise PYQs <span className="text-lg">→</span></h3>
          <p className="text-xs text-white/40">{topicsCount} Topics</p>
          <div className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400"><IconList /></div>
        </div>
      </div>
    </div>
  );

  const renderAllPYQs = () => (
    <div className="max-w-[1000px] mx-auto p-8 pt-8 relative min-h-full pb-24 animate-fade-in-up">
      <div className="w-full bg-[#131b2c] py-4 rounded-t-2xl text-center font-bold text-white mb-6 border border-[#1e293b]">All PYQs</div>
      
      {/* Interactive Filter/Sort Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 relative">
        <div className="relative">
          <button onClick={() => { setShowFilterMenu(!showFilterMenu); setShowSortMenu(false); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${showFilterMenu ? 'bg-sky-500/20 border-sky-500/50 text-sky-400' : 'border-[#1e293b] text-white/90 hover:bg-[#1e293b]'}`}><IconFilter /> Filter</button>
          {showFilterMenu && (
            <div className="absolute top-full mt-2 left-0 bg-[#1e293b] border border-white/10 rounded-xl p-4 shadow-xl z-50 w-64 flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Status</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full bg-[#0b1121] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                  <option>All</option><option>Attempted</option><option>Unattempted</option><option>Incorrect</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Difficulty</label>
                <select value={filterDiff} onChange={(e) => setFilterDiff(e.target.value)} className="w-full bg-[#0b1121] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                  <option>All</option><option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Year</label>
                <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="w-full bg-[#0b1121] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none">
                  <option>All</option><option>2024</option><option>2023</option><option>2022</option><option>2021</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => { setShowSortMenu(!showSortMenu); setShowFilterMenu(false); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${showSortMenu ? 'bg-sky-500/20 border-sky-500/50 text-sky-400' : 'border-[#1e293b] text-white/90 hover:bg-[#1e293b]'}`}><IconSort /> Sort</button>
          {showSortMenu && (
            <div className="absolute top-full mt-2 left-0 bg-[#1e293b] border border-white/10 rounded-xl p-2 shadow-xl z-50 w-40 flex flex-col">
              <button onClick={() => { setSortOrder('Newest'); setShowSortMenu(false); }} className={`px-3 py-2 text-sm text-left rounded-lg transition-colors ${sortOrder === 'Newest' ? 'bg-sky-500/20 text-sky-400' : 'text-white hover:bg-white/5'}`}>Year: Newest</button>
              <button onClick={() => { setSortOrder('Oldest'); setShowSortMenu(false); }} className={`px-3 py-2 text-sm text-left rounded-lg transition-colors ${sortOrder === 'Oldest' ? 'bg-sky-500/20 text-sky-400' : 'text-white hover:bg-white/5'}`}>Year: Oldest</button>
            </div>
          )}
        </div>

        {(filterStatus !== 'All' || filterDiff !== 'All' || filterYear !== 'All') && (
          <button onClick={() => { setFilterStatus('All'); setFilterDiff('All'); setFilterYear('All'); }} className="text-xs text-sky-400 hover:text-sky-300 ml-2">Clear Filters</button>
        )}
      </div>

      <div className="text-sm text-white/60 font-medium mb-4">Showing {filteredQuestions.length} Qs</div>

      <div className="flex flex-col border border-[#1e293b] rounded-2xl overflow-hidden bg-[#131b2c]/30">
        {filteredQuestions.length === 0 ? (
          <div className="p-10 text-center text-white/40">No questions match your current filters.</div>
        ) : (
          filteredQuestions.map((q) => {
            const isDone = checkedStates[q.originalIndex];
            const isCorrect = isDone && answers[q.originalIndex] === q.correctIndex;

            return (
              <div key={q.id} onClick={() => openQuestion(q.originalIndex)} className="flex gap-4 p-6 hover:bg-white/[0.03] cursor-pointer transition-colors border-b border-[#1e293b]/60 relative">
                <div className="absolute top-6 right-6 flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${q.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400' : q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-emerald-500/10 text-emerald-400'}`}>{q.difficulty || 'Medium'}</span>
                  <span className="bg-white/5 border border-white/10 text-white/50 text-[10px] px-2 py-0.5 rounded font-medium">{q.year || '2023'}</span>
                  {isDone ? (isCorrect ? <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded ml-2">CORRECT</span> : <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded ml-2">INCORRECT</span>) : <span className="text-[10px] font-bold text-white/20 border border-white/10 px-2 py-0.5 rounded ml-2">UNATTEMPTED</span>}
                </div>
                <div className="text-white/80 font-bold text-sm mt-0.5 shrink-0 w-6">{q.originalIndex + 1}</div>
                <div className="flex-1 pr-40">
                  <div className="text-white/90 text-sm leading-relaxed mb-4">{q.text}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className={`text-sm bg-[#0f1523] px-3 py-2 rounded-lg border truncate ${isDone && q.correctIndex === oIdx ? 'border-emerald-500/50 text-emerald-300' : isDone && answers[q.originalIndex] === oIdx ? 'border-rose-500/50 text-rose-300' : 'border-[#1e293b]/50 text-white/70'}`}>
                        <span className="opacity-50 mr-2">{['A','B','C','D'][oIdx]}.</span> {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );

  const renderTopicWise = () => (
    <div className="max-w-[1000px] mx-auto p-8 pt-8 animate-fade-in-up">
      <div className="w-full bg-[#131b2c] py-4 rounded-t-2xl text-center font-bold text-white mb-6 border border-[#1e293b]">Topic-wise PYQs</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapterDetails?.topics?.map((topic, i) => (
          <div key={i} onClick={() => handleTabChange('all')} className="bg-[#131b2c]/50 border border-[#1e293b] p-6 rounded-2xl hover:border-sky-500/30 hover:bg-[#131b2c] transition-colors cursor-pointer group">
            <div className="text-sky-400 text-[10px] font-bold tracking-widest uppercase mb-2">Topic {i+1}</div>
            <h3 className="text-white/90 font-medium mb-3 group-hover:text-white line-clamp-2 leading-snug">{topic.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex bg-[#0f1523] text-gray-300 font-sans selection:bg-sky-500/30 overflow-hidden">
      <aside className="w-72 bg-[#131b2c] border-r border-[#1e293b] flex flex-col shrink-0 z-20 shadow-xl">
        <div className="p-6">
          <button onClick={handleBackNavigation} className="text-white/50 hover:text-white mb-6"><IconBack /></button>
          <div className="flex items-start gap-3 mb-1">
            <div className="p-1.5 bg-emerald-500/10 rounded mt-1"><IconList className="w-4 h-4 text-emerald-400" /></div>
            <h1 className="text-xl font-bold text-white leading-tight">{displayTitle}</h1>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {[{ id: 'overview', label: 'Overview', icon: <IconOverview /> }, { id: 'all', label: 'All PYQs', icon: <IconHistory /> }, { id: 'topic', label: 'Topic-wise PYQs', icon: <IconList /> }].map(item => (
            <button key={item.id} onClick={() => handleTabChange(item.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? 'bg-white text-black shadow-md scale-[1.02]' : 'text-white/70 hover:bg-[#1e293b] hover:text-white'}`}>
              <div className="flex items-center gap-3">{item.icon}{item.label}</div>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10" onClick={() => {if (showFilterMenu) setShowFilterMenu(false); if(showSortMenu) setShowSortMenu(false);}}>
        <div onClick={(e) => e.stopPropagation()}>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'all' && renderAllPYQs()}
          {activeTab === 'topic' && renderTopicWise()}
        </div>
      </main>
    </div>
  );
};