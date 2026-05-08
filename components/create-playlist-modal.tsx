import React from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { useUIStore } from '@/lib/context/ui-store';
import { Music, Users, X, FolderPlus } from 'lucide-react-native';
import { Portal } from '@rn-primitives/portal';

const { height } = Dimensions.get('window');

export function CreatePlaylistModal() {
  const { isCreatePlaylistOpen, closeCreatePlaylist } = useUIStore();

  if (!isCreatePlaylistOpen) return null;

  return (
    <Portal name="create-playlist" hostName="root">
      <View style={StyleSheet.absoluteFill} className="justify-end">
        {/* Backdrop */}
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={StyleSheet.absoluteFill}
          className="bg-black/80"
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeCreatePlaylist} />
        </Animated.View>

        {/* Modal Content */}
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          className="bg-[#282828] rounded-t-[32px] p-6 pb-12 shadow-2xl"
        >
          <View className="gap-6 mt-4">
            <OptionItem
              icon={<Music size={24} color="#B3B3B3" />}
              title="Playlist"
              description="Create a playlist with songs or episodes"
            />
            <OptionItem
              icon={<Users size={24} color="#B3B3B3" />}
              title="Collaborative playlist"
              description="Create a playlist together with friends"
            />
            <OptionItem
              icon={<BlendIcon />}
              title="Blend"
              description="Combine your friends' tastes into a playlist"
            />
            <OptionItem
              icon={<FolderPlus size={24} color="#B3B3B3" />}
              title="Folder"
              description="Organize your playlists by genre or mood"
            />
          </View>
        </Animated.View>
      </View>
    </Portal>
  );
}

function BlendIcon() {
  return (
    <View className="w-6 h-6 items-center justify-center">
      <View className="w-4 h-4 rounded-full border-2 border-[#B3B3B3] absolute left-0" />
      <View className="w-4 h-4 rounded-full border-2 border-[#B3B3B3] absolute right-0" />
    </View>
  );
}

function OptionItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Pressable className="flex-row items-center gap-4 active:opacity-60 px-2 py-1">
      <View className="w-14 h-14 bg-[#3E3E3E] items-center justify-center rounded-full">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-white font-bold text-lg">{title}</Text>
        <Text className="text-[#B3B3B3] text-sm mt-0.5" numberOfLines={2}>{description}</Text>
      </View>
    </Pressable>
  );
}
