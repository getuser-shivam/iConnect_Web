import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gauge, Landmark, DollarSign, Cpu, ArrowUpRight } from 'lucide-react';

export function SavingsCalculator() {
  const [bandwidthGb, setBandwidthGb] = useState<number>(200);
  const [deviceCount, setDeviceCount] = useState<number>(5);
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('year');

  const cycleMultiplier = billingCycle === 'year' ? 12 : 1;

  // Math equations for cost curve
  const traditionalVpnCost = ((deviceCount * 9.99) + (bandwidthGb * 0.08));
  const iconnectCost = 0.00; // Simulating completely decentralized open-gates!
  const premiumIconnectSeatCost = (deviceCount * 1.50); // Dynamic ultra-saver tier

  // Percentages for interactive graphical bars (Scaled to 100 for percentage)
  const MAX_POSSIBLE_COST = (50 * 9.99) + (2000 * 0.08); // Max bounds for graph max height
  
  const traditionalHeight = Math.max(12, Math.min(100, (traditionalVpnCost / MAX_POSSIBLE_COST) * 100));
  const iconnectHeight = Math.max(8, Math.min(100, (premiumIconnectSeatCost / MAX_POSSIBLE_COST) * 100));

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 lg:p-10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders panel in 6 Cols */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 mb-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-300 text-xs font-medium">
            <DollarSign className="w-3.5 h-3.5" /> Plans & Pricing
          </div>
          <div>
            <h3 className="text-3xl font-medium text-white tracking-tight leading-tight mb-2">Fair Pricing Built for You</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Traditional VPN providers overcharge for access. We pass the savings directly to you by using advanced network optimizations, ensuring you get the best speeds without the premium price tag.
            </p>
          </div>

          <div className="w-full h-px bg-white/[0.05]" />

          {/* Interactive controls */}
          <div className="space-y-6">
            
            {/* Control 1: monthly bandwidth */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="text-zinc-400 font-medium tracking-wide">Estimated Monthly Usage</span>
                <span className="text-[#00E5FF] font-mono font-bold tracking-wider">{bandwidthGb} GB <span className="text-zinc-500 font-medium">/mo</span></span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={bandwidthGb}
                onChange={(e) => setBandwidthGb(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00E5FF] hover:accent-[#00B8D4] transition-colors"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-1">
                <span>10 GB</span>
                <span>1,000 GB</span>
                <span>2,000 GB</span>
              </div>
            </div>

            {/* Control 2: active seat count */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="text-zinc-400 font-medium tracking-wide">Active Devices & Mapped Seats</span>
                <span className="text-[#00E5FF] font-mono font-bold tracking-wider">{deviceCount} Device{deviceCount > 1 && 's'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={deviceCount}
                onChange={(e) => setDeviceCount(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00E5FF] hover:accent-[#00B8D4] transition-colors"
              />
              <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-1">
                <span>1 Client</span>
                <span>25 Clients</span>
                <span>50 Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Vector Graphical Comparison Panel in 6 Cols */}
        <div className="lg:col-span-6 bg-[#0C1024] border border-white/5 rounded-2xl p-5 lg:p-8 flex flex-col justify-between min-h-[380px] hover:border-white/10 transition-colors">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono tracking-widest text-[#94a3b8] uppercase font-bold">Financial Comparison</span>
              
              {/* Billing Cycle Toggle */}
              <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/5 text-[9px] font-mono text-zinc-400 select-none">
                <button
                  type="button"
                  onClick={() => setBillingCycle('month')}
                  className={`px-3 py-1 rounded transition-all cursor-pointer ${billingCycle === 'month' ? 'bg-[#00E5FF] text-black font-semibold shadow-sm' : 'hover:text-white'}`}
                >
                  Mo
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('year')}
                  className={`px-3 py-1 rounded transition-all cursor-pointer ${billingCycle === 'year' ? 'bg-[#00E5FF] text-black font-semibold shadow-sm' : 'hover:text-white'}`}
                >
                  Yr
                </button>
              </div>
            </div>

            {/* Columns chart comparing providers */}
            <div className="flex justify-around items-end h-44 border-b border-white/10 pb-4 relative">
              
              {/* Centralized VPN Bar */}
              <div className="flex flex-col items-center w-24 group">
                <span className="text-[10px] font-mono font-bold text-red-500 mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  ${(traditionalVpnCost * cycleMultiplier).toFixed(2)}
                </span>
                <motion.div 
                  initial={{ height: '12%' }}
                  animate={{ height: `${traditionalHeight}%` }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                  className="w-full bg-gradient-to-t from-red-950/40 to-red-600/90 rounded-t-xl border-x border-t border-red-500/20"
                />
                <span className="text-[9px] font-medium text-zinc-400 mt-3 tracking-widest uppercase truncate w-full text-center">Standard</span>
              </div>

              {/* iConnect Free Tier */}
              <div className="flex flex-col items-center w-24 group">
                <span className="text-[10px] font-mono font-bold text-emerald-400 mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  FREE
                </span>
                <motion.div 
                  initial={{ height: '8%' }}
                  animate={{ height: '8%' }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                  className="w-full bg-gradient-to-t from-emerald-950/40 to-emerald-500/80 rounded-t-xl border-x border-t border-emerald-500/20"
                />
                <span className="text-[9px] font-medium text-zinc-400 mt-3 tracking-widest uppercase truncate w-full text-center">Free Tier</span>
              </div>

              {/* iConnect Pro Tier */}
              <div className="flex flex-col items-center w-24 group">
                <span className="text-[10px] font-mono font-bold text-[#00E5FF] mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  ${(premiumIconnectSeatCost * cycleMultiplier).toFixed(2)}
                </span>
                <motion.div 
                  initial={{ height: '10%' }}
                  animate={{ height: `${iconnectHeight}%` }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                  className="w-full bg-gradient-to-t from-amber-950/40 to-[#00E5FF]/90 rounded-t-xl border-x border-t border-[#00E5FF]/40 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent mix-blend-overlay" />
                </motion.div>
                <span className="text-[9px] font-medium text-[#00E5FF] mt-3 tracking-widest uppercase truncate w-full text-center">Pro Tier</span>
              </div>
            </div>
          </div>

          {/* Quick billing description */}
          <div className="mt-8 flex justify-between items-center bg-[#00E5FF]/5 border border-[#00E5FF]/20 p-4 rounded-xl text-xs hover:bg-[#00E5FF]/10 transition-colors group">
            <div className="text-left">
              <span className="text-zinc-400 block uppercase text-[9px] font-bold tracking-widest mb-1">Projected {billingCycle === 'year' ? 'Annual' : 'Monthly'} Savings</span>
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={traditionalVpnCost - premiumIconnectSeatCost}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl font-mono font-bold text-[#00E5FF]"
                >
                  ${((traditionalVpnCost - premiumIconnectSeatCost) * cycleMultiplier).toFixed(2)}
                </motion.span>
              </AnimatePresence>
            </div>
            
            <a 
              href="#download" 
              className="px-4 py-2 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:opacity-90 active:scale-95 text-black font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              <span>Go Pro</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
