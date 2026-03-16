import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import PremiumModal from './PremiumModal';
import { useStore } from '../store';

describe('PremiumModal', () => {
  beforeEach(() => {
    useStore.setState({ isPremiumModalOpen: true });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders correctly when open', () => {
    render(<PremiumModal />);
    expect(screen.getByText('Premium Mission Access')).toBeInTheDocument();
  });

  it('blocks access and allows email submission', async () => {
    render(<PremiumModal />);
    
    const input = screen.getByPlaceholderText("Parent's Email Address");
    const button = screen.getByText('Request Access');
    
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);
    
    expect(screen.getByText("You're on the waitlist! Transmission secure.")).toBeInTheDocument();
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(useStore.getState().isPremiumModalOpen).toBe(false);
  });
});
