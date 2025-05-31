import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SongsPage from './components/SongsPage';
import AlbumsPage from './components/AlbumsPage';
import ArtistsPage from './components/ArtistsPage';
import SongStatsPage from './components/SongStatsPage';
import ArtistStatsPage from './components/ArtistStatsPage';
import CalendarPage from './components/CalendarPage';
import WorldMapPage from './components/WorldMapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/song-stats" element={<SongStatsPage />} />
        <Route path="/artist-stats" element={<ArtistStatsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/world-map" element={<WorldMapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
