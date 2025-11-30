import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoDetails, getRelatedVideos } from '../services/youtube';
import VideoCard from '../components/VideoCard';
import { VideoItem, SearchResult } from '../types';
import { usePlayer } from '../context/PlayerContext';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, ListMusic } from 'lucide-react';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoItem | null>(null);
  const [related, setRelated] = useState<SearchResult[]>([]);
  const { playVideo, setIsPlaying } = usePlayer();
  const [activeTab, setActiveTab] = useState<'UP_NEXT' | 'LYRICS'>('UP_NEXT');

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        try {
          const vidDetails = await getVideoDetails(id);
          const relatedVids = await getRelatedVideos(id);
          setVideo(vidDetails);
          setRelated(relatedVids);

          if (vidDetails) {
              playVideo(id, vidDetails.snippet);
              setIsPlaying(true);
          }
        } catch (err) {
          console.error(err);
        }
      };
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!video) return <div className="h-full flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
        {/* Left/Top: Player Area */}
        <div className="flex-1 lg:p-8 p-0 flex flex-col overflow-y-auto">
            <div className="w-full aspect-video bg-black relative shadow-2xl lg:rounded-xl overflow-hidden">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&enablejsapi=1`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0"
                ></iframe>
            </div>
            
            <div className="mt-6 px-4 lg:px-0">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{video.snippet.title}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Link to={`/channel/${video.snippet.channelId}`} className="text-[#AAAAAA] hover:text-white font-medium">
                            {video.snippet.channelTitle}
                        </Link>
                        <span className="text-[#AAAAAA]">•</span>
                        <span className="text-[#AAAAAA]">{Number(video.statistics?.viewCount).toLocaleString()} views</span>
                         <span className="text-[#AAAAAA]">•</span>
                         <span className="text-[#AAAAAA]">{new Date(video.snippet.publishedAt).getFullYear()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                         <button className="flex items-center gap-2 px-4 py-2 bg-[#212121] rounded-full hover:bg-[#333] transition-colors">
                            <ThumbsUp size={18} />
                            <span className="text-sm font-medium">{Number(video.statistics?.likeCount).toLocaleString()}</span>
                         </button>
                         <button className="p-2 bg-[#212121] rounded-full hover:bg-[#333]">
                             <ThumbsDown size={18} />
                         </button>
                         <button className="flex items-center gap-2 px-4 py-2 bg-[#212121] rounded-full hover:bg-[#333]">
                             <Share2 size={18} />
                             <span className="hidden sm:inline text-sm">Share</span>
                         </button>
                         <button className="p-2 bg-[#212121] rounded-full hover:bg-[#333]">
                             <MoreHorizontal size={18} />
                         </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Right/Bottom: Queue/Lyrics */}
        <div className="lg:w-[400px] bg-[#030303] border-l border-[#1f1f1f] flex flex-col h-full">
            <div className="flex items-center border-b border-[#1f1f1f]">
                <button 
                    onClick={() => setActiveTab('UP_NEXT')}
                    className={`flex-1 py-4 text-sm font-medium uppercase tracking-wide ${activeTab === 'UP_NEXT' ? 'text-white border-b-2 border-white' : 'text-[#AAAAAA] hover:text-white'}`}
                >
                    Up Next
                </button>
                <button 
                    onClick={() => setActiveTab('LYRICS')}
                    className={`flex-1 py-4 text-sm font-medium uppercase tracking-wide ${activeTab === 'LYRICS' ? 'text-white border-b-2 border-white' : 'text-[#AAAAAA] hover:text-white'}`}
                >
                    Lyrics
                </button>
                <button 
                     className="flex-1 py-4 text-sm font-medium uppercase tracking-wide text-[#AAAAAA] hover:text-white"
                >
                    Related
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'UP_NEXT' ? (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-[#AAAAAA] uppercase">Autoplay</span>
                            <div className="w-8 h-4 bg-[#212121] rounded-full relative cursor-pointer">
                                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        {related.map((item, idx) => (
                             <VideoCard 
                                key={item.id.videoId || idx}
                                id={item.id.videoId!}
                                snippet={item.snippet}
                                variant="horizontal"
                             />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <ListMusic className="w-12 h-12 mx-auto text-[#AAAAAA] mb-4" />
                        <h3 className="text-lg font-bold">Lyrics not available</h3>
                        <p className="text-[#AAAAAA] text-sm mt-2">We couldn't find lyrics for this song.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Watch;