// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/auth.js'; // <-- Import Auth Service

// Pages
import Login from './pages/Login.jsx'; // <-- Import Login
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Subject from './pages/Subject';
import Profile from './pages/Profile';
import Planner from './pages/Planner'; 
import { Chapter } from './pages/Chapter.jsx';
import { PreviousQuestions } from './pages/PreviousQuestions.jsx'; 
import { ChapterQuestions } from './pages/ChapterQuestions.jsx';
import DailyTest from './pages/DailyTest.jsx';

// A simple wrapper to protect routes
const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        
        <Route path="/previous-questions" element={<ProtectedRoute><PreviousQuestions /></ProtectedRoute>} />
        <Route path="/previous-questions/:subjectId/chapter/:chapterId" element={<ProtectedRoute><ChapterQuestions /></ProtectedRoute>} /> 
        
        <Route path="/subject/:subjectId" element={<ProtectedRoute><Subject /></ProtectedRoute>} />
        <Route path="/subject/:subjectId/chapter/:chapterId" element={<ProtectedRoute><Chapter /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/planner" element={<ProtectedRoute><Planner /></ProtectedRoute>} />
        <Route path="/daily-test" element={<ProtectedRoute><DailyTest /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}