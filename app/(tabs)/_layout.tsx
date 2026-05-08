import { Tabs } from 'expo-router';
import { Home, Search, Library, Plus } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useUIStore } from '@/lib/context/ui-store';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const { openCreatePlaylist } = useUIStore();

  const activeColor = '#FFFFFF';
  const inactiveColor = '#B3B3B3';

  return (
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

          height: Platform.OS === 'ios' ? 88 : 60,

          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 6,

          left: 0,
          right: 0,
          bottom: 0,
        },

        // Spotify fade effect
        // Spotify fade effect
        tabBarBackground: () => (
          <View style={{ flex: 1, overflow: 'hidden' }}>
            <LinearGradient
              colors={[
                'rgba(0, 0, 0, 0)', // <--- THE FIX: explicitly transparent black
                'rgba(17, 17, 17, 0.34)',
                'rgba(20, 20, 20, 0.73)',
                '#000000cb',
              ]}
              locations={[0, 0.18, 0.55, 1]}
              style={StyleSheet.absoluteFill}
            />
          </View>
        ),

        // Better spacing like Spotify
        tabBarItemStyle: {
          paddingVertical: 2,
        },

        // Label styling
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
            <Home
              color={color}
              size={24}
              strokeWidth={focused ? 2.7 : 2.2}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Search
              color={color}
              size={24}
              strokeWidth={focused ? 2.7 : 2.2}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: 'Your Library',
          tabBarIcon: ({ color, focused }) => (
            <Library
              color={color}
              size={24}
              strokeWidth={focused ? 2.7 : 2.2}
            />
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
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <Plus
              color={color}
              size={28}
              strokeWidth={focused ? 3 : 2.4}
            />
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
  );
}