import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, RefreshCw, Radio, HardDrive, Cpu, Compass, CheckCircle } from 'lucide-react';
import { VpnNode } from '../types';

const NETWORK_NODES: VpnNode[] = [
  { id: 'jp-1', country: 'Japan', flag: '🇯🇵', name: 'Tokyo-01 (Optimal)', latency: 42, status: 'optimal', ip: '185.22.148.21', load: 38, location: { x: 75, y: 35 }, isp: 'KDDI Corporation' },
  { id: 'us-1', country: 'USA', flag: '🇺🇸', name: 'Los Angeles-12', latency: 138, status: 'optimal', ip: '104.244.72.15', load: 56, location: { x: 30, y: 40 }, isp: 'Choopa LLC' },
  { id: 'de-1', country: 'Germany', flag: '🇩🇪', name: 'Frankfurt-01', latency: 185, status: 'standard', ip: '46.165.210.17', load: 74, location: { x: 50, y: 30 }, isp: 'Servergrid GmbH' },
  { id: 'sg-1', country: 'Singapore', flag: '🇸🇬', name: 'Singapore-03', latency: 212, status: 'standard', ip: '128.199.201.8', load: 45, location: { x: 70, y: 55 }, isp: 'DigitalOcean LLC' },
  { id: 'uk-1', country: 'UK', flag: '🇬🇧', name: 'London-05 Web', latency: 275, status: 'optimal', ip: '185.120.22.5', load: 21, location: { x: 48, y: 25 }, isp: 'M247 Ltd' }
];

