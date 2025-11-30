import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelDetails, getChannelVideos } from '../services/youtube';
import { ChannelItem, SearchResult } from '../types';
import VideoCard from '../components/VideoCard';

const Channel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [channel, setChannel] = useState<ChannelItem | null>(null);
  const [videos, setVideos] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (id) {
      Promise.all([
          getChannelDetails(id),
          getChannelVideos(id)
      ]).then(([chan, vids]) => {
          setChannel(chan);
          setVideos(vids);
      });
    }
  }, [id]);

  if (!channel) return <div className="p-8">Loading channel...</div>;

  return (
    <div className="flex flex-col">
        {/* Banner Area (Mock color if no banner) */}
        <div className="h-48 md:h-64 bg-gradient-to-b from-[#444] to-[#030303] flex items-end p-8">
            <div className="flex items-center gap-6">
                <img src={channel.snippet.thumbnails.medium.url} alt={channel.snippet.title} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#030303] shadow-xl" />
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">{channel.snippet.title}</h1>
                    <div className="flex items-center gap-2 text-[#AAAAAA] text-sm">
                        <span>{Number(channel.statistics?.subscriberCount).toLocaleString()} subscribers</span>
                        <span>•</span>
                        <span>{Number(channel.statistics?.videoCount).toLocaleString()} videos</span>
                    </div>
                    <div className="mt-4 flex gap-3">
                        <button className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200">Subscribe</button>
                        <button className="px-6 py-2 border border-[#ffffff33] font-medium rounded-full hover:bg-[#ffffff1a]">Shuffle</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-4 md:px-8 py-8">
            <h2 className="text-2xl font-bold mb-6">Uploads</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                 {videos.map(video => (
                     <VideoCard 
                        key={video.id.videoId} 
                        id={video.id.videoId!} 
                        snippet={video.snippet} 
                    />
                 ))}
            </div>
        </div>
    </div>
  );
};

export default Channel;