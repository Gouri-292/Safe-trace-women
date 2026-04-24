import {
  Shield,
  Map as MapIcon,
  ListTodo as ListAlt,
  BarChart,
  Settings,
  ShieldAlert as AdminPanelSettings,
  Search,
  Bell,
  Plus,
  TrendingDown,
  Activity,
  AlertTriangle,
  ChevronRight,
  ShieldPlus as MedicalServices,
  Layout,
  Navigation,
  Layers
} from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function AdminHQ() {
  const incidents = [
    { type: 'medical', title: 'Medical Emergency - Station Road', desc: 'Triggered 12m ago • Responder R-04 assigned', status: 'In Progress', color: 'bg-secondary-container text-on-secondary-container' },
    { type: 'panic', title: 'Panic Alert - Central Park', desc: 'Triggered 24m ago • Rapid deployment active', status: 'High Risk', color: 'bg-error-container text-error' },
    { type: 'false', title: 'False Alarm - 5th Ave Mall', desc: 'Resolved 1h ago • User error confirmed', status: 'Resolved', color: 'bg-surface-container text-on-surface-variant' }
  ];

  return (
    <div className="flex h-screen w-full bg-surface">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col p-6 space-y-2 z-50">
        <div className="font-manrope font-black text-2xl text-[#1E0A1A] mb-8">SafeTrace</div>
        <nav className="flex-1 space-y-2">
          {[
            { label: 'Dashboard', icon: <Layout size={20} />, active: true },
            { label: 'Live Map', icon: <MapIcon size={20} /> },
            { label: 'Incident Logs', icon: <ListAlt size={20} /> },
            { label: 'Responder Stats', icon: <BarChart size={20} /> },
            { label: 'Admin Settings', icon: <AdminPanelSettings size={20} /> },
          ].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-[12px] transition-transform hover:translate-x-1",
                item.active ? "bg-slate-200 text-[#1E0A1A] font-bold" : "text-slate-500 hover:bg-slate-100"
              )}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-200 flex items-center gap-3 p-2">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7aZcl4f_n_givWGt2l6dGQD7rB6lKCcFwHkt_mXQFPey0IdywyhoXRMleIzYNRcCgsiFu6YifdrOqyW6dxz-HUtIIbNT4P88S5JkYZhzetUVCKqlRG1dyRwgx3Jn1ZxAzorUcmq7qkjJezTReSba2Ere4T4kpefy3JDDdBtBf7SuNmsTAYGV9sR9p9LY4FWgWkIBRROeptvVPEugV6-mNDhmDryqexlTnKyi1DSLiLZIGA1KnfqFlp48xKMtZztEBRXkjq2gMm5xz"
            alt="Admin"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="font-bold text-sm text-[#1E0A1A]">SafeTrace HQ</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Lead Dispatcher</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto bg-surface-container-low p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Intelligence Command</h1>
            <p className="text-secondary">System Status: <span className="text-tertiary-fixed-dim font-bold">OPTIMAL</span></p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-[20px] shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Live Sync</span>
            </div>
            <button className="bg-primary text-on-primary px-6 py-2 rounded-[20px] font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2">
              <Plus size={16} /> New Deployment
            </button>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Map Card */}
          <div className="col-span-8 bg-white rounded-[20px] shadow-sm overflow-hidden relative border border-white/40 h-[460px]">
            <div className="absolute top-4 left-4 z-10 space-y-2">
              <div className="glass-card px-4 py-2 rounded-[16px] flex items-center gap-3">
                <Navigation size={16} className="text-secondary" />
                <span className="text-sm font-bold">Zone: Metropolitan Central</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-white"><Layers size={18} /></button>
              <button className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-white"><Search size={18} /></button>
            </div>
            <img
              className="w-full h-full object-cover grayscale opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-SOStZH9b_seoRub1pdicrGFYS8ZSoDnSdR7Qy0QFwWnOgUl8AEddSTmPQz5R0vTfuxQZXumfQI9oV44qCGvaD3fLHEIF1vW-xzq_vpi2r4M_96rL6VjvG9m6zqt6sd0hbgZHDw1XwXGafitfzTYgmQOKPoIEwrVbMwWbD8RB0r2EEN4HvOUKTA1lBi1QIWCOXGJV2o63y-r8Bf-c418lrCNavWjVCmTJYwebpn7JBUq4DaaEOF4YMUJyKXG1csRsS_k_RQRr25kX"
              alt="Live Map"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-card p-4 rounded-[20px] flex justify-between items-center">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Active Responders</p>
                    <p className="text-xl font-extrabold text-[#1E0A1A]">12 <span className="text-xs font-normal text-slate-400">/ 15</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Signal Health</p>
                    <p className="text-xl font-extrabold text-tertiary-fixed-dim">98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="col-span-4 flex flex-col gap-6">
            <div className="bg-primary-container p-6 rounded-[20px] text-white relative overflow-hidden h-[218px]">
              <Activity className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24" />
              <p className="text-[12px] font-bold uppercase tracking-widest text-on-primary-container mb-2">Avg. Response Time</p>
              <h3 className="text-[48px] font-black tracking-tight mb-4">4.2<span className="text-lg font-light ml-2">min</span></h3>
              <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/20">
                <TrendingDown className="text-tertiary-fixed font-bold" size={14} />
                <span className="text-xs font-bold text-tertiary-fixed">12% from yesterday</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[20px] shadow-sm border border-white/40 h-[218px] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Active Alerts</p>
                  <h3 className="text-4xl font-black text-error leading-none">03</h3>
                </div>
                <div className="w-12 h-12 bg-error-container rounded-xl flex items-center justify-center">
                  <Bell className="text-error" size={24} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-on-surface-variant">High Priority</span>
                  <span className="text-error">1</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-error h-full" style={{ width: '33%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom List */}
        <div className="grid grid-cols-12 gap-6 pb-12">
          <div className="col-span-8 bg-white rounded-[20px] shadow-sm border border-white/40 overflow-hidden">
            <div className="px-6 py-5 border-b border-surface-variant flex justify-between items-center">
              <h3 className="font-bold text-lg text-[#1E0A1A]">Recent Incidents</h3>
              <button className="text-primary text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-surface-variant">
              {incidents.map((incident, idx) => (
                <div key={idx} className="px-6 py-4 flex items-center hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                    {incident.type === 'medical' ? <MedicalServices size={20} className="text-secondary" /> : <Shield size={20} className="text-error" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#1E0A1A]">{incident.title}</p>
                    <p className="text-xs text-slate-500">{incident.desc}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className={cn("px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider", incident.color)}>
                      {incident.status}
                    </span>
                    <ChevronRight className="text-slate-400" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-4 bg-white rounded-[20px] shadow-sm border border-white/40 p-6">
            <h3 className="font-bold text-lg text-[#1E0A1A] mb-4">Regional Intensity</h3>
            <div className="space-y-6">
              {[
                { label: 'Downtown', value: 85, color: 'bg-primary' },
                { label: 'Residential South', value: 45, color: 'bg-secondary' },
                { label: 'Industrial North', value: 15, color: 'bg-tertiary-fixed-dim' },
              ].map((region, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span>{region.label}</span>
                    <span className="text-[#1E0A1A]">{region.value > 70 ? 'High' : region.value > 30 ? 'Moderate' : 'Low'}</span>
                  </div>
                  <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden flex border border-slate-100">
                    <div className={cn("h-full", region.color)} style={{ width: `${region.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
