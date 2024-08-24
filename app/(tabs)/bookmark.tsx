import { View, Text, RefreshControl, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import useAppwrite from '@/hooks/useAppwrite';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getAllVideos, getLikedVideos, getUserVideos } from '@/lib';
import SavedVideoCard from '@/components/SaveVideoComponent';
import { VideoCardProps } from '../common/common';

const Bookmark: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const authContext = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getLikedVideos(authContext?.user?.$id));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        //data = {[]} 
        data={posts}
        keyExtractor={(item) => item?.$id as string}
        renderItem={({ item }) => {
          const selectedAttributes: VideoCardProps['videoPost'] = {
            title: item.title,
            thumbnail: item.thumbnail,
            video: item.video,
            creator: {
              username: item.creator.username,
              avatar: item.creator.avatar
            },
          };

          return <SavedVideoCard videoPost={selectedAttributes} userId={authContext?.user?.$id} />
        }}
        ListHeaderComponent={() => (
          <View className='my-12 px-4 w-full '>
            <Text className='font-pmedium text-2xl text-white'>Saved Videos</Text>

            <View className='mt-5 mb-5'>
              <SearchInput placeholder='Search your saved videos' />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title='No saved videos found'
            subtitle='No saved videos found for this profile'
            showButton={false}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Bookmark