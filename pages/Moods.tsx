import React, { useEffect, useState } from 'react';
import { getVideoCategories } from '../services/youtube';
import { VideoCategory } from '../types';

const Moods: React.FC = () => {
    const [categories, setCategories] = useState<VideoCategory[]>([]);

    useEffect(() => {
        getVideoCategories().then(setCategories);
    }, []);

    // Manual list of moods for visuals since API returns generic categories
    const moods = [
        { title: 'Chill', color: 'bg-blue-600' },
        { title: 'Focus', color: 'bg-green-600' },
        { title: 'Workout', color: 'bg-red-600' },
        { title: 'Party', color: 'bg-purple-600' },
        { title: 'Sleep', color: 'bg-indigo-900' },
        { title: 'Commute', color: 'bg-yellow-600' },
        { title: 'Romance', color: 'bg-pink-600' },
        { title: 'Sad', color: 'bg-gray-600' },
    ];

    return (
        <div className="px-4 md:px-8 py-6">
            <h1 className="text-3xl font-bold mb-8">Moods & Genres</h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
                {moods.map(mood => (
                    <div key={mood.title} className={`${mood.color} h-24 rounded-lg flex items-center pl-4 cursor-pointer relative overflow-hidden group`}>
                         <h3 className="text-xl font-bold z-10">{mood.title}</h3>
                         <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">All Genres</h2>
            <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                    <span key={cat.id} className="px-4 py-2 bg-[#212121] border border-[#ffffff1a] rounded-lg text-sm text-[#AAAAAA] hover:text-white hover:border-white cursor-pointer transition-all">
                        {cat.snippet.title}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Moods;