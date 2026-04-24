import { motion } from 'motion/react';
import {
  Wifi,
  Battery,
  Mic,
  Navigation,
  Satellite,
  Users,
  Shield,
  History,
  Settings,
  Grid2X2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';

interface SOSMonitorProps {
  onDeactivate: () => void;
}

export default function SOSMonitor({ onDeactivate }: SOSMonitorProps) {
  const [timer, setTimer] = useState('04:12:08');

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulating time update
      setTimer(prev => {
        const parts = prev.split(':').map(Number);
        parts[2]++;
        if (parts[2] >= 60) { parts[2] = 0; parts[1]++; }
        if (parts[1] >= 60) { parts[1] = 0; parts[0]++; }
        return parts.map(p => p.toString().padStart(2, '0')).join(':');
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-primary-container text-on-primary-container overflow-hidden relative emergency-glow overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-5 py-3 sticky top-0 z-50 bg-slate-50/80 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_20px_rgba(30,10,26,0.05)]">
        <div className="flex items-center gap-2">
          <Grid2X2 className="text-[#1E0A1A]" size={20} />
          <span className="font-manrope font-black tracking-tight text-[#1E0A1A]">SafeTrace</span>
        </div>
        <div className="flex items-center gap-4">
          <Wifi className="text-slate-400" size={20} />
          <Battery className="text-slate-400" size={20} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col items-center justify-center px-6 py-12 z-10">
        {/* SOS Header */}
        <div className="text-center mb-12">
          <p className="font-bold text-[12px] text-on-primary-container/60 mb-2 uppercase tracking-widest">SYSTEM STATUS</p>
          <h1 className="text-3xl font-bold text-on-primary-container tracking-tight">SOS Active</h1>
        </div>

        {/* Bento Grid */}
        <div className="w-full space-y-4">
          {/* Recording */}
          <div className="dark-glass rounded-[20px] p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-error rounded-full animate-pulse shadow-[0_0_8px_#ba1a1a]" />
              <div>
                <p className="text-[10px] font-bold text-on-primary-container/50 uppercase">Recording Audio</p>
                <p className="text-3xl font-bold text-white tabular-nums">{timer}</p>
              </div>
            </div>
            <Mic className="text-on-primary-container/30" fill="currentColor" size={24} />
          </div>

          {/* GPS */}
          <div className="dark-glass rounded-[20px] p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-on-primary-container/50 uppercase">Live GPS Location</p>
              <Navigation className="text-on-primary-container/40" size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl text-white font-bold tabular-nums">34.0522° N</span>
              <span className="text-xl text-white font-bold tabular-nums">118.2437° W</span>
            </div>
          </div>

          {/* Map Snippet */}
          <div className="h-32 dark-glass rounded-[20px] overflow-hidden relative">
            <img
              className="w-full h-full object-cover opacity-50 grayscale contrast-125"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt33HT6_rWkK2ievReATWfbswbHrFt1lRk8FpiPvZBf-Sm505Pgmb0p72TjK0S6jjJdgGtM1qeKPQc9mg4m2sDTomWzjb2n8ubnms4KnwP8MnKXwqqjxmXzlZzizhKT6WXBG6iXJwybZBL-yKxRpyEzF-fI7D-lJfTV3B04Nln2aH8TJdW8uQWi1qZoVuCnzX_4TAuIaxWdKFuKTK06QZCVP0TsaAk54L-lJEfG-5Sh7Keju-bvguZueYFGc7Av9n1SJoLWYLGr4t_"
              alt="Map"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container to-transparent" />
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-on-primary-container rounded-full animate-ping" />
              <span className="text-[10px] font-semibold text-on-primary-container/80">Updating live...</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="dark-glass rounded-[20px] p-4 flex flex-col items-center justify-center text-center aspect-square">
              <Satellite className="text-white mb-2" size={24} />
              <p className="text-[10px] font-bold text-on-primary-container/70 leading-tight">ENCRYPTED<br />UPLINK</p>
            </div>
            <div className="dark-glass rounded-[20px] p-4 flex flex-col items-center justify-center text-center aspect-square">
              <Users className="text-white mb-2" size={24} />
              <p className="text-[10px] font-bold text-on-primary-container/70 leading-tight">3 CONTACTS<br />ALERTED</p>
            </div>
          </div>
        </div>

        {/* Deactivate Button */}
        <div className="mt-12 w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onDoubleClick={onDeactivate}
            className="w-full py-5 bg-white/5 border border-white/10 text-on-primary-container/40 font-manrope font-bold text-sm tracking-widest rounded-full uppercase transition-all active:scale-95 active:bg-white/10"
          >
            Long Press to Deactivate
          </motion.button>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-slate-100/70 backdrop-blur-2xl border-t border-white/20 shadow-[0_-8px_30px_rgba(30,10,26,0.15)] rounded-t-[20px]">
        {[
          { label: 'Calculate', icon: <Grid2X2 size={24} /> },
          { label: 'History', icon: <History size={24} /> },
          { label: 'SafeZones', icon: <Shield size={24} />, active: true },
          { label: 'Settings', icon: <Settings size={24} /> },
        ].map((nav, idx) => (
          <div key={idx} className={cn(
            "flex flex-col items-center justify-center transition-colors px-4 py-1",
            nav.active ? "text-[#1E0A1A] bg-white/40 rounded-[16px]" : "text-slate-400"
          )}>
            {nav.icon}
            <span className="font-manrope text-[10px] font-semibold uppercase tracking-wider">{nav.label}</span>
          </div>
        ))}
      </nav>

      {/* Edge Pulse */}
      <div className="fixed inset-0 pointer-events-none border-[3px] border-error/10 animate-[pulse_3s_infinite] z-[100]" />
    </div>
  );
}
