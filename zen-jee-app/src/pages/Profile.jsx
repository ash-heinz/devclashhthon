import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

// Progress bar node icons
const ProgressNodes = ['📈', '🚶', '🏃', '🚀', '🏁'];

export default function Profile() {
  const navigate = useNavigate();
  const [targetExam, setTargetExam] = useState('Mains');
  const [selectedClass, setSelectedClass] = useState('Class 12');

  // Read saved state to keep data dynamic
  useEffect(() => {
    const savedExam = localStorage.getItem('zenjee-exam') || 'mains';
    setTargetExam(savedExam.charAt(0).toUpperCase() + savedExam.slice(1));
    
    const savedClass = localStorage.getItem('zenjee-class') || 'class12';
    setSelectedClass(savedClass === 'class11' ? 'Class 11' : 'Class 12');
  }, []);

  // Shared styling for the cards to match the design perfectly
  const cardStyle = "bg-[#1C202B] border border-white/5 rounded-[1rem] p-5 shadow-sm";

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#141720] text-gray-100 font-sans antialiased px-8 py-8 md:px-12 lg:px-24">
      
      {/* Top Bar / Back Button */}
      <button 
        onClick={() => navigate('/')} 
        className="p-2 mb-6 hover:bg-white/5 rounded-full w-fit transition-colors text-white/80"
        title="Go Back"
      >
        <BackArrow />
      </button>

      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        {/* User Info Section */}
        <div className="flex items-center gap-6 px-2">
          {/* Mockup Avatar matching the purple monster */}
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

        {/* My Exams Box */}
        <div className={cardStyle}>
          <div className="flex items-start gap-4">
            <div className="mt-0.5">
              <CalendarIcon />
            </div>
            <div>
              <div className="text-sm text-white/70 font-medium mb-1 tracking-wide">My Exams</div>
              <div className="text-[1.15rem] font-bold text-white/90">JEE {targetExam}</div>
            </div>
          </div>
        </div>

        {/* My Learning Activity Box */}
        <div>
          <h2 className="text-[1.1rem] font-bold text-white/90 mb-4 px-1">My Learning Activity</h2>
          <div className={`${cardStyle} py-8`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
              <div className="text-[0.95rem] font-bold text-white/90 whitespace-nowrap">
                Your Daily Goal (0/25 Qs)
              </div>
              
              {/* Progress Bar Container */}
              <div className="relative w-full flex items-center justify-between px-2 h-10">
                {/* Background Track Line */}
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[3px] bg-[#2A2E3B] rounded-full z-0"></div>
                
                {/* Nodes on Track */}
                {ProgressNodes.map((icon, i) => (
                  <div key={i} className="relative z-10 w-7 h-7 rounded-full bg-[#2A2E3B] flex items-center justify-center text-xs text-white/40 grayscale opacity-60">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* My Weekly Activity Box */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-1 gap-2">
            <h2 className="text-[1.1rem] font-bold text-white/90">My Weekly Activity</h2>
            <div className="text-[0.8rem] text-blue-400 font-medium">
              From 22nd Mar 26 - 22nd Mar 26
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className={`${cardStyle} flex items-center gap-4`}>
              <QIcon />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white/90">0</span>
                <span className="text-[0.85rem] text-white/60">Question solved</span>
              </div>
            </div>

            <div className={`${cardStyle} flex items-center gap-4`}>
              <CorrectIcon />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white/90">0</span>
                <span className="text-[0.85rem] text-white/60">Correct Questions</span>
              </div>
            </div>

            <div className={`${cardStyle} flex items-center gap-4`}>
              <AccuracyIcon />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white/90">0%</span>
                <span className="text-[0.85rem] text-white/60">Accuracy</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}