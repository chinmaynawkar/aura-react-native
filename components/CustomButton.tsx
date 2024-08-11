import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export interface ButtonProps {
  title: string;
  handlePress: () => void;
  containerStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
}

const ButtonComponent = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center 
        ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg 
        ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent