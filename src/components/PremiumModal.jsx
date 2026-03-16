import React, { useState } from 'react';
import { useStore } from '../store';

export default function PremiumModal() {
  const { isPremiumModalOpen, closePremiumModal } = useStore();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isPremiumModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        closePremiumModal();
        setSubmitted(false);
        setEmail('');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-slate-900 border border-cyan-500/30 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative">
        <button 
          onClick={closePremiumModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 id="modal-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
          Premium Mission Access
        </h2>
        {submitted ? (
          <p className="text-green-400 font-semibold" role="alert">You're on the waitlist! Transmission secure.</p>
        ) : (
          <>
            <p className="text-slate-300 mb-6">
              This advanced AI-safety mission is restricted to Premium Detectives. Enter your parents' email to unlock early access!
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="email" className="sr-only">Parent's Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Parent's Email Address"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors"
              >
                Request Access
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
