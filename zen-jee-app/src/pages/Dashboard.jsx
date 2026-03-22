import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Motivational Quotes Array ---
const zenQuotes = [
  "Focus your energy. Success will follow.",
  "Small daily improvements yield staggering results.",
  "Discipline is choosing what you want most.",
  "The expert in anything was once a beginner.",
  "Push yourself, no one else will do it for you.",
  "Don't stop when you're tired. Stop when you're done.",
  "Doubt kills more dreams than failure ever will.",
  "Consistency is what transforms average into excellence.",
  "Master your mindset, master your score.",
  "Embrace the struggle. It's building your strength."
];

// --- Amateur Doodle Icons ---
const ThinnerStroke = "1";

const PhysicsDoodle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ThinnerStroke} strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-2 text-sky-300 opacity-90">
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" strokeDasharray="1 1.5"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const ChemistryDoodle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ThinnerStroke} strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-2 text-emerald-300 opacity-90">
    <path d="M9 3v7a2 2 0 010 4l-4 8h14l-4-8a2 2 0 010-4V3m-4 0h6m-4 15h1m1 0h1" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

const MathDoodle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ThinnerStroke} strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-2 text-orange-200 opacity-90">
    <rect x="5" y="6" width="14" height="14" rx="2" strokeDasharray="3 3"/>
    <path d="M12 9v6M9 12h6" />
    <path d="M16 16l-3 3" />
    <circle cx="9" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

const PyqDoodle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ThinnerStroke} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-2 text-yellow-200/70 opacity-80">
    <path d="M11 15h.01m-2.58-1.5a4 4 0 115.15 0c-1 .8-2.5 1.5-2.5 2.5V17" />
  </svg>
);

const PypDoodle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ThinnerStroke} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-2 text-stone-300 opacity-80">
    <path d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2v-10l-4-4h-8a2 2 0 00-2 2z" />
    <path d="M13 3v5h5M10 13h4M10 17h2" />
  </svg>
);

const AiDoodle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ThinnerStroke} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-2 text-purple-300/70 opacity-80">
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M9 14h.01M15 14h.01M10 18h4M8 8V5l2-1h4l2 1v3" />
  </svg>
);

// --- Dynamic Glass Style ---
const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1); 
const physicsGlass = getGlassStyle(56, 189, 248, 0.06, 0.15); 
const chemGlass = getGlassStyle(52, 211, 153, 0.06, 0.15);    
const mathGlass = getGlassStyle(251, 146, 60, 0.06, 0.15);    
const glassHover = "hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group";

