import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './store';

describe('Zustand Store', () => {
  beforeEach(() => {
    localStorage.clear();
    useStore.setState({ completedLabs: [], labs: [], isPremiumModalOpen: false });
  });

  it('persists completed lab IDs to localStorage', () => {
    const { completeLab } = useStore.getState();
    
    completeLab('test-lab-1');
    
    const state = useStore.getState();
    expect(state.completedLabs).toContain('test-lab-1');
    
    const stored = JSON.parse(localStorage.getItem('cyberkids_completed_labs'));
    expect(stored).toContain('test-lab-1');
  });

  it('opens and closes premium modal', () => {
    const { openPremiumModal, closePremiumModal } = useStore.getState();
    
    openPremiumModal();
    expect(useStore.getState().isPremiumModalOpen).toBe(true);
    
    closePremiumModal();
    expect(useStore.getState().isPremiumModalOpen).toBe(false);
  });
});
