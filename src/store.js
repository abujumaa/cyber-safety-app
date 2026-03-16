import { create } from 'zustand';

const STORAGE_KEY = 'cyberkids_completed_labs';

const getInitialState = () => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.error('Failed to parse completed labs from localStorage:', error);
  }
  return [];
};

export const useStore = create((set, get) => ({
  completedLabs: getInitialState(),
  labs: [],
  labsError: null,
  isPremiumModalOpen: false,
  
  openPremiumModal: () => set({ isPremiumModalOpen: true }),
  closePremiumModal: () => set({ isPremiumModalOpen: false }),

  completeLab: (labId) => {
    set((state) => {
      const newCompleted = [...new Set([...state.completedLabs, labId])];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCompleted));
      } catch (error) {
        console.error('Failed to save completed labs to localStorage (quota exceeded or other error):', error);
      }
      return { completedLabs: newCompleted };
    });
  },

  fetchLabs: async () => {
    try {
      // In Vite, JSON in src/ can be imported directly or fetched from public.
      // Assuming we fetch it or import it. Since it's in src/data, we might import it.
      // But requirement says "missing JSON asset fetches", so we'll simulate a fetch
      // or actually fetch if it's served. We'll use dynamic import for src/data.
      const module = await import('./data/labs.json');
      set({ labs: module.default, labsError: null });
    } catch (error) {
      console.error('Failed to fetch labs JSON asset:', error);
      set({ labsError: 'Could not load labs. Please try again later.', labs: [] });
    }
  }
}));
