import Link from 'next/link';
import { FC } from 'react';

interface ProjectCardProps {
    name: string;
    description?: string;
    localUrl: string;
    onlineUrl?: string;
    icon?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, description, localUrl, onlineUrl, icon }) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4 hover:border-violet-500/50 transition-all shadow-lg shadow-black/20 group">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-2xl border border-violet-500/20 group-hover:scale-110 transition-transform">
                    {icon || '🚀'}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">{name}</h3>
                    {description && <p className="text-sm text-slate-400">{description}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
                <a
                    href={localUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-600/20 transition-all text-sm font-medium group/btn"
                >
                    <span className="opacity-70 group-hover/btn:opacity-100 transition-opacity">💻</span>
                    <span>
                        {(() => {
                            try {
                                const url = new URL(localUrl);
                                return url.port ? `:${url.port}` : 'Localhost';
                            } catch {
                                return 'Localhost';
                            }
                        })()}
                    </span>
                </a>
                {onlineUrl ? (
                    <a
                        href={onlineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-600/20 transition-all text-sm font-medium group/btn"
                    >
                        <span className="opacity-70 group-hover/btn:opacity-100 transition-opacity">🌐</span>
                        <span>
                            {(() => {
                                try {
                                    const url = new URL(onlineUrl);
                                    const hostname = url.hostname;
                                    // Handle ibrahimyagci.com subdomains
                                    if (hostname.includes('ibrahimyagci.com')) {
                                        const parts = hostname.split('.');
                                        // e.g. takvim.ibrahimyagci.com -> parts ['takvim', 'ibrahimyagci', 'com']
                                        // e.g. www.ibrahimyagci.com -> parts ['www', 'ibrahimyagci', 'com']
                                        // If subdomain exists, it's usually the first part
                                        if (parts.length >= 3) {
                                            return parts[0];
                                        }
                                    }
                                    return hostname;
                                } catch {
                                    return 'Online';
                                }
                            })()}
                        </span>
                    </a>
                ) : (
                    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-600 border border-slate-800 rounded-lg cursor-not-allowed text-sm font-medium">
                        <span>❌</span> Offline
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
