/* eslint-disable @typescript-eslint/no-require-imports */
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import React from 'react';
import GlobalProvider from '@/context/GlobalProvider';

SplashScreen.preventAutoHideAsync(); // prevents the splash screen from hiding automatically

const RootLayout= () => {
  const [fontsLoaded, error] = useFonts({
    //TODO: Fix this font are not loading.
    
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if(error) throw error;
    //SplashScreen is imported from expo-splash-screen
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) 
    return null

    return (
      <GlobalProvider>
    <Stack>
      {/* to hide the header from the top of the screen */}
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      {/* <Stack.Screen name='/search/[query]' options={{ headerShown: false }} /> */}
    </Stack>
    </GlobalProvider>
    )
  }

export default RootLayout;