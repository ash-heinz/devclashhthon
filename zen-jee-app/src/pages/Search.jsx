import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math'; 
import rehypeKatex from 'rehype-katex'; 
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// --- Amateur Doodle Icons ---
const ThinnerStroke = "1";

const SparkleDoodle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ThinnerStroke} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-300">
    <path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z" />
  </svg>
); 

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1);
const aiGlass = getGlassStyle(99, 102, 241, 0.05, 0.15); 
const userGlass = getGlassStyle(56, 189, 248, 0.08, 0.2); 

// --- UPGRADED: Action Boxes Component now receives dynamic routing data ---
const ActionBoxes = ({ navigate, routeData }) => {
  // Fallback to physics/kinematics if the AI couldn't find a match
  const subject = routeData?.subject || 'physics';
  const chapter = routeData?.chapter || 'p_u2'; 
  const targetUrl = `/subject/${subject}/chapter/${chapter}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-indigo-500/20">
      
      <div onClick={() => navigate(targetUrl)} className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 cursor-pointer transition-colors group">
        <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">📖</div>
        <h4 className="text-sky-200 text-sm font-medium">Study Chapter</h4>
        <p className="text-sky-200/50 text-xs mt-1">Jump to related module</p>
      </div>
      
      <div onClick={() => navigate(targetUrl)} className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 cursor-pointer transition-colors group">
        <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">✍️</div>
        <h4 className="text-yellow-200 text-sm font-medium">Practice PYQs</h4>
        <p className="text-yellow-200/50 text-xs mt-1">Solve relevant questions</p>
      </div>
      
      <div onClick={() => navigate(targetUrl)} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 cursor-pointer transition-colors group">
        <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">📝</div>
        <h4 className="text-emerald-200 text-sm font-medium">Quick Notes</h4>
        <p className="text-emerald-200/50 text-xs mt-1">Review formulas & concepts</p>
      </div>
      
    </div>
  );
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || "";
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const hasProcessedInitialQuery = useRef(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: "I'm connected and ready. Ask me any JEE concept, and I'll break it down for you.",
      showActions: false,
      routeData: null
    }
  ]);

  useEffect(() => {
    if (initialQuery && !hasProcessedInitialQuery.current) {
      hasProcessedInitialQuery.current = true; 
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleInitialQuery = (query) => {
    const userMsg = { id: Date.now(), role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    fetchAIResponse(query);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    fetchAIResponse(input);
  };

  const fetchAIResponse = async (userText) => {
    setIsTyping(true);
    
    if (!genAI) {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1, role: 'ai', showActions: false,
        text: "⚠️ **API Key Missing!** Please add your `VITE_GEMINI_API_KEY` to your `.env` file."
      }]);
      setIsTyping(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // UPGRADED PROMPT: We inject a map of your syllabus and instruct it to append a <ROUTE> tag.
      const prompt = `
        You are an expert, empathetic JEE (Joint Entrance Examination) tutor. 
        A student asks: "${userText}"
        Provide a highly accurate, concise, and structured explanation. 
        CRITICAL: Use LaTeX enclosed in single dollar signs ($math$) for inline math and double dollar signs ($$math$$) for block equations. 
        Keep the response under 300 words. Focus on core concepts.

        AT THE VERY END of your response, you MUST include a routing tag based on the closest matching subject and chapter from this syllabus map:
        Physics: p_u1 (Units), p_u2 (Kinematics), p_u3 (Laws of Motion), p_u4 (Work/Energy), p_u5 (Rotational Motion), p_u11 (Electrostatics), p_u16 (Optics).
        Chemistry: c_u1 (Basic Concepts), c_u2 (Atomic Structure), c_u4 (Thermodynamics), c_u5 (Solutions), c_u16 (Haloalkanes).
        Math: m_u1 (Sets/Relations), m_u2 (Complex Numbers), m_u3 (Matrices), m_u8 (Calculus).

        Format the tag EXACTLY like this (hidden from the user):
        <ROUTE>{"subject": "physics", "chapter": "p_u5"}</ROUTE>
      `;

      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      let parsedRouteData = null;

      // PARSING LOGIC: Extract the <ROUTE> tag using Regex
      const routeMatch = responseText.match(/<ROUTE>(.*?)<\/ROUTE>/);
      if (routeMatch) {
        try {
          parsedRouteData = JSON.parse(routeMatch[1]);
        } catch(e) {
          console.error("Failed to parse routing JSON:", e);
        }
        // Remove the ugly tag from the text so the user never sees it
        responseText = responseText.replace(/<ROUTE>.*?<\/ROUTE>/, '').trim();
      }

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: responseText,
        showActions: true,
        routeData: parsedRouteData // Pass the parsed data into the message state
      }]);

    } catch (error) {
      console.error("AI Error Triggered:", error.message);
      
      if (error.message.includes("404")) {
        try {
          console.log("🔍 404 Detected. Fetching your allowed models directly from Google...");
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
          const data = await response.json();
          if (data.models) {
            const validModels = data.models
              .filter(m => m.supportedGenerationMethods.includes("generateContent"))
              .map(m => m.name.replace('models/', ''));
            console.log("✅ SUCCESS! Your API key has access to these models:", validModels);
          }
        } catch (fetchErr) {
          console.error("Could not fetch model list:", fetchErr);
        }
      }

      setMessages((prev) => [...prev, {
        id: Date.now() + 1, role: 'ai', showActions: false,
        text: "⚠️ **Model Access Error.** Please press **F12** to open your browser Developer Console. I have printed the exact list of models your API key is allowed to use. Update your code with one of those names!"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased">
      
      <nav style={defaultGlass} className="flex items-center justify-between px-10 py-4 shrink-0 rounded-b-3xl mx-3 shadow-lg z-50 relative">
        <div className="text-2xl font-semibold tracking-wider text-white flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
          Zen<span className="text-sky-300 font-extralight">JEE</span>
        </div>
        <button onClick={() => navigate('/')} className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 text-sm tracking-wide text-sky-50">
          ← Back to Dashboard
        </button>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full animate-fade-in-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            
            {msg.role === 'ai' && (
              <div className="mr-3 mt-1 shrink-0 p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 h-10 w-10 flex items-center justify-center">
                <SparkleDoodle />
              </div>
            )}

            <div 
              style={msg.role === 'user' ? userGlass : aiGlass}
              className={`p-6 shadow-lg max-w-[85%] ${
                msg.role === 'user' 
                  ? 'rounded-3xl rounded-tr-sm text-sky-50 text-base leading-relaxed' 
                  : 'rounded-3xl rounded-tl-sm w-full'
              }`}
            >
              
              <div className={msg.role === 'ai' ? 'text-indigo-50/90 prose prose-invert prose-p:leading-relaxed max-w-none' : ''}>
                {msg.role === 'ai' ? (
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>

              {/* ACTION BOXES: Now passing the extracted routeData */}
              {msg.showActions && (
                <ActionBoxes navigate={navigate} routeData={msg.routeData} />
              )}

            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex w-full justify-start animate-fade-in-up">
            <div className="mr-3 mt-1 shrink-0 p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 h-10 w-10 flex items-center justify-center">
              <SparkleDoodle />
            </div>
            <div style={aiGlass} className="p-5 rounded-3xl rounded-tl-sm flex items-center gap-1.5 h-14">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </main>

      <div className="w-full shrink-0 pb-6 pt-2 px-4 bg-gradient-to-t from-black via-black to-transparent">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up question..."
            style={defaultGlass}
            className="w-full pl-6 pr-14 py-4 rounded-full text-base outline-none focus:border-indigo-400/50 transition-all duration-300 placeholder-white/20 text-white shadow-xl bg-black/40"
            autoFocus
          />
          <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 p-3 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <SendIcon />
          </button>
        </form>
        <div className="text-center mt-3 text-xs text-white/30 font-mono">
          AI can make mistakes. Verify important formulas.
        </div>
      </div>
    </div>
  );
}