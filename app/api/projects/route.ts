import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Base directory where all projects live
const SCRATCH_DIR = path.resolve(process.cwd(), '..');

interface ProjectMeta {
    name: string;
    dir: string;
    subdomain: string;
    repo?: string;
    onlineUrl: string;
}

// Static metadata — only things that can't be auto-detected
const PROJECT_META: ProjectMeta[] = [
    { name: 'Takvim', dir: 'takvim', subdomain: 'takvim', repo: 'niedy707/takvim', onlineUrl: 'https://takvim.ibrahimyagci.com' },
    { name: 'Asistan', dir: 'asistan-panel', subdomain: 'asistan', repo: 'niedy707/asistan-panel', onlineUrl: 'https://asistan.ibrahimyagci.com' },
    { name: 'Panel', dir: 'panel', subdomain: 'panel', repo: 'niedy707/rinoapp-panel', onlineUrl: 'https://panel.ibrahimyagci.com' },
    { name: 'RinoInfo', dir: 'rhinoplasty-info', subdomain: 'r', repo: 'niedy707/rhinoplasty-info', onlineUrl: 'https://r.ibrahimyagci.com' },
    { name: 'Kommo', dir: 'kommo', subdomain: 'kommo', repo: 'niedy707/kommo', onlineUrl: 'https://kommo.ibrahimyagci.com' },
    { name: 'CalAPI', dir: 'calendar-api', subdomain: 'cal-api', repo: 'niedy707/calendar-api', onlineUrl: 'https://cal-api.ibrahimyagci.com' },
    { name: 'Mesai', dir: 'mesai', subdomain: 'mesai', repo: 'niedy707/mesai', onlineUrl: 'https://mesai.ibrahimyagci.com' },
    { name: 'Master', dir: 'master', subdomain: 'master', repo: 'niedy707/master', onlineUrl: 'https://master.ibrahimyagci.com' },
];

function extractPort(scripts: Record<string, string>): number | null {
    // Expand npm:scriptName references from the dev script
    const expandedScripts = Object.values(scripts).join('\n');

    // Pattern: -p 3030 (Next.js)
    const nextMatch = expandedScripts.match(/-p\s+(\d{4,5})/);
    if (nextMatch) return parseInt(nextMatch[1]);

    // Pattern: --port 3020 (Vite)
    const viteMatch = expandedScripts.match(/--port\s+(\d{4,5})/);
    if (viteMatch) return parseInt(viteMatch[1]);

    // Pattern: PORT=3021 (env-style)
    const envMatch = expandedScripts.match(/\bPORT=(\d{4,5})/);
    if (envMatch) return parseInt(envMatch[1]);

    return null; // Could not detect
}

export async function GET() {
    const projects = PROJECT_META.map((meta) => {
        const pkgPath = path.join(SCRATCH_DIR, meta.dir, 'package.json');
        let port: number | null = null;

        try {
            const raw = fs.readFileSync(pkgPath, 'utf-8');
            const pkg = JSON.parse(raw);
            const scripts: Record<string, string> = pkg.scripts || {};
            port = extractPort(scripts);
        } catch {
            // package.json not found or unreadable
        }

        // Fallback: Next.js default port
        if (port === null) port = 3000;

        return {
            name: meta.name,
            port,
            localUrl: `http://localhost:${port}`,
            onlineUrl: meta.onlineUrl,
            subdomain: meta.subdomain,
            repo: meta.repo ?? null,
        };
    });

    return NextResponse.json(projects);
}
