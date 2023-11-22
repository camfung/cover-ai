import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ListDisplayComponent from './components/ListDisplayComponent';
import SongsDataGrid from './components/SongsDataGrid';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/playlists" element={<ListDisplayComponent />} />
        <Route path="/playlist/:id" element={<SongsDataGrid />} />
      </Routes>
    </div>
  );
}

export default App;
