import React, { useEffect, useState } from 'react';
import { getMostPopularVideos, searchVideos } from '../services/youtube';
import VideoCard from '../components/VideoCard';
import { VideoItem, SearchResult } from '../types';
import { PlayCircle, TrendingUp } from 'lucide-react';

const Explore: React.FC = () => {
  const [newReleases, setNewReleases] = useState<SearchResult[]>([]);
  const [trending, setTrending] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const [news, trends] = await Promise.all([
            searchVideos('new music video 2024', 4),
            getMostPopularVideos(20)
        ]);
        setNewReleases(news);
        setTrending(trends);
    };
    fetchData();
  }, []);

  return (
    <div className="px-4 md:px-8 py-6 space-y-12">
        <h1 className="text-3xl font-bold mb-8">Explore</h1>

        {/* New Releases Section */}
        <section>
            <div className="flex items-center gap-2 mb-4">
                <PlayCircle className="text-white" />
                <h2 className="text-2xl font-bold">New Releases</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newReleases.map(video => (
                    <div key={video.id.videoId} className="bg-[#212121] rounded-lg p-4 flex gap-4 hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                        <img src={video.snippet.thumbnails.medium.url} className="w-24 h-24 object-cover rounded" alt="" />
                        <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-lg line-clamp-1">{video.snippet.title}</h3>
                            <p className="text-[#AAAAAA] text-sm">{video.snippet.channelTitle}</p>
                            <span className="text-xs text-[#AAAAAA] mt-2">Single • 2024</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Top Charts */}
        <section>
             <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-white" />
                <h2 className="text-2xl font-bold">Top Songs</h2>
                <span className="text-[#AAAAAA] text-sm ml-2">Global</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                {trending.slice(0, 12).map((video, idx) => (
                    <VideoCard 
                        key={typeof video.id === 'string' ? video.id : video.id.videoId} 
                        id={typeof video.id === 'string' ? video.id : video.id.videoId} 
                        snippet={video.snippet}
                        variant="horizontal"
                        rank={idx + 1}
                    />
                ))}
            </div>
        </section>
        
        {/* Moods Link */}
        <section className="bg-[#212121] rounded-xl p-8 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-2">Moods & Genres</h2>
                <p className="text-[#AAAAAA]">Find music to match your vibe.</p>
            </div>
            <button className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200">
                View All
            </button>
        </section>
    </div>
  );
};

export default Explore;