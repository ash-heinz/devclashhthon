import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// --- Reusable Glass Style ---
const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1);
const listGlass = getGlassStyle(255, 255, 255, 0.02, 0.05);

// --- Upgraded Mock Database ---
const subjectData = {
  physics: {
    title: 'PHYSICS',
    colorText: 'text-sky-300',
    colorFill: 'bg-sky-400',
    syllabus: {
      class11: [
        { id: 'p_u1', name: 'Units and Measurements', completed: 2, total: 5 },
        { id: 'p_u2', name: 'Kinematics', completed: 4, total: 8 },
        { id: 'p_u3', name: 'Laws of Motion', completed: 3, total: 7 },
        { id: 'p_u4', name: 'Work, Energy and Power', completed: 5, total: 6 },
        { id: 'p_u5', name: 'Rotational Motion', completed: 1, total: 9 },
        { id: 'p_u6', name: 'Gravitation', completed: 4, total: 5 },
        { id: 'p_u7', name: 'Properties of Solids and Liquids', completed: 2, total: 10 },
        { id: 'p_u8', name: 'Thermodynamics', completed: 0, total: 6 },
        { id: 'p_u9', name: 'Kinetic Theory of Gases', completed: 3, total: 4 },
        { id: 'p_u10', name: 'Oscillations and Waves', completed: 1, total: 12 }
      ],
      class12: [
        { id: 'p_u11', name: 'Electrostatics', completed: 8, total: 10 },
        { id: 'p_u12', name: 'Current Electricity', completed: 5, total: 8 },
        { id: 'p_u13', name: 'Magnetic Effects of Current and Magnetism', completed: 0, total: 9 },
        { id: 'p_u14', name: 'Electromagnetic Induction and AC', completed: 2, total: 7 },
        { id: 'p_u15', name: 'Electromagnetic Waves', completed: 3, total: 3 },
        { id: 'p_u16', name: 'Optics', completed: 0, total: 14 },
        { id: 'p_u17', name: 'Dual Nature of Matter and Radiation', completed: 4, total: 5 },
        { id: 'p_u18', name: 'Atoms and Nuclei', completed: 1, total: 6 },
        { id: 'p_u19', name: 'Electronic Devices', completed: 0, total: 5 },
        { id: 'p_u20', name: 'Experimental Skills', completed: 5, total: 15 }
      ]
    }
  },
  chemistry: {
    title: 'CHEMISTRY',
    colorText: 'text-emerald-300',
    colorFill: 'bg-emerald-400',
    syllabus: {
      class11: {
        physical: [
          { id: 'c_u1', name: 'Some Basic Concepts in Chemistry', completed: 5, total: 5 },
          { id: 'c_u2', name: 'Atomic Structure', completed: 6, total: 9 },
          { id: 'c_u4', name: 'Chemical Thermodynamics', completed: 2, total: 10 },
          { id: 'c_u6', name: 'Equilibrium', completed: 0, total: 12 }
        ],
        inorganic: [
          { id: 'c_u9', name: 'Classification of Elements & Periodicity', completed: 4, total: 4 },
          { id: 'c_u3', name: 'Chemical Bonding and Molecular Structure', completed: 7, total: 10 },
          { id: 'c_u10', name: 'p-Block Elements (Group 13-14)', completed: 1, total: 6 }
        ],
        organic: [
          { id: 'c_u13', name: 'Purification & Characterisation', completed: 3, total: 5 },
          { id: 'c_u14', name: 'Basic Principles of Organic Chemistry', completed: 4, total: 12 },
          { id: 'c_u15', name: 'Hydrocarbons', completed: 0, total: 9 }
        ]
      },
      class12: {
        physical: [
          { id: 'c_u5', name: 'Solutions', completed: 6, total: 8 },
          { id: 'c_u7', name: 'Redox Reactions & Electrochemistry', completed: 3, total: 10 },
          { id: 'c_u8', name: 'Chemical Kinetics', completed: 0, total: 7 }
        ],
        inorganic: [
          { id: 'c_u10_2', name: 'p-Block Elements (Group 15-18)', completed: 0, total: 8 },
          { id: 'c_u11', name: 'd and f Block Elements', completed: 2, total: 6 },
          { id: 'c_u12', name: 'Coordination Compounds', completed: 1, total: 8 }
        ],
        organic: [
          { id: 'c_u16', name: 'Organic Compounds containing Halogens', completed: 0, total: 7 },
          { id: 'c_u17', name: 'Organic Compounds containing Oxygen', completed: 0, total: 12 },
          { id: 'c_u18', name: 'Organic Compounds containing Nitrogen', completed: 0, total: 6 },
          { id: 'c_u19', name: 'Biomolecules', completed: 2, total: 5 },
          { id: 'c_u20', name: 'Principles Related to Practical Chemistry', completed: 1, total: 10 }
        ]
      }
    }
  },
  mathematics: {
    title: 'MATHEMATICS',
    colorText: 'text-orange-300',
    colorFill: 'bg-orange-400',
    syllabus: {
      class11: [
        { id: 'm_u1', name: 'Sets, Relations and Functions', completed: 8, total: 8 },
        { id: 'm_u2', name: 'Complex Numbers and Quadratic Equations', completed: 5, total: 10 },
        { id: 'm_u4', name: 'Permutations and Combinations', completed: 2, total: 7 },
        { id: 'm_u5', name: 'Binomial Theorem', completed: 0, total: 6 },
        { id: 'm_u6', name: 'Sequence and Series', completed: 4, total: 8 },
        { id: 'm_u10_1', name: 'Straight Lines', completed: 6, total: 7 },
        { id: 'm_u10_2', name: 'Circles and Conic Sections', completed: 1, total: 12 },
        { id: 'm_u14_1', name: 'Trigonometry', completed: 5, total: 9 }
      ],
      class12: [
        { id: 'm_u3', name: 'Matrices and Determinants', completed: 10, total: 10 },
        { id: 'm_u7', name: 'Limit, Continuity and Differentiability', completed: 8, total: 12 },
        { id: 'm_u8', name: 'Integral Calculus', completed: 2, total: 15 },
        { id: 'm_u9', name: 'Differential Equations', completed: 0, total: 8 },
        { id: 'm_u11', name: 'Three Dimensional Geometry', completed: 3, total: 9 },
        { id: 'm_u12', name: 'Vector Algebra', completed: 6, total: 7 },
        { id: 'm_u13', name: 'Statistics and Probability', completed: 1, total: 10 },
        { id: 'm_u14_2', name: 'Inverse Trigonometric Functions', completed: 4, total: 5 }
      ]
    }
  }
};

