import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { likeVideoPost, unlikeVideoPost } from "@/lib";
import { router } from "expo-router";

type VideoCardProps = {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
  videoId: string; // Add videoId prop
  userId: string; // Add userId prop
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
  const [liked, setLiked] = useState<boolean>(false); // State for like status
  const handleLike = async () => {
    try {
      if (liked) {
        await unlikeVideoPost(videoId, userId);
        setLiked(false);
      } else {
        await likeVideoPost(videoId, userId);
        setLiked(true);
        router.push('/bookmark');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary 
          flex justify-center items-center p-0.5">
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
        </View>

        <TouchableOpacity onPress={handleLike} className="pt-2 mr-2">
          <Image 
            source={liked ? icons.heartFilled : icons.heartOutlined} 
            className="w-5 h-5" 
            resizeMode="contain" 
          />
        </TouchableOpacity>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};