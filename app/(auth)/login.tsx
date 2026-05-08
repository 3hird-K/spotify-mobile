import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack, useRouter } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View, ActivityIndicator, ScrollView, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import Svg, { Path } from 'react-native-svg';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/lib/context/auth-store';

WebBrowser.maybeCompleteAuthSession();

// Google Icon SVG Component
const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path
      d="M 22.56 12.25 c 0 -.78 -.07 -1.53 -.2 -2.25 H 12 v 4.26 h 5.92 c -.26 1.37 -1.04 2.53 -2.21 3.31 v 2.77 h 3.57 c 2.08 -1.92 3.28 -4.74 3.28 -8.09 z"
      fill="#4285F4"
    />
    <Path
      d="M 12 23 c 2.97 0 5.46 -.98 7.28 -2.66 l -3.57 -2.77 c -.98 .66 -2.23 1.06 -3.71 1.06 -2.86 0 -5.29 -1.93 -6.16 -4.53 H 2.18 v 2.84 C 3.99 20.53 7.7 23 12 23 z"
      fill="#34A853"
    />
    <Path
      d="M 5.84 14.09 c -.22 -.66 -.35 -1.36 -.35 -2.09 s .13 -1.43 .35 -2.09 V 7.07 H 2.18 C 1.43 8.55 1 10.22 1 12 s .43 3.45 1.18 4.93 l 2.85 -2.22 .81 -.62 z"
      fill="#FBBC05"
    />
    <Path
      d="M 12 5.38 c 1.62 0 3.06 .56 4.21 1.64 l 3.15 -3.15 C 17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07 l 3.66 2.84 c .87 -2.6 3.3 -4.53 6.16 -4.53 z"
      fill="#EA4335"
    />
  </Svg>
);

export default function LoginScreen() {
  const { colorScheme } = useColorScheme();
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
  const { session, initialized } = useAuthStore();
  const router = useRouter();

  const onGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);

      if (Platform.OS === 'web') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) throw error;
      } else {
        // Switching back to the IP address because Expo Go doesn't support custom schemes
        // Ensure this IP matches your computer's current IP address!
        const redirectUrl = __DEV__ 
          ? 'exp://192.168.254.108:8081' 
          : Linking.createURL("/", { scheme: 'spotify-mobile' });
        
        console.log('--- FINAL REDIRECT URL ---', redirectUrl);

        const handleRedirect = async (url: string) => {
          console.log('--- HANDLING INCOMING URL ---', url);
          const parsedUrl = Linking.parse(url);
          const { access_token, refresh_token, code } = parsedUrl.queryParams ?? {};

          if (code) {
            await supabase.auth.exchangeCodeForSession(code as string);
            WebBrowser.dismissBrowser();
          } else if (access_token && refresh_token) {
            await supabase.auth.setSession({
              access_token: access_token as string,
              refresh_token: refresh_token as string,
            });
            WebBrowser.dismissBrowser();
          } else {
            const hash = url.split('#')[1];
            if (hash) {
              const params = new URLSearchParams(hash);
              const access_token_hash = params.get('access_token');
              const refresh_token_hash = params.get('refresh_token');
              if (access_token_hash && refresh_token_hash) {
                await supabase.auth.setSession({
                  access_token: access_token_hash,
                  refresh_token: refresh_token_hash,
                });
                WebBrowser.dismissBrowser();
              }
            }
          }
        };

        const subscription = Linking.addEventListener('url', (event) => {
          handleRedirect(event.url);
        });

        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl,
            skipBrowserRedirect: true,
            queryParams: {
              prompt: 'select_account',
            },
          },
        });

        if (error) {
          subscription.remove();
          throw error;
        }

        if (data?.url) {
          console.log('--- SUPABASE AUTH URL ---', data.url);
          const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
          
          if (result.type === 'success' && result.url) {
            await handleRedirect(result.url);
          }

          // Wait a second for background redirects, then unsubscribe
          setTimeout(() => subscription.remove(), 2000);
        } else {
          subscription.remove();
        }
      }
    } catch (err) {
      console.error('Google login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!initialized || (isLoggingIn && !session)) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTransparent: true,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-background"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-24 pb-12 justify-between">

          {/* Hero Section */}
          <View className="items-center mb-6">
            <View className="w-14 h-14 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl items-center justify-center mb-3 border border-emerald-500/20 shadow-lg">
              <Text className="text-2xl">🎵</Text>
            </View>
            <Text className="text-2xl font-black tracking-tight text-foreground text-center mb-1">
              Spotify <Text className="text-emerald-500">Mobile</Text>
            </Text>
            <Text className="text-muted-foreground text-center px-6 text-xs">
              Synchronize and explore your favorite tracks and playlists instantly.
            </Text>
          </View>

          {/* Intro Landing Section */}
          <View className="flex-1 justify-center gap-6">
            {/* Feature Highlights */}
            <View className="gap-3 w-full">
              <View className="flex-row items-center gap-3 bg-muted/40 p-3 rounded-2xl border border-border/50">
                <View className="w-9 h-9 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl items-center justify-center border border-emerald-500/20">
                  <Text className="text-base">✨</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-bold text-foreground">Sync Playlists</Text>
                  <Text className="text-[10px] text-muted-foreground">Keep your Spotify songs synced globally</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3 bg-muted/40 p-3 rounded-2xl border border-border/50">
                <View className="w-9 h-9 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl items-center justify-center border border-emerald-500/20">
                  <Text className="text-base">🌍</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-bold text-foreground">YouTube Search</Text>
                  <Text className="text-[10px] text-muted-foreground">Browse millions of music tracks on demand</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3 bg-muted/40 p-3 rounded-2xl border border-border/50">
                <View className="w-9 h-9 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl items-center justify-center border border-emerald-500/20">
                  <Text className="text-base">✅</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-bold text-foreground">Universal Tracking</Text>
                  <Text className="text-[10px] text-muted-foreground">Log your listening history securely</Text>
                </View>
              </View>
            </View>

            {/* Modernized Sign In with Google Button */}
            <View className="items-center mt-2">
              <Button
                onPress={onGoogleLogin}
                disabled={isLoggingIn}
                className="bg-white dark:bg-slate-900 active:bg-slate-100 dark:active:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl flex-row items-center justify-center gap-3 w-full py-3.5 max-w-sm mb-3"
              >
                {isLoggingIn ? (
                  <ActivityIndicator size="small" color="#4285F4" />
                ) : (
                  <>
                    <GoogleIcon />
                    <Text className="text-slate-900 dark:text-white font-bold text-sm">
                      Continue with Google
                    </Text>
                  </>
                )}
              </Button>
              <Text className="text-[10px] text-muted-foreground text-center">
                By continuing, you agree to our Terms & Privacy.
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4 bg-muted/50 border border-border/30">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
