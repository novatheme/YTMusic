import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Compass, Library, Search, Menu, Play, Pause, SkipBack, SkipForward, Music2, Plus, CircleArrowUp, Clock, ListMusic, Cast, MoreVertical } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { currentVideo, isPlaying, togglePlay } = usePlayer();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Library, label: 'Library', path: '/playlist' },
    { icon: CircleArrowUp, label: 'Upgrade', path: '/upgrade' }, // Mock path
  ];

  return (
    <div className="flex h-screen bg-[#030303] text-white overflow-hidden font-sans">
      {/* Top Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#030303] flex items-center justify-between px-4 z-50 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4">
           <button onClick={toggleSidebar} className="p-2 hover:bg-[#ffffff1a] rounded-full text-white focus:outline-none">
              <Menu className="w-6 h-6" />
           </button>
           <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
               <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[8px] border-l-red-600 border-y-[5px] border-y-transparent ml-1"></div>
               </div>
               <span className="hidden sm:block font-bold text-xl tracking-tighter">Music</span>
           </div>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-[#AAAAAA] group-focus-within:text-white" />
              </div>
            <input
              type="text"
              placeholder="Search songs, albums, artists, podcasts"
              className="w-full bg-[#212121] text-white placeholder-[#AAAAAA] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
           <Cast className="w-6 h-6 text-[#AAAAAA] hover:text-white cursor-pointer hidden sm:block" />
           <MoreVertical className="w-6 h-6 text-[#AAAAAA] hover:text-white cursor-pointer hidden sm:block" />
           <button className="flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors">
              Sign in
           </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 pt-16 h-full w-full">
          
          {/* Sidebar */}
          <aside 
            className={`hidden md:flex flex-col bg-[#030303] border-r border-[#1f1f1f] transition-all duration-300 ease-in-out ${
                isSidebarExpanded ? 'w-[240px]' : 'w-[72px]'
            }`}
          >
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-5 px-3 py-2.5 rounded-md transition-colors whitespace-nowrap overflow-hidden ${
                      isActive ? 'bg-[#212121] text-white font-medium' : 'text-[#909090] hover:text-white hover:bg-[#ffffff1a]'
                    } ${!isSidebarExpanded ? 'justify-center px-0' : ''}`
                  }
                >
                  <item.icon size={24} className="flex-shrink-0" />
                  {isSidebarExpanded && <span className="text-sm truncate">{item.label}</span>}
                </NavLink>
              ))}

              {isSidebarExpanded && (
                  <>
                    <div className="my-3 border-t border-[#1f1f1f] mx-3"></div>
                    
                    <button className="flex items-center gap-4 px-3 py-2 text-white hover:bg-[#ffffff1a] rounded-md w-full text-left">
                        <div className="w-6 h-6 bg-[#ffffff1a] rounded-full flex items-center justify-center flex-shrink-0">
                            <Plus size={16} />
                        </div>
                        <span className="text-sm font-medium truncate">New playlist</span>
                    </button>

                    <div className="mt-4 px-3 space-y-3">
                         <div className="flex items-center gap-4 text-[#909090] hover:text-white cursor-pointer">
                            <Clock size={24} className="p-0.5" />
                            <div className="flex flex-col truncate">
                                <span className="text-sm font-medium truncate">Episodes for Later</span>
                                <span className="text-xs truncate">Auto playlist</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-4 text-[#909090] hover:text-white cursor-pointer">
                            <ListMusic size={24} className="p-0.5" />
                            <div className="flex flex-col truncate">
                                <span className="text-sm font-medium truncate">Your Likes</span>
                                <span className="text-xs truncate">Auto playlist</span>
                            </div>
                         </div>
                    </div>
                  </>
              )}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 relative flex flex-col min-w-0 bg-[#030303]">
             <div className="flex-1 overflow-y-auto pb-24 scroll-smooth">
                <Outlet />
             </div>
          </main>
      </div>

      {/* Bottom Player Bar - Fixed Overlay */}
      {currentVideo && (
        <div className="fixed bottom-0 left-0 right-0 h-[72px] bg-[#212121] border-t border-[#ffffff1a] flex items-center justify-between px-4 z-[100]">
            {/* Progress Bar (Mock - set to 0 as we don't have real time tracking yet) */}
            <div className="absolute top-0 left-0 h-[2px] bg-red-600 w-0 hover:h-[4px] transition-all cursor-pointer"></div>

            <div className="flex items-center gap-4 w-1/3 overflow-hidden">
                <div className="flex items-center gap-4">
                    <SkipBack size={20} className="text-[#AAAAAA] hover:text-white cursor-pointer lg:hidden" />
                    <img src={currentVideo.snippet.thumbnails.default.url} alt="art" className="w-10 h-10 rounded object-cover" />
                </div>
                <div className="flex flex-col truncate mr-2">
                    <span className="text-sm font-medium text-white truncate">{currentVideo.snippet.title}</span>
                    <span className="text-xs text-[#AAAAAA] truncate">{currentVideo.snippet.channelTitle}</span>
                </div>
            </div>

            <div className="flex items-center gap-6 justify-center flex-1">
                <SkipBack size={24} className="text-white cursor-pointer hidden sm:block hover:text-[#dedede]" />
                <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform text-black">
                    {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                </button>
                <SkipForward size={24} className="text-white cursor-pointer hover:text-[#dedede]" />
            </div>

            <div className="flex items-center gap-4 w-1/3 justify-end hidden sm:flex">
                {/* Removed fake timestamp */}
                <Music2 size={20} className="text-[#AAAAAA] hover:text-white cursor-pointer" />
            </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-12 bg-[#212121] flex justify-around items-center border-t border-[#ffffff1a] z-[100] pb-safe">
        {navItems.slice(0, 3).map((item) => (
            <NavLink key={item.path} to={item.path} className={({isActive}) => `flex flex-col items-center justify-center gap-1 w-full h-full ${isActive ? 'text-white' : 'text-[#909090]'}`}>
                <item.icon size={20} />
                <span className="text-[10px]">{item.label}</span>
            </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Layout;