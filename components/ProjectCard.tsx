import { FC } from 'react';
import { ExternalLink, Play, Globe, Calendar, User, Info, RefreshCw, Layout, Database, Clock, Rocket, ChevronRight, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
    name: string;
    description?: string;
    localUrl: string;
    onlineUrl?: string;
    icon?: string;
    color?: string;
    featured?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, description, localUrl, onlineUrl, icon, color = 'slate', featured = false }) => {

    // Dynamic styles based on color prop
    const colors: { [key: string]: string } = {
        violet: 'from-violet-600 to-indigo-600 text-violet-400 group-hover:text-violet-300',
        emerald: 'from-emerald-500 to-teal-600 text-emerald-400 group-hover:text-emerald-300',
        blue: 'from-blue-500 to-cyan-600 text-blue-400 group-hover:text-blue-300',
        amber: 'from-amber-500 to-orange-600 text-amber-400 group-hover:text-amber-300',
        rose: 'from-rose-500 to-pink-600 text-rose-400 group-hover:text-rose-300',
        cyan: 'from-cyan-500 to-sky-600 text-cyan-400 group-hover:text-cyan-300',
        indigo: 'from-indigo-500 to-violet-600 text-indigo-400 group-hover:text-indigo-300',
        slate: 'from-slate-500 to-gray-600 text-slate-400 group-hover:text-slate-300',
    };

    const gradient = colors[color] || colors['slate'];
    const accentColor = gradient.split(' ')[2]; // rough way to get text color class

    const renderIcon = (size = "w-6 h-6") => {
        const props = { className: `${size} text-white` };
        switch (icon) {
            case 'Calendar': return <Calendar {...props} />;
            case 'User': return <User {...props} />;
            case 'Info': return <Info {...props} />;
            case 'RefreshCw': return <RefreshCw {...props} />;
            case 'Layout': return <Layout {...props} />;
            case 'Database': return <Database {...props} />;
            case 'Clock': return <Clock {...props} />;
            default: return <Rocket {...props} />;
        }
    };

    return (
        <div className={`
            relative overflow-hidden rounded-[32px] p-1 
            bg-gradient-to-b from-white/10 to-white/5 
            backdrop-blur-xl border border-white/10 
            group hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-${color}-500/10
            ${featured ? 'h-full flex flex-col' : 'h-full'}
        `}>
            <div className={`
                absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
            `} />

            <div className={`
                relative z-10 bg-[#0a0a16]/80 h-full w-full rounded-[28px] p-6 flex flex-col
                ${featured ? 'justify-between' : ''}
            `}>

                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className={`
                        w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient.split(' ')[0]} ${gradient.split(' ')[1]}
                        flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300
                    `}>
                        {renderIcon(featured ? "w-7 h-7" : "w-6 h-6")}
                    </div>

                    {onlineUrl ? (
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                    ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                </div>

                {/* Content */}
                <div className="mb-6">
                    <h3 className={`font-bold text-white tracking-tight ${featured ? 'text-3xl mb-2' : 'text-xl mb-1'}`}>
                        {name}
                    </h3>
                    <p className={`text-slate-400 font-medium ${featured ? 'text-base' : 'text-sm'}`}>
                        {description}
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-3">
                    <a
                        href={localUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            flex items-center justify-between w-full p-3 rounded-xl
                            bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10
                            transition-all duration-200 group/btn
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-white/5">
                                <Play className="w-3.5 h-3.5 text-slate-300 group-hover/btn:text-white group-hover/btn:fill-white transition-all" />
                            </div>
                            <span className="text-sm font-bold text-slate-300 group-hover/btn:text-white">Localhost</span>
                        </div>
                        <span className="text-xs font-mono text-slate-500 group-hover/btn:text-slate-400">
                            {(() => {
                                try {
                                    const url = new URL(localUrl);
                                    return url.port ? `:${url.port}` : 'Localhost';
                                } catch { return 'Localhost'; }
                            })()}
                        </span>
                    </a>

                    {onlineUrl && (
                        <a
                            href={onlineUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                flex items-center justify-between w-full p-3 rounded-xl
                                bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10
                                transition-all duration-200 group/btn
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-white/5">
                                    <Globe className="w-3.5 h-3.5 text-slate-300 group-hover/btn:text-white transition-all" />
                                </div>
                                <span className="text-sm font-bold text-slate-300 group-hover/btn:text-white">Live Site</span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover/btn:text-white transition-colors" />
                        </a>
                    )}
                </div>
            </div>

            {/* Hover Glow */}
            <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br ${gradient.split(' ')[0]} ${gradient.split(' ')[1]} opacity-0 group-hover:opacity-20 blur-[80px] transition-opacity duration-500 pointer-events-none`} />
        </div>
    );
};

export default ProjectCard;
