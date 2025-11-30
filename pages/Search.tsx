import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '../services/youtube';
import VideoCard from '../components/VideoCard';
import { SearchResult } from '../types';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Search for everything: video, channel, playlist
      searchVideos(query, 20, 'video,channel,playlist')
        .then(setResults)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className="px-4 md:px-8 py-6">
        <h2 className="text-xl text-[#AAAAAA] mb-6">Search results for "<span className="text-white">{query}</span>"</h2>
        
        {loading ? (
            <div className="text-center py-10">Searching...</div>
        ) : (
            <div className="space-y-4 max-w-4xl">
                 {/* Top Result Section could go here */}
                 
                 {/* Songs List */}
                 <div className="flex flex-col gap-2">
                    {results.map((item) => (
                        <div key={item.etag} className="border-b border-[#ffffff1a] last:border-0 pb-2 last:pb-0">
                             <VideoCard
                                id={item.id.videoId || item.id.channelId || item.id.playlistId || ''}
                                snippet={item.snippet}
                                variant="horizontal"
                             />
                        </div>
                    ))}
                 </div>
            </div>
        )}
    </div>
  );
};

export default Search;