import ProjectCard from '@/components/ProjectCard';
import Image from 'next/image';
import { LayoutDashboard, Terminal, Settings } from 'lucide-react';

const projects = [
  {
    name: 'Takvim',
    description: 'Surgical Calendar & Scheduling',
    localUrl: 'http://localhost:3030',
    onlineUrl: 'https://takvim.ibrahimyagci.com',
    icon: 'Calendar'
  },
  {
    name: 'Asistan Panel',
    description: 'Patient Database & Prescriptions',
    localUrl: 'http://localhost:3000',
    onlineUrl: 'https://panel.ibrahimyagci.com',
    icon: 'User'
  },
  {
    name: 'Rhinoplasty Info',
    description: 'Post-op Information Portal',
    localUrl: 'http://localhost:5173',
    onlineUrl: 'https://info.ibrahimyagci.com',
    icon: 'Info'
  },
  {
    name: 'Kommo Integration',
    description: 'CRM Synchronization Service',
    localUrl: 'http://localhost:3001',
    onlineUrl: 'https://kommo.ibrahimyagci.com',
    icon: 'RefreshCw'
  },
  {
    name: 'Main Website',
    description: 'Official Dr. Website',
    localUrl: 'http://localhost:3002',
    onlineUrl: 'https://www.ibrahimyagci.com',
    icon: 'Layout'
  },
  {
    name: 'Calendar API',
    description: 'Backend API Service',
    localUrl: 'http://localhost:3012',
    onlineUrl: 'https://api.ibrahimyagci.com',
    icon: 'Database'
  },
  {
    name: 'Mesai',
    description: 'Shift Management System',
    localUrl: 'http://localhost:3031',
    onlineUrl: 'https://mesai.ibrahimyagci.com',
    icon: 'Clock'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-violet-900/20 border border-slate-700">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain bg-slate-900 p-1"
              />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-slate-100 flex items-center gap-2">
                Op. Dr. İbrahim YAĞCI
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono border border-slate-700">DEV</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">Master Development Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-400 font-mono">localhost:3040</span>
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Intro / Stats */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
          <LayoutDashboard className="w-6 h-6 text-violet-500" />
          <h2 className="text-lg font-bold text-white">Active Projects</h2>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-slate-400 font-bold border border-slate-700">
            {projects.length}
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-900 text-center">
          <p className="text-xs text-slate-600">
            &copy; 2026 Antigravity Development Console. All systems operational.
          </p>
        </footer>
      </div>
    </main>
  );
}
