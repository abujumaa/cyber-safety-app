import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import logo from '../assets/logo.svg';

export default function MissionControl() {
  const { labs, fetchLabs, labsError, completedLabs, openPremiumModal } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLabs();
  }, [fetchLabs]);

  const handleLabClick = (e, lab) => {
    e.preventDefault();
    if (lab.isLocked) {
      openPremiumModal();
    } else {
      navigate(`/lab/${lab.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-900">
      <header className="border-b border-cyan-900/50 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Back to Home">
            <img src={logo} alt="CyberKids Logo" className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">
              Mission Control
            </span>
          </Link>
          <div className="text-sm font-mono text-cyan-400 bg-cyan-950/50 px-4 py-1.5 rounded-full border border-cyan-800/50">
            Missions Completed: {completedLabs.length} / {labs.length}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Assignment</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Welcome, Detective. Choose an active mission below to train your digital defenses. Locked missions require clearance.
          </p>
        </div>

        {labsError && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-4 rounded-lg mb-8" role="alert">
            {labsError}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => {
            const isCompleted = completedLabs.includes(lab.id);
            return (
              <Link 
                key={lab.id} 
                to={`/lab/${lab.id}`}
                onClick={(e) => handleLabClick(e, lab)}
                className={`relative group block p-6 rounded-2xl border transition-all ${
                  lab.isLocked 
                    ? 'bg-slate-900/40 border-slate-800 cursor-not-allowed opacity-80' 
                    : 'bg-slate-900 border-cyan-900/50 hover:border-cyan-400/50 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] focus:outline-none focus:ring-2 focus:ring-cyan-400'
                }`}
                aria-disabled={lab.isLocked}
                aria-label={lab.isLocked ? `${lab.title} (Locked)` : `${lab.title} Mission`}
              >
                {lab.isLocked && (
                  <div className="absolute top-4 right-4 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                )}
                {isCompleted && (
                  <div className="absolute top-4 right-4 text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2 pr-8">{lab.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-6">{lab.description}</p>
                <div className="text-sm font-semibold uppercase tracking-wider text-cyan-500 group-hover:text-cyan-400 transition-colors">
                  {lab.isLocked ? 'Request Access' : isCompleted ? 'Replay Mission' : 'Start Mission'} &rarr;
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
