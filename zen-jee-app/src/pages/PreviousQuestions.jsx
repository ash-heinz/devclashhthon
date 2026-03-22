// src/pages/PreviousQuestions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData';

const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

export const PreviousQuestions = () => {
  const navigate = useNavigate();

  // Helper to calculate progress based on localStorage
  const getProgress = (subjectId, chapterId, topics) => {
    const saved = localStorage.getItem(`zenjee-progress-${subjectId}-${chapterId}`);
    const completedCount = saved ? JSON.parse(saved).length : 0;
    const totalCount = topics ? topics.length : 0;
    const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    
    // Estimate total PYQs based on topics (adjust this math as needed)
    const totalQuestions = totalCount * 15; 
    
    return { percentage, totalQuestions };
  };

  // Safe color mapping for Tailwind progress bars
  const progressColors = {
    physics: 'bg-sky-400',
    chemistry: 'bg-emerald-400',
    mathematics: 'bg-orange-400'
  };

  const renderSubjectColumn = (subjectId, title) => {
    const subject = allChaptersData[subjectId];
    if (!subject) return null;

    // Filter out the metadata keys to just get the chapter objects
    const chapterKeys = Object.keys(subject).filter(key => key !== 'colorText' && key !== 'colorHex');
    const barColor = progressColors[subjectId];

    return (
      <div className="flex flex-col h-full">
        <h2 className={`text-2xl font-semibold tracking-wider ${subject.colorText} mb-6 sticky top-0 bg-[#000a24]/90 backdrop-blur-md py-4 z-10 border-b border-white/5`}>
          {title}
        </h2>
        
        <div className="flex flex-col gap-4 pb-12">
          {chapterKeys.map((chapterId) => {
            const chapter = subject[chapterId];
            const { percentage, totalQuestions } = getProgress(subjectId, chapterId, chapter.topics);

            return (
              <div 
                key={chapterId} 
                onClick={() => navigate(`/subject/${subjectId}/chapter/${chapterId}`, { state: { chapterName: chapter.name } })}
                style={getGlassStyle(255, 255, 255, 0.02, 0.06)}
                className="rounded-2xl p-4 cursor-pointer hover:bg-white/5 transition-all duration-300 flex items-center justify-between group"
              >
                {/* Left Side: Chapter Name */}
                <div className="w-1/2 pr-4">
                  <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                    {chapter.name}
                  </h3>
                </div>

                {/* Right Side: Questions & Progress Bar */}
                <div className="w-1/2 flex flex-col items-end gap-2">
                  <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
                    {totalQuestions} PYQs
                  </span>
                  <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden border border-white/5">
                    <div 
                      className={`h-full rounded-full ${barColor} transition-all duration-700 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased relative">
      {/* Navbar Area */}
      <nav style={getGlassStyle(255, 255, 255, 0.04, 0.1)} className="flex items-center justify-between px-10 py-4 shrink-0 rounded-b-3xl mx-3 shadow-lg z-40 relative">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white">
            ←
          </button>
          <div className="text-2xl font-semibold tracking-wider text-white">
            Previous Year <span className="text-white/50 font-extralight">Questions</span>
          </div>
        </div>
      </nav>

      {/* 3-Column Main Content */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 overflow-y-auto custom-scrollbar mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {renderSubjectColumn('physics', 'Physics')}
          {renderSubjectColumn('chemistry', 'Chemistry')}
          {renderSubjectColumn('mathematics', 'Mathematics')}
        </div>
      </main>
    </div>
  );
};