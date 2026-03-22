import React, { useState, useRef, useEffect } from 'react';

// Custom SVG Bell to match your doodle aesthetic
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/80">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const NtaNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Latest news extracted from NTA JEE Main website
  const newsItems = [
    "Advance Intimation for Allotment of Examination City to the Applicants of Joint Entrance Examination (Main) – 2026 Session 2 – Reg.",
    "Re-opening of Online Application Portal-Joint Entrance Examination (Main) 2026 Session-2- reg.",
    "Declaration of Joint Entrance Examination [JEE (Main) – 2026] Session 1 NTA Scores for Paper 2 (B. Arch and B. Planning) – reg.",
    "Final Answer Keys for JEE(Main) – 2026 [Session-1] [Paper-II (B.Arch / B.Planning)]"
  ];

  // Close dropdown when clicking anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ZenJEE Glass Effect
  const glassStyle = {
    background: 'rgba(0, 10, 36, 0.95)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 transition-all duration-300 hover:bg-white/10 rounded-full focus:outline-none"
        title="NTA Updates"
      >
        <BellIcon />
        {/* Red Dot Indicator with glowing effect */}
        <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#000a24] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={glassStyle} className="absolute right-0 mt-5 w-80 sm:w-96 origin-top-right rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
          <div className="bg-white/5 p-5 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white tracking-wide">NTA Updates & News</h3>
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
              {newsItems.length} New
            </span>
          </div>
          
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {newsItems.map((item, index) => (
              <a
                key={index}
                href="https://jeemain.nta.nic.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-5 py-4 text-sm text-white/60 hover:text-white hover:bg-white/5 border-b border-white/5 last:border-none transition-colors group"
              >
                <div className="flex items-start">
                  <span className="w-1.5 h-1.5 mt-1.5 mr-3 rounded-full bg-sky-400 flex-shrink-0 group-hover:scale-125 transition-transform shadow-[0_0_5px_rgba(56,189,248,0.8)]"></span>
                  <span className="leading-snug line-clamp-3">{item}</span>
                </div>
              </a>
            ))}
          </div>
          
          <div className="p-3 border-t border-white/10 bg-white/5 text-center">
             <a href="https://jeemain.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-wider uppercase text-sky-400 hover:text-sky-300 transition-colors">
               View official site ↗
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NtaNotifications;