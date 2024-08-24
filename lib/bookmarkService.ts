import { AppwriteException,ID, Models, Query } from 'react-native-appwrite';
import { config } from './config';
import { databases } from './appwriteClient';

export interface UserDocument extends Models.Document {
  $id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface Bookmark {
  userId: string;
  videoId: string;
}

//retrieve all videos liked by a userId
export const getLikedVideos = async (userId: string) => {
  try {

      //console.log(userId);
      if(!userId) {
          throw new Error('User Id is required');
      }

      const bookmarks = await databases.listDocuments(
          config.databaseId,
          config.likesCollectionId,
          [
              Query.equal('userId', userId)
          ]
      );

      //check if bookmarks were found
      if(bookmarks.documents.length === 0){
          console.log("No bookmarks found for this user");
          return [];
      }

      //extract videos from bookmarks
      const videosIds = bookmarks.documents.map(doc => doc.videoId);
      console.log(videosIds)

      if(videosIds.length === 0) {
          throw new Error("No Video IDs found for this bookmark");
      }

      //Query the videos collection corresponding to these videosID
      const likedVideos = await databases.listDocuments(
          config.databaseId,
          config.videoCollectionId,
          [
              Query.equal('$id', videosIds)
          ]
      );

      return likedVideos.documents;

  } catch (error) {
      console.log((error as string))
      throw new Error(error as any);
      return [];
  }
}

//add or save a bookmark
export const addBookmark = async (userId: string, videoId: string): Promise<void> => {
  try {
      // validate inputs
      if(!userId || !videoId) {
          throw new Error('Both userId and videoID are required to add a bookmark');
      }

      //check if bookmark already exists
      const existingBookmarks = await databases.listDocuments(
          config.databaseId,
          config.likesCollectionId,
          [
              Query.equal('userId', userId),
              Query.equal('videoId', videoId)
          ]
      );

      if(existingBookmarks.documents.length > 0) {
          console.log('Bookmark already exists');
          return;
      }

      //create new bookmark
      const bookmark: Bookmark = {
          userId,
          videoId
      }

      await databases.createDocument(
          config.databaseId,
          config.likesCollectionId,
          ID.unique(),
          bookmark
      );

      console.log('Bookmark added successfully');


  } catch (error) {
      //handle specific Appwrite errors
      if (error instanceof AppwriteException) {
          console.error('Appwrite error:', error.message)
          // You can add specific handling for Appwrite errors here if needed
      } else {
          //General error handling
          console.error('Failed to add bookmark:', error);
      }

  }
}

//verify if video is saved for by a specific user
export const checkIfSaved = async (userId: string, videoId: string) => {
  try {

      if(!userId || !videoId){
          //they do not exist
          return;
      }

      const response = await databases.listDocuments(
          config.databaseId,
          config.likesCollectionId,
          [
              Query.equal('userId', userId),
              Query.equal('videoId', videoId)
          ]
      );

      if(response.documents.length > 0){
          return true;//video is already saved
      }
      
  } catch (error) {
      throw new Error(error as any)
  }
}