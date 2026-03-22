// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Search from './pages/Search.jsx';
import Subject from './pages/Subject.jsx';
import { Chapter } from './pages/Chapter.jsx';
import { PreviousQuestions } from './pages/PreviousQuestions.jsx'; // <-- Add this import

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/previous-questions" element={<PreviousQuestions />} /> {/* <-- Add this route */}
        <Route path="/subject/:subjectId" element={<Subject />} />
        <Route path="/subject/:subjectId/chapter/:chapterId" element={<Chapter />} />
      </Routes>
    </BrowserRouter>
  );
}