import { Models } from "react-native-appwrite";

export interface UserDocument extends Models.Document {
  $id: string;
  username: string;
  email: string;
  avatar: string;
}