import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistItem {
  id: string;
  drugName: string;
  addedAt: Date;
}

interface WatchlistState {
  items: WatchlistItem[];
  addItem: (drugName: string) => void;
  removeItem: (drugName: string) => void;
  isInWatchlist: (drugName: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (drugName: string) => {
        if (!get().isInWatchlist(drugName)) {
          set((state) => ({
            items: [...state.items, { id: Date.now().toString(), drugName, addedAt: new Date() }],
          }));
        }
      },
      removeItem: (drugName: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.drugName !== drugName),
        }));
      },
      isInWatchlist: (drugName: string) => {
        return get().items.some((item) => item.drugName === drugName);
      },
    }),
    {
      name: 'medbridge_watchlist',
    }
  )
);
