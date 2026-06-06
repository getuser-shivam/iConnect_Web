import { useState, useEffect } from 'react';
import { 
  Shield, Lock, ChevronRight, Check, Trash2, Gauge, Terminal, Sliders, AlertTriangle, LockKeyhole, Globe2, Play, Smartphone, Tablet
} from 'lucide-react';

interface VpnServer {
  id: string;
  country: string;
  flag: string;
  name: string;
  latency: number;
  status: 'optimal' | 'standard' | 'maintenance';
  ip: string;
}

const MOCK_SERVERS: VpnServer[] = [
  { id: 'jp-1', country: 'Japan', flag: '🇯🇵', name: 'Tokyo-01 (Optimal)', latency: 42, status: 'optimal', ip: '185.22.148.21' },
  { id: 'us-1', country: 'USA', flag: '🇺🇸', name: 'Los Angeles-12', latency: 138, status: 'optimal', ip: '104.244.72.15' },
  { id: 'de-1', country: 'Germany', flag: '🇩🇪', name: 'Frankfurt-01', latency: 185, status: 'standard', ip: '46.165.210.17' },
  { id: 'sg-1', country: 'Singapore', flag: '🇸🇬', name: 'Singapore-03', latency: 212, status: 'standard', ip: '128.199.201.8' },
  { id: 'uk-1', country: 'UK', flag: '🇬🇧', name: 'London-05 (Maintenance)', latency: 275, status: 'maintenance', ip: '185.120.22.5' }
];

