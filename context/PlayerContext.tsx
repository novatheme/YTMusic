import React, { createContext, useContext, useState, ReactNode } from 'react';
import { VideoItem, Snippet } from '../types';

interface PlayingVideo {
  id: string;
  snippet: Snippet;
}

interface PlayerContextType {
  currentVideo: PlayingVideo | null;
  playVideo: (id: string, snippet: Snippet) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState<PlayingVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = (id: string, snippet: Snippet) => {
    setCurrentVideo({ id, snippet });
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <PlayerContext.Provider value={{ currentVideo, playVideo, isPlaying, setIsPlaying, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};