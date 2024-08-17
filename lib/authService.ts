import { ID } from 'react-native-appwrite';
import { account, avatars, databases } from './appwriteClient';
import { config } from './config';

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