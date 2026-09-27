'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronDown,
  CircleHelp,
  Clock3,
  Coins,
  Command,
  Database,
  Download,
  ExternalLink,
  Eye,
  Filter,
  Gauge,
  Grid2X2,
  Layers3,
  LineChart,
  Menu,
  MoreHorizontal,
  Play,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const chartData = [
  { label: '00:00', value: 48600 },
  { label: '04:00', value: 49380 },
  { label: '08:00', value: 48920 },
  { label: '12:00', value: 50100 },
  { label: '16:00', value: 51240 },
  { label: '20:00', value: 50780 },
  { label: 'Now', value: 52480 },
];

const opportunities = [
  { token: 'ARB', pair: 'ARB / USDT', buy: 'MEXC', buyPrice: '0.8124', sell: 'Binance', sellPrice: '0.8918', raw: '+9.77%', net: '+7.62%', volume: '8,940 ARB', capital: '$7,265', fees: '$23.84', profit: '+$553.74', network: 'Arbitrum', transfer: 'Available', risk: 'Low', status: 'Opportunity' },
  { token: 'XYZ', pair: 'XYZ / USDT', buy: 'Gate.io', buyPrice: '0.1002', sell: 'CoinEx', sellPrice: '0.1148', raw: '+14.57%', net: '+12.82%', volume: '4,820 XYZ', capital: '$483', fees: '$8.40', profit: '+$61.90', network: 'BSC', transfer: 'Available', risk: 'Medium', status: 'Opportunity' },
  { token: 'AAVE', pair: 'AAVE / USDT', buy: 'KuCoin', buyPrice: '92.14', sell: 'Binance', sellPrice: '96.42', raw: '+4.64%', net: '+3.18%', volume: '42.8 AAVE', capital: '$3,943', fees: '$18.60', profit: '+$125.39', network: 'Ethereum', transfer: 'Slow · 8m', risk: 'Medium', status: 'Review' },
  { token: 'JTO', pair: 'JTO / USDT', buy: 'CoinEx', buyPrice: '2.184', sell: 'MEXC', sellPrice: '2.296', raw: '+5.13%', net: '+3.81%', volume: '1,240 JTO', capital: '$2,708', fees: '$12.20', profit: '+$103.17', network: 'Solana', transfer: 'Available', risk: 'Low', status: 'Opportunity' },
  { token: 'TIA', pair: 'TIA / USDT', buy: 'Gate.io', buyPrice: '5.842', sell: 'KuCoin', sellPrice: '6.041', raw: '+3.41%', net: '+1.98%', volume: '412 TIA', capital: '$2,407', fees: '$17.41', profit: '+$47.65', network: 'Celestia', transfer: 'Suspended', risk: 'High', status: 'Blocked' },
  { token: 'OP', pair: 'OP / USDT', buy: 'Binance', buyPrice: '1.684', sell: 'Gate.io', sellPrice: '1.731', raw: '+2.79%', net: '+1.42%', volume: '860 OP', capital: '$1,448', fees: '$10.19', profit: '+$20.56', network: 'Optimism', transfer: 'Available', risk: 'Low', status: 'Opportunity' },
];

const exchanges = [
  { name: 'Binance', initials: 'B', color: 'bg-yellow-400 text-black', balance: '$12,450.28', assets: 42, sync: '12 sec ago' },
  { name: 'MEXC', initials: 'M', color: 'bg-cyan-400 text-slate-950', balance: '$8,420.64', assets: 31, sync: '18 sec ago' },
  { name: 'Gate.io', initials: 'G', color: 'bg-emerald-400 text-slate-950', balance: '$6,780.12', assets: 27, sync: '24 sec ago' },
  { name: 'CoinEx', initials: 'C', color: 'bg-red-400 text-white', balance: '$4,210.48', assets: 18, sync: '31 sec ago' },
];

const navGroups = [
  { label: 'Overview', items: [{ label: 'Dashboard', icon: Gauge }, { label: 'Live Opportunities', icon: Zap, count: '17' }, { label: 'Markets', icon: LineChart }] },
  { label: 'Portfolio', items: [{ label: 'Exchanges', icon: Layers3 }, { label: 'Balances', icon: WalletCards }, { label: 'Transactions', icon: ArrowUpRight }] },
  { label: 'Insights', items: [{ label: 'Performance', icon: TrendingUp }, { label: 'Paper Trading', icon: Play, badge: 'Demo' }, { label: 'Alerts', icon: Bell, count: '4' }] },
  { label: 'Control', items: [{ label: 'Risk Management', icon: ShieldCheck }, { label: 'Settings', icon: Settings2 }] },
];

type Opportunity = (typeof opportunities)[number];