export function VirtualDevice() {
    const [activeTab, setActiveTab] = useState<'home' | 'relays' | 'test' | 'logs' | 'settings'>('home');
    const [deviceType, setDeviceType] = useState<'phone' | 'tablet'>('phone');
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        const rX = -(mouseY / height) * 22;
        const rY = (mouseX / width) * 22;
        setTilt({ x: rX, y: rY });
        
        const pctX = ((e.clientX - rect.left) / width) * 100;
        const pctY = ((e.clientY - rect.top) / height) * 100;
        setShine({ x: pctX, y: pctY, opacity: 0.15 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setShine(prev => ({ ...prev, opacity: 0 }));
    };
    const [isConnecting, setIsConnecting] = useState(false);
    const [connected, setConnected] = useState(true);
    const [activeServer, setActiveServer] = useState<VpnServer>(MOCK_SERVERS[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dnsPreset, setDnsPreset] = useState('cloudflare');
    const [adblock, setAdblock] = useState(true);
    const [ipv6Leak, setIpv6Leak] = useState(true);

    // Live bandwidth speed simulation
    const [liveSpeeds, setLiveSpeeds] = useState({ down: '142.4', up: '48.9' });

    // Live logs array
    const [logs, setLogs] = useState<string[]>([
        '[19:10:42] SYSTEM boot successful.',
        '[19:10:43] VpnService registered with Android Client API.',
        '[19:10:44] Opaque subscription signature verified.',
        '[19:10:45] Secure IP binding established: No leaks detected.'
    ]);

    // Speed test simulation states
    const [testStage, setTestStage] = useState<'idle' | 'ping' | 'download' | 'upload' | 'complete'>('idle');
    const [testPing, setTestPing] = useState(0);
    const [testDown, setTestDown] = useState(0.0);
    const [testUp, setTestUp] = useState(0.0);

    // GDPR Right to Erasure / Wipe states
    const [isWiping, setIsWiping] = useState(false);
    const [wiped, setWiped] = useState(false);

    // Dynamic bandwidth speeds
    useEffect(() => {
        if (!connected || isConnecting) {
            setLiveSpeeds({ down: '0.0', up: '0.0' });
            return;
        }
        const interval = setInterval(() => {
            const d = (80 + Math.random() * 120).toFixed(1);
            const u = (20 + Math.random() * 35).toFixed(1);
            setLiveSpeeds({ down: d, up: u });
        }, 1200);
        return () => clearInterval(interval);
    }, [connected, isConnecting]);

    // Append beautiful log lines helper
    const addLog = (msg: string) => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        setLogs(prev => [...prev, `[${time}] ${msg}`].slice(-30));
    };

    const toggleConnection = () => {
        if (connected) {
            setConnected(false);
            addLog('[ROUTE] Reverting routing table to standard interfaces.');
            addLog('[WARNING] SYSTEM NOT OK: Traffic unsecured and exposed!');
        } else {
            setIsConnecting(true);
            addLog('[SYSTEM] Activating Android custom VpnService interface...');
            addLog(`[CONN] Handshaking and fetching keys from key exchange: ${activeServer.name}...`);
            setTimeout(() => {
                setIsConnecting(false);
                setConnected(true);
                addLog(`[CONN] Secure Tunnel bridge completed via IP ${activeServer.ip}`);
                addLog(`[SYSTEM] Connection OK: Traffic is fully encrypted under AES-256-GCM.`);
            }, 1200);
        }
    };

    const handleSelectServer = (server: VpnServer) => {
        if (server.status === 'maintenance') {
            addLog(`[WARN] Server ${server.name} is under scheduled physical maintenance.`);
            return;
        }
        addLog(`[RELAY] Selecting new routing node: ${server.name} (${server.ip})`);
        setActiveServer(server);
        setIsConnecting(true);
        setConnected(false);
        setTimeout(() => {
            setIsConnecting(false);
            setConnected(true);
            addLog(`[CONN] Switched route. New tunnel IP: ${server.ip}`);
            addLog(`[SYSTEM] Connection OK: Virtual gateway refreshed successfully.`);
        }, 1200);
    };

    const handleDnsValue = (val: string) => {
        setDnsPreset(val);
        addLog(`[DNS] Core resolver changed to: ${val.toUpperCase()}`);
    };

    const handleWipeData = () => {
        setIsWiping(true);
        addLog('[GDPR] RECIPIENT DATA ERASURE PROTOCOL INITIATED.');
        addLog('[GDPR] Revoking active Google Firebase subscription mappings...');
        setTimeout(() => {
            addLog('[GDPR] Purging cached socket logs and analytics nodes...');
            setTimeout(() => {
                addLog('[GDPR] Revoking Android VpnService configurations...');
                setTimeout(() => {
                    setIsWiping(false);
                    setWiped(true);
                    setConnected(false);
                    addLog('[GDPR] DEVICE ERASURE COMPLETE. Client state clean.');
                }, 800);
            }, 800);
        }, 800);
    };

    const handleRestoreData = () => {
        setWiped(false);
        addLog('[SYSTEM] Mock identifier initialized. Ready for VPN tunneling.');
    };

    const executeSpeedTest = () => {
        setTestStage('ping');
        addLog('[BENCHMARK] Executing system speed and latency suite...');
        setTimeout(() => {
            const p = Math.floor(12 + Math.random() * 20);
            setTestPing(p);
            addLog(`[BENCHMARK] Ping check resolved: ${p}ms latency.`);

            setTimeout(() => {
                setTestStage('download');
                let downProgress = 0;
                const dInt = setInterval(() => {
                    downProgress += 25 + Math.random() * 20;
                    if (downProgress > 280) downProgress = 280 + Math.random() * 10;
                    setTestDown(parseFloat(downProgress.toFixed(1)));
                }, 100);

                setTimeout(() => {
                    clearInterval(dInt);
                    addLog(`[BENCHMARK] Resolved download bandwidth: ${downProgress.toFixed(1)} Mbps`);

                    setTimeout(() => {
                        setTestStage('upload');
                        let upProgress = 0;
                        const uInt = setInterval(() => {
                            upProgress += 10 + Math.random() * 8;
                            if (upProgress > 95) upProgress = 95 + Math.random() * 5;
                            setTestUp(parseFloat(upProgress.toFixed(1)));
                        }, 100);

                        setTimeout(() => {
                            clearInterval(uInt);
                            addLog(`[BENCHMARK] Resolved upload bandwidth: ${upProgress.toFixed(1)} Mbps`);
                            setTestStage('complete');
                            addLog('[BENCHMARK] Telemetry suite completed with zero packets dropped.');
                        }, 1200);
                    }, 400);
                }, 1500);
            }, 600);
        }, 600);
    };

    // Filter server list
    const filteredServers = MOCK_SERVERS.filter(serv => 
        serv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        serv.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-full">
            {/* Viewport/Resolution Switching Console */}
            <div className="flex bg-zinc-950/80 backdrop-blur-md p-1.5 rounded-full border border-white/15 items-center gap-2 shadow-2xl z-20 shrink-0 select-none">
                <button
                    type="button"
                    onClick={() => setDeviceType('phone')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono leading-none tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                        deviceType === 'phone' 
                            ? 'bg-[#00E5FF] text-black font-extrabold shadow-[0_2px_12px_rgba(0,229,255,0.35)]' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile Phone</span>
                </button>
                <button
                    type="button"
                    onClick={() => setDeviceType('tablet')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono leading-none tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                        deviceType === 'tablet' 
                            ? 'bg-[#00E5FF] text-black font-extrabold shadow-[0_2px_12px_rgba(0,229,255,0.35)]' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <Tablet className="w-3.5 h-3.5" />
                    <span>Tablet Grid</span>
                </button>
            </div>

            {/* Simulated hardware viewport container */}
            <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.1s ease-out, max-w 0.5s cubic-bezier(0.16, 1, 0.3, 1), aspect-ratio 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    transformStyle: 'preserve-3d'
                }}
                className={`relative z-10 p-2 bg-gradient-to-b from-zinc-800 to-zinc-950 shadow-2xl w-full flex flex-col mx-auto ring-1 ring-white/10 select-none cursor-grab active:cursor-grabbing hover:shadow-[0_0_50px_rgba(0,229,255,0.15)] transition-shadow duration-300 ${
                    deviceType === 'phone' 
                        ? 'max-w-[325px] aspect-[9/19] rounded-[3.1rem]' 
                        : 'max-w-[620px] aspect-[1.5] rounded-[2.2rem]'
                }`}
            >
                {/* Real Physical Outer Buttons */}
                {deviceType === 'phone' ? (
                    <>
                        {/* Volume Up */}
                        <div className="absolute top-28 -left-1 w-[4px] h-10 bg-zinc-700 rounded-l shadow border-y border-l border-zinc-600" />
                        {/* Volume Down */}
                        <div className="absolute top-42 -left-1 w-[4px] h-10 bg-zinc-700 rounded-l shadow border-y border-l border-zinc-600" />
                        {/* Power Button */}
                        <div className="absolute top-36 -right-1 w-[4px] h-12 bg-zinc-700 rounded-r shadow border-y border-r border-zinc-600" />
                    </>
                ) : (
                    <>
                        {/* Volume Up */}
                        <div className="absolute -top-1 left-24 w-10 h-[4px] bg-zinc-700 rounded-t shadow border-x border-t border-zinc-600" />
                        {/* Volume Down */}
                        <div className="absolute -top-1 left-36 w-10 h-[4px] bg-zinc-700 rounded-t shadow border-x border-t border-zinc-600" />
                        {/* Power Button */}
                        <div className="absolute -top-1 right-20 w-12 h-[4px] bg-zinc-700 rounded-t shadow border-x border-t border-zinc-600" />
                    </>
                )}

                {/* Glossy light reflection sheen overlay */}
                <div 
                    style={{
                        background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255, 255, 255, ${shine.opacity}), transparent 55%)`,
                        pointerEvents: 'none',
                        zIndex: 25
                    }}
                    className={`absolute inset-[10px] transition-opacity duration-300 pointer-events-none ${
                        deviceType === 'phone' ? 'rounded-[2.6rem]' : 'rounded-[1.9rem]'
                    }`}
                />

                <div 
                    className={`bg-black flex-grow overflow-hidden relative flex flex-col shadow-inner ${
                        deviceType === 'phone' 
                            ? 'rounded-[2.6rem] pt-12 pb-3 px-4' 
                            : 'rounded-[1.9rem] p-4 pt-10 flex-row gap-4 h-full'
                    }`} 
                    style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
                >
                    {/* Dynamic Island Area */}
                    <div className="absolute top-4 inset-x-0 flex justify-center z-30 pointer-events-none">
                        {deviceType === 'phone' ? (
                            <div className="w-24 h-6 bg-zinc-950 rounded-full flex items-center justify-between px-3 ring-1 ring-white/5 shadow-md">
                                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                <div className="w-2 h-2 rounded-full bg-white/10" />
                            </div>
                        ) : (
                            <div className="w-4 h-4 bg-zinc-950 rounded-full ring-1 ring-white/5 shadow-md flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                            </div>
                        )}
                    </div>

                    {/* Subtle Background Glow based on connection status */}
                    <div className="absolute top-0 inset-0 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                        {connected && !isConnecting && (
                            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00E5FF]/10 blur-[60px] rounded-full mix-blend-screen" />
                        )}
                        {!connected && !isConnecting && (
                            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/5 blur-[60px] rounded-full mix-blend-screen animate-pulse" />
                        )}
                    </div>

                    {/* NOW BRANCH BETWEEN PHONE AND TABLET INTERNAL LAYOUTS */}
                    {deviceType === 'phone' ? (
                        /* PHONE LAYOUT COMPACT STANDALONE */
                        <div className="flex-grow flex flex-col min-h-0 w-full h-full justify-between">
                            {/* Connection Status Header Bar */}
                            <div className="flex justify-between items-center mt-5 mb-5 z-20 w-full px-1">
                                <span className="text-[11px] font-semibold tracking-wide text-white flex items-center gap-1.5 select-none animate-fade-in">
                                  <LockKeyhole className={`w-3.5 h-3.5 ${connected ? 'text-[#00E5FF]' : 'text-red-500 animate-pulse'}`} /> iConnect Client
                                </span>
                                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                                    <span className="text-[9px] font-mono tracking-wide">STATE:</span>
                                    <span className={`text-[9px] font-bold uppercase transition-colors tracking-wide ${connected ? 'text-[#00E5FF]' : 'text-red-400 animate-pulse'}`}>
                                        {connected ? 'OK' : 'NOT OK'}
                                    </span>
                                </div>
                            </div>

                            {/* Content switching based on active tab */}
                            <div className="flex-grow flex flex-col min-h-0 overflow-y-auto no-scrollbar z-20">
                                {wiped ? (
                                    <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
                                        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30 mb-4 animate-bounce">
                                            <AlertTriangle className="w-6 h-6 text-red-400" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-white mb-2">GDPR Erasure Triggered</h3>
                                        <p className="text-[11px] text-zinc-400 leading-relaxed mb-6 text-left">
                                            All Firebase subscription logs, VPN hardware metrics, and routing slot records have been fully wiped. No user traces remain on device or node databases.
                                        </p>
                                        <button 
                                            onClick={handleRestoreData}
                                            className="px-5 py-2 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] text-black rounded-xl text-xs font-semibold hover:opacity-90 transition-colors cursor-pointer"
                                        >
                                            Reinitialize Session
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* --- TAB CONTENT 1: HOME --- */}
                                        {activeTab === 'home' && (
                                            <div className="flex-1 flex flex-col items-center justify-between py-2">
                                                {/* Pulse Button */}
                                                <div className="flex-grow flex items-center justify-center">
                                                    <button 
                                                        onClick={toggleConnection}
                                                        className="group relative w-32 h-32 rounded-full flex items-center justify-center focus:outline-none transition-transform active:scale-95 cursor-pointer animate-fade-in"
                                                    >
                                                        {connected && !isConnecting && (
                                                            <>
                                                                <div className="absolute inset-0 rounded-full bg-[#00E5FF]/20 animate-[ping_3s_ease-out_infinite]" />
                                                                <div className="absolute -inset-4 rounded-full border border-[#00E5FF]/15 animate-[ping_3s_ease-out_infinite_0.5s]" />
                                                            </>
                                                        )}
                                                        {!connected && !isConnecting && (
                                                            <div className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse" />
                                                        )}
                                                        {isConnecting && (
                                                            <div className="absolute -inset-2 rounded-full border-t-2 border-[#00E5FF] animate-spin" />
                                                        )}
                                                        
                                                        <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-700 relative z-10 overflow-hidden ${connected ? 'bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] shadow-[0_0_30px_rgba(0,229,255,0.35)] text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'}`}>
                                                            <div className={`absolute inset-0 bg-white/10 transition-opacity duration-300 ${connected ? 'opacity-100 group-hover:opacity-40' : 'opacity-0'}`} />
                                                            <Shield className={`w-7 h-7 mb-1 transition-colors duration-700 ${connected ? 'text-black' : 'text-zinc-500'}`} />
                                                            <span className={`text-[9px] font-bold tracking-widest uppercase transition-colors duration-700 ${connected ? 'text-black font-extrabold' : 'text-zinc-500'}`}>
                                                                {isConnecting ? 'Linking' : connected ? 'Secure' : 'Unsecured'}
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>

                                                {/* Status details warning/safe info */}
                                                <div className="w-full text-center mb-4">
                                                    <div className="text-xl font-mono text-white tracking-tight font-light mb-1 select-all">
                                                        {connected ? activeServer.ip : '0.0.0.0'}
                                                    </div>
                                                    <div className={`text-[11px] font-medium tracking-wide mb-3 ${connected ? 'text-[#00E5FF]' : 'text-red-400 animate-pulse'}`}>
                                                        {connected 
                                                            ? `Gateway Established (Ping: ${activeServer.latency}ms)` 
                                                            : 'Unsecured connection (SYSTEM NOT OK!)'
                                                        }
                                                    </div>

                                                    {/* Speeds */}
                                                    <div className="grid grid-cols-2 gap-2 bg-white/[0.02] border border-white/5 rounded-2xl p-2 max-w-[260px] mx-auto">
                                                        <div className="text-center border-r border-white/5 py-1">
                                                            <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-medium">Download</span>
                                                            <span className="text-xs font-mono font-bold text-white">{liveSpeeds.down} Mbps</span>
                                                        </div>
                                                        <div className="text-center py-1">
                                                            <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-medium">Upload</span>
                                                            <span className="text-xs font-mono font-bold text-white">{liveSpeeds.up} Mbps</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Optimal list shortcut card */}
                                                <div className="w-full mt-auto bg-zinc-900/55 backdrop-blur-md p-2.5 rounded-2xl border border-white/5 flex items-center justify-between select-none hover:bg-zinc-800/40 transition-colors cursor-pointer text-left animate-fade-in" onClick={() => setActiveTab('relays')}>
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="text-lg leading-none">{activeServer.flag}</span>
                                                        <div>
                                                            <div className="text-[11px] font-semibold text-white">{activeServer.name}</div>
                                                            <div className="text-[9px] font-mono text-zinc-400">{activeServer.country} • {activeServer.latency}ms</div>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                                                </div>
                                            </div>
                                        )}

                                        {/* --- TAB CONTENT 2: RELAYS --- */}
                                        {activeTab === 'relays' && (
                                            <div className="flex-1 flex flex-col min-h-0 py-1 text-left animate-fade-in">
                                                <div className="text-[11px] text-zinc-400 mb-3 font-medium px-1">Active Relays: Filter and Tap to Switch Tunnel</div>
                                                
                                                {/* Search Bar */}
                                                <div className="mb-3">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Search relay nodes..." 
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-white/20"
                                                    />
                                                </div>

                                                {/* Nodes list */}
                                                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[220px]">
                                                    {filteredServers.map((server) => {
                                                        const isCurrent = activeServer.id === server.id;
                                                        return (
                                                            <div 
                                                                key={server.id} 
                                                                onClick={() => handleSelectServer(server)}
                                                                className={`flex justify-between items-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                                                                    isCurrent 
                                                                        ? 'bg-white/5 border-white/10' 
                                                                        : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-2.5 text-left">
                                                                    <span className="text-base leading-none">{server.flag}</span>
                                                                    <div>
                                                                        <div className="text-[11px] font-semibold text-white">{server.name}</div>
                                                                        <div className="text-[9px] text-zinc-500 font-mono">LATENCY: {server.latency}MS</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    {isCurrent && <Check className="w-3.5 h-3.5 text-[#00E5FF]" />}
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                                                        server.status === 'optimal' ? 'bg-[#00E5FF]' : server.status === 'standard' ? 'bg-zinc-500' : 'bg-red-500 animate-pulse'
                                                                    }`} />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    {filteredServers.length === 0 && (
                                                        <div className="text-center py-6 text-zinc-400 text-xs">No relays located.</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* --- TAB CONTENT 3: SPEED TEST --- */}
                                        {activeTab === 'test' && (
                                            <div className="flex-1 flex flex-col justify-between py-1 text-left animate-fade-in">
                                                <div className="text-[11px] text-zinc-400 mb-2 font-medium px-1">Real-Time Routing Optimization Suite</div>

                                                {/* Gauge design drawing */}
                                                <div className="flex-1 flex flex-col items-center justify-center">
                                                    <div className="relative w-28 h-28 flex items-center justify-center">
                                                        {/* Circular Background Gauge */}
                                                        <svg className="absolute w-full h-full transform -rotate-90">
                                                            <circle cx="56" cy="56" r="48" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
                                                            <circle 
                                                                cx="56" cy="56" r="48" fill="transparent" 
                                                                stroke={testStage === 'download' ? '#00E5FF' : testStage === 'upload' ? '#00B8D4' : 'rgba(255,255,255,0.1)'} 
                                                                strokeWidth="6" 
                                                                strokeDasharray="301"
                                                                strokeDashoffset={301 - (301 * (testStage === 'download' ? testDown : testStage === 'upload' ? testUp : 0)) / 300}
                                                                className="transition-all duration-100"
                                                            />
                                                        </svg>
                                                        
                                                        {/* Speed readout inside */}
                                                        <div className="text-center z-10 font-mono">
                                                            <div className="text-sm font-bold text-white leading-none">
                                                                {testStage === 'download' ? testDown : testStage === 'upload' ? testUp : testStage === 'complete' ? testDown : '0.0'}
                                                            </div>
                                                            <div className="text-[8px] text-zinc-500 mt-1 uppercase font-medium">Mbps</div>
                                                        </div>
                                                    </div>

                                                    {/* Test metrics */}
                                                    <div className="grid grid-cols-3 gap-1 bg-white/[0.02] border border-white/5 rounded-xl p-1.5 w-full mt-4 text-[9px]">
                                                        <div className="text-center">
                                                            <span className="text-zinc-500 block">Ping</span>
                                                            <span className="font-mono text-white font-bold">{testPing ? `${testPing}ms` : '-'}</span>
                                                        </div>
                                                        <div className="text-center border-x border-white/5">
                                                            <span className="text-zinc-500 block">Down</span>
                                                            <span className="font-mono text-white font-bold">{testDown ? `${testDown}M` : '-'}</span>
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="text-zinc-500 block">Up</span>
                                                            <span className="font-mono text-white font-bold">{testUp ? `${testUp}M` : '-'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action button */}
                                                <button 
                                                    disabled={testStage !== 'idle' && testStage !== 'complete'}
                                                    onClick={executeSpeedTest}
                                                    className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:opacity-90 text-black text-xs font-semibold py-2.5 rounded-xl transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.15)] animate-fade-in"
                                                >
                                                    <Play className="w-3.5 h-3.5 fill-black" />
                                                    <span>
                                                        {testStage === 'idle' ? 'Commence Test' : 
                                                         testStage === 'ping' ? 'Checking Ping...' : 
                                                         testStage === 'download' ? 'Testing DL...' : 
                                                         testStage === 'upload' ? 'Testing UL...' : 'Retest Speeds'}
                                                    </span>
                                                </button>
                                            </div>
                                        )}

                                        {/* --- TAB CONTENT 4: LOGS --- */}
                                        {activeTab === 'logs' && (
                                            <div className="flex-grow flex flex-col min-h-0 py-1 text-left animate-fade-in">
                                                <div className="flex justify-between items-center mb-2 px-1">
                                                    <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Device Socket Logs</span>
                                                    <span className="text-[8px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-1.5 py-0.5 rounded-full border border-[#00E5FF]/15">ACTIVE VpnService</span>
                                                </div>
                                                
                                                {/* Console container */}
                                                <div className="flex-grow bg-zinc-950 rounded-xl p-2.5 border border-white/5 overflow-y-auto font-mono text-[9px] text-[#ede1cd] leading-relaxed max-h-[220px] scrollbar-thin">
                                                    {logs.map((log, index) => {
                                                        const isWarn = log.includes('[WARN]') || log.includes('[WARNING]') || log.includes('NOT OK');
                                                        const isGdpr = log.includes('[GDPR]');
                                                        const isSystem = log.includes('[SYSTEM]');
                                                        return (
                                                            <div 
                                                                key={index} 
                                                                className={`${
                                                                    isWarn ? 'text-red-400 font-medium' : isGdpr ? 'text-orange-400' : isSystem ? 'text-indigo-300' : 'text-[#00E5FF]'
                                                                }`}
                                                            >
                                                                {log}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* --- TAB CONTENT 5: SETTINGS --- */}
                                        {activeTab === 'settings' && (
                                            <div className="flex-grow flex flex-col justify-between py-1 text-left border-white/5 animate-fade-in">
                                                <div className="text-[11px] text-zinc-400 mb-2 font-medium px-1">Configure Routing Security & Privacy Policies</div>

                                                {/* General switches & DNS selectors */}
                                                <div className="space-y-3 flex-1 overflow-y-auto pr-1 max-h-[190px] scrollbar-none">
                                                    {/* DNS Selectors */}
                                                    <div className="bg-white/[0.01] border border-white/5 rounded-xl p-2">
                                                        <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mb-2">DNS Preset Server</div>
                                                        <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                                                            {[
                                                                { id: 'cloudflare', label: 'Cloudflare (1.1.1.1)' },
                                                                { id: 'google', label: 'Google (8.8.8.8)' },
                                                                { id: 'adgard', label: 'AdGuard' },
                                                                { id: 'quad9', label: 'Quad9 Security' }
                                                            ].map(dns => (
                                                                <button
                                                                    key={dns.id}
                                                                    type="button"
                                                                    onClick={() => handleDnsValue(dns.id)}
                                                                    className={`py-1 px-1.5 rounded-lg font-medium text-left transition-colors cursor-pointer ${
                                                                        dnsPreset === dns.id 
                                                                            ? 'bg-[#00E5FF] text-black font-semibold' 
                                                                            : 'bg-white/5 text-zinc-400 hover:text-white'
                                                                    }`}
                                                                >
                                                                    {dns.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Toggles */}
                                                    <div className="space-y-2 bg-white/[0.01] border border-white/5 rounded-xl p-2 text-[10px]">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-zinc-300 font-medium">Threat Protection (Ad/Tracking)</span>
                                                            <button 
                                                                type="button"
                                                                onClick={() => { setAdblock(!adblock); addLog(`[PREF] Threat Protection set: ${!adblock}`); }}
                                                                className={`w-7 h-4 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${adblock ? 'bg-[#00E5FF] justify-end' : 'bg-zinc-800 justify-start'}`}
                                                            >
                                                                <div className="w-3 h-3 bg-white rounded-full shadow" />
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-between items-center border-t border-white/5 pt-2">
                                                            <span className="text-zinc-300 font-medium">IPv6 Leak Prevention</span>
                                                            <button 
                                                                type="button"
                                                                onClick={() => { setIpv6Leak(!ipv6Leak); addLog(`[PREF] IPv6 prevention set: ${!ipv6Leak}`); }}
                                                                className={`w-7 h-4 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${ipv6Leak ? 'bg-[#00E5FF] justify-end' : 'bg-zinc-800 justify-start'}`}
                                                            >
                                                                <div className="w-3 h-3 bg-white rounded-full shadow" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Data Safety right to erasure */}
                                                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-2 text-[10px]">
                                                        <span className="text-red-400 font-semibold uppercase tracking-wider block mb-1">GDPR Right to Erasure</span>
                                                        <span className="text-zinc-400 font-normal leading-relaxed block mb-2.5">Instant wiping deletes active sub indices, Firebase auth traces, and VPN routing entries permanently.</span>
                                                        <button 
                                                            type="button"
                                                            disabled={isWiping}
                                                            onClick={handleWipeData}
                                                            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-1.5 text-[10px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                            <span>{isWiping ? 'Wiping Node...' : 'Purge All Database Records'}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Simulated Device Bottom Navigation Row */}
                            <div className="mt-auto border-t border-white/5 pt-2 flex justify-between px-1 bg-black z-20">
                                {[
                                    { id: 'home', label: 'Shield', icon: <Shield className="w-3.5 h-3.5" /> },
                                    { id: 'relays', label: 'Relays', icon: <Globe2 className="w-3.5 h-3.5" /> },
                                    { id: 'test', label: 'Speed', icon: <Gauge className="w-3.5 h-3.5" /> },
                                    { id: 'logs', label: 'Console', icon: <Terminal className="w-3.5 h-3.5" /> },
                                    { id: 'settings', label: 'Prefs', icon: <Sliders className="w-3.5 h-3.5" /> }
                                ].map((btn) => {
                                    const isSel = activeTab === btn.id;
                                    return (
                                        <button
                                            key={btn.id}
                                            type="button"
                                            onClick={() => { setActiveTab(btn.id as any); }}
                                            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all cursor-pointer ${
                                                isSel ? 'text-[#00E5FF] scale-115' : 'text-zinc-500 hover:text-zinc-400'
                                            }`}
                                        >
                                            {btn.icon}
                                            <span className="text-[7.5px] font-bold uppercase tracking-wider">{btn.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* TABLET LAYOUT - FLUID SPLIT BENTO SCREEN CONFIGURATION */
                        <div className="flex-grow flex flex-row gap-4 w-full h-full min-h-0 text-left z-20">
                            {/* Left Tablet Navigation Sidebar */}
                            <div className="w-[110px] shrink-0 border-r border-white/5 pr-3 pt-2 h-full flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="text-left select-none pb-2 border-b border-white/5 shrink-0">
                                        <div className="text-[12px] font-bold text-white flex items-center gap-1">
                                            <LockKeyhole className={`w-3.5 h-3.5 shrink-0 ${connected ? 'text-[#00E5FF]' : 'text-red-500 animate-pulse'}`} />
                                            <span>iConnect</span>
                                        </div>
                                        <div className="text-[7.5px] font-mono font-medium text-cyan-400 mt-0.5 tracking-wider uppercase">Tablet Core</div>
                                    </div>

                                    {/* Sidebar buttons */}
                                    <div className="space-y-1">
                                        {[
                                            { id: 'home', label: 'Shield', icon: <Shield className="w-3.5 h-3.5" /> },
                                            { id: 'relays', label: 'Relays', icon: <Globe2 className="w-3.5 h-3.5" /> },
                                            { id: 'test', label: 'Speed', icon: <Gauge className="w-3.5 h-3.5" /> },
                                            { id: 'logs', label: 'Console', icon: <Terminal className="w-3.5 h-3.5" /> },
                                            { id: 'settings', label: 'Prefs', icon: <Sliders className="w-3.5 h-3.5" /> }
                                        ].map((btn) => {
                                            const isSel = activeTab === btn.id;
                                            return (
                                                <button
                                                    key={btn.id}
                                                    type="button"
                                                    onClick={() => { setActiveTab(btn.id as any); }}
                                                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all text-left cursor-pointer ${
                                                        isSel 
                                                            ? 'bg-[#00E5FF] text-black font-semibold shadow-md shadow-[#00E5FF]/5' 
                                                            : 'text-zinc-500 hover:text-zinc-400 hover:bg-white/[0.02]'
                                                    }`}
                                                >
                                                    <div className="shrink-0">{btn.icon}</div>
                                                    <span className="text-[8.5px] font-bold uppercase tracking-wider">{btn.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="mt-auto bg-white/[0.02] border border-white/5 p-1.5 rounded-xl text-center shrink-0">
                                    <span className="text-[7px] text-zinc-500 block uppercase tracking-wider leading-none mb-1">State Log</span>
                                    <span className={`text-[8.5px] font-bold uppercase font-mono leading-none ${connected ? 'text-[#00E5FF]' : 'text-red-400 animate-pulse'}`}>
                                        {connected ? 'Routing OK' : 'No Route'}
                                    </span>
                                </div>
                            </div>

                            {/* Right Tablet Grid Work Area */}
                            <div className="flex-grow flex flex-col min-h-0 h-full justify-between pr-1">
                                {wiped ? (
                                    <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30 mb-3 animate-bounce">
                                            <AlertTriangle className="w-5 h-5 text-red-400" />
                                        </div>
                                        <h3 className="text-xs font-semibold text-white mb-1.5">GDPR Account Erasure protocol</h3>
                                        <p className="text-[10px] text-zinc-400 leading-relaxed max-w-[280px] mb-4">
                                            Logs, metrics, and routing slots are fully wiped from Firebase auth and device registers.
                                        </p>
                                        <button 
                                            onClick={handleRestoreData}
                                            className="px-4 py-1.5 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] text-black rounded-lg text-[9px] font-bold hover:opacity-90 transition-colors cursor-pointer"
                                        >
                                            Reinitialize Session
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* --- TABLET CONTENT 1: HOME (BENTO LAYOUT) --- */}
                                        {activeTab === 'home' && (
                                            <div className="flex-grow flex flex-col justify-between py-1 h-full min-h-0 animate-fade-in text-left">
                                                <div className="grid grid-cols-12 gap-3 flex-grow items-center h-full">
                                                    {/* Left half: giant pulse widget */}
                                                    <div className="col-span-6 flex flex-col items-center justify-between py-2 h-full border-r border-white/5 pr-2">
                                                        <div className="text-[8.5px] text-[#00E5FF] font-semibold tracking-wider bg-[#00E5FF]/5 border border-[#00E5FF]/15 px-2 py-0.5 rounded-full uppercase leading-none">
                                                            {connected ? 'Secure Tunnel Active' : 'Tunnel Disconnected'}
                                                        </div>

                                                        <div className="my-auto">
                                                            <button 
                                                                onClick={toggleConnection}
                                                                className="group relative w-20 h-20 rounded-full flex items-center justify-center focus:outline-none transition-transform active:scale-95 cursor-pointer"
                                                            >
                                                                {connected && !isConnecting && (
                                                                    <>
                                                                        <div className="absolute inset-0 rounded-full bg-[#00E5FF]/20 animate-[ping_3s_ease-out_infinite]" />
                                                                        <div className="absolute -inset-2 rounded-full border border-[#00E5FF]/15 animate-[ping_3s_ease-out_infinite_0.5s]" />
                                                                    </>
                                                                )}
                                                                {!connected && !isConnecting && (
                                                                    <div className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse" />
                                                                )}
                                                                {isConnecting && (
                                                                    <div className="absolute -inset-2 rounded-full border-t border-[#00E5FF] animate-spin" />
                                                                )}
                                                                
                                                                <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-700 relative z-10 overflow-hidden ${connected ? 'bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] shadow-[0_0_25px_rgba(0,229,255,0.3)] text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'}`}>
                                                                    <div className={`absolute inset-0 bg-white/10 transition-opacity duration-300 ${connected ? 'opacity-100 group-hover:opacity-40' : 'opacity-0'}`} />
                                                                    <Shield className={`w-5 h-5 mb-0.5 transition-colors duration-700 ${connected ? 'text-black' : 'text-zinc-500'}`} />
                                                                    <span className={`text-[7.5px] font-bold tracking-widest uppercase transition-colors duration-700 ${connected ? 'text-black font-extrabold' : 'text-zinc-500'}`}>
                                                                        {isConnecting ? 'Linking' : connected ? 'Secure' : 'Unsecured'}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </div>

                                                        <div className="text-center">
                                                            <div className="text-sm font-mono text-white tracking-tight leading-none mb-0.5 select-all font-bold">
                                                                {connected ? activeServer.ip : '0.0.0.0'}
                                                            </div>
                                                            <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest block font-medium">Virtual Gateway IP</span>
                                                        </div>
                                                    </div>

                                                    {/* Right half: speeds and server info */}
                                                    <div className="col-span-6 flex flex-col justify-between h-full pl-2 gap-2 text-left">
                                                        <div className="bg-white/[0.01] border border-white/5 p-2 rounded-xl space-y-1.5 flex-1 flex flex-col justify-center">
                                                            <div className="flex justify-between items-center text-[9px]">
                                                                <span className="text-zinc-500">Selected Node</span>
                                                                <span className="text-white font-bold">{activeServer.flag} {activeServer.name}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-[9px]">
                                                                <span className="text-zinc-500">Heuristics Limit</span>
                                                                <span className="text-emerald-400 font-semibold font-mono">OK (&lt; 1200ms)</span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-[9px]">
                                                                <span className="text-zinc-500">Protocols</span>
                                                                <span className="text-cyan-400 font-mono text-[8px]">WireGuard v2</span>
                                                            </div>
                                                        </div>

                                                        {/* Speeds side-by-side */}
                                                        <div className="grid grid-cols-2 gap-1.5 shrink-0">
                                                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2 text-center">
                                                                <span className="text-[7px] text-zinc-500 uppercase tracking-widest block font-bold leading-none mb-1">Down</span>
                                                                <span className="text-[10px] font-mono font-bold text-[#00E5FF]">{liveSpeeds.down} Mb</span>
                                                            </div>
                                                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2 text-center">
                                                                <span className="text-[7px] text-zinc-500 uppercase tracking-widest block font-bold leading-none mb-1">Up</span>
                                                                <span className="text-[10px] font-mono font-bold text-white">{liveSpeeds.up} Mb</span>
                                                            </div>
                                                        </div>

                                                        <div className="bg-zinc-900/55 p-1.5 rounded-xl border border-white/5 flex items-center justify-between select-none hover:bg-zinc-800/40 transition-colors cursor-pointer text-left shrink-0" onClick={() => setActiveTab('relays')}>
                                                            <div className="flex items-center gap-1.5 min-w-0">
                                                                <span className="text-xs leading-none shrink-0">{activeServer.flag}</span>
                                                                <div className="min-w-0">
                                                                    <div className="text-[9.5px] font-semibold text-white truncate">{activeServer.name}</div>
                                                                    <div className="text-[7px] text-zinc-500 font-mono">LATENCY: {activeServer.latency}ms</div>
                                                                </div>
                                                            </div>
                                                            <ChevronRight className="w-3 h-3 text-zinc-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* --- TABLET CONTENT 2: RELAYS (ADAPTIVE GRID) --- */}
                                        {activeTab === 'relays' && (
                                            <div className="flex-grow flex flex-col min-h-0 py-1 animate-fade-in text-left">
                                                <div className="flex justify-between items-center mb-2 px-0.5">
                                                    <span className="text-[9.5px] text-zinc-400 font-bold uppercase tracking-wider">Relay Node Registry ({filteredServers.length})</span>
                                                    <span className="text-[8px] text-[#00E5FF] bg-[#00E5FF]/5 border border-[#00E5FF]/15 px-1.5 py-0.5 rounded-full select-none leading-none">GRID ROUTING OK</span>
                                                </div>

                                                <div className="mb-2">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Type proxy or location..." 
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-2.5 py-1 text-[10px] text-white focus:outline-none focus:border-white/15"
                                                    />
                                                </div>

                                                <div className="flex-1 overflow-y-auto pr-0.5 max-h-[175px] scrollbar-thin">
                                                    <div className="grid grid-cols-2 gap-1.5 text-left">
                                                        {filteredServers.map((server) => {
                                                            const isCurrent = activeServer.id === server.id;
                                                            return (
                                                                <div 
                                                                    key={server.id} 
                                                                    onClick={() => handleSelectServer(server)}
                                                                    className={`flex justify-between items-center p-2 rounded-xl border transition-all cursor-pointer ${
                                                                        isCurrent 
                                                                            ? 'bg-white/5 border-white/10 shadow-sm' 
                                                                            : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center gap-2 text-left min-w-0">
                                                                        <span className="text-sm leading-none shrink-0">{server.flag}</span>
                                                                        <div className="min-w-0">
                                                                            <div className="text-[9.5px] font-semibold text-white truncate">{server.name}</div>
                                                                            <div className="text-[7.5px] text-zinc-500 font-mono">LATENCY: {server.latency}ms</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-1 shrink-0">
                                                                        {isCurrent && <Check className="w-3 h-3 text-[#00E5FF]" />}
                                                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                                                            server.status === 'optimal' ? 'bg-[#00E5FF]' : server.status === 'standard' ? 'bg-zinc-500' : 'bg-red-500 animate-pulse'
                                                                        }`} />
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* --- TABLET CONTENT 3: SPEED TEST --- */}
                                        {activeTab === 'test' && (
                                            <div className="flex-grow flex flex-col justify-between py-1 h-full animate-fade-in text-left">
                                                <div className="grid grid-cols-12 gap-3 items-center flex-grow">
                                                    <div className="col-span-5 flex flex-col items-center">
                                                        <div className="relative w-22 h-22 flex items-center justify-center">
                                                            <svg className="absolute w-full h-full transform -rotate-90">
                                                                <circle cx="44" cy="44" r="38" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                                                                <circle 
                                                                    cx="44" cy="44" r="38" fill="transparent" 
                                                                    stroke={testStage === 'download' ? '#00E5FF' : testStage === 'upload' ? '#00B8D4' : 'rgba(255,255,255,0.1)'} 
                                                                    strokeWidth="4" 
                                                                    strokeDasharray="239"
                                                                    strokeDashoffset={239 - (239 * (testStage === 'download' ? testDown : testStage === 'upload' ? testUp : 0)) / 300}
                                                                    className="transition-all duration-100"
                                                                />
                                                            </svg>
                                                            
                                                            <div className="text-center z-10 font-mono">
                                                                <div className="text-xs font-bold text-white leading-none">
                                                                    {testStage === 'download' ? testDown : testStage === 'upload' ? testUp : testStage === 'complete' ? testDown : '0.0'}
                                                                </div>
                                                                <div className="text-[7px] text-zinc-500 mt-1 uppercase font-bold">Mbps</div>
                                                            </div>
                                                        </div>
                                                        
                                                        <span className="text-[7.5px] text-zinc-400 font-mono uppercase tracking-widest mt-2">{testStage === 'idle' ? 'Speed Sandbox' : `${testStage}...`}</span>
                                                    </div>

                                                    <div className="col-span-7 flex flex-col justify-between h-full pl-3 border-l border-white/5 gap-2">
                                                        <div className="space-y-1 bg-zinc-900/40 p-2 border border-white/5 rounded-xl flex-1 justify-center flex flex-col text-[8.5px]">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-zinc-500 font-medium">Gateway Latency</span>
                                                                <span className="font-mono text-[#00E5FF] font-bold">{testPing ? `${testPing} ms` : '-'}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center border-t border-white/5 pt-1 mt-1 font-mono">
                                                                <span className="text-zinc-500 font-sans font-medium">Downlink Speed</span>
                                                                <span className="text-white font-bold">{testDown ? `${testDown} Mbps` : '-'}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center border-t border-white/5 pt-1 mt-1 font-mono">
                                                                <span className="text-zinc-500 font-sans font-medium">Uplink Speed</span>
                                                                <span className="text-white font-bold">{testUp ? `${testUp} Mbps` : '-'}</span>
                                                            </div>
                                                        </div>

                                                        <button 
                                                            type="button"
                                                            disabled={testStage !== 'idle' && testStage !== 'complete'}
                                                            onClick={executeSpeedTest}
                                                            className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] text-black text-[9.5px] font-bold py-1.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer shadow-md"
                                                        >
                                                            <Play className="w-2.5 h-2.5 fill-black" />
                                                            <span>{testStage === 'idle' ? 'Commence Speed Diagnostics' : 'Retest Speeds'}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* --- TABLET CONTENT 4: LOGS --- */}
                                        {activeTab === 'logs' && (
                                            <div className="flex-grow flex flex-col min-h-0 py-1 text-left animate-fade-in">
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <span className="text-[9.5px] text-zinc-400 font-bold uppercase tracking-wider">Tablet Console Stream</span>
                                                    <span className="text-[7.5px] font-mono text-[#00E5FF] bg-[#00E5FF]/5 px-1.5 py-0.5 rounded border border-[#00E5FF]/15">ACTIVE</span>
                                                </div>

                                                <div className="flex-grow bg-zinc-950 rounded-xl p-2.5 border border-white/5 overflow-y-auto font-mono text-[8.5px] text-[#ede1cd] leading-relaxed max-h-[175px] scrollbar-thin">
                                                    {logs.map((log, index) => {
                                                        const isWarn = log.includes('[WARN]') || log.includes('[WARNING]') || log.includes('NOT OK');
                                                        const isGdpr = log.includes('[GDPR]');
                                                        const isSystem = log.includes('[SYSTEM]');
                                                        return (
                                                            <div 
                                                                key={index} 
                                                                className={`${
                                                                    isWarn ? 'text-red-400 font-medium' : isGdpr ? 'text-orange-400' : isSystem ? 'text-indigo-300' : 'text-[#00E5FF]'
                                                                }`}
                                                            >
                                                                {log}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* --- TABLET CONTENT 5: SETTINGS --- */}
                                        {activeTab === 'settings' && (
                                            <div className="flex-grow flex flex-col justify-between py-1 text-left h-full animate-fade-in">
                                                <div className="grid grid-cols-12 gap-3 flex-grow">
                                                    {/* Left options */}
                                                    <div className="col-span-6 space-y-2 text-left flex flex-col justify-between h-full">
                                                        <div className="space-y-2 bg-white/[0.01] border border-white/5 rounded-xl p-2 flex-grow flex flex-col justify-center text-[9px]">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-zinc-300 font-semibold">AdBlock Isolation</span>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => { setAdblock(!adblock); addLog(`[PREF] Ad block set: ${!adblock}`); }}
                                                                    className={`w-7 h-4 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${adblock ? 'bg-[#00E5FF] justify-end' : 'bg-zinc-800 justify-start'}`}
                                                                >
                                                                    <div className="w-3 h-3 bg-white rounded-full shadow" />
                                                                </button>
                                                            </div>
                                                            <div className="flex justify-between items-center border-t border-white/5 pt-1.5">
                                                                <span className="text-zinc-300 font-semibold">IPv6 Shield Link</span>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => { setIpv6Leak(!ipv6Leak); addLog(`[PREF] IPv6 shields set: ${!ipv6Leak}`); }}
                                                                    className={`w-7 h-4 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${ipv6Leak ? 'bg-[#00E5FF] justify-end' : 'bg-zinc-800 justify-start'}`}
                                                                >
                                                                    <div className="w-3 h-3 bg-white rounded-full shadow" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-2.5">
                                                            <button 
                                                                type="button"
                                                                disabled={isWiping}
                                                                onClick={handleWipeData}
                                                                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-1.5 text-[8.5px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                                            >
                                                                <Trash2 className="w-2.5 h-2.5" />
                                                                <span>{isWiping ? 'Wiping...' : 'Purge All Database Records'}</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Right Options */}
                                                    <div className="col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-2.5 flex flex-col h-full text-[9px]">
                                                        <span className="text-zinc-400 font-bold uppercase tracking-wider block mb-2 text-[8px]">DNS Presets</span>
                                                        <div className="grid grid-cols-1 gap-1 flex-grow">
                                                            {[
                                                                { id: 'cloudflare', label: 'Cloudflare (1.1.1.1)' },
                                                                { id: 'google', label: 'Google (8.8.8.8)' },
                                                                { id: 'adgard', label: 'AdGuard (Shield)' },
                                                                { id: 'quad9', label: 'Quad9 Sec' }
                                                            ].map(dns => (
                                                                <button
                                                                    key={dns.id}
                                                                    type="button"
                                                                    onClick={() => handleDnsValue(dns.id)}
                                                                    className={`py-1 px-1.5 rounded-lg text-left transition-colors cursor-pointer text-[8px] font-semibold ${
                                                                        dnsPreset === dns.id 
                                                                            ? 'bg-[#00E5FF] text-black font-extrabold' 
                                                                            : 'bg-white/5 text-zinc-400 hover:text-white'
                                                                    }`}
                                                                >
                                                                    {dns.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
