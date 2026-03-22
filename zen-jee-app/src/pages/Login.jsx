import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    password: '',
    studentClass: 'class12'
  });

  const handleInput = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Determine the name to display
    let displayName = studentData.name;
    
    // If they are just logging in, grab the part before the '@' in their email
    if (!isRegister && studentData.email) {
      const emailName = studentData.email.split('@')[0];
      // Capitalize the first letter
      displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }

    // 2. Persist class and name to localStorage to keep the app dynamic
    localStorage.setItem('zenjee-class', studentData.studentClass);
    localStorage.setItem('zenjee-name', displayName || 'Student');
    
    // 3. Navigate to dashboard
    navigate('/');
  };

  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-sky-400/50 transition-all placeholder-white/20 text-white mb-4";

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div 
        style={getGlassStyle(255, 255, 255, 0.04, 0.1)} 
        className="w-full max-w-md p-10 rounded-[2.5rem] shadow-2xl relative z-10 mx-4"
      >
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="text-4xl font-semibold tracking-wider text-white mb-2">
            Zen<span className="text-sky-300 font-extralight">JEE</span>
          </div>
          <p className="text-white/40 text-sm tracking-wide">Enter your flow state.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={inputStyle}
              onChange={handleInput}
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className={inputStyle}
            onChange={handleInput}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={inputStyle}
            onChange={handleInput}
            required
          />

          {/* Class Selection */}
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold ml-2">Select Your Batch</span>
            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 shadow-inner">
              {['class11', 'class12', 'dropper'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setStudentData({...studentData, studentClass: c})}
                  className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all uppercase ${
                    studentData.studentClass === c 
                    ? 'bg-sky-500/30 text-sky-200 border border-sky-500/30 shadow-lg' 
                    : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  {c.replace('class', 'Class ')}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 rounded-2xl bg-sky-500 text-black font-bold tracking-wider hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            {isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-white/40 text-sm hover:text-sky-300 transition-colors"
          >
            {isRegister ? 'Already have an account? Login' : 'New to ZenJEE? Create account'}
          </button>
        </div>
      </div>
    </div>
  );
}