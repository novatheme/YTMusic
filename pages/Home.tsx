import React, { useEffect, useState } from 'react';
import { searchVideos, searchPlaylists } from '../services/youtube';
import VideoCard from '../components/VideoCard';
import { SearchResult } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [quickPicks, setQuickPicks] = useState<SearchResult[]>([]);
  const [albums, setAlbums] = useState<SearchResult[]>([]);
  const [musicVideos, setMusicVideos] = useState<SearchResult[]>([]);
  const [communityPlaylists, setCommunityPlaylists] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "Energize", "Relax", "Feel good", "Party", "Workout", "Commute", "Romance", "Sad", "Focus", "Sleep"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Explicitly request 'video' type for songs/music videos to avoid API errors
        const [quickData, albumData, musicVidData, playlistData] = await Promise.all([
            searchVideos('global top songs', 16, 'video'),
            searchPlaylists('popular albums', 10),
            searchVideos('popular music videos', 4, 'video'),
            searchPlaylists('community playlists', 10)
        ]);
        
        setQuickPicks(quickData);
        setAlbums(albumData);
        setMusicVideos(musicVidData);
        setCommunityPlaylists(playlistData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-[#AAAAAA]">Loading your music...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="px-4 md:px-8 py-6 space-y-12 pb-24">
      
      {/* Category Pills (Scrollable) */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 md:-mx-8 md:px-8 mb-2">
          {categories.map(cat => (
              <button key={cat} onClick={() => navigate(`/moods`)} className="flex-shrink-0 px-3 py-1.5 bg-[#ffffff1a] hover:bg-[#ffffff33] rounded-lg text-sm font-medium whitespace-nowrap transition-colors border border-transparent hover:border-[#ffffff1a]">
                  {cat}
              </button>
          ))}
      </div>

      {/* Quick Picks Section */}
      <section>
        <div className="flex items-end justify-between mb-4">
             <div>
                <div className="text-xs font-medium text-[#AAAAAA] uppercase tracking-wider mb-1">Start Radio from a song</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Quick picks</h2>
             </div>
             <div className="flex items-center gap-2">
                 <button className="px-3 py-1 text-sm font-medium border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a] transition-colors">Play all</button>
                 <div className="hidden sm:flex gap-2">
                    <button className="p-2 border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a] disabled:opacity-50"><ChevronLeft size={20} /></button>
                    <button className="p-2 border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a]"><ChevronRight size={20} /></button>
                 </div>
             </div>
        </div>
        
        {/* Grid Layout for Quick Picks (4 columns similar to screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
            {quickPicks.map((item) => (
                <VideoCard 
                    key={item.id.videoId}
                    id={item.id.videoId!}
                    snippet={item.snippet}
                    variant="compact"
                />
            ))}
        </div>
      </section>

      {/* Albums for you Section */}
      <section>
         <div className="flex items-center justify-between mb-4">
             <h2 className="text-3xl md:text-4xl font-bold text-white">Albums for you</h2>
             <div className="hidden sm:flex gap-2">
                 <button className="p-2 border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a] disabled:opacity-50"><ChevronLeft size={20} /></button>
                 <button className="p-2 border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a]"><ChevronRight size={20} /></button>
             </div>
        </div>
        
        {/* Horizontal Scroll for Albums */}
        <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
            {albums.map((item) => (
                <VideoCard
                    key={item.id.playlistId || item.id.videoId}
                    id={item.id.playlistId || item.id.videoId!}
                    snippet={item.snippet}
                    variant="album"
                />
            ))}
        </div>
      </section>

      {/* Music videos for you Section */}
      <section>
         <div className="flex items-center justify-between mb-4">
             <h2 className="text-3xl md:text-4xl font-bold text-white">Music videos for you</h2>
             <div className="flex items-center gap-2">
                 <button className="px-3 py-1 text-sm font-medium border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a] transition-colors">Play all</button>
                 <div className="hidden sm:flex gap-2">
                    <button className="p-2 border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a] disabled:opacity-50"><ChevronLeft size={20} /></button>
                    <button className="p-2 border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a]"><ChevronRight size={20} /></button>
                 </div>
             </div>
        </div>
        
        {/* Grid/List for Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {musicVideos.slice(0, 4).map((item) => (
                <VideoCard
                    key={item.id.videoId}
                    id={item.id.videoId!}
                    snippet={item.snippet}
                    // default vertical variant
                />
            ))}
        </div>
      </section>

      {/* From the community Section */}
      <section>
         <div className="flex items-center justify-between mb-4">
             <h2 className="text-3xl md:text-4xl font-bold text-white">From the community</h2>
             <div className="hidden sm:flex gap-2">
                 <button className="p-2 border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a] disabled:opacity-50"><ChevronLeft size={20} /></button>
                 <button className="p-2 border border-[#ffffff33] rounded-full hover:bg-[#ffffff1a]"><ChevronRight size={20} /></button>
             </div>
        </div>
        
        {/* Horizontal Scroll for Playlists */}
        <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
            {communityPlaylists.map((item) => (
                <VideoCard
                    key={item.id.playlistId}
                    id={item.id.playlistId!}
                    snippet={item.snippet}
                    variant="album"
                    subtitle={`Playlist • ${item.snippet.channelTitle}`}
                />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;