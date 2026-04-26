import { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Percent,
  Minus,
  Plus,
  Divide,
  Calculator as CalcIcon,
  Equal,
  Smartphone,
  Wifi,
  Battery
} from 'lucide-react';
import { cn } from '../lib/utils';

interface CalculatorProps {
  onUnlock: () => void;
}

export default function Calculator({ onUnlock }: CalculatorProps) {
  const [display, setDisplay] = useState('13,072.50');
  const [history, setHistory] = useState('12,450 × 1.05');

  const keys = [
    { label: 'AC', className: 'text-secondary-fixed-dim' },
    { label: '+/-', icon: <CalcIcon size={20} />, className: 'text-secondary-fixed-dim' },
    { label: '%', className: 'text-secondary-fixed-dim' },
    { label: '÷', icon: <Divide size={24} />, className: 'bg-secondary/15 text-secondary-fixed-dim' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '×', icon: <X size={24} />, className: 'bg-secondary/15 text-secondary-fixed-dim' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '−', icon: <Minus size={24} />, className: 'bg-secondary/15 text-secondary-fixed-dim' },
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '+', icon: <Plus size={24} />, className: 'bg-secondary/15 text-secondary-fixed-dim' },
    { label: '0', colSpan: 2, className: 'justify-start px-8' },
    { label: '.' },
    { label: '=', className: 'bg-error text-white', highlight: true },
  ];

  const handleKeyClick = (label: string) => {
    if (label === '=') {
      onUnlock();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative bg-[#1E0A1A] text-white">
      {/* Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary-container/20 blur-[120px] rounded-full" />
      </div>

      {/* Status Bar */}
      <div className="h-12 w-full flex justify-between items-center px-8 opacity-40 z-10 pt-4">
        <span className="font-manrope text-xs font-bold">9:41</span>
        <div className="flex gap-2">
          <Smartphone size={14} />
          <Wifi size={14} />
          <Battery size={14} />
        </div>
      </div>

      {/* Display */}
      <main className="flex-1 flex flex-col justify-end px-6 pb-12 z-10">
        <div className="mb-8 px-2 flex flex-col items-end">
          <div className="font-manrope font-medium text-lg text-secondary/60 mb-2 tracking-wide uppercase tracking-widest text-[12px]">
            {history}
          </div>
          <div className="font-manrope font-extrabold text-[64px] leading-none text-white tracking-tighter">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-4">
          {keys.map((key, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleKeyClick(key.label)}
              className={cn(
                "h-20 rounded-[20px] flex items-center justify-center font-manrope font-bold text-2xl transition-colors glass-surface",
                "bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.05]",
                key.colSpan === 2 && "col-span-2",
                key.className
              )}
            >
              {key.icon || key.label}
            </motion.button>
          ))}
        </div>
      </main>

      {/* Home Indicator */}
      <div className="h-1.5 w-32 bg-white/10 rounded-full mx-auto mb-4 z-10" />
    </div>
  );
}
