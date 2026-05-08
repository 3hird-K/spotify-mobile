import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/lib/context/auth-store';
import { useUIStore } from '@/lib/context/ui-store';
import { supabase } from '@/lib/supabase';
import { Database, Tables } from '@/database.types';

type Profile = Tables<'profiles'>;

export function ProfileIcon({ size = 32 }: { size?: number }) {
  const { session } = useAuthStore();
  const { openProfileDrawer } = useUIStore();
  const [profile, setProfile] = React.useState<Profile | null>(null);

  React.useEffect(() => {
    if (session?.user?.id) {
      fetchProfile(session.user.id);
    }
  }, [session?.user?.id]);

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data) {
        setProfile(data);
      }
    } catch (err) {
      console.warn('Error fetching profile for icon:', err);
    }
  }

  const email = session?.user?.email || '';
  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : email.charAt(0).toUpperCase();

  // Fallback avatar if no profile image is set
  const displayAvatar = profile?.avatar_url || `https://ui-avatars.com/api/?name=${initials}&background=1DB954&color=fff&bold=true`;

  return (
    <Pressable onPress={openProfileDrawer} className="active:scale-95">
      <View 
        style={{ width: size, height: size }} 
        className="rounded-full bg-secondary items-center justify-center overflow-hidden border border-white/10"
      >
        {profile?.avatar_url ? (
          <Image 
            source={{ uri: profile.avatar_url }} 
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center bg-primary">
             <Text 
               className="text-primary-foreground font-black" 
               style={{ fontSize: size * 0.4 }}
             >
              {initials}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
