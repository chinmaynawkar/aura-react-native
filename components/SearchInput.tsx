import React, { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import icons from "@/constants/icons";

interface SearchInputProps {
  intialQuery?: string;
  placeholder?: string;
}

export default function SearchInput({ intialQuery = "" , placeholder }: SearchInputProps) {
  const pathname = usePathname(); // use pathname to check if the search input is in focus
  const [query, setQuery] = useState<string>(intialQuery);

  return (
    <View className="flex flex-row items-center space-x-4 
    w-full h-16 px-4 bg-black-100 rounded-2xl 
    border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor={'#CDCDE0'}
        onChangeText={(text) => setQuery(text)}
        autoFocus={pathname === "/search/[query]"}
      />
      <TouchableOpacity
        onPress={() => {
         if(query === '') {
          Alert.alert(
            'Missing Query',
            'Please input a search query'
          );
          return
         }

         if(pathname.startsWith('/search')) {
          router.setParams({ query });
         } else {
          router.push(`/search/${query}`);
         }
        }}
        >
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
  );
}