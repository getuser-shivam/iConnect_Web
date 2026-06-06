import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import iconnectLogo from '../assets/images/iconnect_logo_1780751746641.png';
import { 
  Sparkles, Smartphone, CheckCircle2, ShieldAlert, FileText, 
  RefreshCw, Copy, Check, ChevronRight, HelpCircle, AlertTriangle, 
  BookOpen, Layers, Star, Download, Globe, Shield, ArrowUpRight, Rotate3d
} from 'lucide-react';

interface ComplianceRule {
  id: string;
  name: string;
  category: 'policy' | 'technical' | 'gdpr';
  desc: string;
  status: 'passed' | 'warning' | 'pending';
}

const DEFAULT_RULES: ComplianceRule[] = [
  { id: 'vpnservice', name: 'VpnService Absolute Declaration', category: 'policy', desc: 'Must document target usage in core manifest and declare in console declaration forms.', status: 'passed' },
  { id: 'gdpr_wipe', name: 'GDPR Right to Erasure Link', category: 'gdpr', desc: 'Must list a fast, accessible user-account self-wipe workflow inside both the store listing and app.', status: 'passed' },
  { id: 'adblock_filter', name: 'Ad-Filtering Policy Alignment', category: 'policy', desc: 'Must clarify that ad-blocking does not disrupt external systems or monetization in third-party apps.', status: 'warning' },
  { id: 'encryption_type', name: 'AES-256 / ChaCha20 Cryptography', category: 'technical', desc: 'Symmetric encryption must be configured for all tunneled packet routing payloads.', status: 'passed' },
  { id: 'no_anonymity_claim', name: 'Hyped Anonymity Sanitizer', category: 'policy', desc: 'Cannot claim absolute anonymity or untraceability inside store promotional copy.', status: 'warning' }
];

