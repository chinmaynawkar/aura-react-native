import React from 'react';
import { View, Image, Text } from 'react-native';

export interface TabBarIconProps {
  name: string;
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any; 
  focused?: boolean;
}

const TabBarIcon = ({ color, icon, focused, name }: TabBarIconProps) => {
  return (
    <View className='items-center justify-center'>
      <Image
        source={icon}
        resizeMode='contain'
        className='w-6 h-6'
        tintColor={color}
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

export default TabBarIcon;