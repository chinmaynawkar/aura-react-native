import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, TouchableWithoutFeedback } from "react-native";

import { icons } from "../constants";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { addBookmark, checkIfSaved } from "@/lib";
import { router } from "expo-router";

type VideoCardProps = {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
  videoId: string;
  userId: string;
};

export default function VideoCard({ 
  title, 
  creator, 
  avatar, 
  thumbnail, 
  video,
  videoId,
  userId
}: VideoCardProps) {
  const [play, setPlay] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const bookmarkVideo = async () => {
    try {
      await addBookmark(userId!, videoId!);
      Alert.alert('Success', 'Post Bookmarked Successfully');
    } catch (error) {
      Alert.alert('Error', (error as any).message);
    }
  };

  const handleOutsidePress = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const verifySavedState = async () => {
      try {
        const savedState = await checkIfSaved(userId!, videoId!);
        setIsSaved(!!savedState);
      } catch (error) {
        console.error('Error checking if video is saved:', error);
      }
    };

    verifySavedState();
  }, [userId, videoId]);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>

          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Image 
              source={icons.menu as any}
              className='w-5 h-5'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>

      {showMenu && (
  <TouchableWithoutFeedback onPress={handleOutsidePress}>
    <View className='absolute flex-col bg-black-200 space-y-4 px-6 py-4 justify-center items-start 
    rounded-xl right-5 top-12 z-20'>
      <TouchableOpacity 
        className='flex-row items-center justify-center space-x-2'
        onPress={bookmarkVideo}
        disabled={isSaved}
      >
        {!isSaved && (
          <Image 
            source={icons.bookmark as any}
            className='w-4 h-4'
            resizeMode='contain'
          />
        )}
        <Text className={`text-sm font-pmedium ${isSaved ? 'text-green-700' : 'text-gray-100'}`}>{isSaved ? 'Saved' : 'Save'}</Text>
      </TouchableOpacity>

      <TouchableOpacity className='flex-row items-center justify-center space-x-2'>
        <Image 
          source={icons.rightArrow as any}
          className='w-4 h-4'
          resizeMode='contain'
        />
        <Text className='text-sm font-pmedium text-gray-100 '>Delete</Text>
      </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
)}

      {play ? (
        <Video
          source={{ uri: video }}
          className='w-full h-60 rounded-xl mt-3' 
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay={play}
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if(status.isLoaded && !status.isBuffering && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => setPlay(!play)}
          className='w-full h-60 mt-3 relative justify-center items-center'>
          <Image 
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />
          <Image 
            source={icons.play as any}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  );
}