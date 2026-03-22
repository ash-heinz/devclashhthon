// File: src/pages/PreviousPapers.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTests } from '../data/mockTests';

export default function PreviousPapers() {
  const [examType, setExamType] = useState('mains'); 
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#141720] text-gray-100 font-sans p-8 md:p-12">
      <button onClick={() => navigate('/')} className="mb-8 text-white/50 hover:text-white transition">
        ← Back to Dashboard
      </button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-white mb-8 tracking-wide">Previous Year Papers</h1>
        
        <div className="inline-flex bg-black/40 p-1.5 rounded-full border border-white/10">
          <button 
            onClick={() => setExamType('mains')}
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 ${examType === 'mains' ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]' : 'text-white/40 hover:text-white/80'}`}
          >
            JEE MAINS
          </button>
          <button 
            onClick={() => setExamType('advanced')}
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all duration-300 ${examType === 'advanced' ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'text-white/40 hover:text-white/80'}`}
          >
            JEE ADVANCED
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {mockTests[examType].map((test) => (
          <div 
            key={test.id}
            onClick={() => navigate(`/test/${test.id}`)}
            className="bg-[#1C202B] p-8 rounded-[2rem] border border-white/5 hover:border-sky-500/30 cursor-pointer transition-all duration-300 group hover:-translate-y-1 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${examType === 'mains' ? 'bg-sky-500/10 text-sky-400' : 'bg-orange-500/10 text-orange-400'}`}>
                {test.year}
              </span>
              <span className="text-white/40 text-xs font-mono">{test.duration} MINS</span>
            </div>
            <h3 className="text-xl font-medium text-white/90 mb-6">{test.title}</h3>
            
            <button className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-white/10 text-white/80 text-sm font-medium transition">
              Attempt Now →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}