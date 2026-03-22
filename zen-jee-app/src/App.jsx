import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Subject from './pages/Subject';
import Chapter from './pages/Chapter';
import Profile from './pages/Profile';
import Planner from './pages/Planner'; // 1. Import Planner

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/subject/:subjectId" element={<Subject />} />
        <Route path="/subject/:subjectId/chapter/:chapterId" element={<Chapter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/planner" element={<Planner />} /> {/* 2. Add Route */}
      </Routes>
    </BrowserRouter>
  );
}