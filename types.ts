export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
  channelTitle: string;
  liveBroadcastContent?: string;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: string | VideoId; 
  snippet: Snippet;
  contentDetails?: {
    duration: string;
    dimension: string;
    definition: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export interface ChannelItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics?: {
    subscriberCount: string;
    videoCount: string;
  };
}

export interface PlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: {
    itemCount: number;
  };
}

export interface SearchResult {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: Snippet;
}

export interface VideoCategory {
    id: string;
    snippet: {
        title: string;
        assignable: boolean;
        channelId: string;
    }
}

export interface APIResponse<T> {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: T[];
}