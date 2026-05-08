import React from 'react';
import { View, ScrollView, Pressable, Image, TextInput, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Search, Camera, ChevronLeft, X } from 'lucide-react-native';
import { useAuthStore } from '@/lib/context/auth-store';
import { useUIStore } from '@/lib/context/ui-store';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ProfileIcon } from '@/components/profile-icon';

const { width } = Dimensions.get('window');

export default function SearchTab() {
  const { session } = useAuthStore();
  const { openProfileDrawer } = useUIStore();
  const insets = useSafeAreaInsets();
  const [isFocused, setIsFocused] = React.useState(false);

  const categories = [
    { title: 'Music', color: '#E91E63', image: 'https://i.scdn.co/image/ab67706f0000bebb02fd68cf90f8450702df9f3a' },
    { title: 'Podcasts', color: '#006450', image: 'https://i.scdn.co/image/ab6765630000ba8a81f07e69fd3c2a4460599a38' },
    { title: 'Live Events', color: '#842FF2', image: 'https://i.scdn.co/image/ab67706f0000bebb8ad87b46e1219ba552b410f0' },
    { title: 'K-Pop ON! (온) Hub', color: '#1E3264', image: 'https://i.scdn.co/image/ab67706f0000bebb8d0ce13d330752171f2a420b' },
  ];

  const recentSearches = [
    { title: '6K Musick Official', type: 'Artist', image: 'https://i.scdn.co/image/ab6761610000e5eb8ae7f23342d0912189a87d0c' },
    { title: 'Up Down (Do This All Day)', type: 'Song • T-Pain', image: 'https://i.scdn.co/image/ab67616d0000b273b75411767355097722744883' },
    { title: 'Zae', type: 'Artist', image: 'https://i.scdn.co/image/ab6761610000e5eb03708a54d4850eccebc2319f' },
  ];

  const discoverItems = [
    { title: '#pinoy trap', image: 'https://i.scdn.co/image/ab67706c0000bebb9f170f612ca430156d6d45f4' },
    { title: '#5th gen k-pop', image: 'https://i.scdn.co/image/ab67706c0000bebb78e51536b567d4f9b233a1e5' },
    { title: 'Villain Era', image: 'https://i.scdn.co/image/ab67706c0000bebb422998399587440409095697' },
  ];

  const bottomCategories = [
    { title: 'Made For You', color: '#8D67AB', image: 'https://i.scdn.co/image/ab67706f0000bebb0d7406a46979e246995b0086' },
    { title: 'Upcoming Events', color: '#056952', image: 'https://i.scdn.co/image/ab67706f0000bebb7e9462704285816922cfb94b' },
  ];

  return (
    <View className="flex-1 bg-background dark">
      {/* Sticky Header */}
      <View 
        style={{ paddingTop: Math.max(insets.top, 16) }}
        className="px-4 pb-4 z-50 bg-background/80 backdrop-blur-md border-b border-white/5"
      >
        {!isFocused ? (
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center gap-3">
              <ProfileIcon size={34} />
              <Text className="text-white text-2xl font-black">Search</Text>
            </View>
            <Camera size={26} color="white" />
          </View>
        ) : (
          <View className="flex-row items-center gap-4 mb-4">
            <Pressable onPress={() => setIsFocused(false)}>
              <ChevronLeft size={28} color="white" />
            </Pressable>
            <View className="flex-1 bg-[#282828] rounded-md flex-row items-center px-3 py-2">
              <TextInput 
                autoFocus
                placeholder="What do you want to listen to?"
                placeholderTextColor="#B3B3B3"
                className="flex-1 text-white text-base font-bold"
              />
              <X size={20} color="#B3B3B3" />
            </View>
          </View>
        )}

        {!isFocused && (
          <Pressable 
            onPress={() => setIsFocused(true)}
            className="bg-white rounded-lg flex-row items-center px-4 py-3.5 shadow-sm"
          >
            <Search size={24} color="black" />
            <Text className="text-black/60 font-bold ml-3 text-base">What do you want to listen to?</Text>
          </Pressable>
        )}
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        {isFocused ? (
          <View className="px-4 pt-4">
            <Text className="text-white text-lg font-black mb-6">Recents</Text>
            {recentSearches.map((item, i) => (
              <View key={i} className="flex-row items-center gap-4 mb-6">
                <Image source={{ uri: item.image }} className={`w-12 h-12 ${item.type === 'Artist' ? 'rounded-full' : 'rounded-md'}`} />
                <View className="flex-1">
                  <Text className="text-white font-bold text-base">{item.title}</Text>
                  <Text className="text-[#B3B3B3] text-sm">{item.type}</Text>
                </View>
                <X size={20} color="#B3B3B3" />
              </View>
            ))}
          </View>
        ) : (
          <View className="px-4 pt-6">
            {/* Explore Section */}
            <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
              {categories.map((cat, i) => (
                <CategoryCard key={i} {...cat} />
              ))}
            </View>

            {/* Discover Section */}
            <View className="mb-8">
              <Text className="text-white text-lg font-black mb-4">Discover something new</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                {discoverItems.map((item, i) => (
                  <Animated.View 
                    key={i} 
                    entering={FadeIn.delay(i * 100)}
                    className="w-36 h-60 rounded-xl overflow-hidden bg-[#282828] relative"
                  >
                     <Image source={{ uri: item.image }} className="w-full h-full" />
                     <View className="absolute bottom-4 left-4 right-4">
                       <Text className="text-white font-black text-sm shadow-black shadow-lg">{item.title}</Text>
                     </View>
                  </Animated.View>
                ))}
              </ScrollView>
            </View>

            {/* Bottom Section */}
            <View className="flex-row flex-wrap justify-between gap-y-4">
              {bottomCategories.map((cat, i) => (
                <CategoryCard key={i} {...cat} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function CategoryCard({ title, color, image }: any) {
  return (
    <Pressable 
      style={{ backgroundColor: color }}
      className="w-[48%] h-24 rounded-lg overflow-hidden p-3 active:opacity-80"
    >
      <Text className="text-white font-black text-lg leading-tight w-2/3">{title}</Text>
      <Image 
        source={{ uri: image }} 
        className="w-16 h-16 absolute -right-4 -bottom-1 rotate-[25deg] rounded-md shadow-2xl"
      />
    </Pressable>
  );
}
