import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.js';

const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userClass, setUserClass] = useState('class12');
  const [targetExam, setTargetExam] = useState('mains');

  useEffect(() => {
    if (authService.getCurrentUser()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await authService.login(email, password);
      } else {
        if (!name.trim()) throw new Error("Name is required.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        await authService.register(name, email, password, userClass, targetExam);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#050810] text-gray-100 font-sans selection:bg-indigo-500/30">
      
      {/* LEFT SIDE: Branding / Graphics */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden bg-gradient-to-br from-[#000a24] to-[#050810] border-r border-white/5">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md">
          <h1 className="text-5xl font-bold tracking-wider text-white mb-6">
            Zen<span className="text-sky-400 font-extralight">JEE</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed mb-10">
            Your autonomous AI tutor. Master the syllabus, target your weaknesses, and conquer the JEE with data-driven precision.
          </p>
          
          <div className="flex flex-col gap-4">
            <div style={getGlassStyle(255,255,255, 0.02, 0.05)} className="p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">⚡</div>
              <div>
                <div className="font-bold text-white/90">Autonomous Planner</div>
                <div className="text-xs text-white/50">AI-driven daily study schedules</div>
              </div>
            </div>
            <div style={getGlassStyle(255,255,255, 0.02, 0.05)} className="p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400">🧠</div>
              <div>
                <div className="font-bold text-white/90">Spaced Repetition</div>
                <div className="text-xs text-white/50">Never forget a concept again</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div style={getGlassStyle(255,255,255, 0.03, 0.08)} className="w-full max-w-md p-10 rounded-3xl shadow-2xl relative z-10 backdrop-blur-xl">
          
          <div className="lg:hidden text-3xl font-bold tracking-wider text-center text-white mb-8">
            Zen<span className="text-sky-400 font-extralight">JEE</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-white/50 mb-8">
            {isLogin ? 'Enter your details to access your study space.' : 'Start your journey to IIT today.'}
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Full Name</label>
                  <input 
                    type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rahul Kumar" 
                    className="bg-[#0b1121] border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Class</label>
                    <select value={userClass} onChange={(e) => setUserClass(e.target.value)} className="bg-[#0b1121] border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer">
                      <option value="class11">Class 11</option>
                      <option value="class12">Class 12</option>
                      <option value="dropper">Dropper</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Target Exam</label>
                    <select value={targetExam} onChange={(e) => setTargetExam(e.target.value)} className="bg-[#0b1121] border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer">
                      <option value="mains">JEE Main</option>
                      <option value="advanced">JEE Advanced</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Email Address</label>
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="student@jee.com" 
                className="bg-[#0b1121] border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center pr-1">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Password</label>
              </div>
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" 
                className="bg-[#0b1121] border border-white/10 focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="mt-4 w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] disabled:opacity-50 flex justify-center items-center h-[52px]"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-white/50">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}