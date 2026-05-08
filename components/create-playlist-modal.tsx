import React from 'react';
import { View, Pressable, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { useUIStore } from '@/lib/context/ui-store';
import { Portal } from '@rn-primitives/portal';

export function CreatePlaylistModal() {
  const { isCreatePlaylistOpen, closeCreatePlaylist } = useUIStore();
  const [playlistName, setPlaylistName] = React.useState('');

  if (!isCreatePlaylistOpen) return null;

  return (
    <Portal name="create-playlist" hostName="root">
      <View style={StyleSheet.absoluteFill} className="justify-center items-center px-6">
        {/* Backdrop */}
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={StyleSheet.absoluteFill}
          className="bg-black/90"
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeCreatePlaylist} />
        </Animated.View>

        {/* Modal Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="w-full"
        >
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
            className="bg-[#282828] rounded-[24px] p-6 shadow-2xl items-center"
          >
            <Text className="text-white text-lg font-black text-center mb-6">
              Give your playlist a name
            </Text>

            <View className="w-full border-b border-primary/30 mb-8 pb-1">
              <TextInput
                value={playlistName}
                onChangeText={setPlaylistName}
                placeholder="My Playlist"
                placeholderTextColor="#666"
                autoFocus
                className="text-white text-2xl font-bold text-center"
                selectionColor="#1DB954"
              />
            </View>

            <View className="flex-row gap-3 w-full">
              <Pressable
                onPress={closeCreatePlaylist}
                className="flex-1 py-3 items-center justify-center rounded-full border border-white/10"
              >
                <Text className="text-white font-bold text-sm">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  closeCreatePlaylist();
                }}
                disabled={!playlistName.trim()}
                className={`flex-1 py-3 items-center justify-center rounded-full ${playlistName.trim() ? 'bg-primary' : 'bg-primary/20'}`}
              >
                <Text className={`font-bold text-sm ${playlistName.trim() ? 'text-black' : 'text-white/30'}`}>
                  Create
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Portal>
  );
}
