import { FC } from 'react';
import { ExternalLink, Globe, Monitor, Rocket, Calendar, User, Info, RefreshCw, Layout, Database, Clock } from 'lucide-react';

interface ProjectCardProps {
    name: string;
    description?: string;
    localUrl: string;
    onlineUrl?: string;
    icon?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, description, localUrl, onlineUrl, icon }) => {
    // Icon mapping logic
    const renderIcon = () => {
        const className = "w-6 h-6 text-white";
        switch (icon) {
            case 'Calendar': return <Calendar className={className} />;
            case 'User': return <User className={className} />;
            case 'Info': return <Info className={className} />;
            case 'RefreshCw': return <RefreshCw className={className} />;
            case 'Layout': return <Layout className={className} />;
            case 'Database': return <Database className={className} />;
            case 'Clock': return <Clock className={className} />;
            default: return <Rocket className={className} />;
        }
    };

    // Color mapping based on icon/type
    const getGradient = () => {
        switch (icon) {
            case 'Calendar': return 'from-violet-500 to-purple-600';
            case 'User': return 'from-emerald-500 to-teal-600';
            case 'Info': return 'from-blue-500 to-cyan-600';
            case 'RefreshCw': return 'from-amber-500 to-orange-600';
            case 'Database': return 'from-rose-500 to-pink-600';
            case 'Clock': return 'from-indigo-500 to-blue-600';
            default: return 'from-slate-500 to-slate-600';
        }
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all shadow-xl shadow-black/20">
            {/* Background decorative glow */}
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                {renderIcon()}
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getGradient()} flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-105 transition-transform`}>
                        {renderIcon()}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-slate-200 transition-colors">{name}</h3>
                        {description && <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{description}</p>}
                    </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
                    <a
                        href={localUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-950/50 border border-slate-800 rounded-lg hover:bg-slate-800 hover:border-violet-500/30 transition-all text-xs font-bold text-slate-300 group/btn"
                    >
                        <Monitor className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-violet-400 transition-colors" />
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
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-950/50 border border-slate-800 rounded-lg hover:bg-slate-800 hover:border-emerald-500/30 transition-all text-xs font-bold text-slate-300 group/btn"
                        >
                            <Globe className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-emerald-400 transition-colors" />
                            <span>
                                {(() => {
                                    try {
                                        const url = new URL(onlineUrl);
                                        const hostname = url.hostname;
                                        if (hostname.includes('ibrahimyagci.com')) {
                                            const parts = hostname.split('.');
                                            if (parts.length >= 3) return parts[0];
                                        }
                                        return hostname;
                                    } catch {
                                        return 'Online';
                                    }
                                })()}
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-600 opacity-0 group-hover/btn:opacity-100 transition-opacity ml-1" />
                        </a>
                    ) : (
                        <div className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/20 border border-slate-800/50 rounded-lg cursor-not-allowed text-xs font-bold text-slate-600 opacity-60">
                            <span>Offline</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
