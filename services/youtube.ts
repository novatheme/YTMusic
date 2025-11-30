import { BASE_URL, YOUTUBE_API_KEY, CATEGORIES } from '../constants';
import { APIResponse, VideoItem, SearchResult, ChannelItem, VideoCategory } from '../types';

const fetchFromAPI = async <T>(endpoint: string, params: Record<string, string>): Promise<APIResponse<T>> => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append('key', YOUTUBE_API_KEY);
  
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'API Request Failed');
  }

  return response.json();
};

export const getMostPopularVideos = async (maxResults = 20): Promise<VideoItem[]> => {
  const data = await fetchFromAPI<VideoItem>('videos', {
    part: 'snippet,statistics',
    chart: 'mostPopular',
    videoCategoryId: CATEGORIES.MUSIC,
    maxResults: maxResults.toString(),
    regionCode: 'US',
  });
  return data.items;
};

export const searchVideos = async (query: string, maxResults = 20, type = 'video'): Promise<SearchResult[]> => {
  const data = await fetchFromAPI<SearchResult>('search', {
    part: 'snippet',
    q: query,
    type: type,
    maxResults: maxResults.toString(),
  });
  return data.items;
};

export const searchPlaylists = async (query: string, maxResults = 10): Promise<SearchResult[]> => {
    const data = await fetchFromAPI<SearchResult>('search', {
        part: 'snippet',
        q: query,
        type: 'playlist',
        maxResults: maxResults.toString(),
    });
    return data.items;
}

export const getVideoDetails = async (videoId: string): Promise<VideoItem | null> => {
  const data = await fetchFromAPI<VideoItem>('videos', {
    part: 'snippet,statistics,contentDetails',
    id: videoId,
  });
  return data.items[0] || null;
};

export const getRelatedVideos = async (videoId: string, maxResults = 10): Promise<SearchResult[]> => {
  // relatedToVideoId is deprecated and often throws 400 Invalid Argument.
  // Fallback strategy: Fetch video details to get title, then search for similar videos.
  try {
      const video = await getVideoDetails(videoId);
      if (!video) return [];
      
      // Search for the video title + "official audio" or similar to find related music
      // or just the channel name + title
      const query = `${video.snippet.title} ${video.snippet.channelTitle}`;
      
      const data = await fetchFromAPI<SearchResult>('search', {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: maxResults.toString(),
      });
      
      // Filter out the current video if possible (client side)
      return data.items.filter(item => item.id.videoId !== videoId);
  } catch (e) {
      console.warn("Failed to fetch related videos", e);
      return [];
  }
};

export const getChannelDetails = async (channelId: string): Promise<ChannelItem | null> => {
  const data = await fetchFromAPI<ChannelItem>('channels', {
    part: 'snippet,statistics,contentDetails',
    id: channelId,
  });
  return data.items[0] || null;
};

export const getChannelVideos = async (channelId: string, maxResults = 20): Promise<SearchResult[]> => {
    const data = await fetchFromAPI<SearchResult>('search', {
        part: 'snippet',
        channelId: channelId,
        order: 'date',
        type: 'video',
        maxResults: maxResults.toString(),
    });
    return data.items;
}

export const getVideoCategories = async (): Promise<VideoCategory[]> => {
    const data = await fetchFromAPI<VideoCategory>('videoCategories', {
        part: 'snippet',
        regionCode: 'US',
    });
    // Filter broadly for demonstration (Music is 10)
    return data.items.filter(item => item.snippet.assignable);
}