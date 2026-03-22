import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx'; // Add .jsx
import Search from './pages/Search.jsx';       // Add .jsx
import Subject from './pages/Subject.jsx';     // Add .jsx
import Chapter from './pages/Chapter.jsx';     // Add .jsx

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The home path "/" loads the Dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* The "/search" path loads the Search results page */}
        <Route path="/search" element={<Search />} />
        <Route path="/subject/:subjectId" element={<Subject />} />
        <Route path="/subject/:subjectId/chapter/:chapterId" element={<Chapter />} />
      </Routes>
    </BrowserRouter>
  );
}