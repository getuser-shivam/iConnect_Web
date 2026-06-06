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
  Trash2, Play, Check, Sliders, AlertTriangle, Route,
  SplitSquareVertical, Eye, Key, Binary, MonitorSmartphone,
  Laptop, Watch, Tv, ShieldCheck, Clock, MapPin, Radar,
  Bug, Lightbulb, Github, Twitter, ExternalLink, Heart,
  WifiOff, Atom
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

// --- Constants ---
const APP_VERSION = '2.2.5';
const SUPPORT_EMAIL = 'support@iconnect.run';
const WEBSITE_URL = 'https://iconnect.run';

// --- Components ---

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#security', label: 'Security' },
    { href: '#network', label: 'Network' },
    { href: '#protocols', label: 'Protocols' },
    { href: '#ai-shield', label: 'AI Defense' },
    { href: '#compliance', label: 'Trust' },
    { href: '#support', label: 'Support' },
  ];

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
          
          <div className="hidden xl:flex gap-6 items-center">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-[#00E5FF] transition-colors">{link.label}</a>
            ))}
          </div>
          
          <div className="hidden xl:flex items-center gap-4">
            <a href="#download" className="px-5 py-2.5 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:opacity-90 text-black rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Download className="w-4 h-4" />
              <span>Get App</span>
            </a>
          </div>

          <button className="xl:hidden text-zinc-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-28 px-6 flex flex-col gap-6 xl:hidden overflow-auto pb-12"
          >
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white border-b border-white/10 pb-4">{link.label}</a>
            ))}
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
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
    <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[800px] h-[400px] bg-gradient-to-r from-[#00E5FF]/8 to-cyan-500/4 blur-[120px] rounded-[100%] -z-10 animate-pulse duration-[10s]" />
    
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="relative z-10 lg:col-span-7">
        <motion.div
          initial="hidden" animate="visible" variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-medium tracking-wide mb-8 backdrop-blur-md"
        >
          <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
          <span>Enterprise Grade • V{APP_VERSION} Stable</span>
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
          Quantum-Resistant Encryption. AI-Powered Defense. RAM-Only Servers. iConnect delivers military-grade protection with WireGuard, OpenVPN & ChaCha20 protocols across all your devices.
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
      desc: "Stream, browse, and download securely without compromising on bandwidth. iConnect connects you instantly with zero buffering and < 50ms connection latency.",
      colSpan: "lg:col-span-2"
    },
    {
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      tag: "SMART ROUTING",
      title: "AI Server Selection",
      desc: "Our app autonomously tests servers in real-time, using weighted scoring on latency, load, distance, and history to connect you to the absolute best node.",
      colSpan: "lg:col-span-1"
    },
    {
      icon: <Fingerprint className="w-5 h-5 text-[#00E5FF]" />,
      tag: "ZERO-KNOWLEDGE AUTH",
      title: "Anonymous Identity",
      desc: "Schnorr-based zero-knowledge proof authentication. Your identity is verified without ever exposing your credentials. Ring signatures provide unlinkable sessions.",
      colSpan: "lg:col-span-1"
    },
    {
      icon: <Network className="w-5 h-5 text-cyan-400" />,
      tag: "CROSS-PLATFORM",
      title: "Every Device, One Subscription",
      desc: "Beautifully designed apps for Android, iOS, Windows, macOS, Linux, tablets, smartwatches, and TVs. One account protects all of them with adaptive UIs.",
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

// --- NEW: Advanced Security Arsenal ---
const SecurityArsenal = () => {
  const features = [
    {
      icon: <WifiOff className="w-6 h-6" />,
      title: "Kill Switch",
      desc: "Adaptive & strict modes instantly block all network traffic if the VPN drops, preventing any unprotected data from leaking. Platform-specific traffic blocking ensures zero exposure.",
      tag: "NETWORK GUARD"
    },
    {
      icon: <SplitSquareVertical className="w-6 h-6" />,
      title: "Split Tunneling",
      desc: "Choose which apps bypass or use the VPN tunnel. Exclude or include specific apps and domains with granular control. Rules are applied locally for maximum privacy.",
      tag: "TRAFFIC CONTROL"
    },
    {
      icon: <Route className="w-6 h-6" />,
      title: "Multi-Hop Routing",
      desc: "Route traffic through 2–7 distributed server nodes for enhanced anonymity. Custom route selection with automatic failover ensures your origin is completely masked.",
      tag: "ADVANCED ANONYMITY"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "DNS Leak Protection",
      desc: "Comprehensive DNS security with DNS-over-HTTPS (DoH), DNS-over-TLS (DoT), and DNSCrypt support. All DNS queries are encrypted and routed through secure resolvers.",
      tag: "DNS SECURITY"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Stealth Mode",
      desc: "STLS and Scramblesuit obfuscation layers disguise your VPN traffic as regular HTTPS, bypassing deep packet inspection, censorship, and restrictive firewalls.",
      tag: "OBFUSCATION"
    },
    {
      icon: <Binary className="w-6 h-6" />,
      title: "Homomorphic Encryption",
      desc: "Paillier cryptosystem enables privacy-preserving computations on encrypted data. Your analytics are processed without ever decrypting the underlying information.",
      tag: "ADVANCED CRYPTO"
    },
  ];

  return (
    <section id="security" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#00E5FF]/4 to-transparent blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-[#00E5FF]/20 rounded-full text-zinc-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" /> Security Arsenal
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">Enterprise-Grade<br/><span className="text-zinc-500">Protection Suite.</span></h2>
          <p className="text-lg text-zinc-400 font-normal mt-4 max-w-xl">Every layer of iConnect is designed for uncompromising security. From kill switches to homomorphic encryption, nothing is left to chance.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants}
              className="group relative bg-[#0C1024] border border-white/[0.04] rounded-3xl p-8 hover:border-[#00E5FF]/30 hover:bg-[#111630] transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/10 rounded-2xl flex items-center justify-center text-[#00E5FF] mb-6 group-hover:scale-110 transition-transform duration-500">
                {f.icon}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 mb-2">{f.tag}</div>
              <h3 className="text-lg font-medium text-white mb-2 tracking-tight">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- NEW: Protocol Selection ---
const ProtocolSelection = () => {
  const [activeProtocol, setActiveProtocol] = useState<'wireguard' | 'openvpn' | 'chacha20'>('wireguard');
  
  const protocols = {
    wireguard: {
      name: 'WireGuard',
      speed: '95%',
      security: '90%',
      battery: '95%',
      desc: 'The fastest modern protocol. Minimal codebase (~4,000 lines) means fewer vulnerabilities. Ideal for mobile devices with excellent battery efficiency and instant handshakes.',
      cipher: 'ChaCha20-Poly1305',
      keyExchange: 'Curve25519',
      hash: 'BLAKE2s'
    },
    openvpn: {
      name: 'OpenVPN',
      speed: '75%',
      security: '95%',
      battery: '70%',
      desc: 'The industry-proven protocol trusted for decades. Highly configurable with AES-256-GCM encryption. Best for bypassing restrictive firewalls with TCP fallback.',
      cipher: 'AES-256-GCM',
      keyExchange: 'RSA-4096',
      hash: 'SHA-512'
    },
    chacha20: {
      name: 'ChaCha20-Poly1305',
      speed: '90%',
      security: '92%',
      battery: '90%',
      desc: 'Google-backed cipher optimized for devices without hardware AES acceleration. Provides equivalent security to AES-256 with superior performance on mobile chipsets.',
      cipher: 'ChaCha20-Poly1305',
      keyExchange: 'X25519',
      hash: 'Poly1305 MAC'
    }
  };
  
  const p = protocols[activeProtocol];
  
  return (
    <section id="protocols" className="py-32 px-6 relative overflow-hidden bg-[#0A0D1F] border-y border-white/[0.03]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-[#00E5FF]/20 rounded-full text-zinc-300 text-xs font-semibold">
            <Sliders className="w-3.5 h-3.5 text-[#00E5FF]" /> Protocol Engine
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4">Choose Your Protocol.</h2>
          <p className="text-lg text-zinc-400 font-normal max-w-2xl">iConnect supports three battle-tested encryption protocols. Switch freely based on your priorities: speed, security, or battery life.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col gap-3">
            {(Object.keys(protocols) as Array<keyof typeof protocols>).map(key => (
              <button
                key={key}
                onClick={() => setActiveProtocol(key)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all ${
                  activeProtocol === key
                    ? 'bg-gradient-to-r from-[#00E5FF]/15 to-[#00B8D4]/5 border border-[#00E5FF]/30 text-white'
                    : 'bg-[#0C1024] text-zinc-400 font-medium hover:bg-white/[0.03] hover:text-white border border-white/[0.03]'
                }`}
              >
                <LockKeyhole className={`w-5 h-5 ${activeProtocol === key ? 'text-[#00E5FF]' : 'text-zinc-600'}`} />
                <div>
                  <div className="text-sm font-semibold">{protocols[key].name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Tap to compare</div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-[#0C1024] border border-white/[0.04] rounded-3xl p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={activeProtocol} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <h3 className="text-2xl font-medium text-white">{p.name}</h3>
                <p className="text-zinc-400 leading-relaxed">{p.desc}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Speed', value: p.speed },
                    { label: 'Security', value: p.security },
                    { label: 'Battery', value: p.battery },
                  ].map((metric, i) => (
                    <div key={i} className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                      <div className="text-xs text-zinc-500 mb-2 font-medium">{metric.label}</div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: metric.value }} transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] rounded-full"
                        />
                      </div>
                      <div className="text-sm font-semibold text-white mt-2">{metric.value}</div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">Cipher</div>
                    <div className="text-xs text-[#00E5FF] font-medium">{p.cipher}</div>
                  </div>
                  <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">Key Exchange</div>
                    <div className="text-xs text-[#00E5FF] font-medium">{p.keyExchange}</div>
                  </div>
                  <div className="text-center p-3 bg-white/[0.02] rounded-xl">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1">Hash</div>
                    <div className="text-xs text-[#00E5FF] font-medium">{p.hash}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
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
                        iConnect autonomously evaluates relay nodes, pinging each in sequence to ensure you connect only to active, high-throughput, RAM-Only Servers with zero data persistence.
                    </p>
                    
                    <div className="space-y-3">
                        {[
                            { label: 'Real-time Routing Optimization', icon: <Wifi className="w-4 h-4 text-cyan-400" /> },
                            { label: 'RAM-Only Server Infrastructure', icon: <Server className="w-4 h-4 text-[#00E5FF]" /> },
                            { label: 'Dedicated IP Management', icon: <MapPin className="w-4 h-4 text-cyan-400" /> },
                            { label: '50+ Countries, 100+ Locations', icon: <Globe className="w-4 h-4 text-[#00E5FF]" /> },
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
                            {MOCK_SERVERS.map((server) => (
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

// --- NEW: Platform Support ---
const PlatformSupport = () => {
  const platforms = [
    { icon: <Smartphone className="w-7 h-7" />, name: 'Android', version: '5.0+' },
    { icon: <Smartphone className="w-7 h-7" />, name: 'iOS', version: '12.0+' },
    { icon: <Laptop className="w-7 h-7" />, name: 'Windows', version: '10+' },
    { icon: <Laptop className="w-7 h-7" />, name: 'macOS', version: '10.14+' },
    { icon: <MonitorSmartphone className="w-7 h-7" />, name: 'Linux', version: 'Ubuntu 18.04+' },
    { icon: <Watch className="w-7 h-7" />, name: 'Smartwatch', version: 'Wear OS' },
    { icon: <Tv className="w-7 h-7" />, name: 'Smart TV', version: 'Android TV' },
    { icon: <MonitorSmartphone className="w-7 h-7" />, name: 'Tablets', version: 'All' },
  ];

  return (
    <section className="py-20 px-6 border-y border-white/[0.03] bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} className="text-center mb-12">
          <h2 className="text-3xl font-medium text-white tracking-tight mb-3">One Subscription. Every Device.</h2>
          <p className="text-zinc-400 font-normal">Adaptive UI and platform-specific optimizations for every form factor.</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {platforms.map((p, i) => (
            <motion.div
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
              className="flex flex-col items-center gap-3 p-5 bg-[#0C1024] border border-white/[0.04] rounded-2xl hover:border-[#00E5FF]/20 transition-colors group"
            >
              <div className="text-zinc-500 group-hover:text-[#00E5FF] transition-colors">{p.icon}</div>
              <div className="text-xs font-semibold text-white">{p.name}</div>
              <div className="text-[10px] text-zinc-600">{p.version}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PlayStoreCompliance = () => {
  const [activeDoc, setActiveDoc] = useState<'policy' | 'vpn' | 'data'>('policy');

  const docs = [
    { id: 'policy', label: 'Privacy Protocol', icon: <EyeOff className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'vpn', label: 'VpnService Disclosure', icon: <ShieldAlert className="w-4 h-4 text-[#00E5FF]" /> },
    { id: 'data', label: 'Data Safety & Deletion', icon: <Database className="w-4 h-4 text-[#00E5FF]" /> }
  ];

  return (
    <section id="compliance" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={sectionVariants} className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-[#00E5FF]/20 rounded-full text-zinc-300 text-xs font-semibold">
             <CheckCircle className="w-3.5 h-3.5 text-[#00E5FF]" /> Transparency & Compliance
          </div>
          <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4">Uncompromising Privacy.</h2>
          <p className="text-lg text-zinc-400 font-normal max-w-2xl">
             Transparency is non-negotiable. Review our exact security policies, VpnService disclosure, and user data rights.
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
                  <p>iConnect enforces a rigorous <strong>Zero-Log Doctrine</strong>. Our entire infrastructure runs on <strong>RAM-Only Servers</strong>—no hard drives, no persistence. From the moment the tunnel initiates, we do not monitor, record, log, store, or transmit any information regarding your network payload or origin identifiers.</p>
                  <div className="space-y-4 pt-2">
                    <div>
                      <strong className="text-white block font-medium mb-1">Null Telemetry</strong>
                      <span className="text-zinc-400 text-sm">Connection timestamps, true IP origins, and DNS resolution histories are immediately purged upon socket closure.</span>
                    </div>
                    <div>
                      <strong className="text-white block font-medium mb-1">State Isolation</strong>
                      <span className="text-zinc-400 text-sm">Firebase is used strictly for optional account sync. VPN relay activity is never linked to authentication. Firebase Analytics and Crashlytics are off by default.</span>
                    </div>
                    <div>
                      <strong className="text-white block font-medium mb-1">No Advertising SDK</strong>
                      <span className="text-zinc-400 text-sm">iConnect does not include any advertising SDK or Advertising ID permission. We never inject, modify, or harvest advertising trackers.</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeDoc === 'vpn' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="vpn" className="space-y-6 text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                  <h3 className="text-2xl font-medium text-white mb-2">VpnService Prominent Disclosure</h3>
                  <div className="w-full h-px bg-white/[0.05]" />
                  <div className="p-5 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-2xl">
                    <p className="text-[#00E5FF] text-sm font-medium">iConnect uses the VpnService to create a secure, encrypted tunnel to route your device's network traffic to our remote servers. This does not start automatically—it requires your explicit consent.</p>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-zinc-400 text-sm marker:text-zinc-600">
                    <li>Uses VpnService only when you explicitly connect, creating a secure tunnel to encrypt and protect your traffic.</li>
                    <li>Split tunneling reads launchable app names and package names only for local routing rules.</li>
                    <li>Optional location uses public IP lookup by default. Device GPS is used only with your explicit permission.</li>
                    <li>The private browser is an iConnect WebView starting with DuckDuckGo search—not affiliated with DuckDuckGo.</li>
                    <li>Zero data collection: iConnect runs on RAM-Only Servers. We do not log, collect, or share your network traffic.</li>
                  </ul>
                </motion.div>
              )}

              {activeDoc === 'data' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="data" className="space-y-6 text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                  <h3 className="text-2xl font-medium text-white mb-2">Data Safety & Right To Erasure</h3>
                  <div className="w-full h-px bg-white/[0.05]" />
                  <p>Conforming to <strong>GDPR</strong> and <strong>CCPA</strong> legislative models, iConnect places absolute account control in the user's hands.</p>
                  <div className="grid gap-4 mt-6">
                      <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                          <h4 className="font-medium text-white mb-2 text-sm">In-App Account Deletion</h4>
                          <p className="text-zinc-400 text-sm">A "Delete Account" directive accessible within Settings instantly revokes Firebase UID bindings and drops associated data without requiring an email request.</p>
                      </div>
                      <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                          <h4 className="font-medium text-white mb-2 text-sm">Web-Based Data Deletion</h4>
                          <p className="text-zinc-400 text-sm">As required by Google Play policy, account deletion is also available via the Support section on this website. Requests are fulfilled within 72 hours.</p>
                      </div>
                      <div className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                          <h4 className="font-medium text-white mb-2 text-sm">Guest Mode</h4>
                          <p className="text-zinc-400 text-sm">Use iConnect without creating any account. No sign-in required. Guest mode stores preferences locally and never transmits personal data.</p>
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
    { title: "Help Center", desc: "Browse tutorials & FAQs", href: "#support", icon: <HelpCircle className="w-5 h-5" /> },
    { title: "Privacy Policy", desc: "Detailed data handling", href: `${WEBSITE_URL}/privacy`, icon: <Shield className="w-5 h-5" /> },
    { title: "Terms of Service", desc: "User agreements", href: `${WEBSITE_URL}/terms`, icon: <FileText className="w-5 h-5" /> },
    { title: "License Agreement", desc: "EULA details", href: `${WEBSITE_URL}/license`, icon: <FileText className="w-5 h-5" /> },
    { title: "Version History", desc: "App change log", href: `${WEBSITE_URL}/version-history`, icon: <Clock className="w-5 h-5" /> },
    { title: "Report a Bug", desc: "Send via email", href: `mailto:${SUPPORT_EMAIL}?subject=iConnect%20VPN%20Bug%20Report`, icon: <Bug className="w-5 h-5" /> },
    { title: "Request a Feature", desc: "Send via email", href: `mailto:${SUPPORT_EMAIL}?subject=iConnect%20VPN%20Feature%20Request`, icon: <Lightbulb className="w-5 h-5" /> },
    { title: "Request Data Deletion", desc: "GDPR / CCPA compliant", href: `mailto:${SUPPORT_EMAIL}?subject=iConnect%20Account%20Deletion%20Request`, icon: <Trash2 className="w-5 h-5" /> },
  ];

  return (
    <section id="support" className="py-32 px-6 border-t border-white/[0.05] relative overflow-hidden bg-[#0A0D1F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-[#00E5FF]/20 rounded-full text-zinc-300 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5 text-[#00E5FF]" /> 24/7 Support
            </div>
            <h2 className="text-4xl font-medium text-white tracking-tight mb-4">Support & Resources</h2>
            <p className="text-lg text-zinc-400 font-normal mb-10 max-w-lg">
              Need assistance with your account, data deletion requests, bug reports, or feature requests? Access our comprehensive resources or send a secure message directly to our dedicated support team.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {redirectLinks.map((link, i) => (
                <a key={i} href={link.href} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-[#00E5FF]/30 transition-colors group">
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
  <footer className="border-t border-white/[0.05] pt-16 pb-8 px-6 bg-[#050714]">
    <div className="max-w-7xl mx-auto">
      {/* Main Footer Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={iconnectLogo} 
              alt="iConnect Logo" 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover shadow-[0_0_20px_rgba(0,229,255,0.2)] ring-1 ring-white/10"
            />
            <div>
              <div className="font-semibold text-white text-lg">iConnect<span className="text-[#00E5FF]">.</span></div>
              <div className="text-[10px] text-zinc-600 font-medium">V{APP_VERSION} • Enterprise Grade</div>
            </div>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
            Quantum-Resistant Encryption, AI-Powered Defense, and RAM-Only Servers. The future of VPN security.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">Product</h4>
          <ul className="space-y-3">
            {[
              { label: 'Features', href: '#features' },
              { label: 'Security', href: '#security' },
              { label: 'Protocols', href: '#protocols' },
              { label: 'Network', href: '#network' },
              { label: 'AI Defense', href: '#ai-shield' },
              { label: 'Pricing', href: '#savings' },
            ].map(link => (
              <li key={link.href}><a href={link.href} className="text-sm text-zinc-500 hover:text-[#00E5FF] transition-colors">{link.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">Legal</h4>
          <ul className="space-y-3">
            {[
              { label: 'Privacy Policy', href: `${WEBSITE_URL}/privacy` },
              { label: 'Terms of Service', href: `${WEBSITE_URL}/terms` },
              { label: 'License Agreement', href: `${WEBSITE_URL}/license` },
              { label: 'Compliance', href: '#compliance' },
              { label: 'Data Deletion', href: `mailto:${SUPPORT_EMAIL}?subject=Data%20Deletion` },
            ].map(link => (
              <li key={link.label}><a href={link.href} className="text-sm text-zinc-500 hover:text-[#00E5FF] transition-colors">{link.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">Support</h4>
          <ul className="space-y-3">
            {[
              { label: 'Help Center', href: '#support' },
              { label: 'Report a Bug', href: `mailto:${SUPPORT_EMAIL}?subject=Bug%20Report` },
              { label: 'Request Feature', href: `mailto:${SUPPORT_EMAIL}?subject=Feature%20Request` },
              { label: 'Version History', href: `${WEBSITE_URL}/version-history` },
              { label: 'Contact Us', href: `mailto:${SUPPORT_EMAIL}` },
            ].map(link => (
              <li key={link.label}><a href={link.href} className="text-sm text-zinc-500 hover:text-[#00E5FF] transition-colors">{link.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> All Systems Online
          </span>
          <span className="text-zinc-700">•</span>
          <span className="text-sm text-zinc-600">© {new Date().getFullYear()} iConnect. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
          <span className="text-xs">Built with <Heart className="w-3 h-3 inline text-red-500" /> for privacy</span>
        </div>
      </div>
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
        
        {/* Security Arsenal - Kill Switch, Split Tunneling, Multi-Hop, DNS Leak, Stealth, Homomorphic */}
        <SecurityArsenal />
        
        {/* Protocol Selection - WireGuard, OpenVPN, ChaCha20 */}
        <ProtocolSelection />

        <GlobalNetwork />

        {/* Interactive Traceroute Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-[#00E5FF]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
          <NetworkMapTester />
        </section>

        {/* Platform Support */}
        <PlatformSupport />

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

        {/* About Section - Expanded */}
        <section id="about" className="py-24 px-6 border-t border-white/[0.05] relative overflow-hidden bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-medium text-white tracking-tight mb-4">About iConnect</h2>
              <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-3xl mx-auto">
                We started iConnect with a simple belief: privacy is a fundamental human right. Our global team of security engineers and privacy advocates builds technology designed to protect what matters most—your digital life. We continuously innovate to stay ahead of emerging threats, from quantum computing to AI-driven attacks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="p-6 rounded-3xl bg-[#0A0D1F] border border-white/[0.04]">
                <Atom className="w-8 h-8 text-[#00E5FF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Quantum-Resistant Encryption</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">CRYSTALS-Kyber (Kyber-512/768/1024) and CRYSTALS-Dilithium for future-proof post-quantum security with automatic key rotation.</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#0A0D1F] border border-white/[0.04]">
                <Cpu className="w-8 h-8 text-[#00E5FF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">AI-Powered Defense</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">ML model engine with anomaly detection and continuous learning. Automated malware scanning, quarantine, and safe removal in real-time.</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#0A0D1F] border border-white/[0.04]">
                <Server className="w-8 h-8 text-[#00E5FF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">RAM-Only Servers</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Absolute zero-log architecture with automatic rotation, load balancing, health monitoring, and verifiable remote attestation.</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#0A0D1F] border border-white/[0.04]">
                <Key className="w-8 h-8 text-[#00E5FF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Zero-Knowledge Proofs</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Schnorr signatures, ring signatures, zk-SNARKs, and batch verification for privacy-preserving authentication flows.</p>
              </div>
            </div>

            {/* Tech Specs Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Cold Start', value: '< 2s', icon: <Clock className="w-4 h-4" /> },
                { label: 'Connection', value: '< 50ms', icon: <Zap className="w-4 h-4" /> },
                { label: 'Animations', value: '60 FPS', icon: <Gauge className="w-4 h-4" /> },
                { label: 'Test Cases', value: '225+', icon: <Check className="w-4 h-4" /> },
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#0A0D1F] border border-white/[0.04] rounded-2xl">
                  <div className="text-[#00E5FF]">{spec.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{spec.value}</div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{spec.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSupport />
      </main>
      <Footer />
    </div>
  );
}
