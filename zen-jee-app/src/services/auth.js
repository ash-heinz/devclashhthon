// src/services/auth.js

// This is a Mock Backend using LocalStorage to simulate a real database.
// When you build your real Node.js/Express backend, simply replace the 
// contents of these functions with fetch() or axios calls to your API!

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  register: async (name, email, password) => {
    await delay(800); // Simulate network latency
    
    // 1. Check if user already exists
    const users = JSON.parse(localStorage.getItem('zenjee_users') || '[]');
    if (users.find(u => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }

    // 2. Create new user (In a real backend, passwords would be hashed!)
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    
    // 3. Save to DB and establish session
    localStorage.setItem('zenjee_users', JSON.stringify(users));
    localStorage.setItem('zenjee_session', JSON.stringify(newUser));
    
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
    return user;
  },

  logout: () => {
    localStorage.removeItem('zenjee_session');
  },

  getCurrentUser: () => {
    const session = localStorage.getItem('zenjee_session');
    return session ? JSON.parse(session) : null;
  }
};