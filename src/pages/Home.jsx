import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-200">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="CyberKids Shield Logo" className="w-10 h-10 text-cyan-600" />
            <span className="text-2xl font-black tracking-tight text-slate-800">
              Cyber<span className="text-cyan-600">Kids</span>
            </span>
          </div>
          <nav aria-label="Main Navigation">
            <Link
              to="/mission-control"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-full transition-colors focus:ring-4 focus:ring-cyan-100"
            >
              Enter Mission Control
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-slate-100 to-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Future-Proof Your Child's <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Digital Safety</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10">
              Empower the next generation with interactive AI-safety and cybersecurity missions. Learn to outsmart chatbots, spot deepfakes, and navigate the algorithm safely.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/mission-control"
                className="px-8 py-4 text-lg font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Start Learning Now
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Designed for the AI Era</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Spot Deepfakes', desc: 'Interactive audio and video challenges to identify synthetic media.' },
                { title: 'Safe Chatting', desc: 'Learn what information is safe to share with AI assistants.' },
                { title: 'Algorithm Awareness', desc: 'Understand how social media algorithms capture attention.' }
              ].map((feature, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-cyan-200 transition-colors shadow-sm hover:shadow-md">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} CyberKids Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
