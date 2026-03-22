// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Search from './pages/Search.jsx';
import Subject from './pages/Subject.jsx';
import { Chapter } from './pages/Chapter.jsx';
import { PreviousQuestions } from './pages/PreviousQuestions.jsx'; 
import { ChapterQuestions } from './pages/ChapterQuestions.jsx'; // <-- 1. Import the new page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        
        {/* PYQ Routes */}
        <Route path="/previous-questions" element={<PreviousQuestions />} />
        {/* 2. Add the dynamic route for the specific chapter's questions */}
        <Route path="/previous-questions/:subjectId/chapter/:chapterId" element={<ChapterQuestions />} /> 
        
        {/* Study Routes */}
        <Route path="/subject/:subjectId" element={<Subject />} />
        <Route path="/subject/:subjectId/chapter/:chapterId" element={<Chapter />} />
      </Routes>
    </BrowserRouter>
  );
}