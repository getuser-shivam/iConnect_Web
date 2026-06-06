import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Settings, Download, Cpu, ShieldCheck, Check, Activity, Copy } from 'lucide-react';
import { BuildOptions, CpuArch, ProtocolMode } from '../types';

export function ApkGenerator() {
  const [options, setOptions] = useState<BuildOptions>({
    arch: 'arm64-v8a',
    protocol: 'wireguard',
    adBlockFeed: true,
    malwareShield: true,
    customDnsPreset: 'cloudflare',
    compressedLogs: false
  });

  const [activeStep, setActiveStep] = useState<'idle' | 'compiling' | 'success'>('idle');
  const [compilerLogs, setCompilerLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Raw configuration content representing customization
  const customConfigString = `[Interface]
PrivateKey = eCvX...Szk4= (Custom AES handshaked key)
Address = 10.0.0.2/32, fd00::2/128
DNS = ${options.customDnsPreset === 'cloudflare' ? '1.1.1.1, 1.0.0.1' : '8.8.8.8, 8.8.4.4'}
MTU = 1420

[Peer]
PublicKey = ${options.protocol === 'wireguard' ? 'wg-tokyo-primary-relay.iconnect.network' : 'ovpn-fallback'}
Endpoint = 185.22.148.21:51820
AllowedIPs = 0.0.0.0/0, ::/0
PersistentKeepalive = 25
AdBlocker = ${options.adBlockFeed ? 'OISD-Ultimate:Enabled' : 'Disabled'}
MalwareFilter = ${options.malwareShield ? 'Tier1-Feeds:Active' : 'Disabled'}
`;

  const copyConfig = () => {
    navigator.clipboard.writeText(customConfigString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startCompilation = () => {
    setActiveStep('compiling');
    setCompilerLogs(['[BUILD] Initiating compiler pipeline...']);

    const progression = [
      '[COMPILER] Stripping unwanted architecture libs...',
      `[COMPILER] Target platform locked: ${options.arch.toUpperCase()}`,
      `[BINDING] Injecting tunnel profile wrappers for: ${options.protocol.toUpperCase()}`,
      options.adBlockFeed ? '[PLUGIN] Resolving ad-blocking blocklists index...' : '[PLUGIN] Skipping ad block indexes...',
      options.malwareShield ? '[PLUGIN] Binding dynamic ThreatIntelligence feeds...' : '[PLUGIN] Skipping threat shields...',
      '[SECURITY] Generating local client cryptographic public/prime components...',
      '[OPTIMIZATION] Compiling native C++ backend with -O3 speedups...',
      '[SIGNING] Stripping debugging symbols & performing digital signature...',
      '[COMPILER] Client package artifact ready for installation!'
    ];

    progression.forEach((logLine, idx) => {
      setTimeout(() => {
        setCompilerLogs(prev => [...prev, `${logLine}`]);
        if (idx === progression.length - 1) {
          setTimeout(() => setActiveStep('success'), 800);
        }
      }, (idx + 1) * 450);
    });
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [compilerLogs]);

  // Helper trigger actual download of mocked profile
  const triggerProfileDownload = () => {
    const blob = new Blob([customConfigString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `iconnect-${options.protocol}-${options.arch}.conf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 lg:p-10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Compiler Configuration Controls in 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 mb-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-300 text-xs font-medium">
            <Settings className="w-3.5 h-3.5" /> App Installer
          </div>
          <div>
            <h3 className="text-3xl font-medium text-white tracking-tight leading-tight mb-2">Download iConnect App</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Select your device platform and preferred security features to generate your tailored iConnect configuration.
            </p>
          </div>

          <div className="w-full h-px bg-white/[0.05]" />

          {/* Form Options */}
          <div className="space-y-4">
            {/* CPU Arch Selector */}
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Device Platform</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['Android', 'iOS', 'Windows', 'macOS'] as any).map((arch: string) => (
                  <button
                    key={arch}
                    onClick={() => setOptions({ ...options, arch: arch as any })}
                    className={`py-2 px-3 border rounded-xl text-left font-medium capitalize transition-all cursor-pointer ${
                      options.arch === arch 
                        ? 'bg-[#00E5FF] text-black border-[#00E5FF]' 
                        : 'bg-zinc-950/40 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {arch}
                  </button>
                ))}
              </div>
            </div>

            {/* Protocol Selector */}
            <div>
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Enveloped Protocol</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['wireguard', 'openvpn', 'shadowsocks'] as ProtocolMode[]).map((protocol) => (
                  <button
                    key={protocol}
                    onClick={() => setOptions({ ...options, protocol })}
                    className={`py-2 px-1 text-center border rounded-xl font-mono text-[11px] transition-all cursor-pointer capitalize ${
                      options.protocol === protocol 
                        ? 'bg-[#00E5FF] text-black border-[#00E5FF]' 
                        : 'bg-zinc-950/40 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {protocol}
                  </button>
                ))}
              </div>
            </div>

            {/* Switch Toggles */}
            <div className="space-y-3 bg-[#0C1024] p-4 border border-white/5 rounded-2xl text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-white font-medium block">Integrate Ad-Block feeds</span>
                  <span className="text-[10.5px] text-zinc-500">Includes OISD high-frequency blocklists</span>
                </div>
                <button 
                  onClick={() => setOptions({ ...options, adBlockFeed: !options.adBlockFeed })}
                  className={`w-8 h-4.5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                    options.adBlockFeed ? 'bg-[#00E5FF] justify-end' : 'bg-zinc-800 justify-start'
                  }`}
                >
                  <div className="w-3.5 h-3.5 bg-white rounded-full shadow" />
                </button>
              </div>

              <div className="w-full h-px bg-white/[0.05]" />

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-white font-medium block">Hardened Threat Prevention</span>
                  <span className="text-[10.5px] text-zinc-500">Inject dynamic malicious IPs lock lists</span>
                </div>
                <button 
                  onClick={() => setOptions({ ...options, malwareShield: !options.malwareShield })}
                  className={`w-8 h-4.5 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                    options.malwareShield ? 'bg-[#00E5FF] justify-end' : 'bg-zinc-800 justify-start'
                  }`}
                >
                  <div className="w-3.5 h-3.5 bg-white rounded-full shadow" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Console Logs / Compiled Profile Visualizer in 7 Cols */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#080B1A] shadow-inner border border-white/5 rounded-2xl p-5 lg:p-8 min-h-[460px]">
          <AnimatePresence mode="wait">
            {activeStep === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-grow flex flex-col justify-center items-center text-center p-8 select-none"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 mb-6 shadow-xl">
                  <Download className="w-8 h-8 text-zinc-400" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Ready to Install</h4>
                <p className="text-xs text-zinc-500 max-w-sm leading-relaxed mb-6">
                  Adjust your preferences securely on the side, and generate your customized setup file below.
                </p>
                <button
                  onClick={startCompilation}
                  className="px-6 py-3 bg-white text-black font-semibold text-xs rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Generate Installer
                </button>
              </motion.div>
            )}

            {activeStep === 'compiling' && (
              <motion.div 
                key="compiling"
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
                className="flex-grow flex flex-col justify-between select-text text-left h-full"
              >
                <div className="flex justify-between items-center pb-4 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00E5FF] animate-spin" />
                    <span className="text-xs font-mono text-zinc-400">Packaging iConnect Installer...</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#00E5FF] bg-[#00E5FF]/5 px-2 py-0.5 rounded border border-[#00E5FF]/20 animate-pulse">
                    GENERATING
                  </span>
                </div>

                {/* Logs area */}
                <div className="flex-grow my-6 overflow-y-auto max-h-[260px] font-mono text-[10px] leading-relaxed space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 pr-2">
                  <AnimatePresence>
                    {compilerLogs.map((log, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                        className={log.includes('[BUILD]') || log.includes('[COMPILER]') ? 'text-zinc-500' : 'text-[#00E5FF] opacity-90'}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={logsEndRef} />
                </div>

                <div className="text-[10px] text-zinc-600 font-mono italic animate-pulse">
                  Applying custom security flags... generating setup...
                </div>
              </motion.div>
            )}

            {activeStep === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="flex-grow flex flex-col justify-between text-left"
              >
                <div>
                  {/* Compiler Success Indicator */}
                  <div className="flex justify-between items-center pb-4 border-b border-white/[0.05] mb-6">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-xs font-mono font-bold">INSTALLER SUCCESSFULLY GENERATED ✓</span>
                    </div>
                    <button
                      onClick={() => setActiveStep('idle')}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors"
                    >
                      Start Over
                    </button>
                  </div>

                  {/* Configuration read-out box */}
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block mb-2">Configuration Profile (For review)</span>
                  <div className="relative">
                    <pre className="bg-[#0a0a0e] p-5 rounded-2xl border border-white/5 font-mono text-[10px] text-zinc-400 leading-relaxed overflow-x-auto overflow-y-auto max-h-[220px] select-all shadow-inner">
                      {customConfigString}
                    </pre>
                    
                    {/* Floating copy button */}
                    <button
                      onClick={copyConfig}
                      className="absolute top-3 right-3 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 p-2 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#00E5FF]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button
                    onClick={copyConfig}
                    className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
                  >
                    Copy Configuration Profile
                  </button>
                  <button
                    onClick={triggerProfileDownload}
                    className="py-3 px-4 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:opacity-90 active:scale-[0.98] text-black text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Config File</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
