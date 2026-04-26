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
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom SOS Marker Icon
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-sos-marker bg-transparent border-none',
    html: `
      <div class="relative w-8 h-8">
        <div class="absolute inset-0 bg-error rounded-full animate-ping opacity-75"></div>
        <div class="relative flex items-center justify-center w-8 h-8 bg-error rounded-full border-2 border-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export default function AdminHQ() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/api/admin/alerts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAlerts(data);
      }
    } catch (error) {
      console.error('Failed to fetch alerts', error);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  return (
    <div className="flex h-screen w-full bg-surface">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col p-6 space-y-2 z-50">
        <div className="font-manrope font-black text-2xl text-[#1E0A1A] mb-8">SafeTrace</div>
        <nav className="flex-1 space-y-2">
          {[
            { label: 'Dashboard', icon: <Layout size={20} /> },
            { label: 'Live Map', icon: <MapIcon size={20} /> },
            { label: 'Incident Logs', icon: <ListAlt size={20} /> },
            { label: 'Responder Stats', icon: <BarChart size={20} /> },
            { label: 'Admin Settings', icon: <AdminPanelSettings size={20} /> },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-[12px] transition-transform hover:translate-x-1 cursor-pointer",
                activeTab === item.label ? "bg-slate-200 text-[#1E0A1A] font-bold" : "text-slate-500 hover:bg-slate-100"
              )}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
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
            <div className="absolute inset-0 z-0">
              <MapContainer 
                center={alerts.length > 0 ? [alerts[0].location.latitude, alerts[0].location.longitude] : [40.7128, -74.0060]} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {alerts.map(alert => (
                  <Marker 
                    key={alert._id} 
                    position={[alert.location.latitude, alert.location.longitude]}
                    icon={createCustomIcon()}
                  >
                    <Popup className="font-manrope">
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-sm text-error uppercase m-0 leading-none">SOS ALERT</p>
                        <p className="font-semibold text-[#1E0A1A] m-0">{alert.user?.name || 'Unknown User'}</p>
                        <p className="text-[10px] text-slate-500 m-0">Battery: {alert.batteryLevel}%</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
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
                  <h3 className="text-4xl font-black text-error leading-none">{alerts.length < 10 ? `0${alerts.length}` : alerts.length}</h3>
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
              {alerts.length === 0 && (
                <div className="px-6 py-8 text-center text-slate-500 font-medium">
                  No active alerts at the moment.
                </div>
              )}
              {alerts.map((alert) => (
                <div key={alert._id} className="px-6 py-4 flex items-center hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center mr-4">
                    <Shield size={20} className="text-error" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#1E0A1A]">SOS Alert - {alert.user?.name || 'Unknown User'}</p>
                    <p className="text-xs text-slate-500">
                      Triggered {formatTimeAgo(alert.createdAt)} • Lat: {alert.location.latitude.toFixed(4)}, Lng: {alert.location.longitude.toFixed(4)}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider bg-error-container text-error">
                      High Risk
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
