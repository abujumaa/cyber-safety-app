import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import logo from '../assets/logo.svg';

export default function LabViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { labs, fetchLabs, completeLab, completedLabs } = useStore();
  const [lab, setLab] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (labs.length === 0) {
      fetchLabs();
    }
  }, [labs, fetchLabs]);

  useEffect(() => {
    if (labs.length > 0) {
      const foundLab = labs.find(l => l.id === id);
      if (foundLab) {
        if (foundLab.isLocked) {
          navigate('/mission-control');
        } else {
          setLab(foundLab);
        }
      } else {
        navigate('/mission-control');
      }
    }
  }, [id, labs, navigate]);

  if (!lab) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-cyan-400 font-mono animate-pulse">Loading Mission Data...</div>
    </div>
  );

  const handleNextStep = () => {
    if (currentStep < lab.steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleOptionSelect = (questionIndex, option) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmitQuiz = () => {
    completeLab(lab.id);
    navigate('/mission-control');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-cyan-900/50 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/mission-control" className="text-cyan-500 hover:text-cyan-400 font-mono text-sm flex items-center gap-2">
            &larr; Abort Mission
          </Link>
          <div className="flex items-center gap-2">
             <img src={logo} alt="Logo" className="w-6 h-6 text-cyan-500" />
             <span className="font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase text-sm">
               {lab.title}
             </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {!showResults ? (
          <div className="bg-slate-900 border border-cyan-900/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div 
                className="h-full bg-cyan-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / lab.steps.length) * 100}%` }}
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-cyan-500 font-mono text-sm mb-2 uppercase tracking-widest">
                Phase {currentStep + 1} of {lab.steps.length}
              </h2>
              <h1 className="text-3xl font-bold text-white">{lab.title}</h1>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700">
              <p className="text-xl text-slate-300 leading-relaxed">
                {lab.steps[currentStep]}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors focus:ring-4 focus:ring-cyan-500/30"
              >
                {currentStep === lab.steps.length - 1 ? 'Proceed to Debrief' : 'Next Phase'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-cyan-900/50 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Mission Debrief</h2>
            <p className="text-slate-400 mb-8">Answer the following to verify mission completion.</p>
            
            <div className="space-y-8">
              {lab.quiz.map((q, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl text-white mb-4">{q.question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionSelect(idx, option)}
                        className={`p-4 rounded-lg text-left transition-all border ${
                          quizAnswers[idx] === option
                            ? 'bg-cyan-900/40 border-cyan-500 text-cyan-100'
                            : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < lab.quiz.length}
                className="px-8 py-3 bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors focus:ring-4 focus:ring-cyan-500/30"
              >
                Complete Mission
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
