import { Client, Account, Avatars, Databases } from 'react-native-appwrite';
import { config } from './config';

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

export { client };