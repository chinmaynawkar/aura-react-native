import { storage } from './appwriteClient';
import { config } from './config';
import { ID, ImageGravity, Query } from 'react-native-appwrite';
import { databases } from './appwriteClient';

/**
 * Get a file preview
 * @param fileId - The file ID
 * @param type - The file type (image or video)
 * @returns The URL of the file preview
 */
export const getFilePreview = async (fileId: any, type: any) => {
  let fileUrl;

  try {
      if (type === 'video') {
          fileUrl = storage.getFileView(config.storageId, fileId);
      } else if ( type === 'image') {
          fileUrl = storage.getFilePreview(config.storageId, fileId, 
            2000, 
            2000, 
            'top' as ImageGravity,
             100
            );
      } else {
          throw new Error('Invalid file type');
      }

      if(!fileUrl) throw new Error;

      return fileUrl;
  } catch (error) {
      throw new Error(error as any);
  }
}

/**
 * Upload a file to Appwrite
 * @param file - The file to upload
 * @param type - The type of file (image or video)
 * @returns The URL of the uploaded file
 */
export const uploadFile = async (file: any, type: any) => {
  if(!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest }

  try {
      const uploadedFile = await storage.createFile(
          config.storageId,
          ID.unique(),
          asset
      );

      const fileUrl = await getFilePreview(uploadedFile.$id, type);

      return fileUrl;
  } catch (error) {
      throw new Error(error as any);
  }
}

/**
 * Create a new video post
 * @param form - The form data containing the video title, thumbnail, video, and AI prompt
 * @returns The created video
 */
export const createVideo = async (form: any) => {
  try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
          uploadFile(form.thumbnail, 'image'),
          uploadFile(form.video, 'video'),
      ])

      const newPost = await databases.createDocument(
          config.databaseId,
          config.videoCollectionId,
          ID.unique(),
          {
              title: form.title,
              thumbnail: thumbnailUrl,
              prompt: form.prompt,
              video: videoUrl,
              creator: form.userId
          }
      )

      return newPost;
  } catch (error) {
      throw new Error(error as any)
  }
}

/**
 * Like a video post
 * @param videoId - The video ID
 * @param userId - The user's account ID
 * @returns The updated video post
 */
export const likeVideoPost = async(videoId: string, userId: string) => {

  try {
    const likes = await databases.listDocuments(
      config.databaseId,
      config.likesCollectionId,
      [
        Query.equal("video", videoId),
        Query.equal("user", userId),
      ]
    );

    if (likes.documents.length === 0) {
      await databases.createDocument(
        config.databaseId,
        config.likesCollectionId,
        ID.unique(),
        {
          video: videoId,
          user: userId,
        }
      );
    } else {
      throw new Error("You've already liked this video");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Unlike a video post
 * @param videoId - The video ID
 * @param userId - The user's account ID
 * @returns The updated video post
 */
export const unlikeVideoPost = async(videoId: string, userId: string) => {
  try {
    const likes = await databases.listDocuments(
      config.databaseId,
      config.likesCollectionId,
      [
        Query.equal("video", videoId),
        Query.equal("user", userId),
      ]
    );

    if (likes.documents.length > 0) {
      await databases.deleteDocument(
        config.databaseId,
        config.likesCollectionId,
        likes.documents[0].$id
      );
    } else {
      throw new Error("You haven't liked this video yet");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}