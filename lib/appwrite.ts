// import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

// // export const config = {
// //   endpoint: "https://cloud.appwrite.io/v1",
// //   platform: "com.chinmayprivate.aura",
// //   projectId: "66b8c2a9002678cd3e3f", // Your project ID
// //   storageId: "66b8c672002245270538",
// //   databaseId: "66b8c417002426b401cf",
// //   userCollectionId: "66b8c43d0036734ec4e2",
// //   videoCollectionId: "66b8c672002245270538",
// // };

// import {
//   APPWRITE_ENDPOINT,
//   APPWRITE_PLATFORM,
//   APPWRITE_PROJECT_ID,
//   APPWRITE_STORAGE_ID,
//   APPWRITE_DATABASE_ID,
//   APPWRITE_USER_COLLECTION_ID,
//   APPWRITE_VIDEO_COLLECTION_ID
// } from '@env';

// export const config = {
//   endpoint: APPWRITE_ENDPOINT,
//   platform: APPWRITE_PLATFORM,
//   projectId: APPWRITE_PROJECT_ID,
//   storageId: APPWRITE_STORAGE_ID,
//   databaseId: APPWRITE_DATABASE_ID,
//   userCollectionId: APPWRITE_USER_COLLECTION_ID,
//   videoCollectionId: APPWRITE_VIDEO_COLLECTION_ID,
// };

// // Init your React Native SDK
// const client = new Client();

// client
//     .setEndpoint('conffig.APPWRITE_ENDPOINT') // Your API Endpoint
//     .setProject('config.APPWRITE_PROJECT_ID') // Your project ID
//     .setPlatform('config.APPWRITE_PLATFORM') // Your platform ID

//     const account = new Account(client);
//     const avatars = new Avatars(client);
//     const databases = new Databases(client);

//     export const createUser = async (
//       email: string, password: string, username: string) => {
//       try {
//         const newAccout = await account.create(
//           ID.unique(),
//           email,
//           password,
//           username
//         );
    
//         if (!newAccout) {
//           throw new Error("Account creation failed");
//         }
    
//         const avatarUrl = avatars.getInitials(newAccout.name);
    
//         await signIn(email, password);
    
//         const newUser = await databases.createDocument(
//           config.databaseId,
//           config.userCollectionId,
//           ID.unique(),
//           {
//             accountId: newAccout.$id,
//             email,
//             username,
//             avatar: avatarUrl,
//           }
//         );
//         return newUser;
//       } catch (error: any) {
//         console.error(error);
//         throw new Error(error);
//       }
//     };
    
//     export const signIn = async (email: string, password: string) => {
//       try {
//         const session = await account.createEmailPasswordSession(email, password);
    
//         if (!session) {
//           throw new Error("Session creation failed");
//         }
//         return session;
//       } catch (error: any) {
//         console.error(error);
//         throw new Error(error);
//       }
//     };
    
//     export async function getAccount() {
//       try {
//         const currentAccount = await account.get();
    
//         return currentAccount;
//       } catch (error: any) {
//         throw new Error(error);
//       }
//     }
    
//     export async function getCurrentUser() {
//       try {
//         const currentAccount = await account.get().catch((e) => null);
//         if (!currentAccount) return null;
    
//         const currentUser = await databases.listDocuments(
//           config.databaseId,
//           config.userCollectionId,
//           [Query.equal("accountId", currentAccount.$id)]
//         );
    
//         if (!currentUser) throw Error;
    
//         return currentUser.documents[0];
//       } catch (error) {
//         console.log(error);
//         // return null;
//       }
//     }

//     export async function signOut() {
//       try {
//         const session = await account.deleteSession('current');
//         return session;
//       } catch (error: any) {
//         console.error(error);
//         throw new Error(error);
//       }
//     }

//     export { client, account, avatars };
