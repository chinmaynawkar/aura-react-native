import { StatusBar, Text } from 'react-native';
import { Redirect, router } from 'expo-router'; // this is the link component to navigate to other screens
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ScrollView } from 'react-native';
import images from '@/constants/images';
import { View, Image } from 'react-native';
import ButtonComponent from '@/components/CustomButton';

const STYLES = ['default', 'dark-content', 'light-content'] as const;

export default function App() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
          <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with{' '}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>

            <Image
              source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where you can find the best content for your needs, from the most
            popular to the most exclusive.
          </Text>

          <ButtonComponent
            title="Don't Miss Out, Join Now"
            handlePress={() => router.push('/signin')}
            containerStyle="w-full mt-7"
            />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' barStyle='light-content' />
    </SafeAreaView>
  );
}