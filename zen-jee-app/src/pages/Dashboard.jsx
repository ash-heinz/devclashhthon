import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// --- Amateur Doodle Icons (Thin strokes, delicate styling) ---
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

// --- Dynamic Glass CSS Generator ---
const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1); // Slightly more opaque for the top bar
const physicsGlass = getGlassStyle(56, 189, 248, 0.06, 0.15); 
const chemGlass = getGlassStyle(52, 211, 153, 0.06, 0.15);    
const mathGlass = getGlassStyle(251, 146, 60, 0.06, 0.15);    

const glassHover = "hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl";

// --- Main Application Component ---
export default function Dashboard() {
  const [chatInput, setChatInput] = useState('');
  const navigate = useNavigate(); // 3. INITIALIZE NAVIGATE

  const handleChatSubmit = (e) => {
    if (e.key === 'Enter' && chatInput.trim() !== '') {
      // 4. USE NAVIGATE INSTEAD OF CONSOLE.LOG
      navigate(`/search?q=${encodeURIComponent(chatInput)}`);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased selection:bg-sky-500/30">
      
      {/* 1. UPGRADED TOP BAR */}
      <nav 
        style={defaultGlass} 
        className="flex items-center justify-between px-10 py-5 shrink-0 rounded-b-3xl mx-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-50 relative"
      >
        {/* Logo area */}
        <div className="text-3xl font-semibold tracking-wider text-white flex items-center gap-2">
          Zen<span className="text-sky-300 font-extralight">JEE</span>
        </div>
        
        {/* Improved Middle Button */}
        <button className="group relative px-8 py-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-sky-400/30 text-base tracking-wide text-sky-50 shadow-lg overflow-hidden flex items-center gap-2">
          {/* Subtle gradient glow inside button on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-sky-400/10 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Simple icon added to button */}
          <svg className="w-4 h-4 text-sky-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="relative z-10">My Study Space</span>
        </button>

        {/* Upgraded User Info */}
        <div className="flex items-center gap-5 text-base">
          <span className="font-medium text-white/90">Ashwast</span>
          
          {/* Streak Pill - Added gradient background and subtle glow */}
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-200 px-4 py-1.5 rounded-full border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <span className="text-lg leading-none">🔥</span> 
            <span className="font-medium">12 Days</span>
          </span>
          
          {/* Class Pill */}
          <span className="bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-sm text-sky-50 font-medium">
            Class 12
          </span>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 flex flex-col justify-center gap-8 pb-4 mt-2">
        
        {/* ZEN GREETING */}
        <div className="text-center opacity-90 shrink-0">
          <h1 className="text-3xl font-light mb-1 text-sky-50 leading-snug">Focus your energy. <br/> Success will follow.</h1>
          <p className="text-sky-200/60 font-medium text-sm">What is your focus for the next 2 hours?</p>
        </div>

        {/* 2. CHAT BAR */}
        <div className="w-full max-w-2xl mx-auto relative group shrink-0">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleChatSubmit}
            placeholder="Search a concept, or ask 'How do I solve...'"
            style={defaultGlass}
            className="w-full px-6 py-4 rounded-full text-base outline-none focus:border-sky-400/50 transition-all duration-300 placeholder-white/20 text-white shadow-xl hover:bg-white/5"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 text-xs font-mono pointer-events-none">
            ↵ Enter
          </div>
        </div>

        {/* 3. CORE SUBJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full shrink-0">
          <div style={physicsGlass} onClick={() => navigate('/subject/physics')} className={`rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-lg ${glassHover} hover:border-sky-500/50`}>
            <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1)_0%,_rgba(0,0,0,0)_70%)]"></div>
            <div className="relative z-10 flex flex-col items-center">
              <PhysicsDoodle />
              <h2 className="text-lg font-medium tracking-wide text-sky-100">Physics</h2>
            </div>
          </div>
          
          <div style={chemGlass} onClick={() => navigate('/subject/chemistry')} className={`rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-lg ${glassHover} hover:border-emerald-500/50`}>
            <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(52,211,153,0.1)_0%,_rgba(0,0,0,0)_70%)]"></div>
            <div className="relative z-10 flex flex-col items-center">
              <ChemistryDoodle />
              <h2 className="text-lg font-medium tracking-wide text-emerald-100">Chemistry</h2>
            </div>
          </div>
          
          <div style={mathGlass} onClick={() => navigate('/subject/mathematics')} className={`rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-lg ${glassHover} hover:border-orange-500/50`}>
            <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(251,146,60,0.1)_0%,_rgba(0,0,0,0)_70%)]"></div>
            <div className="relative z-10 flex flex-col items-center">
              <MathDoodle />
              <h2 className="text-lg font-medium tracking-wide text-orange-100">Mathematics</h2>
            </div>
          </div>
        </div>

        {/* 4. PRACTICE RESOURCES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full shrink-0">
          <div style={defaultGlass} className={`rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer shadow-md ${glassHover}`}>
            <PyqDoodle />
            <h3 className="text-sm text-stone-200 font-medium">Previous Questions</h3>
          </div>
          
          <div style={defaultGlass} className={`rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer shadow-md ${glassHover}`}>
            <PypDoodle />
            <h3 className="text-sm text-stone-200 font-medium">Previous Papers</h3>
          </div>
          
          <div style={defaultGlass} className={`rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer shadow-md ${glassHover}`}>
            <AiDoodle />
            <h3 className="text-sm text-stone-200 font-medium">Custom AI Paper</h3>
          </div>
        </div>

      </main>
    </div>
  );
}