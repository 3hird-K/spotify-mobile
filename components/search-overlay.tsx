import React from 'react';
import { View, Pressable, StyleSheet, TextInput, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { Search as SearchIcon, X, Clock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = React.useState('');

  const RECENT_SEARCHES = [
    { id: '1', title: 'Hyehwadong (or Sangmundong)', subtitle: 'Park Boram - Topic', image: 'https://i.ytimg.com/vi/D52_7nZ8S3Y/maxresdefault.jpg' },
    { id: '2', title: 'To You - Shin Hae Chul (Reply 1988 openi...', subtitle: 'Day Dreamer', image: 'https://i.ytimg.com/vi/W7t0T6z7T7Y/maxresdefault.jpg' },
    { id: '3', title: '[Full Album] Reply 1988 OST / 응답하라 1988 OST (O...', subtitle: 'Viet Tam Tran', image: 'https://i.ytimg.com/vi/f8Wn_h-mR1U/maxresdefault.jpg' },
    { id: '4', title: 'Kalapastangan - fitterkarma (Lyrics)', subtitle: 'OPMvoice', image: 'https://i.ytimg.com/vi/xHInL9m5yv4/maxresdefault.jpg' },
  ];

  if (!isOpen) return null;

  return (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut} 
      style={StyleSheet.absoluteFill} 
      className="bg-black/95 z-[200]"
    >
      <View style={{ paddingTop: insets.top + 10 }} className="flex-1">
        {/* Search Input Header */}
        <View className="px-4 flex-row items-center gap-3 mb-6">
          <View className="flex-1 bg-[#282828] h-12 rounded-full flex-row items-center px-4">
            <SearchIcon size={20} color="#B3B3B3" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search songs, artists..."
              placeholderTextColor="#B3B3B3"
              autoFocus
              className="flex-1 ml-3 text-white text-base font-medium"
              selectionColor="#1DB954"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')}>
                <X size={20} color="#B3B3B3" />
              </Pressable>
            )}
          </View>
          <Pressable onPress={onClose}>
            <Text className="text-white font-bold">Cancel</Text>
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-4">
          {!query ? (
            <>
              {RECENT_SEARCHES.length > 0 ? (
                <>
                  <Text className="text-white font-black text-xl mb-6">Recent searches</Text>
                  <View className="gap-5">
                    {RECENT_SEARCHES.map((item) => (
                      <Pressable key={item.id} className="flex-row items-center gap-4">
                        <Image source={{ uri: item.image }} className="w-14 h-14 rounded-md" />
                        <View className="flex-1">
                          <Text className="text-white font-bold text-[15px]" numberOfLines={1}>{item.title}</Text>
                          <Text className="text-gray-400 text-xs mt-1">{item.subtitle}</Text>
                        </View>
                        <X size={18} color="#666" />
                      </Pressable>
                    ))}
                  </View>
                </>
              ) : (
                <View className="flex-1 items-center justify-center pt-20">
                  <SearchIcon size={64} color="#282828" strokeWidth={1} />
                  <Text className="text-gray-400 text-center mt-6 px-10 leading-relaxed">
                    Search for music by title, artist, or album.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View className="items-center justify-center pt-20">
               <Text className="text-gray-400">Searching for "{query}"...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Animated.View>
  );
}
