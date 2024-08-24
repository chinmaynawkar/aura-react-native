import { Models } from "react-native-appwrite";

export interface UserDocument extends Models.Document {
  $id: string;
  username: string;
  email: string;
  avatar: string;
}

interface VideoPost {
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator;
  videoId?: string;
  userId?: string;
}

interface Creator {
  username: string;
  avatar: string;
}

interface VideoCardProps {
  videoPost: VideoPost;
  userId?: string;
}

export type { VideoPost, Creator, VideoCardProps };