export default function Subject() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [activeGrade, setActiveGrade] = useState('class11'); // 'class11' or 'class12'

  const data = subjectData[subjectId] || subjectData.physics;
  const isChemistry = subjectId === 'chemistry';

  // Helper function to render a list of chapter buttons
  const renderChapterList = (chapters) => (
    <div className="space-y-4">
      {chapters.map((chap) => {
        const progressPercent = (chap.completed / chap.total) * 100;
        const isDone = chap.completed === chap.total;

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
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${data.colorFill} ${isDone ? 'opacity-50' : 'opacity-100'}`}
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

      {/* 1. TOP BAR */}
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

      {/* 2. SUBJECT HEADER & TABS */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 flex flex-col pt-12 pb-8 overflow-hidden">

        <div className="flex items-end justify-between mb-8 shrink-0 border-b border-white/10 pb-6">
          <h1 className={`text-4xl font-semibold tracking-[0.2em] ${data.colorText}`}>
            {data.title}
          </h1>

          {/* Grade 11 / 12 Toggle */}
          <div className="flex bg-black/40 p-1 rounded-full border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveGrade('class11')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGrade === 'class11'
                ? `${data.colorFill} text-black shadow-lg`
                : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              11th Grade
            </button>
            <button
              onClick={() => setActiveGrade('class12')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGrade === 'class12'
                ? `${data.colorFill} text-black shadow-lg`
                : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              12th Grade
            </button>
          </div>
        </div>

        {/* 3. SCROLLABLE SYLLABUS AREA */}
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar pb-10">

          {isChemistry ? (
            /* CHEMISTRY RENDER (Divided into 3 sections) */
            <div className="space-y-12 animate-fade-in-up">

              <section>
                <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Physical Chemistry
                </h3>
                {renderChapterList(data.syllabus[activeGrade].physical)}
              </section>

              <section>
                <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Inorganic Chemistry
                </h3>
                {renderChapterList(data.syllabus[activeGrade].inorganic)}
              </section>

              <section>
                <h3 className="text-xl font-medium text-white/80 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Organic Chemistry
                </h3>
                {renderChapterList(data.syllabus[activeGrade].organic)}
              </section>

            </div>
          ) : (
            /* PHYSICS / MATH RENDER (Single List) */
            <div className="animate-fade-in-up">
              {renderChapterList(data.syllabus[activeGrade])}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}