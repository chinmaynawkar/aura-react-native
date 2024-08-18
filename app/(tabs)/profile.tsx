import React from 'react';
import { View, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getUserVideos, signOut } from '@/lib';
import { useRouter } from 'expo-router';
import VideoCard from '@/components/VideoCard';
import useAppwrite from '@/hooks/useAppwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import { icons } from '@/constants';
import { Image } from 'react-native';
import InfoBox from '@/components/InfoBox';

const Profile = () => {
  const { user,setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();
  const { data: posts, refetch } = useAppwrite(
    () => getUserVideos(user?.$id)
  );

  // console.log(JSON.stringify(query, null, 2));

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
    <SafeAreaView className="bg-primary h-full">
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <VideoCard
          title={item.title}
          thumbnail={item.thumbnail}
          video={item.video}
          creator={item.creator.username}
          avatar={item.creator.avatar}
          videoId={item.$id}
          userId={user?.$id}
        />
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos found for this profile"
        />
      )}
      ListHeaderComponent={() => (
        <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity
            onPress={handleSignOut}
            className="flex w-full items-end mb-10"
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode="cover"
            />
          </View>

          <InfoBox
            title={user?.username}
            containerStyles="mt-5"
            titleStyles="text-lg"
          />

          <View className="mt-5 flex flex-row">
            <InfoBox
              title={posts.length || 0}
              subtitle="Posts"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <InfoBox
              title="1.5k"
              subtitle="Followers"
              titleStyles="text-xl"
            />
          </View>
        </View>
      )}
    />
  </SafeAreaView>
  );
};

export default Profile;