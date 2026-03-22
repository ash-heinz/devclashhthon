import React from 'react';
import { useNavigate } from 'react-router-dom';
import { allChaptersData } from '../data/chaptersData.js';
import { getQuestionsForChapter } from '../data/questionsData.js';

const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const subjectLayout = {
  physics: { class11: ['p_u1', 'p_u2', 'p_u3', 'p_u4', 'p_u5', 'p_u6', 'p_u7', 'p_u8', 'p_u9', 'p_u10'], class12: ['p_u11', 'p_u12', 'p_u13', 'p_u14', 'p_u15', 'p_u16', 'p_u17', 'p_u18', 'p_u19', 'p_u20'] },
  chemistry: { class11: { physical: ['c_u1', 'c_u2', 'c_u4', 'c_u6'], inorganic: ['c_u9', 'c_u3', 'c_u10'], organic: ['c_u13', 'c_u14', 'c_u15'] }, class12: { physical: ['c_u5', 'c_u7', 'c_u8'], inorganic: ['c_u10_2', 'c_u11', 'c_u12'], organic: ['c_u16', 'c_u17', 'c_u18', 'c_u19', 'c_u20'] } },
  mathematics: { class11: ['m_u1', 'm_u2', 'm_u4', 'm_u5', 'm_u6', 'm_u10_1', 'm_u10_2', 'm_u14_1'], class12: ['m_u3', 'm_u7', 'm_u8', 'm_u9', 'm_u11', 'm_u12', 'm_u13', 'm_u14_2'] }
};

export const PreviousQuestions = () => {
  const navigate = useNavigate();

  const getProgress = (subjectId, chapterId, chapterName) => {
    const totalQuestions = getQuestionsForChapter(subjectId, chapterId, chapterName).length;
    const savedChecks = JSON.parse(localStorage.getItem(`zenjee-answers-${chapterId}-chk`) || '{}');
    const completedCount = Object.keys(savedChecks).filter(k => savedChecks[k]).length;
    const percentage = totalQuestions === 0 ? 0 : Math.round((completedCount / totalQuestions) * 100);
    return { percentage, totalQuestions, completedCount };
  };

  const colors = { physics: 'bg-sky-400', chemistry: 'bg-emerald-400', mathematics: 'bg-orange-400' };
  const glows = { physics: 'bg-sky-500/10', chemistry: 'bg-emerald-500/10', mathematics: 'bg-orange-500/10' };

  const renderChapterList = (chapterIds, subjectId, barColor) => (
    <div className="flex flex-col gap-3 mb-6">
      {chapterIds.map((chapterId) => {
        const chapter = allChaptersData[subjectId]?.[chapterId];
        if (!chapter) return null;

        const { percentage, totalQuestions, completedCount } = getProgress(subjectId, chapterId, chapter.name);

        return (
          <div key={chapterId} onClick={() => navigate(`/previous-questions/${subjectId}/chapter/${chapterId}`, { state: { chapterName: chapter.name } })} style={getGlassStyle(255, 255, 255, 0.02, 0.06)} className="rounded-2xl p-4 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between group relative z-10">
            <div className="w-[55%] pr-3">
              <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors line-clamp-2 leading-snug">{chapter.name}</h3>
            </div>
            <div className="w-[45%] flex flex-col items-end gap-2">
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider">{completedCount}/{totalQuestions} PYQs</span>
              <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden border border-white/5">
                <div className={`h-full rounded-full ${barColor} transition-all duration-700 ease-out`} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderChemistrySections = (gradeData, subjectId, barColor) => (
    <>
      <h4 className="text-[11px] font-bold text-emerald-300/40 uppercase tracking-widest mb-3 pl-1">Physical Chemistry</h4>{renderChapterList(gradeData.physical, subjectId, barColor)}
      <h4 className="text-[11px] font-bold text-emerald-300/40 uppercase tracking-widest mb-3 pl-1">Inorganic Chemistry</h4>{renderChapterList(gradeData.inorganic, subjectId, barColor)}
      <h4 className="text-[11px] font-bold text-emerald-300/40 uppercase tracking-widest mb-3 pl-1">Organic Chemistry</h4>{renderChapterList(gradeData.organic, subjectId, barColor)}
    </>
  );

  const renderSubjectColumn = (subjectId, title) => {
    const layout = subjectLayout[subjectId];
    if (!allChaptersData[subjectId]) return null;

    return (
      <div className="relative flex flex-col h-full rounded-3xl pt-2">
        <div className={`absolute inset-0 w-full h-[120%] ${glows[subjectId]} blur-[80px] rounded-[50px] pointer-events-none z-0`} />
        <div className="sticky top-0 z-20 pt-4 pb-4 mb-4 -mx-2 px-2 bg-[#000a24]/80 backdrop-blur-xl border-b border-white/5 rounded-b-xl shadow-sm">
          <h2 className={`text-2xl font-bold tracking-widest uppercase ${allChaptersData[subjectId].colorText} drop-shadow-md`}>{title}</h2>
        </div>
        <div className="relative z-10 flex flex-col gap-2 pb-12">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-2"><span className="text-lg font-semibold text-white/90">Class 11</span></div>
            {subjectId === 'chemistry' ? renderChemistrySections(layout.class11, subjectId, colors[subjectId]) : renderChapterList(layout.class11, subjectId, colors[subjectId])}
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-2"><span className="text-lg font-semibold text-white/90">Class 12</span></div>
            {subjectId === 'chemistry' ? renderChemistrySections(layout.class12, subjectId, colors[subjectId]) : renderChapterList(layout.class12, subjectId, colors[subjectId])}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased relative">
      <nav style={getGlassStyle(255, 255, 255, 0.04, 0.1)} className="flex items-center justify-between px-10 py-4 shrink-0 rounded-b-3xl mx-3 shadow-lg z-40 relative">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white">←</button>
          <div className="text-2xl font-semibold tracking-wider text-white">Previous Year <span className="text-white/50 font-extralight">Questions</span></div>
        </div>
      </nav>
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-6 overflow-y-auto custom-scrollbar mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full relative z-10">
          {renderSubjectColumn('physics', 'Physics')}
          {renderSubjectColumn('chemistry', 'Chemistry')}
          {renderSubjectColumn('mathematics', 'Mathematics')}
        </div>
      </main>
    </div>
  );
};