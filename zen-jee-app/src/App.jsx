import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Subject from './pages/Subject';
import Profile from './pages/Profile';
import Planner from './pages/Planner';
import { Chapter } from './pages/Chapter.jsx';
import { PreviousQuestions } from './pages/PreviousQuestions.jsx'; 
import { ChapterQuestions } from './pages/ChapterQuestions.jsx';

// Import the new Mock Test Engine pages
import PreviousPapers from './pages/PreviousPapers'; 
import TestEngine from './pages/TestEngine';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        
        {/* PYQ Routes */}
        <Route path="/previous-questions" element={<PreviousQuestions />} />
        <Route path="/previous-questions/:subjectId/chapter/:chapterId" element={<ChapterQuestions />} /> 
        
        {/* Study Routes */}
        <Route path="/subject/:subjectId" element={<Subject />} />
        <Route path="/subject/:subjectId/chapter/:chapterId" element={<Chapter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/planner" element={<Planner />} />
        
        {/* Mock Test Routes */}
        <Route path="/previous-papers" element={<PreviousPapers />} />
        <Route path="/test/:testId" element={<TestEngine />} />
      </Routes>
    </BrowserRouter>
  );
}