import { View, Text } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import { Image } from 'react-native'
import CustomButton from './CustomButton';
import { router } from 'expo-router';

export interface EmptyStateProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}

const EmptyState = ({ title, subtitle, showButton = true }: EmptyStateProps) => {
  return (
    <View className='flex justify-center items-center px-4'>
      <Image
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />
      <Text
          className='text-sm font-pmedium text-gray-100'>
            {title}
          </Text>
      <Text
        className='text-xl text-center font-psemibold text-white mt-2'>
          {subtitle}
        </Text> 
        { showButton && (
        <CustomButton
          title='Create a Video'
          handlePress={() => router.push('/create')}
          containerStyle='w-full my-5'
          textStyle=''
          isLoading = {false}
        />
      )}
    </View>
  )
}

export default EmptyState