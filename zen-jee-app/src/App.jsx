import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Subject from './pages/Subject';
import Chapter from './pages/Chapter';

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