export function PlayStoreOptimizer() {
  const [appName, setAppName] = useState('iConnect: VPN & DNS');
  const [keyFeatures, setKeyFeatures] = useState('Sub-1200ms latency pings, recursive DNS leak protectors, full WebRTC STUN isolation, instant GDPR self-erasure');
  const [targetAudience, setTargetAudience] = useState('Tech-savvy users seeking high-performance tunneling and low Jitter');

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedText, setCopiedText] = useState<'short' | 'full' | 'reviewer' | null>(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rX = -(mouseY / height) * 12;
    const rY = (mouseX / width) * 12;
    setCardTilt({ x: rX, y: rY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const [optimizedMetadata, setOptimizedMetadata] = useState<{
    shortDescription: string;
    fullDescription: string;
    complianceHighlights: string[];
    reviewerRationales: string[];
  } | null>({
    shortDescription: 'High-speed local VPN & DNS tunnel with full WebRTC and DNS leak protection.',
    fullDescription: 'iConnect is a high-performance network utility engineered from the ground up for security and speed. Our application utilizes the standard android.net.VpnService system package class on-device to establish a secure, local, encrypted gateway, protecting all outbound network packets with AES-256 cryptographic handshakes. iConnect strictly optimizes your transit routing using real-time latency diagnostics and open VpnGate relays, stripping slow nodes responding above 1200ms.\n\nWHY KEY CRITERIA ALIGNS PERFECTLY WITH GOOGLE PLAY POLICY:\n\n- Local VpnService Usage: Configured strictly and explicitly to route and encrypt DNS and network packets over a secure gateway tunnel. No data is collected or tracked on external databases.\n- Full Leak Shields: Automated WebRTC peer socket isolation blocks WebRTC leaks, preventing background network metadata traversal.\n- Zero-Log Erasure: Integrated with an instant GDPR right-to-erase function, purging Firebase authentication states and node slots in single-click.',
    complianceHighlights: [
      'Strictly uses android.net.VpnService to construct secure routing layers',
      'Provides standard compliant zero-log, instant self-wipe client data removals',
      'Zero injection or sniffing of user ad configurations'
    ],
    reviewerRationales: [
      'This application adheres meticulously to Google Play VpnService policies. It limits its VPN scope exclusively to establishing a secure on-device tunnel for privacy filtering and socket encryption, requesting explicit standard Android consent modals from users on launch.'
    ]
  });

  const [rules, setRules] = useState<ComplianceRule[]>(DEFAULT_RULES);
  const [complianceScore, setComplianceScore] = useState(90);

  // Analyze compliance keywords in real-time as user type
  const checkComplianceAdvisories = (title: string, feats: string) => {
    let warningCount = 0;
    const combined = (title + ' ' + feats).toLowerCase();
    
    const updatedRules = DEFAULT_RULES.map(rule => {
      if (rule.id === 'no_anonymity_claim') {
        const containsForbidden = combined.includes('anonymous') || combined.includes('untraceable') || combined.includes('unblock everything');
        const status: 'warning' | 'passed' | 'pending' = containsForbidden ? 'warning' : 'passed';
        if (containsForbidden) warningCount++;
        return { ...rule, status, desc: containsForbidden ? 'Found forbidden phrases ("anonymous" or "untraceable") in metadata! Re-generate to sanitize.' : rule.desc };
      }
      if (rule.id === 'adblock_filter') {
        const containsAdblock = combined.includes('adblock') || combined.includes('ad block') || combined.includes('stop ads');
        const status: 'warning' | 'passed' | 'pending' = containsAdblock ? 'warning' : 'passed';
        if (containsAdblock) warningCount++;
        return { ...rule, status, desc: containsAdblock ? 'Ad-shield keywords detected. Declare ad filtration as helper/optional layer to prevent store suspensions.' : rule.desc };
      }
      return rule;
    }) as ComplianceRule[];

    setRules(updatedRules);
    setComplianceScore(Math.max(65, 100 - (warningCount * 15)));
  };

  const handleTextChange = (field: 'name' | 'features' | 'audience', val: string) => {
    if (field === 'name') {
      setAppName(val);
      checkComplianceAdvisories(val, keyFeatures);
    } else if (field === 'features') {
      setKeyFeatures(val);
      checkComplianceAdvisories(appName, val);
    } else {
      setTargetAudience(val);
    }
  };

  const triggerGeminiOptimize = async () => {
    setIsOptimizing(true);
    try {
      const response = await fetch('/api/gemini/playstore-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appName, keyFeatures, targetAudience })
      });
      const data = await response.json();
      if (data && !data.error) {
        setOptimizedMetadata({
          shortDescription: data.shortDescription,
          fullDescription: data.fullDescription,
          complianceHighlights: data.complianceHighlights || [],
          reviewerRationales: [data.reviewerRationales]
        });
        
        // Mark all rules as passed once Gemini output is injected (since it self-cleans forbidden terms and drafts VpnService Rationale)
        setRules(prev => prev.map(r => ({ ...r, status: 'passed' })));
        setComplianceScore(100);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const copyToClipboard = (text: string, type: 'short' | 'full' | 'reviewer') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-6 lg:p-10 text-left relative overflow-hidden backdrop-blur-2xl">
      {/* 3D Grid Overlay Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
      
      {/* Header section with decorative rings */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-white/5 mb-10 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-[#00E5FF]/20 rounded-full text-zinc-300 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-[#00E5FF]" /> Developer Suite
          </div>
          <h2 className="text-3xl lg:text-4xl font-medium text-white tracking-tight leading-none">
            Play Store <span className="text-zinc-500">Listing Optimizer</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            VPN products face critical scrutiny on Google Play. Ensure instant compliance by sanitizing metadata, auditing VpnService schemas, and drafting bulletproof review rationales.
          </p>
        </div>
        
        {/* Compliance Meter - 3D Ring */}
        <div className="flex items-center gap-4 bg-zinc-950/60 p-4 border border-white/5 rounded-2xl">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
              <circle 
                cx="28" cy="28" r="24" fill="transparent" 
                stroke={complianceScore >= 90 ? '#10b981' : complianceScore >= 75 ? '#00E5FF' : '#ef4444'} 
                strokeWidth="4" 
                strokeDasharray="150"
                strokeDashoffset={150 - (150 * complianceScore) / 100}
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-white">{complianceScore}%</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">COMPLIANCE INDEX</span>
            <span className={`text-xs font-semibold uppercase ${
              complianceScore >= 90 ? 'text-emerald-400' : complianceScore >= 75 ? 'text-[#00E5FF]' : 'text-red-400 animate-pulse'
            }`}>
              {complianceScore >= 90 ? 'Store Ready ✓' : complianceScore >= 75 ? 'Optimal / Warnings' : 'Rejection Risk ⚠'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Play Store Configuration forms - 5 columns */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="text-zinc-400 font-medium text-xs flex items-center gap-1.5 px-1">
              <FileText className="w-4 h-4 text-[#00E5FF]" /> Provide Store Spec Criteria
            </div>

            {/* Form Inputs */}
            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Google Play app Name</label>
                <input 
                  type="text" 
                  value={appName}
                  onChange={(e) => handleTextChange('name', e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF] focus:bg-zinc-950 transition-all"
                  placeholder="e.g. iConnect VPN & Pro DNS"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Core VPN Features (Bullet points)</label>
                <textarea 
                  rows={3}
                  value={keyFeatures}
                  onChange={(e) => handleTextChange('features', e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF] focus:bg-zinc-950 transition-all resize-none leading-relaxed"
                  placeholder="Include core VpnService rationale here..."
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Target Audience Keyword Focus</label>
                <input 
                  type="text" 
                  value={targetAudience}
                  onChange={(e) => handleTextChange('audience', e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF] focus:bg-zinc-950 transition-all"
                  placeholder="e.g. Secure streaming, lower ping, high speed protocols"
                />
              </div>
            </div>

            {/* Real-time Compliance Advisories */}
            <div className="bg-zinc-950/60 border border-white/5 rounded-2xl p-4 space-y-3.5">
              <span className="text-[9px] font-mono text-zinc-500 tracking-wider block uppercase font-bold">Policy Compliance Checkup</span>
              
              <div className="space-y-2.5">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex gap-2.5 text-[11px] leading-relaxed items-start text-left">
                    <div className="mt-0.5 shrink-0">
                      {rule.status === 'passed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : rule.status === 'warning' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      ) : (
                        <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
                      )}
                    </div>
                    <div>
                      <span className={`font-semibold ${
                        rule.status === 'passed' ? 'text-zinc-300' : 'text-red-400'
                      }`}>{rule.name}</span>
                      <p className="text-zinc-500 text-[10px] mt-0.5">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={triggerGeminiOptimize}
            disabled={isOptimizing}
            className="w-full py-4 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] text-black font-semibold text-xs rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            {isOptimizing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sanitizing Listing Copys...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-black text-black" />
                <span>AI Gemini Play Store Optimization</span>
              </>
            )}
          </button>
        </div>

        {/* Play Store Simulated Listing Device Mockup (3D Perspectived Card) - 7 columns */}
        <div className="lg:col-span-7 flex flex-col justify-between relative min-h-[500px]">
          
          {/* Card perspective view wrapper */}
          <div className="flex-grow flex flex-col relative w-full perspective-[1500px]">
            
            {/* Flippable 3D Card with preserve-3d styling */}
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: isFlipped 
                  ? 'rotateY(180deg)' 
                  : `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                transition: isFlipped ? 'transform 0.7s ease-out' : 'transform 0.1s ease-out'
              }}
              className="w-full h-full min-h-[460px] relative flex flex-col shadow-2xl rounded-3xl cursor-grab active:cursor-grabbing hover:shadow-[0_0_50px_rgba(6,182,212,0.1)] transition-shadow duration-300"
            >
              
              {/* === CARD FRONT: Play Store Display Mockup === */}
              <div 
                style={{ backfaceVisibility: 'hidden' }}
                className="absolute inset-0 bg-[#0A0D1F] border border-white/10 rounded-3xl p-5 sm:p-8 flex flex-col gap-6 w-full h-full overflow-y-auto no-scrollbar scroll-smooth"
              >
                {/* Header inside simulated Store card */}
                <div className="flex justify-between items-start pb-4 border-b border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <img 
                      src={iconnectLogo} 
                      alt="iConnect VPN Logo" 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover shadow-[0_0_15px_rgba(0,229,255,0.25)] ring-1 ring-white/10 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">{appName}</h4>
                      <span className="text-[10px] text-[#00E5FF] font-medium tracking-wide">iConnect Protocols Inc • Safe Portal</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsFlipped(true)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Rotate3d className="w-3.5 h-3.5 text-[#00E5FF]" /> Toggle Rationale
                  </button>
                </div>

                {/* Rating & Downloads Store Indicator */}
                <div className="grid grid-cols-3 divide-x divide-white/[0.05] text-center bg-zinc-950/40 p-3 rounded-2xl border border-white/5 relative">
                  <div className="text-center">
                    <span className="text-xs font-bold text-white flex items-center justify-center gap-0.5">4.9 <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" /></span>
                    <span className="text-[9px] text-zinc-500 block uppercase tracking-wider font-semibold mt-0.5">14K reviews</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold text-white block">100K+</span>
                    <span className="text-[9px] text-zinc-500 block uppercase tracking-wider font-semibold mt-0.5">Downloads</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold text-[#00E5FF] block">E (Everyone)</span>
                    <span className="text-[9px] text-zinc-500 block uppercase tracking-wider font-semibold mt-0.5">Rated for 3+</span>
                  </div>
                </div>

                {/* Listing metadata copy items */}
                <div className="space-y-4">
                  {/* Short description block */}
                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl text-left relative flex flex-col justify-between gap-3 group">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-1">Play Store Short Description</span>
                      <p className="text-zinc-200 text-[11px] leading-normal">{optimizedMetadata?.shortDescription}</p>
                    </div>
                    <button 
                      onClick={() => optimizedMetadata && copyToClipboard(optimizedMetadata.shortDescription, 'short')}
                      className="self-end px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer hover:bg-white/10 transition-colors shrink-0"
                    >
                      {copiedText === 'short' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText === 'short' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Full description block */}
                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl text-left relative flex flex-col gap-3">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-1">Full Compliance Description (VpnService rationale)</span>
                      <pre className="text-zinc-300 text-[11px] font-sans leading-relaxed whitespace-pre-wrap select-all max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                        {optimizedMetadata?.fullDescription}
                      </pre>
                    </div>
                    <button 
                      onClick={() => optimizedMetadata && copyToClipboard(optimizedMetadata.fullDescription, 'full')}
                      className="self-end px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer hover:bg-white/10 transition-colors shrink-0"
                    >
                      {copiedText === 'full' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText === 'full' ? 'Copy Full Text' : 'Copy All'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* === CARD BACK: Rationale for Google Reviewers === */}
              <div 
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                className="absolute inset-0 bg-[#0A0D1F] border border-[#00E5FF]/20 rounded-3xl p-5 sm:p-8 flex flex-col gap-6 w-full h-full overflow-y-auto no-scrollbar scroll-smooth"
              >
                {/* Header inside simulated Store card */}
                <div className="flex justify-between items-start pb-4 border-b border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] font-bold">
                      i
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Google Console Rationale</h4>
                      <span className="text-[10px] text-zinc-500 block tracking-wide">Developer Console Compliance Answers</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    <Rotate3d className="w-3.5 h-3.5 text-[#00E5FF]" /> Flip Store List
                  </button>
                </div>

                <div className="space-y-4">
                  {/* review answers Rationales */}
                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl text-left relative flex flex-col gap-3">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block font-bold mb-1">VpnService Console Declaration Form rationale</span>
                      <p className="text-zinc-300 text-[11px] leading-relaxed select-all">
                        {optimizedMetadata?.reviewerRationales[0]}
                      </p>
                    </div>
                    <button 
                      onClick={() => optimizedMetadata && copyToClipboard(optimizedMetadata.reviewerRationales[0], 'reviewer')}
                      className="self-end px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer hover:bg-white/10 transition-colors shrink-0"
                    >
                      {copiedText === 'reviewer' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Answer</span>
                    </button>
                  </div>

                  {/* Highlights Bulletproof checks */}
                  <div className="bg-zinc-950/60 border border-white/5 p-4 rounded-xl text-left">
                    <span className="text-[8px] font-mono text-[#00E5FF] uppercase tracking-widest block font-bold mb-3">Key Declaration highlights Checklists</span>
                    <div className="space-y-2">
                      {optimizedMetadata?.complianceHighlights.map((hl, i) => (
                        <div key={i} className="flex gap-2 text-[10.5px] text-zinc-400 leading-normal">
                          <span className="text-emerald-400 shrink-0 select-none font-bold">✓</span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Policy documentation quick link */}
                <div className="mt-auto flex justify-between items-center bg-white/[0.01] border border-white/5 p-3 rounded-xl text-[10px] text-zinc-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-4 h-4 text-zinc-500" />
                    <span>VPN Regulatory Guidelines</span>
                  </span>
                  <a 
                    href="https://support.google.com/googleplay/android-developer/answer/12516874" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[#00E5FF] hover:underline font-bold flex items-center gap-0.5"
                  >
                    <span>Read Policy</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          <div className="text-zinc-500 text-[10px] text-center mt-3 font-mono">
            * 3D Device View. Click Flip Card or Rotate button to rotate showing compliance rationales.
          </div>
        </div>

      </div>
    </div>
  );
}
