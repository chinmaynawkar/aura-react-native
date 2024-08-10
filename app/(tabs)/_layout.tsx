/**
 * This file is the main layout file for the app. It contains the Tabs component and the screens for each tab.
 * The Tabs component is used to navigate between screens and the screens are defined in the app/(tabs) folder.
 * Each screen has a corresponding file in the app/(tabs) folder.
 */

import { Tabs } from 'expo-router';
import React from 'react';
import TabBarIcon from '@/components/navigation/TabBarIcon';
import icons from '@/constants/icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#9BA1A6',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },

      }}>
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              icon={icons.home}
              color={color}
              name='Home'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={icons.bookmark}
              color={color}
              name='Bookmark'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
         name='create'
         options={{
           title: 'Create',
           tabBarIcon: ({ color, focused }) => (
             <TabBarIcon 
               icon={icons.plus}
               color={color}
               name='Create'
               focused={focused}
             />
           ),
         }}
       />
       <Tabs.Screen
         name='profile'
         options={{
           title: 'Profile',
           tabBarIcon: ({ color, focused }) => (
             <TabBarIcon 
               icon={icons.profile}
               color={color}
               name='Profile'
               focused={focused}
             />
           ),
         }}
       />
      
    </Tabs>
  );
}