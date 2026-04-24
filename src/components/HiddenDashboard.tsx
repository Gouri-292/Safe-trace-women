import { motion } from 'motion/react';
import {
  Grid2X2,
  History,
  Shield,
  Settings,
  Search,
  UserCircle,
  Brain,
  MessageSquare,
  Mic,
  MapPin,
  Phone,
  ShieldAlert,
  Edit2,
  ChevronRight,
  PlusCircle,
  Bell,
  Share2
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface HiddenDashboardProps {
  onStartSOS: () => void;
  onNavigateHome: () => void;
}

export default function HiddenDashboard({ onStartSOS, onNavigateHome }: HiddenDashboardProps) {
  const contacts = [
    {
      name: 'Sarah Mitchell',
      priority: 'Priority 1',
      desc: 'SMS + Location',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_0-njBETZFl9Z4xQ2ORuvAVaQjh1kwnYwtrnoNJ6o38Z4rVKooPFzL236vuGndOKSgthtxa8lyf0nNEoD55__6aJ6KC1OXkCVLTf-8PV8Y_UaPW-fW8EosW1ee-91NB7IB5zSvC9ORgz5qRr1tlY6IkEiVWyCybWm8HTJEaEB2Hnh9053KM7W6okEu10WgnhH8530sTtGWD0YLUXkq9oB2BswyduZZipv1isYM49B1InqTmGk-oX7Mr52GPT1TbDbeS7LWDfJqtWv'
    },
    {
      name: 'David Chen',
      priority: 'Priority 2',
      desc: 'Call Only',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuM4AdYZb6of8P9dakbpYdcFrRGmt5qwKDP1xEhHx6so3qt87Kn3AJRhtFGW4RDa5tJTSZ8kArQtnFOXc46f53AmnI5-_hD5Q2ZT_3H1TeUJFco5HM6PLOLJ0dJvknMoeAX92KwBrJIG_Qmq_8N85ZnwQ4GFljFQae42_KLvXenUSPbY2Rr69ePRugmF6H79WONXms3RqfmRwQud9YjyIaf0xYT4OAAuEzCQLghQ1sawspcGVWkJL7CYEA_3tb5G9YUiynnKAzKk0H'
    }
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background overflow-y-auto pb-32">
      {/* Header */}
      <header className="bg-slate-50/80 backdrop-blur-xl border-b border-white/20 flex justify-between items-center w-full px-5 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
          <Grid2X2 className="text-[#1E0A1A]" />
          <h1 className="font-manrope font-black tracking-tight text-[#1E0A1A] text-lg">SafeTrace</h1>
        </div>
        <div className="flex gap-4">
          <Search className="text-slate-400" size={20} />
          <UserCircle className="text-slate-400" size={20} />
        </div>
      </header>

      <main className="px-5 pt-8 space-y-6">
        {/* Status */}
        <section>
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="font-bold text-[12px] text-secondary uppercase tracking-widest">System Secure</span>
              <h2 className="font-bold text-2xl text-primary-container">Hidden Dashboard</h2>
            </div>
            <div className="bg-tertiary-fixed text-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              ACTIVE
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Sensitivity Slider */}
          <div className="col-span-2 glass-card rounded-[20px] p-6 inner-highlight">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="text-primary-container" size={20} />
                <span className="font-bold text-lg">Detection Level</span>
              </div>
              <span className="text-secondary font-bold text-xs">High Sensitivity</span>
            </div>
            <input
              type="range"
              className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary-container"
              defaultValue={75}
            />
            <div className="flex justify-between mt-2 text-[10px] font-bold text-outline uppercase tracking-tighter">
              <span>Discreet</span>
              <span>Standard</span>
              <span>High Alert</span>
            </div>
          </div>

          {/* Toggles */}
          {[
            { label: 'Auto SMS', sub: 'Distress Triggers', icon: <MessageSquare size={20} />, active: true },
            { label: 'Audio Logs', sub: 'Continuous', icon: <Mic size={20} />, active: false },
            { label: 'Live Tracking', sub: 'GPS Stream', icon: <MapPin size={20} />, active: true },
            { label: 'Auto Call', sub: 'Emergency Hub', icon: <Phone size={20} />, active: false },
          ].map((item, idx) => (
            <div key={idx} className="glass-card rounded-[20px] p-4 flex flex-col justify-between inner-highlight min-h-[140px]">
              <div className="flex flex-col gap-1">
                <span className={cn("text-secondary")}>{item.icon}</span>
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-outline font-semibold">{item.sub}</span>
                <div className={cn(
                  "w-10 h-5 rounded-full relative transition-colors",
                  item.active ? "bg-primary-container" : "bg-surface-container-highest"
                )}>
                  <div className={cn(
                    "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                    item.active ? "right-1" : "left-1"
                  )} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Location Sharing */}
        <section className="glass-card rounded-[20px] p-6 inner-highlight">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Share2 className="text-primary-container" size={20} />
              <span className="font-bold text-lg">Live Location Sharing</span>
            </div>
            <div className="flex items-center gap-2 bg-tertiary-fixed/20 px-3 py-1 rounded-full border border-tertiary-fixed/30">
              <span className="text-[10px] font-bold text-tertiary-container uppercase tracking-widest">Active</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="bg-white/20 p-4 rounded-[16px] mb-4 border border-white/10">
            <p className="text-xs text-secondary leading-relaxed">
              Sharing your real-time GPS stream with selected guardians. They can see your exact path, speed, and real-time movement.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-white/30 p-3 rounded-[16px] border border-white/20">
              <div className="relative">
                <img src={contacts[0].image} alt="Sarah" className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-on-surface">Sarah Mitchell</p>
                <p className="text-[10px] text-secondary font-medium">Shared 12m ago • Moving • 4mph</p>
              </div>
              <button className="text-xs font-bold text-error bg-error/10 px-3 py-1.5 rounded-full hover:bg-error/20 transition-colors">Stop</button>
            </div>

            <button className="w-full py-4 border-2 border-dashed border-outline-variant rounded-[16px] text-outline flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
              <PlusCircle size={20} />
              <span className="font-bold text-sm">Share with Guardian</span>
            </button>
          </div>
        </section>

        {/* Contacts */}
        <section className="glass-card rounded-[20px] p-6 inner-highlight">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-primary-container" size={20} />
              <span className="font-bold text-lg">Trusted Contacts</span>
            </div>
            <button className="bg-surface-container text-on-surface-variant p-2 rounded-full">
              <Edit2 size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {contacts.map((contact, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/30 p-3 rounded-[16px]">
                <img src={contact.image} alt={contact.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <p className="font-bold text-on-surface">{contact.name}</p>
                  <p className="text-xs text-secondary">{contact.priority} • {contact.desc}</p>
                </div>
                <ChevronRight className="text-secondary" size={20} />
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-outline-variant rounded-[16px] text-outline flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
              <PlusCircle size={20} />
              <span className="font-bold text-sm">Add New Guardian</span>
            </button>
          </div>
        </section>

        {/* SOS Button */}
        <section className="pb-12">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onStartSOS}
            className="w-full bg-[#1E0A1A] text-white py-6 rounded-[20px] font-manrope font-black text-lg tracking-wider shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Bell className="text-primary-fixed" size={24} />
            RUN TEST SIGNAL
          </motion.button>
          <p className="text-center text-[10px] text-outline font-medium mt-4 px-8 leading-relaxed uppercase tracking-tighter">
            Perform a silent drill to ensure all selected contacts receive dummy alerts.
          </p>
        </section>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-slate-100/70 backdrop-blur-2xl border-t border-white/20 shadow-[0_-8px_30px_rgba(30,10,26,0.15)] rounded-t-[20px]">
        {[
          { label: 'Calculate', icon: <Grid2X2 size={24} /> },
          { label: 'History', icon: <History size={24} /> },
          { label: 'SafeZones', icon: <Shield size={24} /> },
          { label: 'Settings', icon: <Settings size={24} />, active: true },
        ].map((nav, idx) => (
          <div key={idx} className={cn(
            "flex flex-col items-center justify-center transition-colors",
            nav.active ? "text-[#1E0A1A] bg-white/40 rounded-[16px] px-4 py-1" : "text-slate-400 hover:text-[#1E0A1A]"
          )}>
            {nav.icon}
            <span className="font-manrope text-[10px] font-semibold uppercase tracking-wider">{nav.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
