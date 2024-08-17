import React, { useState } from "react";
import { FlatList, ViewToken, ListRenderItemInfo } from "react-native";
import TrendingItem from "./TrendingItem";
import { PostItem } from "@/app/common/post-types";

interface TrendingProps {
  posts: PostItem[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<string>(
    posts.length > 0 ? posts[0].$id : ""
  );

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key as string);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }: ListRenderItemInfo<PostItem>) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ 
        x: 170, 
        y: 0 
      }}
    />
  );
};

export default Trending;