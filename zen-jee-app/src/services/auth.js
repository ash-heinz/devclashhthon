// src/services/auth.js

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  register: async (name, email, password, userClass, targetExam) => {
    await delay(800); // Simulate network latency
    
    const users = JSON.parse(localStorage.getItem('zenjee_users') || '[]');
    if (users.find(u => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = { id: Date.now().toString(), name, email, password, userClass, targetExam };
    users.push(newUser);
    
    localStorage.setItem('zenjee_users', JSON.stringify(users));
    localStorage.setItem('zenjee_session', JSON.stringify(newUser));
    
    // Sync global app state
    localStorage.setItem('zenjee-class', userClass);
    localStorage.setItem('zenjee-exam', targetExam);
    localStorage.setItem('zenjee-name', name);
    
    return newUser;
  },

  login: async (email, password) => {
    await delay(800);
    
    const users = JSON.parse(localStorage.getItem('zenjee_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    localStorage.setItem('zenjee_session', JSON.stringify(user));
    
    // Sync global app state
    localStorage.setItem('zenjee-class', user.userClass || 'class12');
    localStorage.setItem('zenjee-exam', user.targetExam || 'mains');
    localStorage.setItem('zenjee-name', user.name);

    return user;
  },

  logout: () => {
    localStorage.removeItem('zenjee_session');
    localStorage.removeItem('zenjee-name');
  },

  getCurrentUser: () => {
    const session = localStorage.getItem('zenjee_session');
    return session ? JSON.parse(session) : null;
  }
};