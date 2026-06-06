/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Shield, Zap, Globe, Cpu, Smartphone, Download,
  CheckCircle, Lock, Activity, Server, ArrowUpRight,
  Mail, ChevronRight, RefreshCw, FileText, Database, 
  ShieldAlert, Ban, HelpCircle, Menu, X, Fingerprint, 
  EyeOff, Layers, Network, ZapOff, Plus, Minus, Wifi,
  Globe2, LockKeyhole, Orbit, Gauge, Terminal, Settings,
  Trash2, Play, Check, Sliders, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// --- Custom Interactive Sections ---
import { VirtualDevice } from './components/VirtualDevice';
import { NetworkMapTester } from './components/NetworkMapTester';
import { PrivacyDiagnostics } from './components/PrivacyDiagnostics';
import { ApkGenerator } from './components/ApkGenerator';
import { SavingsCalculator } from './components/SavingsCalculator';
import { AiCyberShield } from './components/AiCyberShield';
import iconnectLogo from './assets/images/iconnect_logo_1780751746641.png';

// --- Types & Data ---
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

// --- Shared Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// --- Components ---

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#080B1A]/80 backdrop-blur-xl border-b border-white/[0.06] py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={iconnectLogo} 
              alt="iConnect Logo" 
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover shadow-[0_0_20px_rgba(0,229,255,0.3)] ring-1 ring-white/10"
            />
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white leading-none">iConnect<span className="text-[#00E5FF] font-bold">.</span></h1>
            </div>
          </div>
          
          <div className="hidden lg:flex gap-8 items-center">
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-[#00E5FF] transition-colors">Features</a>
            <a href="#network" className="text-sm font-medium text-zinc-400 hover:text-[#00E5FF] transition-colors">Network</a>
            <a href="#ai-shield" className="text-sm font-medium text-zinc-400 hover:text-[#00E5FF] transition-colors">AI Security</a>
            <a href="#savings" className="text-sm font-medium text-zinc-400 hover:text-[#00E5FF] transition-colors">Pricing</a>
            <a href="#compliance" className="text-sm font-medium text-zinc-400 hover:text-[#00E5FF] transition-colors">Compliance</a>
            <a href="#about" className="text-sm font-medium text-zinc-400 hover:text-[#00E5FF] transition-colors">About</a>
            <a href="#support" className="text-sm font-medium text-zinc-400 hover:text-[#00E5FF] transition-colors">Support</a>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <a href="#download" className="px-5 py-2.5 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:opacity-90 text-black rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Download className="w-4 h-4" />
              <span>Get App</span>
            </a>
          </div>

          <button className="lg:hidden text-zinc-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-28 px-6 flex flex-col gap-6 lg:hidden"
          >
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Features</a>
            <a href="#network" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Network</a>
            <a href="#ai-shield" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">AI Security</a>
            <a href="#savings" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Pricing</a>
            <a href="#compliance" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Compliance</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">About</a>
            <a href="#support" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">Support</a>
            <a href="#download" onClick={() => setMobileMenuOpen(false)} className="mt-4 px-6 py-4 bg-white text-center text-black rounded-2xl text-lg font-medium flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download App
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Vpn3dTunnelBackdrop = () => {
  return (
    <div className="absolute inset-x-0 -top-12 bottom-12 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      <div 
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(55deg) rotateY(15deg) scale(1.15)' }}
        className="relative w-80 h-80 flex items-center justify-center"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="absolute w-72 h-72 border border-[#00E5FF]/20 rounded-full border-dashed"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#00E5FF] rounded-full shadow-[0_0_15px_#00E5FF]" />
        </motion.div>
        
        <motion.div 
          style={{ transform: 'translateZ(35px)' }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
          className="absolute w-56 h-56 border border-amber-500/10 rounded-full"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#00E5FF] rounded-full shadow-[0_0_12px_#00E5FF]" />
        </motion.div>

        <motion.div 
          style={{ transform: 'translateZ(-35px)' }}
          animate={{ rotate: 180 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          className="absolute w-40 h-40 border border-white/5 rounded-full border-dotted"
        />

        <div 
          style={{ transform: 'translateZ(10px)' }}
          className="absolute w-24 h-24 bg-gradient-to-tr from-[#00E5FF]/15 to-amber-500/5 rounded-full blur-2xl animate-pulse" 
        />
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center overflow-hidden">
    {/* Minimal grid background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
    
    <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[800px] h-[400px] bg-gradient-to-r from-[#00E5FF]/8 to-cyan-500/4 blur-[120px] rounded-[100%] -z-10 animate-pulse duration-[10s]" />
    
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="relative z-10 lg:col-span-7">
        <motion.div
          initial="hidden" animate="visible" variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-medium tracking-wide mb-8 backdrop-blur-md"
        >
          <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
          <span>Enterprise Grade • V2.4 Stable</span>
        </motion.div>
        
        <motion.h1
          initial="hidden" animate="visible" variants={itemVariants}
          className="text-5xl sm:text-7xl lg:text-[5.5rem] font-medium tracking-tighter text-white mb-6 leading-[1.05]"
        >
          Absolute Privacy.<br />
          <span className="text-cyan-gradient">Enterprise Speeds.</span>
        </motion.h1>
        
        <motion.p
          initial="hidden" animate="visible" variants={itemVariants}
          className="text-lg sm:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed font-normal"
        >
          iConnect provides military-grade encryption with ultra-fast connectivity, rigorous privacy protection, and seamless deployment across all your devices.
        </motion.p>
        
        <motion.div
          initial="hidden" animate="visible" variants={itemVariants}
          className="flex flex-wrap gap-4"
        >
          <a href="#download" className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:opacity-90 text-black font-semibold text-sm rounded-full shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-transform">
            <Smartphone className="w-4 h-4" />
            Get iConnect App
          </a>
          <a href="#compliance" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-full hover:bg-white/10 transition-colors">
            View Trust Center
          </a>
        </motion.div>
      </div>
      
      <div className="relative lg:col-span-5 flex justify-center lg:justify-end perspective-[1000px]">
        <Vpn3dTunnelBackdrop />
        <motion.div 
            initial={{ opacity: 0, rotateY: -15, y: 30 }} 
            animate={{ opacity: 1, rotateY: 0, y: 0 }} 
            transition={{ delay: 0.2, duration: 1 }}
            className="w-full flex justify-center"
        >
            <VirtualDevice />
        </motion.div>
      </div>
    </div>
  </section>
);

const QuickStats = () => (
    <div className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: 'Instant Connect', value: '< 1s' },
                { label: 'Global Servers', value: '10,000+' },
                { label: 'Uptime SLA', value: '99.9%' },
                { label: 'Logs Retained', value: 'Zero' }
            ].map((stat, i) => (
                <div key={i} className="text-center md:text-left md:border-l md:border-white/10 md:pl-6 first:border-0 first:pl-0">
                    <div className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-zinc-500">{stat.label}</div>
                </div>
            ))}
        </div>
    </div>
);

const BentoFeatures = () => {
  const cards = [
    {
      icon: <Layers className="w-5 h-5 text-[#00E5FF]" />,
      tag: "OPTIMIZED PERFORMANCE",
      title: "Lightning Fast Speeds",
      desc: "Stream, browse, and download securely without compromising on bandwidth. iConnect connects you instantly with zero buffering.",
      colSpan: "lg:col-span-2"
    },
    {
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      tag: "SMART ROUTING",
      title: "Smart Network AI",
      desc: "Our app autonomously tests servers in real-time to connect you to the node with the absolute lowest latency.",
      colSpan: "lg:col-span-1"
    },
    {
      icon: <Fingerprint className="w-5 h-5 text-[#00E5FF]" />,
      tag: "BANK-LEVEL ENCRYPTION",
      title: "Ironclad Security",
      desc: "Your data is secured behind military-grade AES-256 encryption, ensuring that your privacy is protected from ISPs and potential trackers.",
      colSpan: "lg:col-span-1"
    },
    {
      icon: <Network className="w-5 h-5 text-cyan-400" />,
      tag: "EASY TO USE",
      title: "Seamless Experience",
      desc: "We designed beautifully intuitive apps for every platform. Connect securely with a single tap, without the confusing technical setup.",
      colSpan: "lg:col-span-2"
    }
  ];

  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}
            className="mb-16 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-[#00E5FF]/20 rounded-full text-zinc-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-[#00E5FF]" /> Core Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">Next-Generation<br/><span className="text-zinc-500">VPN Technology.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} 
                custom={i}
                key={i} 
                className={`group relative overflow-hidden bg-[#0C1024] border border-white/[0.04] rounded-3xl p-8 lg:p-10 hover:border-[#00E5FF]/30 hover:bg-[#111630] transition-colors ${card.colSpan}`}
            >
              <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.05] rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                 {card.icon}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">{card.tag}</div>
              <h3 className="text-xl font-medium text-white mb-3 tracking-tight">{card.title}</h3>
              <p className="text-zinc-400 leading-relaxed font-normal text-base">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GlobalNetwork = () => {
    return (
        <section id="network" className="py-32 px-6 relative overflow-hidden bg-[#0A0D1F] border-y border-white/[0.03]">
            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants}>
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-[#00E5FF]/20 rounded-full text-zinc-300 text-xs font-semibold">
                        <Globe2 className="w-3.5 h-3.5 text-[#00E5FF]" /> Global Network
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-6">Optimized Relay Grids.</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed font-normal mb-8 max-w-lg">
                        The VPN server list isn't just a static JSON file. iConnect autonomously evaluates open VpnGate relays, pinging them in sequence to ensure you only connect to active, high-throughput tunnels.
                    </p>
                    
                    <div className="space-y-3">
                        {[
                            { label: 'Real-time Routing Optimization', icon: <Wifi className="w-4 h-4 text-cyan-400" /> },
                            { label: 'Premium Dedicated Nodes', icon: <Lock className="w-4 h-4 text-[#00E5FF]" /> },
                            { label: 'Global Edge Network', icon: <Globe className="w-4 h-4 text-cyan-400" /> }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 py-3 border-b border-white/[0.05] last:border-0">
                                <div className="text-zinc-400">{item.icon}</div>
                                <span className="text-sm font-medium text-white">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}
                    className="relative"
                >
                    <div className="bg-[#0D1126]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative z-10 w-full max-w-md mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-semibold text-white">Select Region</span>
                            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {MOCK_SERVERS.map((server, i) => (
                                <div key={server.id} className="flex justify-between items-center p-3 sm:p-4 bg-white/[0.01] border border-white/[0.02] rounded-2xl hover:border-[#00E5FF]/30 hover:bg-white/[0.03] transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="text-xl grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{server.flag}</div>
                                        <div>
                                            <div className="text-sm font-medium text-zinc-300 group-hover:text-[#00E5FF] transition-colors">{server.name}</div>
                                            <div className="text-[11px] text-zinc-500 mt-0.5">{server.latency}ms latency</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${server.status === 'optimal' ? 'bg-[#00E5FF] text-[#00E5FF]' : server.status === 'standard' ? 'bg-zinc-500 text-zinc-500' : 'bg-red-500 text-red-500'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-[#00E5FF]/4 to-cyan-500/2 blur-[100px] -z-10 rounded-full" />
                </motion.div>
            </div>
        </section>
    );
}

const PlayStoreCompliance = () => {
  const [activeDoc, setActiveDoc] = useState<'policy' | 'vpn' | 'data'>('policy');

  const docs = [
    { id: 'policy', label: 'Privacy Protocol', icon: <EyeOff className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'vpn', label: 'Security Directives', icon: <ShieldAlert className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'data', label: 'Data Safety', icon: <Database className="w-4 h-4 text-[#00E5FF]" /> }
  ];

  return (
    <section id="compliance" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-[#00E5FF]/20 rounded-full text-zinc-300 text-xs font-semibold">
             <CheckCircle className="w-3.5 h-3.5 text-[#00E5FF]" /> Transparency
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4">Uncompromising Privacy.</h2>
          <p className="text-lg text-zinc-400 font-normal max-w-2xl">
             Transparency is non-negotiable. Review our exact security policies regarding zero-log assertions, network guidelines, and user data deletion pacts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 flex flex-col gap-2">
            {docs.map(doc => (
              <button
                key={doc.id}
                onClick={() => setActiveDoc(doc.id as any)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all ${
                  activeDoc === doc.id 
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] font-semibold text-black'
                    : 'bg-[#0C1024] text-zinc-400 font-medium hover:bg-white/[0.03] hover:text-white border border-white/[0.03]'
                }`}
              >
                {doc.icon}
                <span className="flex-1 text-sm">{doc.label}</span>
              </button>
            ))}
          </div>

          <div className="md:col-span-8 bg-[#0C1024] border border-white/[0.04] rounded-3xl p-8 lg:p-12 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeDoc === 'policy' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="policy" className="space-y-6 text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-2">Base Privacy Architecture</h3>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Effective: June 2026 // Zero-Log Enforced</p>
                  </div>
                  <div className="w-full h-px bg-white/[0.05]" />
                  <p>iConnect enforces a rigorous <strong>Zero-Log Doctrine</strong>. From the moment the tunnel initiates, we do not monitor, record, log, store, or transmit any information regarding your network payload or origin identifiers.</p>
                  <div className="space-y-4 pt-2">
                    <div>
                      <strong className="text-white block font-medium mb-1">Null Telemetry</strong>
                      <span className="text-zinc-400 text-sm">Connection timestamps, true IP origins, and DNS resolution histories are immediately purged upon socket closure.</span>
                    </div>
                    <div>
                      <strong className="text-white block font-medium mb-1">State Isolation</strong>
                      <span className="text-zinc-400 text-sm">Google Firebase is utilized strictly for premium subscription mappings. VPN relay activity is never linked to auth.</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeDoc === 'vpn' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="vpn" className="space-y-6 text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                  <h3 className="text-2xl font-medium text-white mb-2">Network Security Directives</h3>
                  <div className="w-full h-px bg-white/[0.05]" />
                  <p>In strict alignment with industry standard network security policies, iConnect guarantees the following operational boundaries:</p>
                  <ul className="list-disc pl-5 space-y-3 text-zinc-400 text-sm marker:text-zinc-600">
                    <li>The application relies exclusively on secure, native OS APIs to construct a private tunnel.</li>
                    <li>Packet encryption is hardware-accelerated using AES-256-GCM configurations prior to reaching the destination node.</li>
                    <li>Under no circumstances does iConnect inject, modify, or harvest advertising trackers into the tunneled payload.</li>
                    <li>Connection initialization requires explicit user consent via standard device permissions.</li>
                  </ul>
                </motion.div>
              )}

              {activeDoc === 'data' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="data" className="space-y-6 text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                  <h3 className="text-2xl font-medium text-white mb-2">Data Safety & Right To Erasure</h3>
                  <div className="w-full h-px bg-white/[0.05]" />
                  <p>Conforming to GDPR and CCPA legislative models, iConnect places absolute account control in the user's hands.</p>
                  
                  <div className="grid gap-4 mt-6">
                      <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                          <h4 className="font-medium text-white mb-2 text-sm">Automated Purging</h4>
                          <p className="text-zinc-400 text-sm">A "Delete Account" directive accessible within the in-app settings instantly revokes Firebase UID bindings and drops associated server slots without requiring an email request.</p>
                      </div>
                      <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                          <h4 className="font-medium text-white mb-2 text-sm">Manual Ticket Intervention</h4>
                          <p className="text-zinc-400 text-sm">For out-of-band account removals, the integrated support console below permits encrypted deletion requests fulfilled within 72 hours.</p>
                      </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSupport = () => {
  const [formData, setFormData] = useState({ email: '', text: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.text) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ email: '', text: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  const redirectLinks = [
    { title: "Help Center", desc: "Browse tutorials & FAQs", icon: <HelpCircle className="w-5 h-5" /> },
    { title: "Privacy Policy", desc: "Detailed data handling", icon: <Shield className="w-5 h-5" /> },
    { title: "Terms of Service", desc: "User agreements", icon: <FileText className="w-5 h-5" /> },
    { title: "AppGallery Guide", desc: "Submission docs", icon: <Orbit className="w-5 h-5" /> }
  ];

  return (
    <section id="support" className="py-32 px-6 border-t border-white/[0.05] relative overflow-hidden bg-[#0A0D1F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-medium text-white tracking-tight mb-4">Support & Resources</h2>
            <p className="text-lg text-zinc-400 font-normal mb-10 max-w-lg">
              Need assistance with your account, data deletion requests, or general inquiries? Access our comprehensive resources or send a secure message directly to our dedicated support team.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {redirectLinks.map((link, i) => (
                <a key={i} href="#" className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-[#00E5FF]/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-[#0C1024] flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white mb-0.5 group-hover:text-[#00E5FF] transition-colors">{link.title}</div>
                    <div className="text-xs text-zinc-500">{link.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-[#0C1024] border border-white/[0.04] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="text-xl font-medium text-white mb-6 relative z-10">Direct Message</h3>
            <form className="flex flex-col gap-5 relative z-10" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">Email Address</label>
                <input 
                  required type="email" name="email" placeholder="example@company.com" 
                  value={formData.email} onChange={handleInput}
                  className="w-full bg-[#131936] border border-white/5 rounded-xl px-5 py-3.5 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-[#00E5FF] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-300">How can we help?</label>
                <textarea 
                  required name="text" placeholder="Please describe your request in detail..." rows={5}
                  value={formData.text} onChange={handleInput}
                  className="w-full bg-[#131936] border border-white/5 rounded-xl px-5 py-3.5 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-[#00E5FF] transition-all resize-none"
                />
              </div>
              <button 
                type="submit" disabled={status !== 'idle'}
                className="w-full mt-4 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] text-black font-semibold text-base py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.2)]"
              >
                {status === 'idle' ? 'Submit Inquiry' : status === 'sending' ? 'Submitting...' : 'Request Received ✓'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-white/[0.05] py-8 px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="flex gap-3 items-center">
      <img 
        src={iconnectLogo} 
        alt="iConnect Logo" 
        referrerPolicy="no-referrer"
        className="w-8 h-8 rounded-full object-cover shadow-[0_0_15px_rgba(0,229,255,0.2)] ring-1 ring-white/10"
      />
      <div>
        <div className="font-medium text-sm text-white">iConnect Protocol</div>
      </div>
    </div>

    <div className="flex gap-4 sm:gap-6 justify-center items-center text-sm">
      <a href="#about" className="text-zinc-500 hover:text-white transition-colors tracking-wide">About</a>
      <a href="#compliance" className="text-zinc-500 hover:text-white transition-colors tracking-wide">Privacy</a>
      <a href="#compliance" className="text-zinc-500 hover:text-white transition-colors tracking-wide">Terms</a>
      <a href="#support" className="text-zinc-500 hover:text-white transition-colors tracking-wide">Help Center</a>
    </div>
    
    <div className="flex gap-6 justify-center items-center text-sm font-medium">
       <span className="flex items-center gap-2 text-zinc-400">
           <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Systems Online
       </span>
       <span className="text-zinc-600">© {new Date().getFullYear()} iConnect.</span>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#050714] min-h-screen text-zinc-300 font-sans selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      <Navbar />
      <main>
        <Hero />
        <QuickStats />
        <BentoFeatures />
        
        <GlobalNetwork />

        {/* Interactive Traceroute Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-[#00E5FF]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
          <NetworkMapTester />
        </section>

        {/* Download Section */}
        <section id="download" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.05]">
          <ApkGenerator />
        </section>

        {/* AI Threat Protection */}
        <section id="ai-shield" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.05]">
          <AiCyberShield />
        </section>

        {/* Privacy Test Tools */}
        <section id="diagnostics" className="py-24 px-6 max-w-7xl mx-auto border-y border-white/[0.05] bg-white/[0.01]">
          <PrivacyDiagnostics />
        </section>

        {/* Pricing */}
        <section id="savings" className="py-24 px-6 max-w-7xl mx-auto border-b border-white/[0.05]">
          <SavingsCalculator />
        </section>

        <PlayStoreCompliance />

        <section id="about" className="py-24 px-6 border-t border-white/[0.05] relative overflow-hidden bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-medium text-white tracking-tight mb-4">About iConnect</h2>
              <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-3xl mx-auto">
                We started iConnect with a simple belief: privacy is a fundamental human right. Our global team of security experts, engineers, and privacy advocates have built a network designed to protect what matters most—your digital life. We continuously innovate to keep you safe from emerging digital threats.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#0A0D1F] border border-white/[0.04]">
                <ShieldAlert className="w-8 h-8 text-[#00E5FF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Quantum-Resistant</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Kyber and Dilithium algorithms providing future-proof encryption and security against quantum computing.</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#0A0D1F] border border-white/[0.04]">
                <Cpu className="w-8 h-8 text-[#00E5FF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">AI-Powered Defense</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Advanced machine learning algorithms that detect and neutralize malware and malicious activity in real-time.</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#0A0D1F] border border-white/[0.04]">
                <Server className="w-8 h-8 text-[#00E5FF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">RAM-Only Servers</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Absolute zero-log architecture. Our entire infrastructure runs on volatile memory, ensuring no data persistence.</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#0A0D1F] border border-white/[0.04]">
                <Network className="w-8 h-8 text-[#00E5FF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Multi-Hop Routing</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Dynamic routing through multiple distributed nodes to completely mask your origin and destination.</p>
              </div>
            </div>
          </div>
        </section>

        <ContactSupport />
      </main>
      <Footer />
    </div>
  );
}