function StatCard({ label, value, detail, icon: Icon, tone = 'default' }: { label: string; value: string; detail?: string; icon: typeof Activity; tone?: 'default' | 'green' | 'yellow' }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <span className="eyebrow">{label}</span>
        <span className={`icon-box ${tone === 'green' ? 'icon-green' : tone === 'yellow' ? 'icon-yellow' : ''}`}><Icon size={16} /></span>
      </div>
      <div className="mt-5 flex items-baseline gap-2"><strong className="stat-value">{value}</strong>{detail && <span className="stat-detail">{detail}</span>}</div>
    </div>
  );
}

function MiniSparkline({ positive = true }: { positive?: boolean }) {
  return <div className={`mini-spark ${positive ? 'spark-positive' : 'spark-negative'}`}><svg viewBox="0 0 110 34" preserveAspectRatio="none"><path d={positive ? 'M0 27 C14 24 13 28 24 18 S38 25 49 12 S67 20 77 8 S93 14 110 3' : 'M0 8 C14 15 19 5 31 13 S48 9 62 19 S80 12 92 23 S101 17 110 28'} fill="none" stroke="currentColor" strokeWidth="2.4" /></svg></div>;
}

function Sidebar({ active, onSelect, mobileOpen, onClose }: { active: string; onSelect: (label: string) => void; mobileOpen: boolean; onClose: () => void }) {
  return <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
    <div className="sidebar-brand"><div className="brand-mark"><Command size={17} strokeWidth={3} /></div><span>Arbi<span>Flow</span></span><button className="mobile-close" onClick={onClose}><X size={18} /></button></div>
    <div className="mode-panel"><div className="flex items-center justify-between"><span className="eyebrow">Operating mode</span><span className="live-dot" /></div><div className="mode-value"><span className="mode-pill">MONITOR</span><ChevronDown size={14} /></div><p>Read-only analysis active</p></div>
    <nav className="sidebar-nav">{navGroups.map((group) => <div key={group.label} className="nav-group"><span className="nav-label">{group.label}</span>{group.items.map(({ label, icon: Icon, count, badge }) => <button key={label} className={`nav-item ${active === label ? 'nav-active' : ''}`} onClick={() => { onSelect(label); onClose(); }}><Icon size={17} /><span>{label}</span>{count && <b className="nav-count">{count}</b>}{badge && <em>{badge}</em>}</button>)}</div>)}</nav>
    <div className="sidebar-footer"><div className="system-status"><span className="status-check"><ShieldCheck size={14} /></span><div><strong>All systems operational</strong><small>Last checked 12 sec ago</small></div></div><div className="version">ArbiFlow <span>v0.1 Demo</span></div></div>
  </aside>;
}

function OpportunityTable({ onInspect }: { onInspect: (opportunity: Opportunity) => void }) {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => opportunities.filter((item) => `${item.token} ${item.pair} ${item.buy} ${item.sell}`.toLowerCase().includes(search.toLowerCase())), [search]);
  return <div className="panel overflow-hidden"><div className="panel-head"><div><div className="section-kicker"><span className="pulse" /> Market scanner</div><h2>Live Opportunities</h2><p>Depth-aware opportunities across 8 connected exchanges</p></div><div className="panel-actions"><div className="search-box"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search token or exchange" /></div><button className="filter-button"><Filter size={15} /> Filters <span>3</span></button><button className="icon-button"><Download size={16} /></button></div></div><div className="filter-row"><button className="filter-chip chip-active">All opportunities <span>17</span></button><button className="filter-chip">Net spread <span>≥ 2%</span></button><button className="filter-chip">Risk <span>Low / Medium</span></button><button className="filter-chip">Transfer <span>Available</span></button><span className="table-refresh"><RefreshCw size={13} /> Updated 4 sec ago</span></div><div className="table-scroll"><table><thead><tr><th>Token / Pair</th><th>Buy route</th><th>Sell route</th><th>Net spread</th><th>Depth</th><th>Est. profit</th><th>Risk</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((item) => <tr key={item.token}><td><div className="token-cell"><span className="token-icon">{item.token.slice(0, 1)}</span><div><strong>{item.token}</strong><small>{item.pair}</small></div></div></td><td><strong>{item.buyPrice}</strong><small className="route-label"><span className="exchange-dot" /> {item.buy}</small></td><td><strong>{item.sellPrice}</strong><small className="route-label"><span className="exchange-dot sell-dot" /> {item.sell}</small></td><td><strong className="text-green">{item.net}</strong><small className="subtle">raw {item.raw}</small></td><td><strong>{item.volume}</strong><small className="subtle">{item.capital} capital</small></td><td><strong className="text-green">{item.profit}</strong><small className="subtle">fees {item.fees}</small></td><td><span className={`risk risk-${item.risk.toLowerCase()}`}>{item.risk}</span></td><td><span className={`status status-${item.status.toLowerCase()}`}>{item.status}</span></td><td><button className="row-more" onClick={() => onInspect(item)}><Eye size={15} /></button></td></tr>)}</tbody></table></div></div>;
}

