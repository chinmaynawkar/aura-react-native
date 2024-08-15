import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import { signOut } from '@/lib';
import { useRouter } from 'expo-router';

const Profile = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
      Alert.alert('Success', "You've been logged out");
      router.replace('/signin');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl font-bold'>Profile</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Profile;