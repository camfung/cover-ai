import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Playlists from './components/Playlists';
import SongsDataGrid from './components/SongsDataGrid';
import PlaylistPage from './components/PlaylistPage';
import "./App.css"
import StirThePot from './components/extraStuff/stirthepot';
import EnterQuestions from './components/extraStuff/EnterQuestions';
import ManageDecks from './components/extraStuff/ManageDecks';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<LandingPage />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlist/:id/:playlistTitle" element={<SongsDataGrid />} />
        <Route path="/makePlaylistCover" element={<PlaylistPage />} />
        <Route path="/stirthepot" element={<StirThePot />} />
        <Route path="/managedecks" element={<ManageDecks />} />
      </Routes>
    </div>
  );
}

export default App;
