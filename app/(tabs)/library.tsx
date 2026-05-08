import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { Search, Plus, ListFilter, Grid2X2, ArrowUpDown, Pin } from 'lucide-react-native';
import { useAuthStore } from '@/lib/context/auth-store';
import { useUIStore } from '@/lib/context/ui-store';
import Animated, { FadeInUp, FadeIn, Layout } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const FILTERS = ['Playlists', 'Artists', 'Albums'];

export default function LibraryTab() {
  const { session } = useAuthStore();
  const { openProfileDrawer, openCreatePlaylist } = useUIStore(); // Added openCreatePlaylist
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  const libraryItems = [
    { id: '1', type: 'playlist', title: 'Liked Songs', subtitle: 'Playlist • 86 songs', image: 'https://misc.scdn.co/happier-than-ever-gradient.png', pinned: true },
    { id: '2', type: 'playlist', title: 'Deep Focus', subtitle: 'Playlist • Spotify', image: 'https://i.scdn.co/image/ab67706f0000bebbd967e56ba23737ec3093ca53' },
    { id: '3', type: 'playlist', title: 'Lo-Fi Beats', subtitle: 'Playlist • Lofi Girl', image: 'https://i.scdn.co/image/ab67706c0000bebb422998399587440409095697' },
    { id: '4', type: 'artist', title: 'Justin Bieber', subtitle: 'Artist', image: 'https://i.scdn.co/image/ab6761610000e5eb8ae7f23342d0912189a87d0c' },
    { id: '5', type: 'playlist', title: 'Chill Vibes', subtitle: 'Playlist • xMÂDMÂXx', image: 'https://i.scdn.co/image/ab67706c0000bebb9f170f612ca430156d6d45f4' },
    { id: '6', type: 'artist', title: 'Bruno Mars', subtitle: 'Artist', image: 'https://i.scdn.co/image/ab6761610000e5ebc361d36636735e5898d2489f' },
    { id: '7', type: 'playlist', title: 'Rap Caviar', subtitle: 'Playlist • Spotify', image: 'https://i.scdn.co/image/ab67706f0000bebb526a09990861183141f2a338' },
    { id: '8', type: 'artist', title: 'RINI', subtitle: 'Artist', image: 'https://i.scdn.co/image/ab6761610000e5eb03708a54d4850eccebc2319f' },
  ];

  return (
    <View className="flex-1 bg-background dark">
      {/* Header */}
      <View className="pt-14 px-4 pb-4">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3">
            <Pressable onPress={openProfileDrawer} className="active:scale-95">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-primary-foreground font-black text-xs">
                  {session?.user?.email?.charAt(0).toUpperCase()}
                </Text>
              </View>
            </Pressable>
            <Text className="text-foreground text-2xl font-black tracking-tighter">Your Library</Text>
          </View>
          <View className="flex-row items-center gap-5">
            <Search size={26} color="white" />
            <Pressable onPress={openCreatePlaylist}>
              <Plus size={28} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
          <View className="flex-row gap-2">
            {FILTERS.map((filter) => (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(activeFilter === filter ? null : filter)}
                className={`px-4 py-1.5 rounded-full border ${activeFilter === filter ? 'bg-primary border-primary' : 'bg-secondary border-transparent'}`}
              >
                <Text className={`text-xs font-bold ${activeFilter === filter ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {filter}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Sort & Layout Toggle */}
      <View className="flex-row items-center justify-between px-4 py-2 mb-2">
        <Pressable className="flex-row items-center gap-2 active:opacity-60">
          <ArrowUpDown size={14} color="white" className="text-foreground" />
          <Text className="text-foreground font-bold text-[11px] uppercase tracking-widest">Recents</Text>
        </Pressable>
        <Pressable onPress={() => setIsGridView(!isGridView)} className="active:scale-95 p-1">
          {isGridView ? <ListFilter size={20} color="white" className="text-foreground" /> : <Grid2X2 size={20} color="white" className="text-foreground" />}
        </Pressable>
      </View>

      {/* Library Content */}
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          layout={Layout.springify()}
          className={isGridView ? "flex-row flex-wrap justify-between" : "gap-4"}
        >
          {libraryItems.map((item, index) => (
            <LibraryItem
              key={item.id}
              {...item}
              isGrid={isGridView}
              index={index}
            />
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function LibraryItem({ title, subtitle, image, type, pinned, isGrid, index }: any) {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 50).duration(400)}
      className={isGrid ? "w-[48%] mb-6" : "flex-row items-center gap-3"}
    >
      <Pressable className={isGrid ? "w-full" : "flex-row items-center flex-1"}>
        <View className={isGrid ? "w-full aspect-square mb-2.5" : "w-16 h-16 mr-3"}>
          <Image
            source={{ uri: image }}
            className={`w-full h-full ${type === 'artist' ? 'rounded-full' : 'rounded-lg'}`}
            resizeMode="cover"
          />
        </View>
        <View className={isGrid ? "px-1" : "flex-1"}>
          <Text className="text-foreground font-bold text-sm" numberOfLines={1}>{title}</Text>
          <View className="flex-row items-center gap-1.5 mt-0.5">
            {pinned && (
              <View className="rotate-45">
                <Pin size={10} color="#1DB954" fill="#1DB954" />
              </View>
            )}
            <Text className="text-muted-foreground text-xs font-medium" numberOfLines={1}>
              {pinned && "Pinned • "}{subtitle}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
