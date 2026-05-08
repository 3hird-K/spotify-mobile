import { Tabs } from 'expo-router';
import { Home, Users, Music, Library, ListMusic } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useUIStore } from '@/lib/context/ui-store';
import { LinearGradient } from 'expo-linear-gradient';
import { MiniPlayer } from '@/components/mini-player';

// 1. Extract height so the Tab Bar and MiniPlayer share the exact same math
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 88 : 59;

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const { openCreatePlaylist } = useUIStore();

  const activeColor = '#FFFFFF';
  const inactiveColor = '#B3B3B3';

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0,
            backgroundColor: 'transparent',
            elevation: 0,

            // 2. Use the constant here
            height: TAB_BAR_HEIGHT,

            paddingBottom: Platform.OS === 'ios' ? 28 : 8,
            paddingTop: 4,
            left: 0,
            right: 0,
            bottom: 0,
          },
          // Spotify fade effect
          tabBarBackground: () => (
            <View style={{ flex: 1, overflow: 'hidden' }}>
              <LinearGradient
                colors={[
                  'rgba(0, 0, 0, 0.42)',
                  'rgba(17, 17, 17, 0.64)',
                  'rgba(20, 20, 20, 0.86)',
                  '#000000f6',
                ]}
                locations={[0, 0.18, 0.55, 1]}
                style={StyleSheet.absoluteFill}
              />
            </View>
          ),
          tabBarItemStyle: {
            paddingVertical: 2,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 2,
            letterSpacing: 0.2,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Home color={color} size={24} strokeWidth={focused ? 2.7 : 2.2} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: 'Following',
            tabBarIcon: ({ color, focused }) => (
              <Users color={color} size={24} strokeWidth={focused ? 2.7 : 2.2} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              openCreatePlaylist();
            },
          }}
          options={{
            title: 'Playlist',
            tabBarIcon: ({ color, focused }) => (
              <ListMusic color={color} size={24} strokeWidth={focused ? 2.7 : 2.2} />
            ),
          }}
        />

        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color, focused }) => (
              <Library color={color} size={24} strokeWidth={focused ? 2.7 : 2.2} />
            ),
          }}
        />


        <Tabs.Screen
          name="profile"
          options={{
            href: null,
          }}
        />
      </Tabs>

      {/* 3. Wrap MiniPlayer in a View positioned exactly on top of the Tab Bar */}
      <View
        style={{
          position: 'absolute',
          bottom: TAB_BAR_HEIGHT, // Matches tab bar height perfectly
          left: 8,
          right: 8
        }}
      >
        <MiniPlayer />
      </View>
    </View>
  );
}