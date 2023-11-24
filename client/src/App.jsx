import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ListDisplayComponent from './components/ListDisplayComponent';
import SongsDataGrid from './components/SongsDataGrid';
import PlaylistPage from './components/PlaylistPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<LandingPage />} />
        <Route path="/playlists" element={<ListDisplayComponent />} />
        <Route path="/playlist/:id" element={<SongsDataGrid />} />
        <Route path="/makePlaylistCover" element={<PlaylistPage />} />
      </Routes>
    </div>
  );
}

export default App;
