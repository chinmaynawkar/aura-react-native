import { Query } from 'react-native-appwrite';
import { databases, account } from './appwriteClient';
import { config } from './config';

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