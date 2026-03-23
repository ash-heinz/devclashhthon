import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData';
import { getQuestionsForChapter } from '../data/questionsData';

// Glassmorphism helper
const getGlassStyle = (r, g, b, alphaBg = 0.05, alphaBorder = 0.1) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

export default function CustomTestBuilder() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('physics');
  const [selections, setSelections] = useState({});

  // Subjects definition
  const subjects = [
    { id: 'physics', name: 'Physics', color: 'sky', rgb: '56, 189, 248' },
    { id: 'chemistry', name: 'Chemistry', color: 'emerald', rgb: '52, 211, 153' },
    { id: 'mathematics', name: 'Mathematics', color: 'orange', rgb: '251, 146, 60' }
  ];

  // Helper to handle increment/decrement
  const updateSelection = (chapterId, delta) => {
    setSelections(prev => {
      const current = prev[chapterId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[chapterId];
        return copy;
      }
      return { ...prev, [chapterId]: next };
    });
  };

  // AI Feature: Auto-suggest questions based on mock "weak areas"
  const handleAiSuggest = () => {
    // Mock weak chapters for the demo
    const weakTopics = { 'p_u1': 5, 'p_u11': 5, 'c_u5': 5, 'm_u3': 5 };
    setSelections(weakTopics);
  };

  // Generate the actual test data and navigate
  const handleStartTest = () => {
    let customQuestions = [];
    
    // Loop through selections and generate questions using your existing helper
    Object.entries(selections).forEach(([chapId, count]) => {
      // Find which subject this chapter belongs to
      let subjId = '';
      let chapName = '';
      for (const subj of ['physics', 'chemistry', 'mathematics']) {
        if (allChaptersData[subj][chapId]) {
          subjId = subj;
          chapName = allChaptersData[subj][chapId].name;
          break;
        }
      }
      
      const generated = getQuestionsForChapter(subjId, chapId, chapName).slice(0, count);
      
      // Map to TestEngine expected format
      const formatted = generated.map(q => ({
        ...q,
        subject: subjId.charAt(0).toUpperCase() + subjId.slice(1),
        chapterId: chapId,
      }));
      
      customQuestions = [...customQuestions, ...formatted];
    });

    if (customQuestions.length === 0) return alert("Please select at least 1 question.");

    // Save to local storage and route to the test engine
    localStorage.setItem('zenjee-custom-test', JSON.stringify(customQuestions));
    navigate('/test/custom');
  };

  const totalQuestions = Object.values(selections).reduce((a, b) => a + b, 0);
  const estimatedTime = totalQuestions * 2; // Assuming 2 mins per question

  const activeSubjectData = allChaptersData[activeTab];
  const activeColorStr = subjects.find(s => s.id === activeTab).rgb;

  return (
    <div className="min-h-screen bg-[#000a24] text-gray-200 font-sans flex flex-col relative pb-32">
      
      {/* HEADER */}
      <div className="p-8 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#000a24]/90 backdrop-blur-md z-30">
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Custom AI Paper</h1>
          <p className="text-white/40 text-sm mt-1">Design your own test targeting specific chapters</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleAiSuggest} className="px-5 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-medium rounded-full transition-all border border-indigo-500/30 flex items-center gap-2">
            <span>✨</span> Auto-fill Weak Topics
          </button>
          <button onClick={() => navigate('/')} className="px-5 py-2 border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all">
            Cancel
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto p-6 flex flex-col gap-6 mt-4">
        
        {/* TABS */}
        <div className="flex gap-4 p-2 bg-white/5 rounded-2xl w-fit">
          {subjects.map(subj => (
            <button
              key={subj.id}
              onClick={() => setActiveTab(subj.id)}
              className={`px-8 py-2.5 rounded-xl font-bold tracking-wide transition-all ${activeTab === subj.id ? `bg-${subj.color}-500/20 text-${subj.color}-300 shadow-[0_0_15px_rgba(${subj.rgb},0.2)] border border-${subj.color}-500/30` : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              {subj.name}
            </button>
          ))}
        </div>

        {/* CHAPTER LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(activeSubjectData).filter(([key]) => key !== 'colorText' && key !== 'colorHex').map(([chapId, data]) => (
            <div key={chapId} style={getGlassStyle(255, 255, 255, 0.02, 0.1)} className={`p-5 rounded-[1.5rem] flex justify-between items-center transition-all ${selections[chapId] ? 'border-indigo-500/50 bg-indigo-500/5' : ''}`}>
              <div className="flex-1 pr-4">
                <h3 className="text-white/90 font-medium">{data.name}</h3>
                {selections[chapId] > 0 && <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1 block">Included</span>}
              </div>
              
              {/* Counter */}
              <div className="flex items-center gap-3 bg-black/40 rounded-full p-1 border border-white/5">
                <button onClick={() => updateSelection(chapId, -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">-</button>
                <span className="w-6 text-center font-bold text-white">{selections[chapId] || 0}</span>
                <button onClick={() => updateSelection(chapId, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING ACTION BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-[#141720]/95 backdrop-blur-xl border border-white/10 rounded-full p-4 px-8 flex justify-between items-center shadow-2xl z-40">
        <div className="flex gap-8">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Total Questions</div>
            <div className="text-2xl font-bold text-white">{totalQuestions}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Est. Duration</div>
            <div className="text-2xl font-bold text-sky-400">{estimatedTime} <span className="text-sm">mins</span></div>
          </div>
        </div>
        
        <button 
          onClick={handleStartTest}
          disabled={totalQuestions === 0}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate & Start Test →
        </button>
      </div>

    </div>
  );
}