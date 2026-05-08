import React from 'react';
import { View, Image, Pressable } from 'react-native'; // Removed Platform
import { Text } from '@/components/ui/text';
import { Heart, Play, Speaker } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export function MiniPlayer() {
  return (
    <Animated.View
      entering={FadeInUp.delay(500)}
      className="w-full h-[56px] bg-[#282828] rounded-lg overflow-hidden flex-row items-center px-3 shadow-2xl z-50"
    >
      {/* Album Art */}
      <Image
        source={{ uri: 'https://i.scdn.co/image/ab67616d0000b273b75411767355097722744883' }}
        className="w-10 h-10 rounded-md"
      />

      {/* Info */}
      <View className="flex-1 px-3">
        <Text className="text-white text-[13px] font-bold" numberOfLines={1}>
          Beauty And A Beat
        </Text>
        <View className="flex-row items-center gap-1">
          <Speaker size={10} color="#1DB954" fill="#1DB954" />
          <Text className="text-[#B3B3B3] text-[11px]" numberOfLines={1}>
            Justin Bieber
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View className="flex-row items-center gap-5">
        <Pressable className="active:scale-90">
          <Heart size={22} color="#1DB954" fill="#1DB954" />
        </Pressable>
        <Pressable className="active:scale-90">
          <Play size={24} color="white" fill="white" />
        </Pressable>
      </View>

      {/* Progress Bar */}
      <View className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <View className="h-full bg-white w-1/3" />
      </View>
    </Animated.View>
  );
}