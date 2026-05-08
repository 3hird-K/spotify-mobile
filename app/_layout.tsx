import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useAuthStore } from '@/lib/context/auth-store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

import { ProfileDrawer } from '@/components/profile-drawer';
import { CreatePlaylistModal } from '@/components/create-playlist-modal';

export default function RootLayout() {
  const { colorScheme: nativeColorScheme, setColorScheme } = useColorScheme();
  const colorScheme = 'dark'; // Forced dark mode
  const { session, initialized } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated and not already in auth group
      router.replace('/(auth)/login');
    } else if (session && (inAuthGroup || !segments[0] || (segments as string[]).includes('index'))) {
      // Redirect to home if authenticated and in auth group or at root
      router.replace('/(tabs)/home');
    }
  }, [session, initialized, segments]);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <View className="flex-1 dark">
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <ProfileDrawer />
        <CreatePlaylistModal />
        <PortalHost name="root" />
      </View>
    </ThemeProvider>
  );
}
