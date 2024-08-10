import { StatusBar, Text, View } from 'react-native';
import type { StatusBarProps } from 'react-native';
import { Link } from 'expo-router'; // this is the link component to navigate to other screens
import { SafeAreaView } from 'react-native-safe-area-context';

const STYLES = ['default', 'dark-content', 'light-content'] as const;

export default function RootLayout() {
  return(
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView>
      <Text className="text-3xl font-bold">Welcome to Aura!</Text>
        <StatusBar barStyle={STYLES[0]} />
      </SafeAreaView>
      <Link href="/profile" className="text-blue-500 hover:text-blue-700">
        <Text> Go toProfile</Text>
      </Link>
    </View>
  );
}