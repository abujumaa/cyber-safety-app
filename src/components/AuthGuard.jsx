import React from 'react';

// Placeholder AuthGuard. Always allows traffic for now.
export default function AuthGuard({ children }) {
  const isAuthenticated = true; // Replace with actual auth logic (Supabase/Firebase) later

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-600">Please log in to access this area.</p>
      </div>
    );
  }

  return <>{children}</>;
}
