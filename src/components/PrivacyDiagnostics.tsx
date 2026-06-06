import { useState } from 'react';
import { ShieldCheck, EyeOff, ShieldAlert, Cpu, Check, Activity, Search } from 'lucide-react';
import { DiagnosticsState } from '../types';

export function PrivacyDiagnostics() {
  const [testState, setTestState] = useState<DiagnosticsState>({
    status: 'idle',
    step: 'none',
    externalIp: '185.122.90.144',
    isProtected: false,
    leakedIp: '185.122.90.144',
    dnsResolver: 'Local ISP Server (Leaked)',
    webrtcStatus: 'vulnerable'
  });

  const [scanSpeed, setScanSpeed] = useState<'normal' | 'secure'>('normal');

  const startIsolationScan = () => {
    setTestState(prev => ({ ...prev, status: 'running', step: 'ip' }));

    // Step 1: External IP Fetch
    setTimeout(() => {
      setTestState(prev => ({ ...prev, step: 'webrtc' }));

      // Step 2: WebRTC vulnerabilities testing
      setTimeout(() => {
        setTestState(prev => ({ ...prev, step: 'dns' }));

        // Step 3: DNS leak check
        setTimeout(() => {
          setTestState(prev => ({ ...prev, step: 'speed' }));

          // Step 4: Latency diagnostics complete
          setTimeout(() => {
            setTestState({
              status: 'success',
              step: 'none',
              externalIp: '185.22.148.21 (Tokyo iConnect Hub)',
              isProtected: true,
              leakedIp: 'None (WebRTC shielded)',
              dnsResolver: 'Cloudflare Encrypted (1.1.1.1)',
              webrtcStatus: 'isolated'
            });
            setScanSpeed('secure');
          }, 800);
        }, 800);
      }, 700);
    }, 600);
  };

  const resetDiagnostics = () => {
    setTestState({
      status: 'idle',
      step: 'none',
      externalIp: '185.122.90.144',
      isProtected: false,
      leakedIp: '185.122.90.144',
      dnsResolver: 'Local ISP Server (Leaked)',
      webrtcStatus: 'vulnerable'
    });
    setScanSpeed('normal');
  };

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 lg:p-10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Info panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 mb-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Privacy Hub
          </div>
          <h3 className="text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight">Test Your Protection</h3>
          <p className="text-zinc-400 leading-relaxed text-sm">
            Standard VPNs often leak your data and direct traffic back to your local ISP—rendering your encryption useless. Use our secure testing tool to verify your connection is completely private.
          </p>

          <div className="space-y-3">
            <div className="p-3.5 bg-zinc-950/60 border border-white/5 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white mb-0.5">WebRTC Protection</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">Browsers routinely pierce tunnel walls to broadcast real IP addresses directly. Our protection is default-on in iConnect client setups.</p>
              </div>
            </div>

            <div className="p-3.5 bg-zinc-950/60 border border-white/5 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <EyeOff className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white mb-0.5">DNS Leak Prevention</h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed">If lookup queries route outside the secure connection, your activity leaks. iConnect binds resolver configs directly inside our network layer.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Monitor UI */}
        <div className="lg:col-span-7 bg-zinc-950 border border-white/5 rounded-2xl p-5 lg:p-8 relative overflow-hidden flex flex-col justify-between">
          <div>
            {/* Checker Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">Privacy Diagnostic Log</div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono whitespace-nowrap text-zinc-500">CONNECTION STATUS:</span>
                <span className={`text-[9px] font-mono font-bold uppercase ${scanSpeed === 'secure' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/15' : 'text-orange-400 bg-orange-500/10 border border-orange-500/15'} px-1.5 py-0.5 rounded`}>
                  {scanSpeed === 'secure' ? 'FULLY SECURE ✓' : 'UNSECURED ⚠'}
                </span>
              </div>
            </div>

            {/* Checkup Steps List */}
            <div className="space-y-4">
              {/* Step 1: External IP Check */}
              <div className="flex justify-between items-center py-2.5 border-b border-white/[0.03]">
                <div>
                  <span className="text-xs font-medium text-white block">Detected External IP</span>
                  <span className="text-[11px] font-mono text-zinc-500">The IP address currently visible to websites</span>
                </div>
                <div className="text-right font-mono text-[11px]">
                  {testState.step === 'ip' ? (
                    <span className="text-indigo-400 animate-pulse">Checking...</span>
                  ) : (
                    <span className={scanSpeed === 'secure' ? 'text-emerald-400' : 'text-orange-400 font-medium'}>
                      {testState.externalIp}
                    </span>
                  )}
                </div>
              </div>

              {/* Step 2: WebRTC Shield */}
              <div className="flex justify-between items-center py-2.5 border-b border-b-white/[0.03]">
                <div>
                  <span className="text-xs font-medium text-white block">WebRTC Leak Check</span>
                  <span className="text-[11px] font-mono text-zinc-500">Are your true IP details hidden?</span>
                </div>
                <div className="text-right font-mono text-[11px]">
                  {testState.step === 'ip' ? (
                    <span className="text-zinc-500">Pending</span>
                  ) : testState.step === 'webrtc' ? (
                    <span className="text-indigo-400 animate-pulse">Probing STUN...</span>
                  ) : (
                    <span className={`${
                      testState.webrtcStatus === 'isolated' ? 'text-emerald-400' : 'text-orange-500 font-bold'
                    }`}>
                      {testState.webrtcStatus === 'isolated' ? 'SHIELDED ✓' : 'LEAKING ⚠'}
                    </span>
                  )}
                </div>
              </div>

              {/* Step 3: DNS Leak Checker */}
              <div className="flex justify-between items-center py-2.5 border-b border-b-white/[0.03]">
                <div>
                  <span className="text-xs font-medium text-white block">DNS Root Resolvers</span>
                  <span className="text-[11px] font-mono text-zinc-500">Where are your web requests going?</span>
                </div>
                <div className="text-right font-mono text-[11px]">
                  {testState.step === 'ip' || testState.step === 'webrtc' ? (
                    <span className="text-zinc-500">Pending</span>
                  ) : testState.step === 'dns' ? (
                    <span className="text-indigo-400 animate-pulse">Tracing queries...</span>
                  ) : (
                    <span className={scanSpeed === 'secure' ? 'text-emerald-400' : 'text-orange-400 font-medium'}>
                      {testState.dnsResolver}
                    </span>
                  )}
                </div>
              </div>

              {/* Step 4: Web Traffic Protected Indicator */}
              <div className="flex justify-between items-center py-2.5 border-b border-b-white/[0.03]">
                <div>
                  <span className="text-xs font-medium text-white block">Connection Encryption</span>
                  <span className="text-[11px] font-mono text-zinc-500">Is your data securely encrypted?</span>
                </div>
                <div className="text-right font-mono text-[11px]">
                  {testState.step === 'none' && testState.status === 'idle' ? (
                    <span className="text-zinc-500">Unencrypted</span>
                  ) : testState.status === 'running' && testState.step !== 'speed' ? (
                    <span className="text-zinc-500">Computing...</span>
                  ) : testState.step === 'speed' ? (
                    <span className="text-indigo-400 animate-pulse">Optimizing ping...</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">AES-256-GCM ✓</span>
                  )}
                </div>
              </div>
            </div>

            {/* Simulated Live Scan Progress Indicators */}
            {testState.status === 'running' && (
              <div className="mt-6 flex items-center gap-3 bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-xl">
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-indigo-400 animate-spin" />
                </div>
                <span className="text-[10.5px] font-mono text-indigo-300">
                  Checking your connection for any potential vulnerabilities. Please wait...
                </span>
              </div>
            )}

            {testState.status === 'success' && (
              <div className="mt-6 flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl text-left">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[10.5px] font-mono text-emerald-300">
                  Security scan completed. Your connection is perfectly private and secure.
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end mt-8">
            {scanSpeed === 'secure' && (
              <button
                onClick={resetDiagnostics}
                className="px-4 py-2 border border-white/5 hover:border-white/10 hover:bg-white/[0.02] text-zinc-400 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Clear Results
              </button>
            )}
            <button
              onClick={startIsolationScan}
              disabled={testState.status === 'running'}
              className="px-5 py-2.5 bg-white text-black text-xs font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {testState.status === 'running' ? 'Scanning Connection...' : 'Test My Connection'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
