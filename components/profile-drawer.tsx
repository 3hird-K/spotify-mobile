import React, { useEffect, useState } from 'react';
import { View, Pressable, Dimensions, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { useUIStore } from '@/lib/context/ui-store';
import { useAuthStore } from '@/lib/context/auth-store';
import { supabase } from '@/lib/supabase';
import { Database } from '@/database.types';
import {
  LogOut,
  X,
  Settings,
  Bell,
  Search,
  Users,
  Star,
  GitBranch,
  Megaphone,
  Puzzle,
  CircleHelp,
  Library,
  Zap,
  Compass
} from 'lucide-react-native';
import { Portal } from '@rn-primitives/portal';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.91;

type Profile = Database['public']['Tables']['profiles']['Row'];

export function ProfileDrawer() {
  const { isProfileDrawerOpen, closeProfileDrawer } = useUIStore();
  const { session, signOut } = useAuthStore();
  const [showLogout, setShowLogout] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const translateX = useSharedValue(-DRAWER_WIDTH);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isProfileDrawerOpen) {
      translateX.value = withTiming(0, { duration: 250 });
      opacity.value = withTiming(1, { duration: 300 });
      fetchProfile();
    } else {
      translateX.value = withTiming(-DRAWER_WIDTH, { duration: 250 });
      opacity.value = withTiming(0, { duration: 300 });
      setShowLogout(false);
    }
  }, [isProfileDrawerOpen]);

  const fetchProfile = async () => {
    if (!session?.user?.id) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (data) setProfile(data);
  };

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: isProfileDrawerOpen ? 'auto' : 'none',
  }));

  if (!isProfileDrawerOpen && opacity.value === 0) return null;

  return (
    <Portal name="profile-drawer" hostName="root">
      <View style={StyleSheet.absoluteFill}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeProfileDrawer} />
        </Animated.View>

        {/* Drawer Content */}
        <Animated.View
          className="absolute left-0 top-0 bottom-0 bg-background border-r border-border dark"
          style={[drawerStyle, { width: DRAWER_WIDTH }]}
        >
          <View className="flex-1 pt-12">
            {/* Spotify Premium Card */}
            <View className="px-4 mb-8">
              <View className="bg-card p-5 rounded-3xl border border-border/50 shadow-sm relative overflow-hidden">
                <View className="absolute -right-4 -top-4 opacity-10 rotate-12">
                  <Image
                    source={require('@/assets/images/spotifylogo.png')}
                    className="w-32 h-32"
                    resizeMode="contain"
                    tintColor="white"
                  />
                </View>
                <View className="flex-row items-center gap-3 mb-3">
                  <Image
                    source={require('@/assets/images/spotifylogo.png')}
                    className="w-6 h-6"
                    resizeMode="contain"
                    tintColor="white"
                  />
                  <Text className="text-foreground font-black text-lg">Spotify</Text>
                </View>
                <Text className="text-muted-foreground text-xs font-medium mb-4 pr-10">
                  Experience music like never before with premium quality and offline access.
                </Text>
                <Pressable className="bg-primary py-2 px-4 rounded-full self-start">
                  <Text className="text-primary-foreground font-bold text-xs">PREMIUM ACCOUNT</Text>
                </Pressable>
              </View>
            </View>

            {/* Navigation Sections */}
            <ScrollView className="flex-1">
              <View className="px-4 gap-1">
                <Text className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Workspace</Text>
                <DrawerItem
                  icon={<Users size={20} color="white" />}
                  label="People"
                />
                <DrawerItem
                  icon={<Library size={20} color="white" />}
                  label="Music Library"
                  active
                />
                <DrawerItem
                  icon={<Zap size={20} color="white" />}
                  label="Premium Benefits"
                />
                <DrawerItem
                  icon={<Compass size={20} color="white" />}
                  label="Discover New"
                />
              </View>
            </ScrollView>
          </View>

          {/* Bottom Profile Section */}
          <View className="p-6 bg-card border-t border-border/50">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <Image
                  source={{ uri: profile?.avatar_url || `https://ui-avatars.com/api/?name=${session?.user?.email}&background=1DB954&color=fff` }}
                  className="w-10 h-10 rounded-full border border-border"
                />
                <View className="flex-1">
                  <Text className="text-foreground font-black text-sm" numberOfLines={1}>
                    {profile?.full_name || session?.user?.email?.split('@')[0]}
                  </Text>
                  <Text className="text-muted-foreground text-[10px] font-medium" numberOfLines={1}>
                    {session?.user?.email}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={async () => {
                  closeProfileDrawer();
                  await signOut();
                }}
                className="w-10 h-10 bg-destructive items-center justify-center rounded-full active:opacity-70 ml-2 shadow-sm"
              >
                <LogOut size={18} color="white" />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Portal>
  );
}

function DrawerItem({ icon, label, onPress, labelStyle, active }: any) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-4 py-3 px-4 rounded-2xl active:opacity-70 ${active ? 'bg-primary' : 'bg-transparent'}`}
    >
      {React.cloneElement(icon, {
        className: active ? 'text-primary-foreground' : 'text-white',
        strokeWidth: active ? 2.5 : 2
      })}
      <Text
        className={`text-sm font-bold flex-1 ${active ? 'text-primary-foreground' : 'text-white'}`}
        style={labelStyle}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
});
