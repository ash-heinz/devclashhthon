import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math'; 
import rehypeKatex from 'rehype-katex'; 
import 'katex/dist/katex.min.css';
import { aiService } from '../services/api.js'; 

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

// Direct PDF Links
const NCERT_LINKS = {
  physics: "https://ncert.nic.in/textbook/pdf/keph101.pdf",
  chemistry: "https://ncert.nic.in/textbook/pdf/kech101.pdf",
  mathematics: "https://ncert.nic.in/textbook/pdf/kemh101.pdf"
};

const ActionBoxes = ({ navigate, routeData }) => {
  const subject = routeData?.subject || 'physics';
  const chapter = routeData?.chapter || 'p_u2'; 
  const targetUrl = `/subject/${subject}/chapter/${chapter}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-indigo-500/20">
      <div onClick={() => navigate(targetUrl)} className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 cursor-pointer transition-colors group">
        <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">📖</div>
        <h4 className="text-sky-200 text-sm font-medium">Study Chapter</h4>
      </div>
      <div onClick={() => navigate(`/previous-questions/${subject}/chapter/${chapter}`)} className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 cursor-pointer transition-colors group">
        <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">✍️</div>
        <h4 className="text-yellow-200 text-sm font-medium">Practice PYQs</h4>
      </div>
      
      {/* Restored to an <a> tag that safely opens in a new tab */}
      <a href={NCERT_LINKS[subject] || 'https://ncert.nic.in'} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 cursor-pointer transition-colors group block">
        <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">📚</div>
        <h4 className="text-emerald-200 text-sm font-medium">NCERT PDF ↗</h4>
      </a>
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
      id: 1, role: 'ai', text: "I'm connected and ready. Ask me any JEE concept, and I'll break it down for you using NCERT as a reference.", showActions: false, routeData: null
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
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: query }]);
    fetchAIResponse(query);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: input }]);
    setInput('');
    fetchAIResponse(input);
  };

  const fetchAIResponse = async (userText) => {
    setIsTyping(true);

    try {
      const data = await aiService.generateChatResponse(userText);
      let responseText = data.response;
      let parsedRouteData = null;

      const routeMatch = responseText.match(/<ROUTE>(.*?)<\/ROUTE>/);
      if (routeMatch) {
        try { parsedRouteData = JSON.parse(routeMatch[1]); } catch(e) {}
        responseText = responseText.replace(/<ROUTE>.*?<\/ROUTE>/, '').trim();
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', text: responseText, showActions: true, routeData: parsedRouteData }]);

    } catch (error) {
      console.error(error);
      const isRateLimit = error.message?.includes('429') || error.status === 429;
      
      const errorMessage = isRateLimit 
        ? "⚠️ **Whoa, slow down!** I'm receiving too many requests right now. (Google's free AI tier limits us to 15 actions per minute). Please wait about 60 seconds and try asking again!"
        : "⚠️ Error connecting to backend server. Make sure your Node.js server is running!";

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', showActions: false, text: errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

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

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full animate-fade-in-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="mr-3 mt-1 shrink-0 p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 h-10 w-10 flex items-center justify-center">
                <SparkleDoodle />
              </div>
            )}
            <div style={msg.role === 'user' ? userGlass : aiGlass} className={`p-6 shadow-lg max-w-[85%] ${msg.role === 'user' ? 'rounded-3xl rounded-tr-sm text-sky-50 text-base leading-relaxed' : 'rounded-3xl rounded-tl-sm w-full'}`}>
              <div className={msg.role === 'ai' ? 'text-indigo-50/90 prose prose-invert prose-p:leading-relaxed max-w-none' : ''}>
                {msg.role === 'ai' ? <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{msg.text}</ReactMarkdown> : msg.text}
              </div>
              
              {msg.showActions && <ActionBoxes navigate={navigate} routeData={msg.routeData} />}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex w-full justify-start animate-fade-in-up">
            <div className="mr-3 mt-1 shrink-0 p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 h-10 w-10 flex items-center justify-center"><SparkleDoodle /></div>
            <div style={aiGlass} className="p-5 rounded-3xl rounded-tl-sm flex items-center gap-1.5 h-14">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </main>

      <div className="w-full shrink-0 pb-6 pt-2 px-4 bg-gradient-to-t from-black via-black to-transparent z-40">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a follow-up question..." style={defaultGlass} className="w-full pl-6 pr-14 py-4 rounded-full text-base outline-none focus:border-indigo-400/50 transition-all duration-300 placeholder-white/20 text-white shadow-xl bg-black/40" autoFocus />
          <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 p-3 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}