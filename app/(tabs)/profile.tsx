import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { LogOut, Music, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileTab() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/');
      } else {
        setSession(session);
      }
      setLoading(false);
    });
  }, []);

  const onSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="p-6 pt-16">
        
        {/* Title */}
        <View className="flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-2xl font-black text-foreground">
              Profile
            </Text>
            <Text className="text-xs text-muted-foreground">
              Your account details and tracking settings
            </Text>
          </View>
          <View className="w-10 h-10 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl items-center justify-center border border-emerald-500/20">
            <Sparkles color="#10B981" size={20} />
          </View>
        </View>

        {/* User Card */}
        <View className="bg-muted p-6 rounded-3xl border border-border items-center shadow-sm max-w-sm w-full mx-auto mb-8">
          {session?.user?.user_metadata?.avatar_url ? (
            <Image
              source={{ uri: session.user.user_metadata.avatar_url }}
              className="w-20 h-20 rounded-full border-2 border-emerald-500 mb-4 shadow-sm"
            />
          ) : (
            <View className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full items-center justify-center mb-4">
              <Music color="#10B981" size={36} />
            </View>
          )}
          <Text className="text-xl font-bold text-foreground text-center">
            {session?.user?.user_metadata?.full_name || 'Listener'}
          </Text>
          <Text className="text-muted-foreground text-sm mb-6 text-center">
            {session?.user?.email}
          </Text>

          {/* Sign Out Button */}
          <Button 
            onPress={onSignOut} 
            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-2xl w-full flex-row items-center justify-center gap-2 py-3.5 shadow-sm"
          >
            <LogOut size={18} color="#EF4444" />
            <Text className="text-red-500 font-bold text-sm">Sign Out</Text>
          </Button>
        </View>

      </View>
    </ScrollView>
  );
}
