"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, GitCommit, Zap, Monitor, Globe } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface Project {
    name: string;
    localUrl: string;
    onlineUrl: string;
    port: number;
    subdomain: string;
    repo?: string;
}

const projects: Project[] = [
    { name: "Takvim", localUrl: "http://localhost:3030", onlineUrl: "https://takvim.ibrahimyagci.com", port: 3030, subdomain: "takvim", repo: "niedy707/takvim" },
    { name: "Asistan", localUrl: "http://localhost:3011", onlineUrl: "https://asistan.ibrahimyagci.com", port: 3011, subdomain: "asistan", repo: "niedy707/asistan-panel" },
    { name: "Panel", localUrl: "http://localhost:3033", onlineUrl: "https://panel.ibrahimyagci.com", port: 3033, subdomain: "panel", repo: "niedy707/rinoapp-panel" },
    { name: "RinoInfo", localUrl: "http://localhost:3020", onlineUrl: "https://r.ibrahimyagci.com", port: 3020, subdomain: "r", repo: "niedy707/rhinoplasty-info" },
    { name: "Kommo", localUrl: "http://localhost:3001", onlineUrl: "https://kommo.ibrahimyagci.com", port: 3001, subdomain: "kommo", repo: "niedy707/kommo" },
    { name: "CalAPI", localUrl: "http://localhost:3012", onlineUrl: "https://cal-api.ibrahimyagci.com", port: 3012, subdomain: "cal-api", repo: "niedy707/calendar-api" },
    { name: "Mesai", localUrl: "http://localhost:3031", onlineUrl: "https://mesai.ibrahimyagci.com", port: 3031, subdomain: "mesai", repo: "niedy707/mesai" },
    { name: "Master", localUrl: "http://localhost:3040", onlineUrl: "https://master.ibrahimyagci.com", port: 3040, subdomain: "master", repo: "niedy707/master-dashboard" },
];

