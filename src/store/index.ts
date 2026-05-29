import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Artwork, AISettings } from '../types';

interface AppState {
  artworks: Artwork[];
  aiSettings: AISettings;
  currentArtwork: Artwork | null;
  
  addArtwork: (artwork: Artwork) => void;
  updateArtwork: (id: string, updates: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
  setCurrentArtwork: (artwork: Artwork | null) => void;
  toggleFavorite: (id: string) => void;
  
  updateAISettings: (settings: Partial<AISettings>) => void;
  clearAllData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      artworks: [],
      aiSettings: {
        model: 'openai',
        apiKeys: {
          openai: '',
          claude: '',
          gemini: '',
        },
        language: 'zh',
      },
      currentArtwork: null,

      addArtwork: (artwork) => 
        set((state) => ({ 
          artworks: [artwork, ...state.artworks] 
        })),

      updateArtwork: (id, updates) =>
        set((state) => ({
          artworks: state.artworks.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
          currentArtwork: state.currentArtwork?.id === id 
            ? { ...state.currentArtwork, ...updates } 
            : state.currentArtwork,
        })),

      deleteArtwork: (id) =>
        set((state) => ({
          artworks: state.artworks.filter((a) => a.id !== id),
          currentArtwork: state.currentArtwork?.id === id ? null : state.currentArtwork,
        })),

      setCurrentArtwork: (artwork) =>
        set({ currentArtwork: artwork }),

      toggleFavorite: (id) =>
        set((state) => ({
          artworks: state.artworks.map((a) =>
            a.id === id ? { ...a, isFavorite: !a.isFavorite } : a
          ),
          currentArtwork: state.currentArtwork?.id === id
            ? { ...state.currentArtwork, isFavorite: !state.currentArtwork.isFavorite }
            : state.currentArtwork,
        })),

      updateAISettings: (settings) =>
        set((state) => ({
          aiSettings: { ...state.aiSettings, ...settings },
        })),

      clearAllData: () =>
        set({
          artworks: [],
          currentArtwork: null,
        }),
    }),
    {
      name: 'paint-learning-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
