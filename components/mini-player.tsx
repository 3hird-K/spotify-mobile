import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Heart, Play, SkipBack, SkipForward, Pause, Speaker, Monitor } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export function MiniPlayer() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <Animated.View 
      entering={FadeInUp.delay(500)}
      className="w-full h-[60px] bg-[#282828] rounded-lg overflow-hidden flex-row items-center px-3 shadow-2xl relative"
    >
      {/* Album Art */}
      <Image 
        source={{ uri: 'https://i.ytimg.com/vi/f8Wn_h-mR1U/maxresdefault.jpg' }} 
        className="w-10 h-10 rounded-md"
      />
      
      {/* Info */}
      <View className="flex-1 px-3">
        <Text className="text-white text-[13px] font-bold" numberOfLines={1}>
          BTS '2.0' Dance Practice
        </Text>
        <View className="flex-row items-center">
           <View className="w-2.5 h-2.5 bg-[#1DB954] rounded-sm mr-1.5" />
           <Text className="text-[#B3B3B3] text-[11px]" numberOfLines={1}>
            Star Music
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View className="flex-row items-center gap-4 mr-2">
        <SkipBack size={22} color="white" fill="white" />
        <Pressable onPress={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <Pause size={28} color="white" fill="white" />
          ) : (
            <Play size={28} color="white" fill="white" />
          )}
        </Pressable>
        <SkipForward size={22} color="white" fill="white" />
      </View>

      <View className="flex-row items-center gap-4">
        <Pressable onPress={() => setIsLiked(!isLiked)}>
          <Heart 
            size={22} 
            color={isLiked ? "#1DB954" : "white"} 
            fill={isLiked ? "#1DB954" : "transparent"} 
          />
        </Pressable>
        <Monitor size={22} color="#B3B3B3" />
      </View>

      {/* Progress Bar */}
      <View className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <View className="h-full bg-white w-1/3" />
      </View>
    </Animated.View>
  );
}