export default function Home() {
    const [statuses, setStatuses] = useState<Record<string, "online" | "offline" | "checking">>({});
    const [deployments, setDeployments] = useState<Record<string, string | null>>({});
    const [clock, setClock] = useState("");

    useEffect(() => {
        const tick = () =>
            setClock(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        tick();
        const t = setInterval(tick, 1000);
        checkAll();
        fetchAll();
        const s = setInterval(checkAll, 10000);
        const d = setInterval(fetchAll, 5 * 60 * 1000);
        return () => { clearInterval(t); clearInterval(s); clearInterval(d); };
    }, []);

    const checkAll = () => projects.forEach((p) => checkOne(p.name, p.localUrl));
    const checkOne = async (name: string, url: string) => {
        try {
            const r = await fetch(`/api/status?url=${encodeURIComponent(url)}`);
            const d = await r.json();
            setStatuses((prev) => ({ ...prev, [name]: d.status }));
        } catch {
            setStatuses((prev) => ({ ...prev, [name]: "offline" }));
        }
    };

    const fetchAll = () => projects.forEach((p) => p.repo && fetchOne(p.name, p.repo));
    const fetchOne = async (name: string, repo: string) => {
        try {
            const r = await fetch(`/api/deployments?repo=${repo}`);
            if (!r.ok) throw new Error();
            const d = await r.json();
            setDeployments((prev) => ({ ...prev, [name]: d.date }));
        } catch {
            setDeployments((prev) => ({ ...prev, [name]: null }));
        }
    };

    const onlineCount = Object.values(statuses).filter((s) => s === "online").length;

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#080810", color: "#e2e8f0", fontFamily: "'Inter', system-ui, sans-serif" }}>

            {/* ── TOP HEADER ── */}
            <header style={{
                backgroundColor: "#0c0c18",
                borderBottom: "1px solid #1e1e2e",
                padding: "0 32px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
            }}>
                {/* Left: Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "28px", height: "28px", borderRadius: "7px",
                        backgroundColor: "#4f46e5",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                    }}>
                        <Zap size={14} color="white" />
                    </div>
                    <div>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>Master</span>
                        <span style={{ fontSize: "11px", color: "#475569", marginLeft: "6px" }}>Control</span>
                    </div>
                </div>

                {/* Center: Service count */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{
                        display: "inline-block", width: "7px", height: "7px", borderRadius: "50%",
                        backgroundColor: onlineCount === projects.length ? "#10b981" : "#f59e0b",
                        boxShadow: onlineCount === projects.length ? "0 0 8px rgba(16,185,129,0.5)" : "0 0 8px rgba(245,158,11,0.5)",
                    }} />
                    <span style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 600, color: "white" }}>
                        {onlineCount}<span style={{ color: "#475569", fontWeight: 400 }}>/{projects.length}</span>
                    </span>
                    <span style={{ fontSize: "11px", color: "#475569" }}>online</span>
                </div>

                {/* Right: Clock + Refresh */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.05em" }}>{clock}</span>
                    <button
                        onClick={() => { checkAll(); fetchAll(); }}
                        style={{
                            display: "flex", alignItems: "center", gap: "5px",
                            background: "none", border: "none", cursor: "pointer",
                            color: "#475569", fontSize: "12px", padding: "0",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#818cf8")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                    >
                        <RefreshCw size={13} />
                        <span>Refresh</span>
                    </button>
                </div>
            </header>

            {/* ── MAIN ── */}
            <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

                {/* Sub-header: section label */}
                <div style={{
                    borderBottom: "1px solid #1e1e2e",
                    padding: "12px 32px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <h1 style={{ fontSize: "10px", fontWeight: 600, color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
                        Services
                    </h1>
                    <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#1e293b" }}>ibrahimyagci.com</span>
                </div>

                {/* Column headers */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 100px 220px 160px",
                    gap: "0",
                    padding: "10px 32px",
                    borderBottom: "1px solid #1e1e2e",
                }}>
                    {["Project", "Status", "Production", "Last Deploy"].map((h) => (
                        <span key={h} style={{ fontSize: "9px", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</span>
                    ))}
                </div>

                {/* Project rows */}
                <div style={{ flex: 1 }}>
                    {projects.map((p) => {
                        const status = statuses[p.name] || "checking";
                        const isOnline = status === "online";
                        const isChecking = status === "checking";
                        const dep = deployments[p.name];

                        return (
                            <ProjectRow
                                key={p.name}
                                project={p}
                                isOnline={isOnline}
                                isChecking={isChecking}
                                dep={dep}
                            />
                        );
                    })}
                </div>

                {/* Footer */}
                <div style={{
                    borderTop: "1px solid #1e1e2e",
                    padding: "14px 32px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#1e293b", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        Master Antigravity
                    </span>
                    <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#1e293b" }}>v4.1</span>
                </div>
            </main>
        </div>
    );
}

function ProjectRow({ project, isOnline, isChecking, dep }: {
    project: Project;
    isOnline: boolean;
    isChecking: boolean;
    dep: string | null | undefined;
}) {
    const [hovered, setHovered] = useState(false);

    const statusColor = isOnline ? "#10b981" : isChecking ? "#f59e0b" : "#374151";
    const statusLabel = isOnline ? "Online" : isChecking ? "Checking" : "Offline";

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 100px 220px 160px",
                gap: "0",
                padding: "16px 32px",
                borderBottom: "1px solid #1e1e2e",
                backgroundColor: hovered ? "rgba(255,255,255,0.02)" : "transparent",
                borderLeft: hovered ? "2px solid #4f46e5" : "2px solid transparent",
                transition: "all 0.15s ease",
                opacity: (!isOnline && !isChecking) ? 0.55 : 1,
                alignItems: "center",
                cursor: "default",
            }}
        >
            {/* Project + Port */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#e2e8f0", lineHeight: 1 }}>
                    {project.name}
                </span>
                <a
                    href={project.localUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "3px",
                        fontFamily: "monospace", fontSize: "12px",
                        color: hovered ? "#818cf8" : "#475569",
                        textDecoration: "none",
                        transition: "color 0.15s",
                    }}
                    title={`Open ${project.localUrl}`}
                >
                    <Monitor size={10} />
                    <span style={{ color: hovered ? "#6366f1" : "#334155" }}>:</span>
                    <span>{project.port}</span>
                </a>
            </div>

            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{
                    display: "inline-block", width: "7px", height: "7px", borderRadius: "50%",
                    backgroundColor: statusColor,
                    boxShadow: isOnline ? `0 0 8px ${statusColor}88` : "none",
                    flexShrink: 0,
                }} />
                <span style={{ fontSize: "12px", color: statusColor, fontWeight: 500 }}>{statusLabel}</span>
            </div>

            {/* Subdomain */}
            <div>
                <a
                    href={project.onlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        textDecoration: "none",
                    }}
                    title={project.onlineUrl}
                >
                    <Globe size={11} color={hovered ? "#94a3b8" : "#475569"} />
                    <span style={{ fontSize: "13px", fontWeight: 500, color: hovered ? "#e2e8f0" : "#94a3b8", transition: "color 0.15s" }}>
                        {project.subdomain}
                    </span>
                    <span style={{ fontSize: "12px", color: "#334155" }}>.ibrahimyagci.com</span>
                </a>
            </div>

            {/* Last Deploy */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
                <GitCommit size={11} color="#334155" />
                <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#475569" }}>
                    {dep ? formatDistanceToNow(new Date(dep), { addSuffix: true, locale: tr }) : "—"}
                </span>
            </div>
        </div>
    );
}