function DetailDrawer({ opportunity, onClose }: { opportunity: Opportunity | null; onClose: () => void }) {
  if (!opportunity) return null;
  const asks = [['0.1148', '1,820'], ['0.1146', '1,200'], ['0.1143', '980'], ['0.1140', '620']];
  const bids = [['0.1002', '1,940'], ['0.1000', '1,580'], ['0.0998', '920'], ['0.0995', '480']];
  return <div className="drawer-backdrop" onClick={onClose}><section className="detail-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">Opportunity analysis</span><h2>{opportunity.token} <span>{opportunity.pair}</span></h2></div><button className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="route-banner"><div><small>BUY ON</small><strong>{opportunity.buy}</strong><b>{opportunity.buyPrice}</b></div><ArrowDownRight size={18} /><div><small>SELL ON</small><strong>{opportunity.sell}</strong><b className="text-green">{opportunity.sellPrice}</b></div></div><div className="analysis-grid"><div className="analysis-card"><span>Average buy</span><strong>{opportunity.buyPrice}</strong></div><div className="analysis-card"><span>Average sell</span><strong>{opportunity.sellPrice}</strong></div><div className="analysis-card"><span>Max executable</span><strong>{opportunity.volume.split(' ')[0]}</strong></div><div className="analysis-card"><span>Expected slippage</span><strong>0.38%</strong></div></div><div className="books"><div><div className="book-title"><strong>Buy exchange</strong><span>{opportunity.buy}</span></div><div className="book-table"><span>Price (USDT)</span><span>Amount</span>{asks.map(([price, amount]) => <div key={price} className="ask"><b>{price}</b><span>{amount}</span></div>)}</div></div><div><div className="book-title"><strong>Sell exchange</strong><span>{opportunity.sell}</span></div><div className="book-table"><span>Price (USDT)</span><span>Amount</span>{bids.map(([price, amount]) => <div key={price} className="bid"><b>{price}</b><span>{amount}</span></div>)}</div></div></div><div className="profit-box"><div><span>Estimated net profit</span><strong>{opportunity.profit}</strong></div><div className="profit-meta"><span>Trading fees <b>{opportunity.fees}</b></span><span>Network fee <b>$1.20</b></span><span>Transfer <b>{opportunity.transfer}</b></span></div></div><button className="primary-button w-full"><Play size={16} /> Simulate in Paper Trading</button><p className="drawer-note"><ShieldCheck size={14} /> Monitor mode is active. No live orders can be submitted.</p></section></div>;
}

function Dashboard({ onInspect }: { onInspect: (opportunity: Opportunity) => void }) {
  return <><div className="page-heading"><div><div className="breadcrumb">Overview <span>/</span> Dashboard</div><h1>Good morning, Alex.</h1><p>Here is what is happening across your arbitrage desk today.</p></div><div className="heading-actions"><button className="secondary-button"><Clock3 size={15} /> Last 24 hours <ChevronDown size={14} /></button><button className="primary-button"><Download size={15} /> Export report</button></div></div><div className="stat-grid"><StatCard label="Total portfolio" value="$52,480.40" detail="+4.8%" icon={WalletCards} tone="green" /><StatCard label="Today's P&L" value="+$428.72" detail="+0.82%" icon={TrendingUp} tone="green" /><StatCard label="Total arb. profit" value="+$12,845.30" icon={Target} tone="yellow" /><StatCard label="Available capital" value="$31,250.00" detail="59.6%" icon={Coins} /></div><div className="main-grid"><div className="panel chart-panel"><div className="panel-head compact"><div><span className="eyebrow">Portfolio analytics</span><h2>Portfolio value</h2></div><div className="chart-total"><strong>$52,480.40</strong><span><ArrowUpRight size={13} /> 8.42% <small>this month</small></span></div></div><div className="chart-tabs"><button className="selected">24H</button><button>7D</button><button>30D</button><button>3M</button><button>ALL</button></div><div className="big-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 12, right: 5, left: -18, bottom: 0 }}><defs><linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#eab308" stopOpacity={0.28} /><stop offset="100%" stopColor="#eab308" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#273142" strokeDasharray="3 5" vertical={false} /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#738098', fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#738098', fontSize: 11 }} tickFormatter={(value) => `$${Math.round(value / 1000)}k`} domain={['dataMin - 1000', 'dataMax + 1000']} /><Tooltip contentStyle={{ background: '#141b27', border: '1px solid #2b3749', borderRadius: 8, color: '#f8fafc' }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio']} /><Area type="monotone" dataKey="value" stroke="#f5c518" strokeWidth={2.5} fill="url(#portfolioFill)" /></AreaChart></ResponsiveContainer></div></div><div className="panel performance-panel"><div className="panel-head compact"><div><span className="eyebrow">Performance</span><h2>Trading metrics</h2></div><button className="row-more"><MoreHorizontal size={16} /></button></div><div className="metric-list"><div><span>Net profit</span><strong className="text-green">+$12,845.30</strong><MiniSparkline /></div><div><span>Successful trades</span><strong>84.6%</strong><MiniSparkline /></div><div><span>Average profit / trade</span><strong>$76.46</strong><MiniSparkline /></div><div><span>Best trade</span><strong className="text-green">+$642.18</strong><MiniSparkline /></div><div><span>Worst trade</span><strong className="text-red">-$184.20</strong><MiniSparkline positive={false} /></div></div></div></div><div className="section-head"><div><div className="section-kicker"><span className="pulse" /> Live feed</div><h2>Top opportunities</h2></div><button className="text-button">View all opportunities <ArrowUpRight size={15} /></button></div><OpportunityTable onInspect={onInspect} /></>;
}

