import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayCircle, MoreVertical } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Snippet } from '../types';

interface VideoCardProps {
  id: string;
  snippet: Snippet;
  variant?: 'vertical' | 'horizontal' | 'compact' | 'album';
  rank?: number;
  subtitle?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, snippet, variant = 'vertical', rank, subtitle }) => {
  const { playVideo } = usePlayer();
  const navigate = useNavigate();

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playVideo(id, snippet);
  };

  const handleNavigate = () => {
     navigate(`/watch/${id}`);
  }

  // Quick Picks Style (Small square, text right)
  if (variant === 'compact') {
      return (
        <div onClick={handleNavigate} className="group flex items-center gap-3 p-2 rounded-md hover:bg-[#ffffff1a] cursor-pointer transition-colors w-full">
            <div className="relative flex-shrink-0 w-12 h-12 overflow-hidden rounded-[4px]">
                <img 
                    src={snippet.thumbnails.default?.url || snippet.thumbnails.medium.url} 
                    alt={snippet.title} 
                    className="w-full h-full object-cover group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle size={24} fill="white" className="text-black" />
                </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-white font-medium truncate text-sm">{snippet.title}</h3>
                <p className="text-[#AAAAAA] text-xs truncate">
                    {subtitle || `${snippet.channelTitle} • Song`}
                </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 p-2">
                <MoreVertical size={16} className="text-white" />
            </div>
        </div>
      );
  }

  // Album/Playlist Style (Large Square, Text below)
  if (variant === 'album') {
      return (
        <div onClick={handleNavigate} className="group flex flex-col gap-3 cursor-pointer w-[180px] sm:w-[200px] flex-shrink-0">
            <div className="relative aspect-square rounded-md overflow-hidden shadow-lg">
                <img 
                    src={snippet.thumbnails.high?.url || snippet.thumbnails.medium.url} 
                    alt={snippet.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={handlePlay} className="hover:scale-110 transition-transform">
                        <PlayCircle size={48} fill="white" className="text-black" />
                    </button>
                </div>
            </div>
            <div>
                <h3 className="text-white font-bold text-base truncate" title={snippet.title}>
                    {snippet.title}
                </h3>
                <p className="text-[#AAAAAA] text-sm truncate">
                    {subtitle || `Album • ${snippet.channelTitle}`}
                </p>
            </div>
        </div>
      )
  }

  // Search Result Style (Horizontal Rectangle)
  if (variant === 'horizontal') {
    return (
        <div onClick={handleNavigate} className="group flex items-center gap-4 p-2 rounded-md hover:bg-[#2a2a2a] cursor-pointer transition-colors w-full">
            {rank && <span className="text-gray-400 font-medium w-6 text-center">{rank}</span>}
            <div className="relative flex-shrink-0 w-32 aspect-video overflow-hidden rounded-md">
                <img 
                    src={snippet.thumbnails.medium.url} 
                    alt={snippet.title} 
                    className="w-full h-full object-cover group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={handlePlay} className="text-white hover:scale-110 transition-transform">
                        <PlayCircle size={32} fill="white" className="text-black" />
                    </button>
                </div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-white font-medium truncate text-sm sm:text-base">{snippet.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm truncate hover:underline">
                    {subtitle || snippet.channelTitle}
                </p>
            </div>
        </div>
    )
  }

  // Standard Video Style (Vertical Rectangle)
  return (
    <div onClick={handleNavigate} className="group flex flex-col gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors w-full sm:w-[220px]">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img 
          src={snippet.thumbnails.high?.url || snippet.thumbnails.medium.url} 
          alt={snippet.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button onClick={handlePlay} className="text-white hover:scale-110 transition-transform">
                <PlayCircle size={48} fill="white" className="text-black" />
            </button>
        </div>
      </div>
      <div>
        <h3 className="text-white font-medium line-clamp-2 leading-tight mb-1" title={snippet.title}>
          {snippet.title}
        </h3>
        <p className="text-[#AAAAAA] text-sm truncate">
           <Link to={`/channel/${snippet.channelId}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
                {subtitle || snippet.channelTitle}
           </Link>
        </p>
      </div>
    </div>
  );
};

export default VideoCard;