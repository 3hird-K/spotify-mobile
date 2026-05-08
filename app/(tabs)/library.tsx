import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { ListFilter, Grid2X2, LayoutGrid, List } from 'lucide-react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function LibraryTab() {
  const insets = useSafeAreaInsets();
  const [isGridView, setIsGridView] = useState(true);

  const PLAYLISTS = [
    { id: 'l1', title: 'Liked Songs', subtitle: '0 liked songs', type: 'liked', color: ['#450af5', '#8e8ee5'] },
  ];

  const RECENTLY_PLAYED: any[] = [];

  return (
    <View className="flex-1 bg-black dark">
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ 
          paddingTop: insets.top + 20,
          paddingBottom: 160 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-4 mb-8 flex-row items-center justify-between">
          <Text className="text-4xl font-black text-white">Your Library</Text>
          <Pressable 
            onPress={() => setIsGridView(!isGridView)}
            className="w-10 h-10 items-center justify-center bg-[#121212] rounded-full border border-white/5"
          >
            {isGridView ? <List size={20} color="white" /> : <LayoutGrid size={20} color="white" />}
          </Pressable>
        </View>

        {/* Playlists & Liked Songs Section */}
        <View className="mb-10">
          <Text className="text-xl font-black text-white px-4 mb-5">Playlists & Liked Songs</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {PLAYLISTS.map((item: any) => (
              <Pressable key={item.id} className="w-[140px]">
                {item.type === 'liked' ? (
                  <LinearGradient
                    colors={item.color as any}
                    className="w-[140px] h-[140px] rounded-2xl p-4 justify-end relative"
                  >
                     <View className="absolute top-4 right-4 opacity-40">
                        <HeartIcon size={32} />
                     </View>
                     <Text className="text-white font-black text-lg">Liked Songs</Text>
                     <Text className="text-white/70 text-[10px] mt-1">{item.subtitle}</Text>
                  </LinearGradient>
                ) : (
                  <View className="w-[140px] bg-[#121212] rounded-2xl p-3 border border-white/5">
                    <Image source={{ uri: item.image }} className="w-full aspect-square rounded-xl" />
                    <Text className="text-white font-black text-[12px] mt-3" numberOfLines={1}>{item.title}</Text>
                    <Text className="text-gray-500 text-[10px] mt-1">{item.subtitle}</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Recently Played Section */}
        {RECENTLY_PLAYED.length > 0 && (
          <View className="px-4">
            <Text className="text-xl font-black text-white mb-5">Recently Played</Text>
            <Animated.View 
              layout={Layout.springify()}
              className={isGridView ? "flex-row flex-wrap justify-between gap-y-6" : "gap-y-5"}
            >
              {RECENTLY_PLAYED.map((item, index) => (
                <Pressable 
                  key={item.id} 
                  className={isGridView ? "w-[47.5%]" : "flex-row items-center gap-4"}
                >
                  <View className={isGridView ? "w-full aspect-square rounded-xl overflow-hidden bg-[#121212] border border-white/5" : "w-16 h-16 rounded-lg overflow-hidden bg-[#121212] border border-white/5"}>
                    <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  <View className={isGridView ? "mt-3" : "flex-1"}>
                    <Text className="text-white font-black text-[12px] leading-tight" numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text className="text-gray-500 text-[10px] mt-1">{item.subtitle}</Text>
                  </View>
                </Pressable>
              ))}
            </Animated.View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function HeartIcon({ size }: { size: number }) {
  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <View 
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: 'white', 
          borderRadius: size/2,
          opacity: 0.2
        }} 
        className="absolute"
      />
      <Text style={{ color: 'white', fontSize: size * 0.6 }}>♥</Text>
    </View>
  );
}