export default function Dashboard() {
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');
  
  // Controls the visibility of the Profile + Calendar dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Dynamic Quote State
  const [currentQuote, setCurrentQuote] = useState("");

  // Sync state with localStorage for global persistence across pages
  const [selectedClass, setSelectedClass] = useState(() => localStorage.getItem('zenjee-class') || 'class12');
  const [targetExam, setTargetExam] = useState(() => localStorage.getItem('zenjee-exam') || 'mains');

  useEffect(() => {
    localStorage.setItem('zenjee-class', selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    localStorage.setItem('zenjee-exam', targetExam);
  }, [targetExam]);

  // Set a random quote on component mount (refresh)
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * zenQuotes.length);
    setCurrentQuote(zenQuotes[randomIndex]);
  }, []);

  const handleChatSubmit = (e) => {
    if (e.key === 'Enter' && chatInput.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(chatInput)}`);
    }
  };

  const getDisplayClass = () => selectedClass === 'class11' ? 'Class 11' : 'Class 12';

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased">
      
      {/* 1. NAVBAR */}
      <nav style={defaultGlass} className="flex items-center justify-between px-10 py-4 shrink-0 rounded-b-3xl mx-3 z-50 relative">
        
        {/* LEFT SIDE: Logo & My Study Space Button */}
        <div className="flex items-center gap-8">
          <div className="text-3xl font-semibold tracking-wider text-white">
            Zen<span className="text-sky-300 font-extralight">JEE</span>
          </div>

          <button 
            onClick={() => navigate('/planner')} 
            className="hidden md:flex group relative px-5 py-2 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 transition-all duration-300 border border-indigo-500/30 text-sm tracking-wide text-indigo-100 shadow-[0_0_15px_rgba(99,102,241,0.15)] overflow-hidden items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/10 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <svg className="w-4 h-4 text-indigo-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="relative z-10 font-medium tracking-wide">My Study Space</span>
          </button>
        </div>

        {/* RIGHT SIDE: Streak & Profile */}
        <div className="flex items-center gap-6 relative">
          <span className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-200 px-4 py-1.5 rounded-full border border-orange-500/30">
            🔥 12 Days
          </span>

          {/* PROFILE TOGGLE BUTTON */}
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 p-1.5 pr-4 rounded-full border transition-all duration-300 ${isProfileOpen ? 'bg-white/10 border-white/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'}`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 p-[2px]">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-lg">👨‍🎓</div>
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm font-medium text-white/90">Nahin</div>
              <div className="text-[10px] text-white/50">{getDisplayClass()}</div>
            </div>
            <svg className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* HIDDEN DROPDOWN (Profile + Toggles + Calendar) */}
          {isProfileOpen && (
            <div 
              style={{...defaultGlass, background: 'rgba(0, 10, 36, 0.95)'}} 
              className="absolute top-[calc(100%+12px)] right-0 w-[360px] p-6 rounded-3xl shadow-2xl border border-white/10 z-50 animate-fade-in-up"
            >
              <div className="space-y-6">
                {/* Profile Details with External Link Button */}
                <div className="border-b border-white/10 pb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium text-white tracking-wide">Nahin</h3>
                    <p className="text-xs text-white/40 mt-1">nahin@nitrr.edu.in</p>
                  </div>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="p-2 bg-sky-500/10 hover:bg-sky-500/20 rounded-full transition-colors border border-sky-500/20 group"
                    title="View Full Profile"
                  >
                    <svg className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>

                {/* Class & Exam Toggles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Target Exam</span>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => setTargetExam('mains')} className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${targetExam === 'mains' ? 'bg-indigo-500/40 text-white border border-indigo-500/50' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-transparent'}`}>MAINS</button>
                      <button onClick={() => setTargetExam('advanced')} className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${targetExam === 'advanced' ? 'bg-indigo-500/40 text-white border border-indigo-500/50' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-transparent'}`}>ADVANCED</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Class</span>
                    <div className="flex flex-col gap-1">
                      <button onClick={() => setSelectedClass('class11')} className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${selectedClass === 'class11' ? 'bg-sky-500/40 text-white border border-sky-500/50' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-transparent'}`}>CLASS 11</button>
                      <button onClick={() => setSelectedClass('class12')} className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${selectedClass === 'class12' ? 'bg-sky-500/40 text-white border border-sky-500/50' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-transparent'}`}>CLASS 12</button>
                    </div>
                  </div>
                </div>

                {/* Integrated Calendar */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-4 text-center">Upcoming Exams Calendar</h4>
                  
                  <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-white/30 mb-2 font-medium">
                    {['S','M','T','W','T','F','S'].map(d => <div key={d}>{d}</div>)}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                    {/* Dummy padding days for formatting */}
                    <div className="py-2 text-white/5"></div><div className="py-2 text-white/5"></div>
                    
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      const isToday = day === 22; // Example "Today"
                      const isMains = day === 28; 
                      const isAdv = day === 30;
                      
                      let styles = "py-1.5 rounded-md hover:bg-white/10 cursor-pointer transition-colors text-white/50";
                      
                      if (isToday) styles = "py-1.5 rounded-md bg-sky-500/30 text-sky-200 font-bold border border-sky-500/30";
                      if (isMains) styles = "py-1.5 rounded-md bg-red-500/30 text-red-200 font-bold border border-red-500/30";
                      if (isAdv) styles = "py-1.5 rounded-md bg-orange-500/30 text-orange-200 font-bold border border-orange-500/30";

                      return (
                        <div key={day} className={styles} title={isMains ? "JEE Mains" : isAdv ? "JEE Advanced" : ""}>
                          {day}
                        </div>
                      );
                    })}
                  </div>

                  {/* Calendar Key */}
                  <div className="flex gap-3 mt-4 pt-3 border-t border-white/5 text-[9px] font-medium text-white/40 justify-center uppercase tracking-wider">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-sky-500/40 rounded-sm"></div> Today</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500/40 rounded-sm"></div> Mains</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-orange-500/40 rounded-sm"></div> Adv</div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </nav>

      {/* CLICK-OUTSIDE OVERLAY (Closes dropdown when clicking elsewhere) */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
      )}

      {/* 2. MAIN DASHBOARD AREA */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 flex flex-col justify-center gap-10 relative z-10 pb-12">
        
        {/* DYNAMIC QUOTE */}
        <div className="text-center animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-light text-sky-50 mb-3 tracking-wide transition-opacity duration-500 ease-in-out">
            {currentQuote}
          </h1>
          <p className="text-sky-200/50 text-base font-medium">What are we mastering today?</p>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full max-w-3xl mx-auto relative group">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleChatSubmit}
            placeholder="Search a concept, or ask 'How do I solve...'"
            style={defaultGlass}
            className="w-full px-8 py-5 rounded-full text-lg outline-none focus:border-sky-400/50 transition-all duration-300 placeholder-white/20 text-white shadow-2xl hover:bg-white/5"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 text-sm font-mono pointer-events-none">
            ↵ Enter
          </div>
        </div>

        {/* SUBJECT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div style={physicsGlass} onClick={() => navigate('/subject/physics')} className={`rounded-[2rem] p-8 flex flex-col items-center justify-center cursor-pointer shadow-lg ${glassHover} hover:border-sky-500/50`}>
            <div className="absolute top-5 right-5 text-[10px] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-sky-200 border border-white/5">{getDisplayClass()}</div>
            <PhysicsDoodle />
            <h2 className="text-xl font-medium tracking-wide text-sky-100 mt-2">Physics</h2>
          </div>
          
          <div style={chemGlass} onClick={() => navigate('/subject/chemistry')} className={`rounded-[2rem] p-8 flex flex-col items-center justify-center cursor-pointer shadow-lg ${glassHover} hover:border-emerald-500/50`}>
            <div className="absolute top-5 right-5 text-[10px] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-emerald-200 border border-white/5">{getDisplayClass()}</div>
            <ChemistryDoodle />
            <h2 className="text-xl font-medium tracking-wide text-emerald-100 mt-2">Chemistry</h2>
          </div>
          
          <div style={mathGlass} onClick={() => navigate('/subject/mathematics')} className={`rounded-[2rem] p-8 flex flex-col items-center justify-center cursor-pointer shadow-lg ${glassHover} hover:border-orange-500/50`}>
            <div className="absolute top-5 right-5 text-[10px] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-orange-200 border border-white/5">{getDisplayClass()}</div>
            <MathDoodle />
            <h2 className="text-xl font-medium tracking-wide text-orange-100 mt-2">Mathematics</h2>
          </div>
        </div>

        {/* 4. PRACTICE RESOURCES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full shrink-0">
        <div 
          onClick={() => navigate('/previous-questions')} 
          style={defaultGlass} 
          className={`rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer shadow-md ${glassHover}`}
        >
          <PyqDoodle />
          <h3 className="text-sm text-stone-200 font-medium">Previous Questions</h3>
        </div>
          
          <div style={defaultGlass} className={`rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer shadow-md ${glassHover}`}>
            <PypDoodle />
            <h3 className="text-sm text-stone-200 font-medium">Previous Papers</h3>
          </div>
          <div style={defaultGlass} className={`rounded-[1.5rem] p-5 flex flex-col items-center justify-center cursor-pointer shadow-md ${glassHover}`}>
            <AiDoodle />
            <h3 className="text-sm text-stone-200 font-medium">Custom AI Paper</h3>
          </div>
        </div>

      </main>
    </div>
  );
}