function GenericView({ active, onInspect }: { active: string; onInspect: (opportunity: Opportunity) => void }) {
  const copy: Record<string, { title: string; desc: string; icon: typeof Activity }> = { 'Live Opportunities': { title: 'Live Opportunities', desc: 'Monitor depth-aware spreads across connected markets.', icon: Zap }, Markets: { title: 'Market overview', desc: 'Track liquidity, volume and price movement by market.', icon: LineChart }, Exchanges: { title: 'Connected exchanges', desc: 'Demo connections are shown for layout purposes only.', icon: Layers3 }, Balances: { title: 'Balances', desc: 'Review capital allocation across your exchange accounts.', icon: WalletCards }, Transactions: { title: 'Transactions', desc: 'A complete history of simulated and completed arbitrage trades.', icon: ArrowUpRight }, Performance: { title: 'Performance analytics', desc: 'Measure net profitability after fees, slippage and transfer costs.', icon: TrendingUp }, 'Paper Trading': { title: 'Paper Trading', desc: 'Simulate opportunities with virtual capital before going live.', icon: Play }, Alerts: { title: 'Notification center', desc: 'Stay ahead of transfer issues, execution risk and exchange health.', icon: Bell }, 'Risk Management': { title: 'Risk management', desc: 'Tune guardrails that protect capital and stop automated execution.', icon: ShieldCheck }, Settings: { title: 'Workspace settings', desc: 'Manage your workspace preferences and integrations.', icon: Settings2 } };
  const item = copy[active] ?? copy.Dashboard;
  return <><div className="page-heading"><div><div className="breadcrumb">ArbiFlow <span>/</span> {item.title}</div><h1>{item.title}</h1><p>{item.desc}</p></div><div className="heading-actions"><button className="secondary-button"><RefreshCw size={15} /> Refresh data</button><button className="primary-button"><item.icon size={15} /> {active === 'Paper Trading' ? 'New simulation' : 'Configure view'}</button></div></div><div className="empty-hero"><div className="empty-icon"><item.icon size={26} /></div><div><span className="section-kicker">Demo workspace</span><h2>This section is ready for your next workflow.</h2><p>Connect real market data later. For now, explore the live scanner and paper trading preview using realistic sample data.</p></div></div>{active === 'Live Opportunities' || active === 'Markets' ? <OpportunityTable onInspect={onInspect} /> : <div className="placeholder-grid"><div className="panel placeholder-card"><div className="placeholder-chart"><BarChart3 size={24} /></div><h3>Insights are loading</h3><p>Demo metrics will appear here as your workspace collects activity.</p></div><div className="panel placeholder-card"><div className="placeholder-chart yellow"><Database size={24} /></div><h3>Demo connection status</h3><p>Nothing is connected to a live exchange yet. This keeps the workspace safe by default.</p></div></div>}</>;
}

export default function Home() {
  const [active, setActive] = useState('Dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  return <div className="app-shell"><Sidebar active={active} onSelect={setActive} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} /><main className="main-content"><header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20} /></button><div className="topbar-search"><Search size={16} /><span>Search anything...</span><kbd>⌘ K</kbd></div><div className="topbar-actions"><div className="topbar-stat"><span>Portfolio</span><strong>$52,480.40</strong></div><div className="topbar-stat pnl"><span>Today P&L</span><strong>+$428.72 <ArrowUpRight size={12} /></strong></div><div className="topbar-divider" /><button className="system-pill"><span className="live-dot" /> Systems healthy</button><button className="notification-button"><Bell size={18} /><i /></button><div className="avatar">AS</div></div></header><div className="content-wrap">{active === 'Dashboard' ? <Dashboard onInspect={setSelected} /> : <GenericView active={active} onInspect={setSelected} />}</div></main><DetailDrawer opportunity={selected} onClose={() => setSelected(null)} /></div>;
}