export function NetworkMapTester() {
  const [selectedNode, setSelectedNode] = useState<VpnNode>(NETWORK_NODES[0]);
  const [isTracing, setIsTracing] = useState(false);
  const [traceSteps, setTraceSteps] = useState<{ label: string; p: number; state: 'pending' | 'ok' | 'error' }[]>([]);
  const [traceFinished, setTraceFinished] = useState(false);
  const [projectionMode, setProjectionMode] = useState<'flat' | '3d'>('3d');

  // Trigger traceroute simulation
  const runTraceroute = (node: VpnNode) => {
    setSelectedNode(node);
    setIsTracing(true);
    setTraceFinished(false);
    setTraceSteps([
      { label: 'Resolving destination address...', p: 0, state: 'pending' },
    ]);

    setTimeout(() => {
      // Step 1
      setTraceSteps([
        { label: 'Hop 1: Local network router', p: 2, state: 'ok' },
        { label: 'Hop 2: Securing connection...', p: 5, state: 'pending' },
      ]);

      setTimeout(() => {
        // Step 2
        setTraceSteps([
          { label: 'Hop 1: Local network router', p: 2, state: 'ok' },
          { label: 'Hop 2: Securing connection...', p: 5, state: 'ok' },
          { label: `Hop 3: Routing through ISP: ${node.isp}`, p: Math.floor(node.latency / 3), state: 'pending' },
        ]);

        setTimeout(() => {
          // Step 3
          setTraceSteps([
            { label: 'Hop 1: Local network router', p: 2, state: 'ok' },
            { label: 'Hop 2: Securing connection...', p: 5, state: 'ok' },
            { label: `Hop 3: Routing through ISP: ${node.isp}`, p: Math.floor(node.latency * 0.4), state: 'ok' },
            { label: `Hop 4: Applying AES-256 encryption`, p: Math.floor(node.latency * 0.75), state: 'pending' },
          ]);

          setTimeout(() => {
            // Final Hop
            setTraceSteps([
              { label: 'Hop 1: Local network router', p: 2, state: 'ok' },
              { label: 'Hop 2: Securing connection...', p: 5, state: 'ok' },
              { label: `Hop 3: Routing through ISP: ${node.isp}`, p: Math.floor(node.latency * 0.4), state: 'ok' },
              { label: `Hop 4: Secure tunnel established`, p: Math.floor(node.latency * 0.75), state: 'ok' },
              { label: `Hop 5: Connected to destination (${node.ip})`, p: node.latency, state: 'ok' }
            ]);
            setIsTracing(false);
            setTraceFinished(true);
          }, 600);
        }, 600);
      }, 500);
    }, 450);
  };

  useEffect(() => {
    runTraceroute(NETWORK_NODES[0]);
  }, []);

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Stylized Grid Map View in 7 Cols */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-zinc-950/60 border border-white/5 rounded-2xl p-5 relative min-h-[340px] overflow-hidden select-none">
          
          {/* Subtle Cyber Grid Lines overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-20">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#00E5FF] animate-pulse shrink-0" />
              <span className="text-[10px] font-mono font-medium tracking-widest uppercase text-zinc-400 truncate">Live Server Network</span>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/5 text-[9px] font-mono text-zinc-400">
                <button
                  type="button"
                  onClick={() => setProjectionMode('flat')}
                  className={`px-2 py-1 rounded transition-all cursor-pointer ${projectionMode === 'flat' ? 'bg-white text-black font-semibold shadow-sm' : 'hover:text-white'}`}
                >
                  Flat Grid
                </button>
                <button
                  type="button"
                  onClick={() => setProjectionMode('3d')}
                  className={`px-2 py-1 rounded transition-all cursor-pointer ${projectionMode === '3d' ? 'bg-[#00E5FF] text-black font-semibold shadow-sm' : 'hover:text-white'}`}
                >
                  3D Project
                </button>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/5 shrink-0">
                TARGET: {selectedNode.ip}
              </span>
            </div>
          </div>

          {/* SVG Map Layout representing custom absolute nodes with 3D projection */}
          <div 
            style={{ 
              transform: projectionMode === '3d' ? 'perspective(1200px) rotateX(32deg) rotateY(-18deg) rotateZ(4deg)' : 'none',
              transformStyle: 'preserve-3d',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="flex-grow flex items-center justify-center my-6 h-48 lg:h-56 relative"
          >
            
            {/* Local Client Node at (15, 50) */}
            <div className="absolute left-[15%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-slate-900 ring-2 ring-indigo-500/30 animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest mt-1.5 bg-black/80 px-1.5 rounded py-0.5 border border-indigo-500/10">USER CLIENT</span>
            </div>

            {/* Render absolute positioning SVG Trace Beam line connecting clients */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {/* Drawing line from Local Client to selected destination */}
              <motion.line
                x1="15%"
                y1="50%"
                x2={`${selectedNode.location.x}%`}
                y2={`${selectedNode.location.y}%`}
                stroke="#00E5FF"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: [100, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              />
              
              {/* Ping Trace Pulsing Node indicator */}
              <motion.circle
                r="4"
                fill="#00E5FF"
                initial={{ offset: 0 }}
                animate={{ 
                  cx: [`15%`, `${selectedNode.location.x}%`], 
                  cy: [`50%`, `${selectedNode.location.y}%`] 
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              />
            </svg>

            {/* Render Server Nodes */}
            {NETWORK_NODES.map((node) => {
              const isActive = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  style={{ 
                    left: `${node.location.x}%`, 
                    top: `${node.location.y}%`,
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => runTraceroute(node)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center"
                >
                  {/* Ground Coordinate Plane Anchors (Only visible or styled premiumly under 3D projection) */}
                  {projectionMode === '3d' && (
                    <>
                      {/* Pulse ring on earth */}
                      <div className={`absolute w-3 h-3 rounded-full border border-dashed -translate-y-1/2 ${isActive ? 'border-[#00E5FF] animate-ping scale-150' : 'border-zinc-700'}`} style={{ transform: 'rotateX(90deg) translateZ(-10px)' }} />
                      {/* Standing support beacon lines */}
                      <div className={`absolute w-[1px] bg-gradient-to-t origin-bottom -translate-y-full ${isActive ? 'from-[#00E5FF] to-[#00B8D4]' : 'from-zinc-700/50 to-zinc-600/10'}`} style={{ height: isActive ? '32px' : '20px', transform: 'rotateX(-32deg) rotateY(18deg) translateZ(-4px)', transition: 'height 0.4s ease-out' }} />
                    </>
                  )}

                  {/* Elevation Capsule Badge */}
                  <div 
                    style={{ 
                      transform: projectionMode === '3d' ? (isActive ? 'translateY(-34px) translateZ(8px)' : 'translateY(-22px) translateZ(4px)') : 'none',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isActive 
                        ? 'bg-[#00E5FF] text-black scale-110 ring-4 ring-[#00E5FF]/30' 
                        : 'bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white hover:scale-105'
                    }`}
                  >
                    <span className="text-[11px] select-none">{node.flag}</span>
                  </div>
                  
                  {/* Small popup card tooltips */}
                  <div 
                    style={{
                      transform: projectionMode === '3d' ? (isActive ? 'translateY(-38px) translateZ(12px)' : 'translateY(-26px) translateZ(6px)') : 'none',
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-8 bg-zinc-950/95 border border-zinc-800 p-2 rounded-lg pointer-events-none select-none z-20 w-max text-left"
                  >
                    <div className="text-[10px] font-bold text-white flex items-center gap-1">
                      <span>{node.flag}</span>
                      <span>{node.name}</span>
                    </div>
                    <div className="text-[8px] font-mono text-zinc-500 mt-0.5">ISP: {node.isp}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick diagnostics footer inside map showing route status */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-black/60 p-2.5 rounded-xl border border-white/5 font-mono text-[9px] text-zinc-500">
            <span className="flex items-center gap-1.5 min-w-0">
              <Compass className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">CONNECTION: SECURE TUNNEL</span>
            </span>
            <span className="text-zinc-400 font-bold uppercase shrink-0">
              ENCRYPTION: AES-256
            </span>
          </div>
        </div>

        {/* Diagnostic Packet Console in 5 Cols */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950/40 border border-white/5 rounded-2xl p-5">
          <div className="text-left">
            <h3 className="text-base font-semibold text-white mb-1">Server Connect Optimizer</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
              Testing connection speeds to global secure servers. Select any location on the map to find your optimal pathway.
            </p>

            {/* List of server paths */}
            <div className="space-y-1.5 my-4">
              {NETWORK_NODES.map((serv) => (
                <button
                  key={serv.id}
                  onClick={() => runTraceroute(serv)}
                  className={`w-full flex justify-between items-center p-2 rounded-xl text-left transition-colors text-xs cursor-pointer ${
                    selectedNode.id === serv.id 
                      ? 'bg-white/5 text-white border-l-2 border-[#00E5FF] pl-3' 
                      : 'text-zinc-400 hover:text-white bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0">{serv.flag}</span>
                    <span className="font-medium truncate">{serv.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono shrink-0">
                    <span className="text-[#00E5FF] font-semibold">{serv.latency}ms</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${serv.status === 'optimal' ? 'bg-[#00E5FF]' : 'bg-amber-500'}`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="w-full h-px bg-white/[0.05] my-4" />

            {/* Diagnostics Logs Terminal Display */}
            <div className="mt-2 bg-zinc-950 rounded-xl p-3 border border-white/5 font-mono text-[9.5px] leading-relaxed text-left">
              <div className="text-zinc-500 mb-1.5 uppercase text-[8px] font-bold tracking-wider">Connection Logs</div>
              <div className="space-y-1 select-all text-zinc-200">
                {traceSteps.map((step, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="truncate pr-2">{step.label}</span>
                    <span className="text-[#00E5FF] whitespace-nowrap">{step.p > 0 ? `${step.p}ms` : 'WAIT'}</span>
                  </div>
                ))}
              </div>
              {traceFinished && (
                <div className="text-[#00E5FF] mt-2 flex items-center gap-1.5 font-bold animate-pulse text-[9px] border-t border-[#00E5FF]/20 pt-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>CONNECTION ESTABLISHED SUCCESSFULLY</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => runTraceroute(selectedNode)}
            disabled={isTracing}
            className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:opacity-90 text-black text-xs font-semibold py-2.5 rounded-xl transition-all mt-6 flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTracing && 'animate-spin'}`} />
            <span>{isTracing ? 'Testing Connection...' : 'Test Server Speed'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
