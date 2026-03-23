// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Subject from './pages/Subject';
import Profile from './pages/Profile';
import PreviousPapers from './pages/PreviousPapers'; 
import TestEngine from './pages/TestEngine';
import Planner from './pages/Planner'; 
import { Chapter } from './pages/Chapter.jsx';
import { PreviousQuestions } from './pages/PreviousQuestions.jsx'; 
import { ChapterQuestions } from './pages/ChapterQuestions.jsx';
import DailyTest from './pages/DailyTest.jsx';
import Login from './pages/Login.jsx';
import CustomTestBuilder from './pages/CustomTestBuilder.jsx'; // <--- NEW IMPORT

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        
        <Route path="/previous-questions" element={<PreviousQuestions />} />
        <Route path="/previous-questions/:subjectId/chapter/:chapterId" element={<ChapterQuestions />} /> 
        
        <Route path="/subject/:subjectId" element={<Subject />} />
        <Route path="/subject/:subjectId/chapter/:chapterId" element={<Chapter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/planner" element={<Planner />} />
        
        <Route path="/previous-papers" element={<PreviousPapers />} />
        
        {/* NEW CUSTOM TEST BUILDER ROUTE */}
        <Route path="/custom-test-builder" element={<CustomTestBuilder />} /> 
        
        {/* EXISTING TEST ENGINE ROUTE */}
        <Route path="/test/:testId" element={<TestEngine />} />
        
        <Route path="/daily-test" element={<DailyTest />} />
      </Routes>
    </BrowserRouter>
  );
}