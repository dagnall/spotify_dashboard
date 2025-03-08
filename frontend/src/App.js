import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TopSongsPage from './components/TopSongsPage';
import AlbumsPage from './components/AlbumsPage';
import ArtistsPage from './components/ArtistsPage';
import CalendarPage from './components/CalendarPage';
import WorldMapPage from './components/WorldMapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/songs" element={<TopSongsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/world-map" element={<WorldMapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
