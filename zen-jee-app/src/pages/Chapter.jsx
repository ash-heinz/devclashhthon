import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { allChaptersData, mockTopic } from '../data/chaptersData.js';
import { getQuestionsForChapter } from '../data/questionsData.js';

// --- Amateur Doodle Icons ---
const ThinnerStroke = "1";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white/90">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// --- Dynamic Glass CSS Generator ---
const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1);
const topicGlass = getGlassStyle(255, 255, 255, 0.02, 0.06);
const modalGlass = getGlassStyle(15, 23, 42, 0.9, 0.2);

const YouTubeTopicName = ({ videoId, fallbackName, isAdvanced }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-1 w-full pr-2">
      <h2 className="text-sm md:text-base font-medium text-white/90 leading-snug line-clamp-2" title={fallbackName}>
        {fallbackName}
      </h2>
      {isAdvanced && (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider mt-1">
          Advanced
        </span>
      )}
    </div>
  );
};

export const Chapter = () => {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const passedChapterName = location.state?.chapterName;

  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem(`zenjee-progress-${subjectId}-${chapterId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [activeModal, setActiveModal] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(() => {
    const globalExam = localStorage.getItem('zenjee-exam');
    if (globalExam === 'advanced') return true;
    return localStorage.getItem('zenjee-show-advanced') === 'true';
  });

  useEffect(() => {
    localStorage.setItem(`zenjee-progress-${subjectId}-${chapterId}`, JSON.stringify([...completedTopics]));
  }, [completedTopics, subjectId, chapterId]);

  useEffect(() => {
    localStorage.setItem('zenjee-show-advanced', showAdvanced);
  }, [showAdvanced]);

  const subjectData = allChaptersData[subjectId] || { colorText: 'text-sky-300', colorHex: 'sky' };
  
  const chapterDetails = subjectData[chapterId] || {
    name: passedChapterName || `Chapter ${chapterId}`,
    shortNotes: "Quick summary and formulas for this chapter.",
    shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    topics: mockTopic(chapterId)
  };

  const displayTitle = allChaptersData[subjectId]?.[chapterId]?.name || passedChapterName || `Chapter ${chapterId}`;

  const chapterQs = getQuestionsForChapter(subjectId, chapterId, displayTitle);

  const toggleTopic = (topicId) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) newSet.delete(topicId);
      else newSet.add(topicId);
      return newSet;
    });
  };

  const openModal = (title, type, content) => setActiveModal({ title, type, content });
  const closeModal = () => setActiveModal(null);

  const visibleTopics = chapterDetails.topics.filter(topic => showAdvanced ? true : !topic.isAdvanced);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased relative">
      <nav style={defaultGlass} className="flex items-center justify-between px-10 py-4 shrink-0 rounded-b-3xl mx-3 shadow-lg z-40 relative">
        <div className="text-2xl font-semibold tracking-wider text-white flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
          Zen<span className="text-sky-300 font-extralight">JEE</span>
        </div>
        <button onClick={() => navigate('/')} className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 text-sm tracking-wide text-sky-50">
          ← Back to Dashboard
        </button>
      </nav>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col pt-8 pb-12 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-8 shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white">
              ←
            </button>
            <h1 className={`text-3xl font-semibold tracking-wider ${subjectData.colorText}`}>
              {displayTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 shadow-inner">
            <span className={`text-sm font-medium transition-colors ${!showAdvanced ? 'text-white' : 'text-white/40'}`}>
              Mains
            </span>
            <button onClick={() => setShowAdvanced(!showAdvanced)} className={`w-12 h-6 rounded-full relative transition-colors duration-300 border ${showAdvanced ? 'bg-indigo-500/30 border-indigo-500/50' : 'bg-black/50 border-white/20'}`}>
              <div className={`w-4 h-4 rounded-full absolute top-[3px] transition-all duration-300 shadow-md ${showAdvanced ? 'left-[26px] bg-indigo-400' : 'left-[3px] bg-white/70'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${showAdvanced ? 'text-indigo-300' : 'text-white/40'}`}>
              + Advanced
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-4 mb-8">
          <div className="grid grid-cols-[auto_1.5fr_1.5fr_1.5fr_1fr] gap-6 px-6 items-center text-sm font-medium text-white/50 uppercase tracking-widest border-b border-white/5 pb-2">
            <div className="w-6 flex justify-center">✔</div>
            <div>Topic Name</div>
            <div>Lecture Video</div>
            <div>Lecture Notes</div>
            <div>Practice</div>
          </div>

          {visibleTopics.map((topic) => {
            const isDone = completedTopics.has(topic.id);
            const thumbnailUrl = (topic.videoId && !topic.videoId.includes('placeholder')) 
              ? `https://img.youtube.com/vi/${topic.videoId}/hqdefault.jpg` 
              : topic.thumbnail;

            const topicQsCount = chapterQs.filter(q => q.topic === topic.id).length;

            return (
              <div key={topic.id} style={topicGlass} className={`grid grid-cols-[auto_1.5fr_1.5fr_1.5fr_1fr] gap-6 p-4 rounded-2xl items-center transition-all duration-300 hover:bg-white/5 animate-fade-in-up ${isDone ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-center">
                  <button onClick={() => toggleTopic(topic.id)} className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500/20 border-emerald-500/50' : 'border-white/20 hover:border-white/40 bg-black/20'}`}>
                    {isDone && <CheckIcon />}
                  </button>
                </div>

                <YouTubeTopicName videoId={topic.videoId} fallbackName={topic.name} isAdvanced={topic.isAdvanced} />

                <a href={`https://www.youtube.com/watch?v=${topic.videoId}`} target="_blank" rel="noreferrer" className="relative rounded-xl overflow-hidden group border border-white/10 block h-20 bg-black/50 w-full">
                  <img src={thumbnailUrl} alt={topic.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
                      <PlayIcon />
                    </div>
                  </div>
                </a>

                {/* ELABORATE LECTURE NOTES MODAL */}
                <div 
                  onClick={() => openModal(
                    `${topic.name} - Detailed Notes`, 
                    topic.lectureNotesContent ? 'text' : 'pdf', 
                    topic.lectureNotesContent || topic.pdfUrl
                  )} 
                  className="rounded-xl border border-white/10 bg-black/20 p-3 cursor-pointer hover:border-indigo-400/30 hover:bg-indigo-500/5 transition-all group overflow-hidden h-20 flex flex-col justify-center w-full"
                >
                  <p className="text-xs text-white/60 line-clamp-2 group-hover:text-white/80 transition-colors">
                    {topic.notesText}
                  </p>
                  <div className="text-[10px] text-indigo-300/70 mt-1 font-medium uppercase tracking-wider">
                    {topic.lectureNotesContent ? 'Read Notes ↗' : 'Open PDF ↗'}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-xs text-white/80 mb-2 font-medium">{topicQsCount} PYQs</div>
                  <button 
                    onClick={() => navigate(`/previous-questions/${subjectId}/chapter/${chapterId}?tab=topic&topicId=${topic.id}`, { state: { chapterName: displayTitle } })}
                    className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-200 text-sm font-medium hover:bg-indigo-500/30 transition-colors border border-indigo-500/20 text-center w-full"
                  >
                    Solve Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6 shrink-0">
          {/* NOW OPENS TEXT IF AVAILABLE, OTHERWISE PDF */}
          <div 
            onClick={() => openModal(
              `${displayTitle} Short Notes Review`, 
              chapterDetails.shortNotesContent ? 'text' : 'pdf', 
              chapterDetails.shortNotesContent || chapterDetails.shortNotesPdf || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            )} 
            style={topicGlass} 
            className={`rounded-2xl p-6 cursor-pointer hover:border-${subjectData.colorHex}-400/30 hover:bg-white/5 transition-all group`}
          >
            <h3 className={`text-lg font-medium ${subjectData.colorText} mb-2 flex items-center gap-2`}>
              📄 Short Notes Review
            </h3>
            <p className="text-sm text-white/50 line-clamp-2">{chapterDetails.shortNotes}</p>
          </div>
          
          <div onClick={() => navigate(`/previous-questions/${subjectId}/chapter/${chapterId}`, { state: { chapterName: displayTitle } })} style={topicGlass} className="rounded-2xl p-6 cursor-pointer hover:border-yellow-400/30 hover:bg-yellow-500/5 transition-all flex flex-col justify-center items-center group">
            <h3 className="text-xl font-medium text-yellow-100 mb-1">Chapter PYQs</h3>
            <p className="text-sm text-yellow-200/50 group-hover:text-yellow-200/80">Generate a custom test from past 5 years</p>
          </div>
        </div>
      </main>

      {activeModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div style={modalGlass} className="w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0 bg-black/40">
              <h2 className="text-xl font-medium text-white">{activeModal.title}</h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 w-full h-full bg-white/5">
              {activeModal.type === 'pdf' ? (
                <iframe src={activeModal.content} className="w-full h-full" title="PDF Viewer" />
              ) : (
                <div className="p-8 overflow-y-auto custom-scrollbar text-white/80 leading-relaxed whitespace-pre-wrap text-lg h-full">
                  {activeModal.content}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}