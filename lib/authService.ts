import { ID, ImageGravity, Query } from 'react-native-appwrite';
import { account, avatars, databases, storage } from './appwriteClient';
import { config } from './config';
import { VideoPostForm } from '@/app/common/video-post-form';

/**
 * Create a new user account
 * @param email - The user's email
 * @param password - The user's password
 * @param username - The user's username
 * @returns A user object containing the user's account ID, email, username, and avatar URL
 */
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error("Account creation failed");
    }

    const avatarUrl = avatars.getInitials(newAccount.name);

    await signIn(email, password);

    /*
     * Create a new user document in the database
     * The user document contains the user's account ID, email, username, and avatar URL
     */
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

/**
 * Sign in a user with their email and password
 * @param email - The user's email
 * @param password - The user's password
 * @returns A session object containing the user's account ID, email, username, and avatar URL
 */
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) {
      throw new Error("Session creation failed");
    }
    return session;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

/**
 * Sign out a user
 * @returns A session object containing the user's account ID, email, username, and avatar URL
 */
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

/**
 * Get the current user's account information
 * @returns The current user's account information
 */
export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Get all posts from the database
 * @returns An array of post objects
 */
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Get all videos from the database
 * @returns An array of video objects
 */
export const getAllVideos = async () => {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return videos.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * Search videos by title
 * @param query - The search query
 * @returns An array of video objects
 */
export const searchVideos = async (query: string) => {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)]
    );
    return videos.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Get a file preview
 * @param fileId - The file ID
 * @param type - The file type (image or video)
 * @returns The URL of the file preview
 */
export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Upload a file to Appwrite
 * @param file - The file to upload
 * @param type - The type of file (image or video)
 * @returns The URL of the uploaded file
 */
const uploadFile = async (file: any, type: string) => {
  if(!file) return null;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await storage.getFilePreview(uploadedFile.$id, type);
    return fileUrl;

  } catch (error: any) {
    throw new Error(error);
  }
   
}

/**
 * Create a new video post
 * @param title - The title of the video
 * @param video - The video file
 * @param thumbnail - The thumbnail file
 * @param prompt - The AI prompt
 * @param userId - The user's account ID
 * @returns The created video post
 */
export const createVideoPost = async(form : any) => {
  try {
    const [thumbnailUrl , videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);
    
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
      }
    );
    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
}