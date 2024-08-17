import { Query } from 'react-native-appwrite';
import { databases, account } from './appwriteClient';
import { config } from './config';

/**
 * Get the current user's account information
 * @returns The current user's account information
 *  */
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get().catch(() => null);
    if (!currentAccount) return null;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Get all videos created by a user
 * @param userId - The user's account ID
 * @returns An array of video objects
 */
export const getUserVideos = async (userId: string) => {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('creator', userId)]
    );
    return videos.documents;
  } catch (error: any) {
    throw new Error(error);
  }
}