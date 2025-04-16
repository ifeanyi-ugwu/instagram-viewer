interface UserInfo {
  id: string;
  username: string;
  //profile_picture?: string;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: string;
  from: UserInfo;
  //user?: UserInfo;
  replies?: { data: Comment[] };
  parent_id?: string;
}

export interface Media {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  comments_count: number;
  like_count: number;
  username: string;
}
