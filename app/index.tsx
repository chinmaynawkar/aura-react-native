import { StatusBar, Text, View } from 'react-native';
import { Link } from 'expo-router'; // this is the link component to navigate to other screens
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

const STYLES = ['default', 'dark-content', 'light-content'] as const;

export default function App() {
  return(
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView>
      <Text className="text-3xl font-pblack">Welcome to Aura!</Text>
        <StatusBar barStyle={STYLES[0]} />
      </SafeAreaView>
      <Link href="/home" className="text-blue-500 hover:text-blue-700">
        <Text> Go to Home</Text>
      </Link>
    </View>
  );
}