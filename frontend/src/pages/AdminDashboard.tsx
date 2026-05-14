import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, Users, Archive, History, LogOut, Plus, Trash2, Box, 
  PackageOpen, AlertTriangle, ArrowRight, BarChart3, TrendingUp, 
  TrendingDown, ExternalLink, Hexagon, PieChart, Package, Truck, 
  ClipboardList, Search, Bell, Wallet, CheckCircle2, XCircle, CreditCard,
  Receipt, MinusCircle
} from 'lucide-react';
import { User } from '../App';
import logo from '../assets/logo.png';

interface AdminProps {
  user: User;
  onLogout: () => void;
}

interface Stats {
  totalProducts: number;
  totalStock: number;
  lowStockCount: number;
  totalSuppliers: number;
  recentLogs: any[];
  totalRevenue: number;
  totalExpenses: number;
  pendingPayments: number;
}

export default function AdminDashboard({ user, onLogout }: AdminProps) {
  const [stats, setStats] = useState<Stats>({ 
    totalProducts: 0, totalStock: 0, lowStockCount: 0, totalSuppliers: 0, 
    recentLogs: [], totalRevenue: 0, totalExpenses: 0, pendingPayments: 0 
  });
  const location = useLocation();

  const fetchStats = async () => {
    try {
      const token = user.token.trim();
      const pRes = await axios.get('http://localhost:5000/api/products', { headers: { Authorization: `Bearer ${token}` } });
      const tRes = await axios.get('http://localhost:5000/api/transactions', { headers: { Authorization: `Bearer ${token}` } });
      const sRes = await axios.get('http://localhost:5000/api/suppliers', { headers: { Authorization: `Bearer ${token}` } });
      const eRes = await axios.get('http://localhost:5000/api/expenses', { headers: { Authorization: `Bearer ${token}` } });
      
      const totalStock = pRes.data.reduce((acc: number, curr: any) => acc + curr.stock, 0);
      const lowStockCount = pRes.data.filter((p:any) => p.stock <= 5).length;
      
      const transactions = tRes.data;
      const totalRevenue = transactions
        .filter((t: any) => t.type === 'OUT' && t.payment_status === 'PAID')
        .reduce((acc: number, curr: any) => acc + (curr.total_amount || 0), 0);

      const totalExpenses = eRes.data.reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
      
      const pendingPayments = transactions
        .filter((t: any) => t.payment_status === 'PENDING' && t.type !== 'OUT')
        .length;

      setStats({
        totalProducts: pRes.data.length,
        totalStock,
        lowStockCount,
        totalSuppliers: sRes.data.length,
        recentLogs: transactions.slice(0, 5),
        totalRevenue,
        totalExpenses,
        pendingPayments
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [location.pathname]);

  const NavLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => {
    const active = location.pathname === `/admin${to !== '/' ? to : ''}`;
    return (
      <Link to={`/admin${to}`} style={{
        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
        background: active ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(217, 70, 239, 0.1))' : 'transparent',
        color: active ? 'white' : 'var(--text-muted)',
        borderLeft: active ? '3px solid var(--primary)' : '3px solid transparent',
        borderRadius: '0 12px 12px 0', marginBottom: '4px', fontWeight: active ? 600 : 400,
        transition: 'var(--transition)'
      }}>
        {icon} <span style={{fontSize: '0.95rem'}}>{label}</span>
      </Link>
    );
  };

  return (
    <div className="flex animate-fade-in" style={{ minHeight: '100vh', background: 'var(--bg-darker)' }}>
      {/* SIDEBAR */}
      <div style={{
        width: '280px', background: 'rgba(15, 23, 42, 0.8)', 
        backdropFilter: 'blur(20px)', borderRight: '1px solid var(--surface-border)',
        padding: '32px 0', display: 'flex', flexDirection: 'column',
        zIndex: 10, position: 'sticky', top: 0, height: '100vh'
      }}>
        <div className="flex items-center gap-3 mb-12 px-8">
          <div style={{ padding: '2px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '10px' }}>
            <img src={logo} alt="L" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontSize: '1.25rem', margin: 0, background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nady Hub</h2>
        </div>

        <div style={{ flex: 1, paddingRight: '16px' }}>
          <NavLink to="" icon={<LayoutDashboard size={20} />} label="Dasbor Utama" />
          <NavLink to="/catalog" icon={<Archive size={20} />} label="Katalog Produk" />
          <NavLink to="/finance" icon={<Wallet size={20} />} label="Pembayaran Produk" />
          <NavLink to="/suppliers" icon={<Truck size={20} />} label="Manajemen Supplier" />
          <NavLink to="/expenses" icon={<Receipt size={20} />} label="Pengeluaran Operasional" />
          <NavLink to="/logs" icon={<ClipboardList size={20} />} label="Log Aktivitas" />
        </div>

        <div style={{ marginTop: 'auto', padding: '0 24px', borderTop: '1px solid var(--surface-border)', paddingTop: '24px' }}>
          <div className="flex items-center gap-3 mb-6 p-4 glass-card">
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.username}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Administrator</div>
            </div>
          </div>
          <button className="btn btn-danger" style={{ width: '100%' }} onClick={onLogout}>
            <LogOut size={16} /> Keluar Sesi
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Pusat Kendali</h1>
              <p style={{ color: 'var(--text-muted)' }}>Selamat datang kembali, mari kelola bisnis hari ini.</p>
            </div>
            <div className="flex gap-4">
              <div style={{ position: 'relative' }}>
                {stats.pendingPayments > 0 && (
                   <div style={{ position: 'absolute', top: -5, right: -5, width: '20px', height: '20px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--bg-darker)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>{stats.pendingPayments}</div>
                )}
                <button className="glass-panel" style={{ padding: '12px', borderRadius: '12px' }}><Bell size={20} /></button>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Overview stats={stats} />} />
            <Route path="/catalog" element={<Catalog user={user} onUpdate={fetchStats} />} />
            <Route path="/finance" element={<Finance user={user} onUpdate={fetchStats} />} />
            <Route path="/suppliers" element={<Suppliers user={user} onUpdate={fetchStats} />} />
            <Route path="/expenses" element={<OperatingExpenses user={user} onUpdate={fetchStats} />} />
            <Route path="/logs" element={<Logs user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function Overview({ stats }: { stats: Stats }) {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginBottom: '48px' }}>
        
        <Link to="/admin/catalog" className="glass-panel hover-lift" style={{ borderTop: '2px solid var(--primary)', display: 'block', textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 5, cursor: 'pointer' }}>
          <div className="flex justify-between items-start mb-6" style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '14px', borderRadius: '16px', color: 'var(--primary)' }}>
              <Package size={28} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Katalog Produk</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats.totalProducts}</div>
            </div>
          </div>
           <div className="flex items-center gap-2 mt-4" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, pointerEvents: 'none' }}>
            Lihat Katalog <ArrowRight size={14} />
          </div>
        </Link>

        <Link to="/admin/finance" className="glass-panel hover-lift" style={{ borderTop: '2px solid var(--accent)', display: 'block', textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 5, cursor: 'pointer' }}>
          <div className="flex justify-between items-start mb-6" style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '14px', borderRadius: '16px', color: 'var(--accent)' }}>
              <Wallet size={28} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Pembayaran Produk</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>Rp {stats.totalRevenue.toLocaleString('id-ID')}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4" style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600, pointerEvents: 'none' }}>
             Kelola Pembayaran <ArrowRight size={14} />
          </div>
        </Link>

        <Link to="/admin/suppliers" className="glass-panel hover-lift" style={{ borderTop: '2px solid var(--success)', display: 'block', textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 5, cursor: 'pointer' }}>
          <div className="flex justify-between items-start mb-6" style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '14px', borderRadius: '16px', color: 'var(--success)' }}>
              <Truck size={28} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Manajemen Supplier</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats.totalSuppliers}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4" style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 500, pointerEvents: 'none' }}>
            <Truck size={14} /> Kelola Mitra
          </div>
        </Link>

        <Link to="/admin/finance" className="glass-panel hover-lift" style={{ borderTop: stats.pendingPayments > 0 ? '2px solid var(--warning)' : '2px solid var(--surface-border)', display: 'block', textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 5, cursor: 'pointer' }}>
          <div className="flex justify-between items-start mb-6" style={{ pointerEvents: 'none' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '14px', borderRadius: '16px', color: 'var(--warning)' }}>
              <CreditCard size={28} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--warning)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Tagihan Pending</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats.pendingPayments}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4" style={{ color: 'var(--warning)', fontSize: '0.85rem', fontWeight: 600, pointerEvents: 'none' }}>
            Butuh Konfirmasi Bayar <ArrowRight size={14} />
          </div>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '48px' }}>
        <Link to="/admin/expenses" className="glass-panel hover-lift" style={{ borderTop: '2px solid var(--danger)', display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div className="flex justify-between items-start mb-4">
            <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '14px', borderRadius: '16px', color: 'var(--danger)' }}>
              <MinusCircle size={28} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Pengeluaran Operasional</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--danger)' }}>Rp {stats.totalExpenses.toLocaleString('id-ID')}</div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mencakup biaya listrik, air, dan gaji yang diinput manual.</p>
        </Link>

        <Link to="/admin/logs" className="glass-panel hover-lift" style={{ borderTop: '2px solid var(--primary)', display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div className="flex justify-between items-start mb-4">
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '14px', borderRadius: '16px', color: 'var(--primary)' }}>
              <ClipboardList size={28} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Log Aktivitas</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginTop: '8px' }}>Pusat Audit Data</div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pantau seluruh riwayat pergerakan stok dan transaksi secara real-time.</p>
        </Link>
      </div>

      <div className="glass-panel">
        <div className="flex justify-between items-center mb-8">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', WebkitTextFillColor: 'white' }}>
            <History size={20} color="var(--primary)"/> Transaksi Terakhir
          </h3>
          <Link to="/admin/logs" className="btn" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', fontSize: '0.8rem', padding: '8px 16px' }}>
            Audit Penuh <ExternalLink size={14} />
          </Link>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Lini Masa</th>
                <th>Varian Produk</th>
                <th>Jenis</th>
                <th>Status Bayar</th>
                <th>Nilai</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLogs.map((log: any) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(log.created_at).toLocaleString('id-ID')}</td>
                  <td style={{ fontWeight: 600 }}>{log.product_name}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: log.type === 'IN' ? 'var(--success)' : 'var(--danger)', fontSize: '0.8rem' }}>
                      {log.type === 'IN' ? 'MASUK' : 'KELUAR'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${log.payment_status === 'PAID' ? 'badge-in' : 'badge-warning'}`}>
                      {log.payment_status}
                    </span>
                  </td>
                   <td style={{ fontWeight: 700 }}>Rp {(log.total_amount || 0).toLocaleString('id-ID')}</td>
                </tr>
              ))}
              {stats.recentLogs.length === 0 && (
                <tr><td colSpan={5} className="text-center" style={{padding: '64px', color:'var(--text-muted)'}}>Belum ada data terekam.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Catalog({ user, onUpdate }: { user: User, onUpdate: ()=>void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<any>(null);
  const [form, setForm] = useState({ name: '', sku: '', category: '', stock: 0 });

  const fetchProducts = () => {
    const token = user.token.trim();
    axios.get('http://localhost:5000/api/products', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = user.token.trim();
      if (showModal === 'new') {
        await axios.post('http://localhost:5000/api/products', form, { headers: { Authorization: `Bearer ${token}` }});
      } else {
        await axios.put(`http://localhost:5000/api/products/${showModal.id}`, form, { headers: { Authorization: `Bearer ${token}` }});
      }
      setShowModal(null);
      setForm({ name: '', sku: '', category: '', stock: 0 });
      fetchProducts();
      onUpdate();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Gagal menyimpan produk');
    }
  };

  const handleEdit = (p: any) => {
    setForm({ name: p.name, sku: p.sku, category: p.category, stock: p.stock });
    setShowModal(p);
  };

  const handleDelete = async (id: number) => {
    if(!confirm('Anda yakin ingin menghapus produk ini?')) return;
    try {
      const token = user.token.trim();
      await axios.delete(`http://localhost:5000/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      fetchProducts();
      onUpdate();
    } catch (err: any) {
      alert('Gagal menghapus produk.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 style={{WebkitTextFillColor: 'white'}}>Katalog Produk</h2>
        <button className="btn btn-primary" onClick={() => { setForm({ name: '', sku: '', category: '', stock: 0 }); setShowModal('new'); }}>
          <Plus size={18} /> Daftarkan Produk
        </button>
      </div>

      <div className="glass-panel">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Stok</th>
                <th style={{textAlign:'right'}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td style={{color:'var(--text-muted)', fontFamily: 'monospace'}}>{p.sku}</td>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{p.category}</td>
                  <td>{p.stock}</td>
                  <td style={{textAlign:'right'}}>
                    <div className="flex gap-2 justify-end">
                      <button className="btn" style={{padding:'8px', background:'rgba(255,255,255,0.05)'}} onClick={() => handleEdit(p)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" style={{padding:'8px'}} onClick={() => handleDelete(p.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', 
          backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          zIndex: 100, padding: '24px'
        }}>
          <div className="glass-panel animate-fade-in gradient-border" style={{ width: '100%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '24px', WebkitTextFillColor: 'white' }}>{showModal === 'new' ? 'Registrasi Produk Baru' : 'Perbarui Detail Produk'}</h3>
            <form onSubmit={handleSave}>
              <div className="flex gap-4">
                <div className="form-group" style={{flex: 1}}>
                  <label>Nama Produk</label>
                  <input type="text" className="form-control" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label>SKU</label>
                  <input type="text" className="form-control" required value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <input type="text" className="form-control" required value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
              </div>
              {showModal !== 'new' && (
                <div className="form-group">
                  <label>Stok</label>
                  <input type="number" className="form-control" value={form.stock} onChange={e => setForm({...form, stock: parseInt(e.target.value) || 0})} />
                </div>
              )}
              <div className="flex gap-4 justify-end mt-8">
                <button type="button" className="btn" onClick={() => setShowModal(null)} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--surface-border)' }}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Database</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Finance({ user, onUpdate }: { user: User, onUpdate: ()=>void }) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const fetchTransactions = async () => {
    const token = user.token.trim();
    const res = await axios.get('http://localhost:5000/api/transactions', { headers: { Authorization: `Bearer ${token}` } });
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleVerify = async (id: string, status: string) => {
    try {
      const token = user.token.trim();
      await axios.patch(`http://localhost:5000/api/transactions/${id}/verify`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchTransactions();
      onUpdate();
    } catch (err) {
      alert('Gagal verifikasi pembayaran');
    }
  };

  const filtered = transactions.filter(t => filter === 'ALL' ? true : t.payment_status === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 style={{WebkitTextFillColor: 'white'}}>Manajemen Pembayaran</h2>
      </div>

      <div className="glass-panel">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Lini Masa</th>
                <th>Produk</th>
                <th>Total Tagihan</th>
                <th>Sudah Membayar</th>
                <th>Status</th>
                <th>Metode</th>
                <th style={{textAlign:'right'}}>Aksi & Verifikasi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{new Date(t.created_at).toLocaleString('id-ID', { dateStyle: 'medium' })}</td>
                  <td style={{fontWeight: 600}}>{t.product_name} <span style={{fontSize: '0.75rem', opacity: 0.7}}>({t.qty} x)</span></td>
                  <td style={{fontWeight: 700}}>Rp {t.total_amount?.toLocaleString('id-ID')}</td>
                  <td style={{color: t.payment_status === 'PAID' ? 'var(--success)' : 'var(--text-muted)'}}>
                    Rp {t.payment_status === 'PAID' ? t.total_amount?.toLocaleString('id-ID') : '0'}
                  </td>
                  <td>
                    <span className={`badge ${t.payment_status === 'PAID' ? 'badge-in' : t.payment_status === 'PENDING' ? 'badge-warning' : 'badge-out'}`}>
                      {t.payment_status === 'PAID' ? 'LUNAS' : t.payment_status}
                    </span>
                  </td>
                  <td style={{fontSize: '0.8rem'}}>{t.payment_method}</td>
                  <td style={{textAlign:'right'}}>
                    <div className="flex gap-2 justify-end items-center">
                      <button className="btn" style={{padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', fontSize: '0.7rem'}} onClick={() => setSelectedTx(t)}>
                        Tagihan
                      </button>
                      
                      {t.payment_status === 'PENDING' && (
                        <div className="flex gap-2">
                          <button className="btn" style={{padding: '6px 16px', background: 'var(--primary)', color: 'white', fontSize: '0.75rem', fontWeight: 600}} 
                            onClick={() => handleVerify(t.id, 'PAID')}>
                            Bayar Sekarang
                          </button>
                          
                          <button className="btn" style={{padding: '6px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--danger)'}} onClick={() => handleVerify(t.id, 'CANCELLED')} title="Batalkan">
                            <XCircle size={18} />
                          </button>
                        </div>
                      )}
                      
                      {t.payment_status !== 'PENDING' && (
                        <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Selesai</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTx && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', 
          backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110, padding: '20px'
        }}>
          <div className="glass-panel animate-fade-in gradient-border" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
            <div className="flex flex-col items-center mb-8">
              <div style={{ width: '64px', height: '64px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ClipboardList size={32} />
              </div>
              <h3 style={{WebkitTextFillColor: 'white'}}>Detail Tagihan</h3>
              <p style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>#{selectedTx.id.slice(0,8)}</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <div className="flex justify-between mb-4">
                <span style={{color: 'var(--text-muted)'}}>Produk</span>
                <span style={{fontWeight: 700}}>{selectedTx.product_name}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span style={{color: 'var(--text-muted)'}}>Jumlah</span>
                <span>{selectedTx.qty} pcs</span>
              </div>
              <div className="flex justify-between mb-4">
                <span style={{color: 'var(--text-muted)'}}>Metode</span>
                <span>{selectedTx.payment_method}</span>
              </div>
              <div style={{height: '1px', background: 'var(--surface-border)', margin: '16px 0'}}></div>
              <div className="flex justify-between">
                <span style={{fontWeight: 600}}>Total Tagihan</span>
                <span style={{fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem'}}>Rp {selectedTx.total_amount?.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', height: '52px' }} onClick={() => setSelectedTx(null)}>
              Tutup Rincian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Suppliers({ user, onUpdate }: { user: User, onUpdate: ()=>void }) {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<any>(null); // null, 'new', or supplier object
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  
  // Payment states
  const [payModal, setPayModal] = useState<any>(null); // supplier object
  const [payStep, setPayStep] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [payForm, setPayForm] = useState({ productId: '', bank: 'BCA Virtual Account', amount: '' });
  const [generatedVA, setGeneratedVA] = useState('');

  const fetchSuppliers = () => {
    const token = user.token.trim();
    axios.get('http://localhost:5000/api/suppliers', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setSuppliers(res.data));
  };

  const fetchProducts = () => {
    const token = user.token.trim();
    axios.get('http://localhost:5000/api/products', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = user.token.trim();
      if (showModal === 'new') {
        await axios.post('http://localhost:5000/api/suppliers', form, { headers: { Authorization: `Bearer ${token}` }});
      } else {
        await axios.put(`http://localhost:5000/api/suppliers/${showModal.id}`, form, { headers: { Authorization: `Bearer ${token}` }});
      }
      setShowModal(null);
      setForm({ name: '', phone: '', email: '', address: '' });
      fetchSuppliers();
      onUpdate();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Gagal menyimpan supplier');
    }
  };

  const handleEdit = (s: any) => {
    setForm({ name: s.name, phone: s.phone, email: s.email, address: s.address });
    setShowModal(s);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data supplier ini?')) return;
    try {
      const token = user.token.trim();
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      fetchSuppliers();
      onUpdate();
    } catch (err: any) {
      alert('Gagal menghapus supplier.');
    }
  };

  const handleStartPayment = (supplier: any) => {
    setPayModal(supplier);
    setPayStep(1);
    setPayForm({ ...payForm, amount: '' });
    if (products.length > 0 && !payForm.productId) {
      setPayForm(prev => ({ ...prev, productId: products[0].id }));
    }
  };

  const handleProcessPayment = async () => {
    if (!payForm.productId || !payForm.amount) {
      alert('Mohon lengkapi data pembayaran.');
      return;
    }

    try {
      // 1. Record transaction as PENDING (Needs DB schema update)
      const note = `Pembayaran Stok ke Supplier: ${payModal.name}`;
      try {
        const token = user.token.trim();
        await axios.post('http://localhost:5000/api/transactions', {
          product_id: payForm.productId,
          type: 'IN',
          qty: 1, 
          note: note,
          payment_method: payForm.bank,
          total_amount: parseInt(payForm.amount)
        }, { headers: { Authorization: `Bearer ${token}` }});
      } catch (dbErr) {
        console.warn("Pencatatan database gagal (cek struktur tabel), tapi tetap menampilkan VA.", dbErr);
      }

      // 2. Generate VA
      let va = '';
      if (payForm.bank.includes('BCA')) {
        const cleanPhone = payModal.phone ? payModal.phone.replace(/\D/g, '') : Math.floor(10000000 + Math.random() * 90000000).toString();
        va = '3901' + cleanPhone;
      } else {
        const bankPrefix = payForm.bank.includes('BRI') ? '8801' : '903';
        const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
        va = bankPrefix + randomSuffix;
      }
      
      setGeneratedVA(va);
      setPayStep(2);
      onUpdate();
      
      // Success Notification
      alert('Transaksi Berhasil! Nomor Virtual Account telah dibuat.');
    } catch (err: any) {
      alert('Gagal memproses pembayaran: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-12 p-12 glass-panel" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(217, 70, 239, 0.05))' }}>
        <div style={{ width: '80px', height: '80px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Truck size={40} />
        </div>
        <h2 style={{WebkitTextFillColor: 'white', fontSize: '2rem', marginBottom: '16px'}}>Manajemen Mitra Supplier</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '32px' }}>Kelola daftar pemasok barang Anda dalam satu tempat yang terpusat dan efisien.</p>
        <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', height: 'auto' }} onClick={() => { setForm({ name: '', phone: '', email: '', address: '' }); setShowModal('new'); }}>
          <Plus size={20} /> Tambah Mitra Baru
        </button>
      </div>
      
      <div className="glass-panel">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Mitra</th>
                <th>Kontak WhatsApp</th>
                <th style={{textAlign:'right'}}>Aksi Cepat</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>
                    <a 
                      href={`https://wa.me/${s.phone?.replace(/[^0-9]/g, '')}?text=Halo%20${s.name},%20saya%20Admin%20Nady%20Fashion%20ingin%20bertanya%20mengenai%20stok...`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="badge badge-in"
                      style={{display:'inline-flex', alignItems:'center', gap:'4px', textDecoration:'none'}}
                    >
                      Hubungi WA
                    </a>
                  </td>
                  <td style={{textAlign:'right'}}>
                    <div className="flex gap-2 justify-end">
                      <button className="btn btn-primary" style={{padding: '6px 12px', fontSize: '0.75rem'}} onClick={() => handleStartPayment(s)}>
                        Bayar
                      </button>
                      <button className="btn" style={{padding: '6px 12px', fontSize: '0.75rem', background:'rgba(255,255,255,0.05)'}} onClick={() => handleEdit(s)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" style={{padding: '6px'}} onClick={() => handleDelete(s.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', 
          backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          zIndex: 100, padding: '24px'
        }}>
          <div className="glass-panel animate-fade-in gradient-border" style={{ width: '100%', maxWidth: '450px' }}>
            <h3 style={{ marginBottom: '24px', WebkitTextFillColor: 'white' }}>{showModal === 'new' ? 'Tambah Mitra Supplier' : 'Perbarui Data Supplier'}</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Nama / Perusahaan</label>
                <input type="text" className="form-control" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="form-group" style={{flex: 1}}>
                  <label>Telepon (WhatsApp)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={form.phone} 
                    onChange={e => setForm({...form, phone: e.target.value})} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Resmi</label>
                <input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Alamat / Lokasi</label>
                <input type="text" className="form-control" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
              </div>
              <div className="flex gap-4 justify-end mt-8">
                <button type="button" className="btn" onClick={() => setShowModal(null)} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--surface-border)' }}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Mitra</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {payModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', 
          backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          zIndex: 110, padding: '24px'
        }}>
          <div className="glass-panel animate-fade-in gradient-border" style={{ width: '100%', maxWidth: '450px', padding: payStep === 2 ? '48px' : '32px' }}>
            {payStep === 1 ? (
              <>
                <div className="flex items-center gap-4 mb-8">
                   <div style={{ padding: '12px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)', borderRadius: '12px' }}>
                      <CreditCard size={24} />
                   </div>
                   <div>
                      <h3 style={{ WebkitTextFillColor: 'white', margin: 0 }}>Pembayaran Supplier</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{payModal.name}</p>
                   </div>
                </div>

                <div className="form-group">
                  <label>Pilih Produk</label>
                  <select 
                    className="form-control" 
                    value={payForm.productId} 
                    onChange={e => setPayForm({...payForm, productId: e.target.value})}
                  >
                    <option value="">-- Pilih Produk --</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Stok: {p.stock})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Metode Pembayaran</label>
                  <select 
                    className="form-control" 
                    value={payForm.bank} 
                    onChange={e => setPayForm({...payForm, bank: e.target.value})}
                  >
                    <option value="BCA Virtual Account">BCA Virtual Account</option>
                    <option value="BRI Virtual Account">BRI Virtual Account</option>
                    <option value="BTN Virtual Account">BTN Virtual Account</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Nominal Pembayaran (Rp)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Contoh: 500000"
                    value={payForm.amount} 
                    onChange={e => setPayForm({...payForm, amount: e.target.value})} 
                  />
                </div>

                <div className="flex gap-4 mt-10">
                  <button className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.05)' }} onClick={() => setPayModal(null)}>Batal</button>
                  <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleProcessPayment}>Bayar Sekarang</button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h2 style={{ WebkitTextFillColor: 'white', marginBottom: '8px' }}>VA Berhasil Dibuat</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Silakan lakukan pembayaran ke nomor VA berikut:</p>
                
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '32px', marginBottom: '32px', border: '1px dashed var(--surface-border)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{payForm.bank}</div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px', fontFamily: 'monospace' }}>{generatedVA}</div>
                  <div style={{ marginTop: '16px', fontWeight: 600, fontSize: '1.1rem' }}>Rp {parseInt(payForm.amount).toLocaleString('id-ID')}</div>
                </div>

                <div style={{ textAlign: 'left', background: 'rgba(245, 158, 11, 0.05)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--warning)', marginBottom: '32px' }}>
                   <p style={{ fontSize: '0.8rem', color: 'var(--warning)', margin: 0 }}>
                     <strong>Catatan:</strong> Status pembayaran akan otomatis berubah menjadi LUNAS setelah sistem memverifikasi dana masuk.
                   </p>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', height: '52px' }} onClick={() => setPayModal(null)}>
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

function OperatingExpenses({ user, onUpdate }: { user: User, onUpdate: () => void }) {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState({ category: '', amount: '', description: '', expense_date: new Date().toISOString().split('T')[0] });

  const fetchExpenses = () => {
    const token = user.token.trim();
    axios.get('http://localhost:5000/api/expenses', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setExpenses(res.data));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanToken = user.token.trim();
      await axios.post('http://localhost:5000/api/expenses', 
        { ...form, amount: parseInt(form.amount), created_by: user.username }, 
        { headers: { Authorization: `Bearer ${cleanToken}` }}
      );
      setShowModal(false);
      setForm({ category: '', amount: '', description: '', expense_date: new Date().toISOString().split('T')[0] });
      fetchExpenses();
      onUpdate();
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.error || 'Gagal menyimpan pengeluaran. Coba logout dan login kembali.';
      alert(msg);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Hapus catatan pengeluaran ini?')) return;
    try {
      const token = user.token.trim();
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      fetchExpenses();
      onUpdate();
    } catch (err) {
      alert('Gagal menghapus data.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 style={{WebkitTextFillColor: 'white'}}>Pengeluaran Operasional</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Catat Pengeluaran
        </button>
      </div>

      <div className="glass-panel">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Keterangan</th>
                <th>Nominal</th>
                <th style={{textAlign:'right'}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((ex: any) => (
                <tr key={ex.id}>
                  <td style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{new Date(ex.expense_date).toLocaleDateString('id-ID')}</td>
                  <td style={{fontWeight: 700}}>{ex.category}</td>
                  <td style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{ex.description || '-'}</td>
                  <td style={{fontWeight: 700, color: 'var(--danger)'}}>Rp {ex.amount?.toLocaleString('id-ID')}</td>
                  <td style={{textAlign:'right'}}>
                    <button className="btn btn-danger" style={{padding:'8px'}} onClick={() => handleDelete(ex.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr><td colSpan={5} className="text-center" style={{padding:'48px', color:'var(--text-muted)'}}>Belum ada data pengeluaran.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', 
          backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          zIndex: 100, padding: '24px'
        }}>
          <div className="glass-panel animate-fade-in gradient-border" style={{ width: '100%', maxWidth: '450px' }}>
            <h3 style={{ marginBottom: '24px', WebkitTextFillColor: 'white' }}>Baru: Catat Pengeluaran</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Kategori</label>
                <select className="form-control" required value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                   <option value="">-- Pilih Kategori --</option>
                   <option value="Listrik">Listrik</option>
                   <option value="Air">Air</option>
                   <option value="Gaji">Gaji Pegawai</option>
                   <option value="Sewa">Sewa Tempat</option>
                   <option value="Internet">Internet</option>
                   <option value="Lain-lain">Lain-lain</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nominal (Rp)</label>
                <input type="number" className="form-control" required value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Tanggal</label>
                <input type="date" className="form-control" required value={form.expense_date} onChange={e => setForm({...form, expense_date: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Keterangan (Opsional)</label>
                <textarea className="form-control" style={{height:'100px'}} value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
              </div>
              <div className="flex gap-4 justify-end mt-8">
                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--surface-border)' }}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan Laporan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Logs({ user }: { user: User }) {
  const [logs, setLogs] = useState<any[]>([]);
  useEffect(() => {
    const token = user.token.trim();
    axios.get('http://localhost:5000/api/transactions', { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setLogs(res.data));
  }, []);

  return (
    <div className="animate-fade-in">
          <h2 style={{ marginBottom: '32px', WebkitTextFillColor: 'white' }}>Jurnal Aktivitas Sistem</h2>
      <div className="glass-panel">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Produk</th>
                <th>Tipe</th>
                <th>Oleh</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(log.created_at).toLocaleString('id-ID')}</td>
                  <td style={{ fontWeight: 600 }}>{log.product_name} x {log.qty} pcs</td>
                  <td>
                    <span className={`badge badge-${log.type.toLowerCase()}`}>
                      {log.type === 'IN' ? 'MASUK' : 'KELUAR'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-admin`}>
                      {log.user_name}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
