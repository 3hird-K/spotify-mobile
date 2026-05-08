import { Text } from '@/components/ui/text';
import { View, ScrollView, Image, ActivityIndicator, Pressable, Platform, StyleSheet } from 'react-native';
import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { Play, Heart, Bell, Clock, Search, Menu, ListMusic, LogOut, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/lib/context/auth-store';
import { useUIStore } from '@/lib/context/ui-store';
import { ProfileIcon } from '@/components/profile-icon';
import { SearchOverlay } from '@/components/search-overlay';

export default function HomeTab() {
  const { initialized, session, signOut } = useAuthStore();
  const { openCreatePlaylist } = useUIStore();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = React.useState<boolean>(!initialized);
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [showMenu, setShowMenu] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (initialized) {
      setLoading(false);
    }
  }, [initialized]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  const FILTERS = ['All', 'Music', 'Podcasts'];

  const RECENT_ITEMS = [
    { id: '1', title: 'Liked Songs', image: 'https://i.scdn.co/image/ab67706f0000feaf2479e0066b1a9e7011d14902', color: '#5038A0' },
    { id: '2', title: 'PHraps', image: 'https://i.scdn.co/image/ab67706c0000bebb9f170f612ca430156d6d45f4' },
    { id: '3', title: 'K-Drama Ost', image: 'https://i.scdn.co/image/ab67616d0000b273b75411767355097722744883' },
    { id: '4', title: "Coders' Playlist", image: 'https://i.scdn.co/image/ab67706c0000bebb422998399587440409095697' },
  ];

  const RECOMMENDED = [
    { id: 'r1', title: 'Top Trending Spotify 2026 🤎 🟢 ~ Best Healin...', subtitle: 'JsVibes Music', image: 'https://i.ytimg.com/vi/D52_7nZ8S3Y/maxresdefault.jpg' },
    { id: 'r2', title: 'Bruno Mars - Risk It All [Official Music Video]', subtitle: 'Bruno Mars', image: 'https://i.ytimg.com/vi/W7t0T6z7T7Y/maxresdefault.jpg' },
  ];

  const MADE_FOR_YOU = [
    { id: 'm1', title: 'Justin Bieber - Baby ft....', subtitle: 'Mix featuring JustinBieberVEVO', image: 'https://i.scdn.co/image/ab67616d0000b273b75411767355097722744883' },
    { id: 'm2', title: 'Unreleased (Mahirap n...', subtitle: 'Mix featuring Ex Battalion Music', image: 'https://i.ytimg.com/vi/f8Wn_h-mR1U/maxresdefault.jpg' },
    { id: 'm3', title: 'Zae, Sica - I can be the...', subtitle: 'Mix featuring Zae', image: 'https://i.ytimg.com/vi/xHInL9m5yv4/maxresdefault.jpg' },
    { id: 'm4', title: '방탄이가방에...', subtitle: 'Mix featuring BTS', image: 'https://i.ytimg.com/vi/D52_7nZ8S3Y/maxresdefault.jpg' },
  ];

  return (
    <View className="flex-1 bg-black dark">
      {/* Background Gradient */}
      <View className="absolute top-0 left-0 right-0 h-64 bg-emerald-900/10" />

      {/* Header Section */}
      <View style={{ paddingTop: insets.top + 10 }} className="px-4 pb-4 z-50">
        <View className="flex-row items-center justify-between">
          {/* Profile Card */}
          <View className="flex-1 mr-4 bg-[#121212] rounded-xl p-3 border border-white/5 flex-row items-center">
             <ProfileIcon size={48} />
             <View className="ml-3">
               <Text className="text-white text-base font-black">Neil Dime</Text>
               <Text className="text-primary text-[10px] font-black tracking-widest uppercase">Premium</Text>
             </View>
          </View>
          
          {/* Header Icons */}
          <View className="flex-row items-center gap-4">
            <Pressable onPress={() => setIsSearchOpen(true)}>
              <Search size={26} color="white" strokeWidth={2.5} />
            </Pressable>
            <Pressable onPress={() => setShowMenu(!showMenu)}>
              <Menu size={28} color="white" strokeWidth={2.5} />
            </Pressable>
          </View>
        </View>

        {/* Filters */}
        <View className="flex-row gap-2 mt-6">
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full ${activeFilter === f ? 'bg-primary' : 'bg-[#282828]'}`}
            >
              <Text className={`text-sm font-bold ${activeFilter === f ? 'text-black' : 'text-white'}`}>
                {f}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Recently Played Grid */}
        <View className="px-4 mt-2 mb-8">
          <View className="flex-row flex-wrap justify-between gap-y-2.5">
            {RECENT_ITEMS.map((item) => (
              <Pressable
                key={item.id}
                className="w-[48.5%] bg-[#121212] flex-row items-center rounded-lg overflow-hidden border border-white/5 h-[52px]"
              >
                {item.id === '1' ? (
                  <View style={{ backgroundColor: item.color }} className="w-[52px] h-[52px] items-center justify-center">
                    <Heart size={18} color="white" fill="white" />
                  </View>
                ) : (
                  <Image source={{ uri: item.image }} className="w-[52px] h-[52px]" />
                )}
                <Text className="flex-1 text-[10px] font-black text-white px-2.5" numberOfLines={2}>
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recommended Section */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-black text-white mb-5">Recommended for you</Text>
          <View className="flex-row flex-wrap justify-between gap-y-6">
            {RECOMMENDED.map((item) => (
              <Pressable key={item.id} className="w-[47.5%]">
                <View className="aspect-square rounded-xl overflow-hidden bg-[#121212] border border-white/5">
                  <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                </View>
                <Text className="text-white font-bold text-[12px] mt-2.5 leading-tight" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-gray-400 text-[10px] mt-1">{item.subtitle}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Made For You Section */}
        <View className="mb-8">
          <Text className="text-xl font-black text-white px-4 mb-5">Made for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {MADE_FOR_YOU.map((item) => (
              <Pressable key={item.id} className="w-[140px]">
                <View className="w-[140px] h-[140px] rounded-xl overflow-hidden bg-[#121212] border border-white/5">
                  <Image source={{ uri: item.image }} className="w-full h-full" />
                </View>
                <Text className="text-white font-bold text-[12px] mt-2.5 leading-tight" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-gray-400 text-[10px] mt-1" numberOfLines={2}>
                  {item.subtitle}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Menu Overlay */}
      {showMenu && (
        <Pressable 
          style={StyleSheet.absoluteFill} 
          onPress={() => setShowMenu(false)}
          className="z-[100] justify-start items-end pr-4"
        >
          <View 
            style={{ marginTop: insets.top + 50 }}
            className="bg-[#282828] w-52 rounded-xl shadow-2xl overflow-hidden border border-white/10"
          >
            <View className="p-3 border-b border-white/5">
              <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Menu</Text>
            </View>
            <Pressable 
              onPress={() => { setShowMenu(false); openCreatePlaylist(); }}
              className="flex-row items-center p-3 active:bg-white/10"
            >
              <ListMusic size={18} color="white" />
              <Text className="text-white text-sm font-bold ml-3">Create Playlist</Text>
            </Pressable>
            <View className="p-3 border-t border-white/5">
              <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Account</Text>
            </View>
            <Pressable 
              onPress={() => { setShowMenu(false); signOut(); }}
              className="flex-row items-center p-3 active:bg-white/10"
            >
              <LogOut size={18} color="white" />
              <Text className="text-white text-sm font-bold ml-3">Sign out</Text>
            </Pressable>
          </View>
        </Pressable>
      )}

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </View>
  );
}
