import { create } from 'zustand';

interface UIState {
  isProfileDrawerOpen: boolean;
  openProfileDrawer: () => void;
  closeProfileDrawer: () => void;
  toggleProfileDrawer: () => void;
  isCreatePlaylistOpen: boolean;
  openCreatePlaylist: () => void;
  closeCreatePlaylist: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isProfileDrawerOpen: false,
  openProfileDrawer: () => set({ isProfileDrawerOpen: true }),
  closeProfileDrawer: () => set({ isProfileDrawerOpen: false }),
  toggleProfileDrawer: () => set((state) => ({ isProfileDrawerOpen: !state.isProfileDrawerOpen })),
  isCreatePlaylistOpen: false,
  openCreatePlaylist: () => set({ isCreatePlaylistOpen: true }),
  closeCreatePlaylist: () => set({ isCreatePlaylistOpen: false }),
}));
