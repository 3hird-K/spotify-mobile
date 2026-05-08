import { Text } from '@/components/ui/text';
import { View, ScrollView, Image, ActivityIndicator, Pressable, Platform } from 'react-native';
import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { Music, Play, Heart, MoreVertical, Bell, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/lib/context/auth-store';
import { useUIStore } from '@/lib/context/ui-store';

import { ProfileIcon } from '@/components/profile-icon';

export default function HomeTab() {
  const { initialized } = useAuthStore();
  const { openProfileDrawer } = useUIStore();
  const [loading, setLoading] = React.useState<boolean>(!initialized);
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = React.useState('All');
  const router = useRouter();

  React.useEffect(() => {
    if (initialized) {
      setLoading(false);
    }
  }, [initialized]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  const FILTERS = ['All', 'Music', 'Podcasts'];

  const RECENT_ITEMS = [
    { id: '1', title: 'Liked Songs', image: 'https://i.scdn.co/image/ab67706f0000feaf2479e0066b1a9e7011d14902' },
    { id: '2', title: 'Coders Playlist', image: 'https://i.scdn.co/image/ab67706c0000bebb422998399587440409095697' },
    { id: '3', title: 'Daily Mix 1', image: 'https://i.scdn.co/image/ab6761610000e5ebc361d36636735e5898d2489f' },
    { id: '4', title: 'Discover Weekly', image: 'https://i.scdn.co/image/ab67706f0000bebb9f170f612ca430156d6d45f4' },
    { id: '5', title: 'Deep Focus', image: 'https://i.scdn.co/image/ab67706f0000bebbd967e56ba23737ec3093ca53' },
    { id: '6', title: 'This Is Hev Abi', image: 'https://i.scdn.co/image/ab6761610000e5eb8ae7f23342d0912189a87d0c' },
  ];

  return (
    <View className="flex-1 bg-background dark">
      {/* Top Background Gradient Effect */}
      <View className="absolute top-0 left-0 right-0 h-80 bg-emerald-950/20 opacity-30" />

      {/* Sticky Header */}
      <View 
        style={{ paddingTop: Math.max(insets.top, 16) }}
        className="px-4 pb-4 z-50 bg-background/80 backdrop-blur-md"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <ProfileIcon size={34} />
            <View className="flex-row gap-2">
              {FILTERS.map((f) => (
                <Pressable
                  key={f}
                  onPress={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full ${activeFilter === f ? 'bg-primary' : 'bg-secondary/60'}`}
                >
                  <Text className={`text-[13px] font-bold ${activeFilter === f ? 'text-black' : 'text-white'}`}>
                    {f}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 160
        }}
        showsVerticalScrollIndicator={false}
      >

        {/* Recently Played Grid */}
        <View className="px-4 mb-8">
          <View className="flex-row flex-wrap justify-between gap-y-2">
            {RECENT_ITEMS.map((item) => (
              <Pressable
                key={item.id}
                className="w-[48.5%] bg-card/60 flex-row items-center rounded-md overflow-hidden border border-border/5"
              >
                <Image source={{ uri: item.image }} className="w-14 h-14" />
                <Text className="flex-1 text-[11px] font-bold text-foreground px-2" numberOfLines={2}>
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Picked for You Section */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-bold text-foreground mb-4">Picked for you</Text>
          <Pressable className="bg-card/40 rounded-3xl overflow-hidden border border-border/10 shadow-2xl">
            <View className="relative">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=600&h=400&fit=crop' }}
                className="w-full h-56"
              />
              <View className="absolute inset-0 bg-black/20 justify-end p-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-white text-lg font-black leading-tight shadow-md" numberOfLines={2}>
                      CORTIS's shuffle show hit green green | K-Pop ON! RECORD
                    </Text>
                    <Text className="text-gray-300 text-xs mt-1">Video Podcast • 8 hours ago</Text>
                  </View>
                  <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-lg">
                    <Play color="black" size={20} fill="black" />
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Horizontal Section: Jump back in */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-foreground px-4 mb-4">Jump back in</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
            {[1, 2, 3, 4].map((i) => (
              <Pressable key={i} className="mx-2 w-36">
                <Image
                  source={{ uri: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=300&h=300&fit=crop` }}
                  className="w-36 h-36 rounded-xl border border-border/10"
                />
                <Text className="text-foreground font-bold text-xs mt-2" numberOfLines={1}>Playlist {i}</Text>
                <Text className="text-muted-foreground text-[10px] mt-0.5" numberOfLines={2}>Spotify • 1.2M Followers</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

    </View>
  );
}
