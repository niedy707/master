import ProjectCard from '@/components/ProjectCard';
import Image from 'next/image';

const projects = [
  {
    name: 'Takvim',
    description: 'Surgical Calendar & Scheduling',
    localUrl: 'http://localhost:3030',
    onlineUrl: 'https://takvim.ibrahimyagci.com',
    icon: '📅'
  },
  {
    name: 'Asistan Panel',
    description: 'Patient Management & Prescriptions',
    localUrl: 'http://localhost:3000',
    onlineUrl: 'https://panel.ibrahimyagci.com',
    icon: '👩‍⚕️'
  },
  {
    name: 'Rhinoplasty Info',
    description: 'Post-op Information Portal',
    localUrl: 'http://localhost:5173',
    onlineUrl: 'https://info.ibrahimyagci.com',
    icon: 'ℹ️'
  },
  {
    name: 'Kommo Integration',
    description: 'CRM Synchronization Service',
    localUrl: 'http://localhost:3001',
    onlineUrl: 'https://kommo.ibrahimyagci.com',
    icon: '🔄'
  },
  {
    name: 'Main Website',
    description: 'Official Dr. Website',
    localUrl: 'http://localhost:3002',
    onlineUrl: 'https://www.ibrahimyagci.com',
    icon: '🌐'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-slate-900 rounded-full border-2 border-slate-800 p-2 shadow-2xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="Dr. Ibrahim Yagci Logo"
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                Op. Dr. İbrahim YAĞCI
              </h1>
              <p className="text-slate-400 text-lg">Master Development Dashboard</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 text-sm text-slate-400">
              Environment: <span className="text-emerald-400 font-bold">Development</span>
            </div>
          </div>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-slate-600 text-sm pt-12 border-t border-slate-900">
          <p>© 2026 Antigravity Development Console</p>
        </footer>
      </div>
    </main>
  );
}
