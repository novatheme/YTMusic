import React from 'react';
import { Plus } from 'lucide-react';

const Playlist: React.FC = () => {
  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-3xl font-bold mb-8">Library</h1>
      
      <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
          {['Playlists', 'Songs', 'Albums', 'Artists', 'Subscriptions'].map(tab => (
              <button key={tab} className="px-4 py-2 bg-[#212121] border border-[#ffffff1a] rounded-full text-sm font-medium hover:bg-[#333] transition-colors whitespace-nowrap">
                  {tab}
              </button>
          ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Create New */}
        <div className="flex flex-col gap-3 group cursor-pointer">
            <div className="aspect-square bg-[#212121] border border-[#ffffff1a] rounded-lg flex items-center justify-center group-hover:bg-[#333] transition-colors">
                <Plus size={48} className="text-[#AAAAAA] group-hover:text-white" />
            </div>
             <div>
                <h3 className="text-white font-medium">New playlist</h3>
            </div>
        </div>

        {/* Empty State / Sign In Prompt */}
        <div className="col-span-2 sm:col-span-3 md:col-span-4 flex items-center justify-center py-12 opacity-50">
            <p className="text-sm">Sign in to view your playlists</p>
        </div>
      </div>
    </div>
  );
};

export default Playlist;