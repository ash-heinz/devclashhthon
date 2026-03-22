import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// --- Icons ---
const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-indigo-400">
    <path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z" />
  </svg>
);

// --- Simplified Syllabus Map for Analysis ---
// Matches the IDs from your Subject.jsx database
const syllabusBlueprint = {
  physics: ['p_u1', 'p_u2', 'p_u3', 'p_u4', 'p_u5', 'p_u11', 'p_u12'], 
  chemistry: ['c_u1', 'c_u2', 'c_u4', 'c_u5', 'c_u9', 'c_u16'],
  mathematics: ['m_u1', 'm_u2', 'm_u3', 'm_u8', 'm_u10_1']
};

export default function Planner() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    generateAutonomousPlan();
  }, []);

  // --- THE AUTONOMOUS AGENT LOGIC ---
  const analyzeUserProgress = () => {
    // We assume roughly 5 topics per chapter for percentage calculation
    const topicsPerChapter = 5; 
    let stats = {
      physics: { completed: 0, total: syllabusBlueprint.physics.length * topicsPerChapter, weakChapters: [] },
      chemistry: { completed: 0, total: syllabusBlueprint.chemistry.length * topicsPerChapter, weakChapters: [] },
      mathematics: { completed: 0, total: syllabusBlueprint.mathematics.length * topicsPerChapter, weakChapters: [] },
    };

    // Scan localStorage for ticked off topics
    Object.keys(syllabusBlueprint).forEach(subject => {
      syllabusBlueprint[subject].forEach(chapter => {
        const progressKey = `zenjee-progress-${subject}-${chapter}`;
        const savedData = localStorage.getItem(progressKey);
        
        if (savedData) {
          try {
            const completedTopics = JSON.parse(savedData);
            const count = Array.isArray(completedTopics) ? completedTopics.length : 0;
            stats[subject].completed += count;

            // If a chapter is started but less than 3 topics are done, flag as weak
            if (count > 0 && count < 3) {
              stats[subject].weakChapters.push(chapter);
            }
          } catch (e) {
            console.error("Failed to parse progress", e);
          }
        } else {
          // If no data exists, it's untouched. We'll add the first untouched one as a priority.
          if (stats[subject].weakChapters.length < 2) {
            stats[subject].weakChapters.push(`${chapter} (Untouched)`);
          }
        }
      });
    });

    return stats;
  };

  const generateAutonomousPlan = async () => {
    if (!genAI) {
      setError("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
      setLoading(false);
      return;
    }

    try {
      // 1. Gather Real Context
      const targetExam = localStorage.getItem('zenjee-exam') || 'mains';
      const selectedClass = localStorage.getItem('zenjee-class') || 'class12';
      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const currentYear = new Date().getFullYear();
      const examDate = targetExam === 'advanced' ? new Date(`${currentYear}-05-26`) : new Date(`${currentYear}-01-24`);
      let daysLeft = Math.floor((examDate - new Date()) / (1000 * 60 * 60 * 24));
      if (daysLeft < 0) daysLeft = 300; 

      // 2. Scan Local Storage for Ticked Chapters
      const userProgress = analyzeUserProgress();

      const getPct = (subj) => Math.round((userProgress[subj].completed / userProgress[subj].total) * 100);

      // 3. Construct Prompt with LIVE DATA
      const prompt = `
        You are an autonomous, highly intelligent JEE study planner. 
        Current Date: ${currentDate}. Days left until target exam: ${daysLeft}.
        Target Exam: JEE ${targetExam.toUpperCase()}. Class: ${selectedClass}.
        
        User's Actual Analytics based on ticked topics:
        - Physics: ~${getPct('physics')}% complete. Priority areas: ${userProgress.physics.weakChapters.join(', ')}
        - Chemistry: ~${getPct('chemistry')}% complete. Priority areas: ${userProgress.chemistry.weakChapters.join(', ')}
        - Maths: ~${getPct('mathematics')}% complete. Priority areas: ${userProgress.mathematics.weakChapters.join(', ')}
        
        Generate a strict, highly optimized daily study plan for the next 4 days addressing these exact priority areas. Include PYQ practice.
        
        You MUST respond ONLY with a valid, raw JSON array of objects. Do not use markdown blocks like \`\`\`json.
        Format EXACTLY like this:
        [
          {
            "day": "Day 1",
            "date": "Mar 24",
            "subject": "Physics",
            "focus": "Chapter ID or Name",
            "task": "Watch one-shot lecture and solve 20 PYQs to fix weak area.",
            "color": "sky"
          }
        ]
        (color can be 'sky', 'emerald', or 'orange').
      `;

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const textResponse = result.response.text();

      // Clean and Parse JSON
      const cleanedJson = textResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const parsedPlan = JSON.parse(cleanedJson);
      
      setPlan(parsedPlan);
    } catch (err) {
      console.error("Agent generation failed:", err);
      setError("The autonomous agent failed to generate a plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = "bg-[#1C202B] border border-white/5 rounded-[1rem] p-5 shadow-sm";

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#141720] text-gray-100 font-sans antialiased px-8 py-8 md:px-12 lg:px-24">
      
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/80">
          <BackArrow />
        </button>
        <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium">
          <SparkleIcon />
          <span>Autonomous AI Active</span>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-medium text-white/90 mb-2">My Study Space</h1>
          <p className="text-white/50 text-sm">Your schedule is auto-rebalanced daily based on chapters you tick off and your weak areas.</p>
        </div>

        {loading && (
          <div className={`${cardStyle} flex flex-col items-center justify-center py-20 gap-4`}>
            <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-white/60 animate-pulse text-sm">Scanning syllabus progress and optimizing schedule...</p>
          </div>
        )}

        {error && (
          <div className={`${cardStyle} border-red-500/30 bg-red-500/5 text-red-200 py-10 text-center`}>
            {error}
            <button onClick={generateAutonomousPlan} className="block mt-4 mx-auto px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">Retry</button>
          </div>
        )}

        {plan && (
          <div className="grid grid-cols-1 gap-4 relative mt-4">
            <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-white/5 z-0 hidden sm:block"></div>

            {plan.map((item, idx) => {
              const colorMap = {
                sky: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
                emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20'
              };
              const theme = colorMap[item.color] || colorMap.sky;

              return (
                <div key={idx} className={`${cardStyle} flex flex-col sm:flex-row gap-6 relative z-10 hover:border-white/10 transition-colors`}>
                  
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center min-w-[80px] shrink-0 bg-[#141720] rounded-xl py-2 border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{item.day}</span>
                    <span className="text-lg font-bold text-white/90">{item.date}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-2 pt-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${theme}`}>
                        {item.subject}
                      </span>
                      <span className="text-white/90 font-medium">{item.focus}</span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mt-1">
                      {item.task}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center sm:justify-end shrink-0">
                    <button className="px-5 py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wider uppercase transition">
                      Start Mission
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}