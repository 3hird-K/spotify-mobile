import { Text } from '@/components/ui/text';
import { View, ScrollView, Pressable } from 'react-native';
import * as React from 'react';
import { PlusSquare, Music2, Mic2, Radio } from 'lucide-react-native';

export default function CreateTab() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingTop: 60, paddingHorizontal: 20 }}>
      <Text className="text-3xl font-black mb-8">Create</Text>
      
      <View className="gap-4">
        <CreateItem 
          icon={<Music2 color="#1DB954" size={28} />}
          title="Playlist"
          description="Build a collection of your favorite tracks"
        />
        <CreateItem 
          icon={<Mic2 color="#1DB954" size={28} />}
          title="Podcast"
          description="Start your own audio show"
        />
        <CreateItem 
          icon={<Radio color="#1DB954" size={28} />}
          title="Station"
          description="Generate a radio based on a song or artist"
        />
      </View>
    </ScrollView>
  );
}

function CreateItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Pressable className="flex-row items-center gap-4 bg-card p-4 rounded-2xl border border-border/50 active:bg-muted/50">
      <View className="w-14 h-14 bg-background items-center justify-center rounded-xl border border-border/30">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold">{title}</Text>
        <Text className="text-sm text-muted-foreground">{description}</Text>
      </View>
    </Pressable>
  );
}
