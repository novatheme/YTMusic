import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Explore from './pages/Explore';
import Playlist from './pages/Playlist';
import Channel from './pages/Channel';
import Moods from './pages/Moods';
import { PlayerProvider } from './context/PlayerContext';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="watch/:id" element={<Watch />} />
            <Route path="search" element={<Search />} />
            <Route path="explore" element={<Explore />} />
            <Route path="playlist" element={<Playlist />} />
            <Route path="channel/:id" element={<Channel />} />
            <Route path="moods" element={<Moods />} />
          </Route>
        </Routes>
      </Router>
    </PlayerProvider>
  );
};

export default App;