import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Playlists from './components/Playlists';
import SongsDataGrid from './components/SongsDataGrid';
import PlaylistPage from './components/PlaylistPage';
import "./App.css"
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<LandingPage />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlist/:id/:playlistTitle" element={<SongsDataGrid />} />
        <Route path="/makePlaylistCover" element={<PlaylistPage />} />
      </Routes>
    </div>
  );
}

export default App;
