import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import { Image } from 'react-native'
import CustomButton from '@/components/CustomButton'
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router'
import { createVideoPost } from '@/lib'
import { useGlobalContext } from '@/context/GlobalProvider'

interface FormState {
  title: string;
  video: { uri: string } | null;
  thumbnail: { uri: string } | null;
  prompt: string;
}

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (selectType: string) => {
    // Function to open media picker
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image'
        ? ['image/jpeg', 'image/png', 'image/gif']
        : ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } 
  };
  const handleCreateVideo = async () => {
    // Handle the creation of the video
    if(!form.prompt || !form.title || !form.video || !form.thumbnail) {
      Alert.alert('Error', 'Please fill all the fields');
    }
    setUploading(true);
    
    try {
      await createVideoPost({
        ...form,
         userId: user.$id
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {}
    finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        className="px-4 my-6">
          <Text className='text-2xl text-white font-psemibold'>
            Upload Video
          </Text>

          <FormField
            title='Video Title'
            value={form.title}
            placeholder='Enter your video title'
            handleChangeText={(text: string) => setForm({ ...form, title: text })}
            otherStyle='mt-5'
            />

            <View className='mt-2 space-y-2'>
              <Text className='text-base text-gray-100 font-pmedium'>
                Upload Video
              </Text>

              <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-3 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.video && form.thumbnail ? (
             <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border border-black-200 
              flex justify-center items-center border-2 border-black-200 flex-row space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100">
                    Choose a file to upload
                  </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
            title='AI Prompt'
            value={form.prompt}
            placeholder='Enter your AI prompt'
            handleChangeText={(text: string) => setForm({ ...form, prompt: text })}
            otherStyle='mt-5'
            />
            <CustomButton
              title="Submit & Publish"
              handlePress={handleCreateVideo}
              containerStyle="mt-7"
              isLoading={uploading}
              />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create