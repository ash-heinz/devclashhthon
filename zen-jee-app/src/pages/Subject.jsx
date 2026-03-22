import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData'; // <-- Centralized Data Import

const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1);
const listGlass = getGlassStyle(255, 255, 255, 0.02, 0.05);

// --- Dynamic Layout Map ---
// We use this just to tell the UI which chapter IDs belong in which category.
const subjectLayout = {
  physics: {
    title: 'PHYSICS',
    colorText: 'text-sky-300',
    colorFill: 'bg-sky-400',
    syllabus: {
      class11: ['p_u1', 'p_u2', 'p_u3', 'p_u4', 'p_u5', 'p_u6', 'p_u7', 'p_u8', 'p_u9', 'p_u10'],
      class12: ['p_u11', 'p_u12', 'p_u13', 'p_u14', 'p_u15', 'p_u16', 'p_u17', 'p_u18', 'p_u19', 'p_u20']
    }
  },
  chemistry: {
    title: 'CHEMISTRY',
    colorText: 'text-emerald-300',
    colorFill: 'bg-emerald-400',
    syllabus: {
      class11: {
        physical: ['c_u1', 'c_u2', 'c_u4', 'c_u6'],
        inorganic: ['c_u9', 'c_u3', 'c_u10'],
        organic: ['c_u13', 'c_u14', 'c_u15']
      },
      class12: {
        physical: ['c_u5', 'c_u7', 'c_u8'],
        inorganic: ['c_u10_2', 'c_u11', 'c_u12'],
        organic: ['c_u16', 'c_u17', 'c_u18', 'c_u19', 'c_u20']
      }
    }
  },
  mathematics: {
    title: 'MATHEMATICS',
    colorText: 'text-orange-300',
    colorFill: 'bg-orange-400',
    syllabus: {
      class11: ['m_u1', 'm_u2', 'm_u4', 'm_u5', 'm_u6', 'm_u10_1', 'm_u10_2', 'm_u14_1'],
      class12: ['m_u3', 'm_u7', 'm_u8', 'm_u9', 'm_u11', 'm_u12', 'm_u13', 'm_u14_2']
    }
  }
};

export default function Subject() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [activeGrade, setActiveGrade] = useState('class11');

  // Load layout data (fallback to physics if invalid URL)
  const layout = subjectLayout[subjectId] || subjectLayout.physics;
  const isChemistry = subjectId === 'chemistry';

  // Helper function to pull real data and localStorage progress based on ID
  const getChapterData = (chapterId) => {
    const chapter = allChaptersData[subjectId]?.[chapterId];
    if (!chapter) return { id: chapterId, name: 'Unknown Chapter', completed: 0, total: 0 };

    const total = chapter.topics ? chapter.topics.length : 0;
    const saved = localStorage.getItem(`zenjee-progress-${subjectId}-${chapterId}`);
    const completed = saved ? JSON.parse(saved).length : 0;

    return { id: chapterId, name: chapter.name, completed, total };
  };

  const renderChapterList = (chapterIds) => (
    <div className="space-y-4">
      {chapterIds.map((id) => {
        const chap = getChapterData(id);
        const progressPercent = chap.total === 0 ? 0 : (chap.completed / chap.total) * 100;
        const isDone = chap.total > 0 && chap.completed === chap.total;

        return (
          <div
            key={chap.id}
            onClick={() => navigate(`/subject/${subjectId}/chapter/${chap.id}`, { state: { chapterName: chap.name } })}
            style={listGlass}
            className="w-full rounded-2xl p-5 flex items-center justify-between hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border hover:border-white/10 shadow-lg group"
          >
            <h2 className={`text-lg font-medium transition-colors ${isDone ? 'text-white/50' : 'text-white/90 group-hover:text-white'}`}>
              {chap.name}
            </h2>

            <div className="flex items-center gap-6">
              <span className="text-sm font-mono text-white/60 w-12 text-right">
                {chap.completed}/{chap.total}
              </span>
              <div className="w-40 h-2 rounded-full bg-black/40 border border-white/5 overflow-hidden relative shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${layout.colorFill} ${isDone ? 'opacity-50' : 'opacity-100'}`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased">
      <nav style={defaultGlass} className="flex items-center justify-between px-10 py-5 shrink-0 rounded-b-3xl mx-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-50 relative">
        <div className="text-3xl font-semibold tracking-wider text-white flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
          Zen<span className="text-sky-300 font-extralight">JEE</span>
        </div>

        <button onClick={() => navigate('/')} className="group relative px-8 py-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-sky-400/30 text-base tracking-wide text-sky-50 shadow-lg overflow-hidden flex items-center gap-2">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-sky-400/10 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10">← Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-5 text-base">
          <span className="font-medium text-white/90">Ashwast</span>
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-200 px-4 py-1.5 rounded-full border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <span className="text-lg leading-none">🔥</span>
            <span className="font-medium">12 Days</span>
          </span>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 flex flex-col pt-12 pb-8 overflow-hidden">
        <div className="flex items-end justify-between mb-8 shrink-0 border-b border-white/10 pb-6">
          <h1 className={`text-4xl font-semibold tracking-[0.2em] ${layout.colorText}`}>
            {layout.title}
          </h1>

          <div className="flex bg-black/40 p-1 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveGrade('class11')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGrade === 'class11'
                ? `${layout.colorFill} text-black shadow-lg`
                : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              11th Grade
            </button>
            <button
              onClick={() => setActiveGrade('class12')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGrade === 'class12'
                ? `${layout.colorFill} text-black shadow-lg`
                : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              12th Grade
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar pb-10">
          {isChemistry ? (
            <div className="space-y-12 animate-fade-in-up">
              <section>
                <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Physical Chemistry
                </h3>
                {renderChapterList(layout.syllabus[activeGrade].physical)}
              </section>
              <section>
                <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Inorganic Chemistry
                </h3>
                {renderChapterList(layout.syllabus[activeGrade].inorganic)}
              </section>
              <section>
                <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Organic Chemistry
                </h3>
                {renderChapterList(layout.syllabus[activeGrade].organic)}
              </section>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              {renderChapterList(layout.syllabus[activeGrade])}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}