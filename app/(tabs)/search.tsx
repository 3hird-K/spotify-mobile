import React from 'react';
import { View, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function FollowingTab() {
  const insets = useSafeAreaInsets();

  const FOLLOWED_ARTISTS: any[] = [];

  const SUGGESTED_ARTISTS = [
    { id: 's1', name: 'Sabrina Carp...', image: 'https://i.scdn.co/image/ab6761610000e5eb214f3575404835697c461376' },
    { id: 's2', name: 'Bruno Mars', image: 'https://i.scdn.co/image/ab6761610000e5eb41ef1960205934e8971f496a' },
    { id: 's3', name: 'BINI', image: 'https://i.scdn.co/image/ab6761610000e5ebc361d36636735e5898d2489f' },
  ];

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
        <View className="px-4 mb-10">
          <Text className="text-4xl font-black text-white">Following</Text>
          <Text className="text-gray-400 text-base mt-2">
            Manage the artists you follow and discover new ones
          </Text>
        </View>

        {/* Followed Artists Section */}
        <View className="mb-10">
          {FOLLOWED_ARTISTS.length > 0 ? (
            <>
              <Text className="text-xl font-black text-white px-4 mb-5">Followed Artists</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              >
                {FOLLOWED_ARTISTS.map((artist) => (
                  <Pressable 
                    key={artist.id} 
                    className="w-[120px] bg-[#121212] rounded-2xl p-4 items-center border border-white/5"
                  >
                    <Image 
                      source={{ uri: artist.image }} 
                      className="w-20 h-20 rounded-full mb-3" 
                    />
                    <Text className="text-white font-black text-[12px] text-center" numberOfLines={1}>
                      {artist.name}
                    </Text>
                    <Text className="text-gray-500 text-[10px] mt-1">Artist</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </>
          ) : (
            <View className="px-4">
              <View className="bg-[#121212] rounded-3xl p-10 items-center justify-center border border-white/5">
                <Text className="text-white font-black text-xl text-center mb-2">Not following any artists yet</Text>
                <Text className="text-gray-500 text-sm text-center px-4 leading-relaxed">
                  Discover and follow your favorite artists to build your network.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Suggested Artists Section */}
        <View className="mb-10">
          <Text className="text-xl font-black text-white px-4 mb-5">Suggested artists for you</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {SUGGESTED_ARTISTS.map((artist) => (
              <Pressable 
                key={artist.id} 
                className="w-[140px] bg-[#121212] rounded-2xl p-5 items-center border border-white/5"
              >
                <Image 
                  source={{ uri: artist.image }} 
                  className="w-24 h-24 rounded-full mb-4" 
                />
                <Text className="text-white font-black text-[13px] text-center" numberOfLines={1}>
                  {artist.name}
                </Text>
                <Text className="text-gray-500 text-[10px] mt-1">Suggested Artist</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
