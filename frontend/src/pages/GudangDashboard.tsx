import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LogOut, Search, PlusCircle, MinusCircle, Package, Hexagon, 
  Component, Box, Activity, ArrowRight, User as UserIcon,
  QrCode, CreditCard, Banknote, CheckCircle
} from 'lucide-react';
import { User } from '../App';
import logo from '../assets/logo.png';

interface GudangProps {
  user: User;
  onLogout: () => void;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
}

export default function GudangDashboard({ user, onLogout }: GudangProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [activeModal, setActiveModal] = useState<{ type: 'IN' | 'OUT', product: Product } | null>(null);
  const [showPayment, setShowPayment] = useState<{ amount: number, method: string, type: 'IN' | 'OUT', qty: number } | null>(null);
  
  const [qty, setQty] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [method, setMethod] = useState<string>('CASH');
  const [totalAmount, setTotalAmount] = useState<string>('');

  const fetchProducts = async () => {
    try {
      const token = user.token.trim();
      const res = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!qty || parseInt(qty) <= 0 || !note) return alert('Kuantitas dan Alasan harus diisi');
    
    try {
      const token = user.token.trim();
      const res = await axios.post('http://localhost:5000/api/transactions', {
        product_id: activeModal?.product.id,
        type: activeModal?.type,
        qty: parseInt(qty),
        note: note,
        payment_method: method,
        total_amount: parseInt(totalAmount) || 0
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const txAmount = res.data.total_amount;
      const txType = activeModal?.type || 'OUT';
      const txQty = parseInt(qty);
      
      setActiveModal(null);
      setQty('');
      setNote('');
      setTotalAmount('');
      fetchProducts();
      
      // Tampilkan Instruksi Pembayaran
      setShowPayment({ amount: txAmount, method, type: txType, qty: txQty });
      
    } catch (err: any) {
      alert(err.response?.data?.error || 'Gagal mengubah stok');
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex animate-fade-in" style={{ minHeight: '100vh', background: 'var(--bg-darker)' }}>
      
      {/* SIDEBAR GUDANG */}
      <div style={{
        width: '280px', background: 'rgba(15, 23, 42, 0.8)', 
        backdropFilter: 'blur(20px)', borderRight: '1px solid var(--surface-border)',
        padding: '32px 0', display: 'flex', flexDirection: 'column',
        zIndex: 10, position: 'sticky', top: 0, height: '100vh'
      }}>
        <div className="flex items-center gap-3 mb-12 px-8">
          <div style={{ padding: '2px', background: 'linear-gradient(135deg, var(--accent), var(--primary))', borderRadius: '10px' }}>
            <img src={logo} alt="L" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontSize: '1.25rem', margin: 0, background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Warehouse</h2>
        </div>

        <div style={{ flex: 1, paddingRight: '16px' }}>
           <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.1))',
            color: 'white',
            borderLeft: '3px solid var(--accent)',
            borderRadius: '0 12px 12px 0', marginBottom: '8px', fontWeight: 600
          }}>
            <Activity size={20} /> <span style={{fontSize: '0.95rem'}}>Update Stok & Bayar</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', padding: '0 24px', borderTop: '1px solid var(--surface-border)', paddingTop: '24px' }}>
          <div className="flex items-center gap-3 mb-6 p-4 glass-card">
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent), var(--primary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              <UserIcon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.username}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Staff Gudang</div>
            </div>
          </div>
          <button className="btn btn-danger" style={{ width: '100%' }} onClick={onLogout}>
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </div>

      {/* CONTENT AREA GUDANG */}
      <div style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>Operasional & Kasir</h1>
              <p style={{ color: 'var(--text-muted)' }}>Kelola stok barang masuk dan keluar dengan mudah.</p>
            </div>
            <div className="flex gap-4">
               <div className="glass-panel" style={{ padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Box size={18} color="var(--accent)" />
                  <span style={{fontWeight: 600, fontSize: '0.9rem'}}>{products.length} SKU</span>
               </div>
            </div>
          </header>

          <div className="glass-panel animate-fade-in gradient-border">
            <div className="flex justify-between items-center mb-8">
              <h3 style={{WebkitTextFillColor: 'white'}}>Katalog Stok Aktif</h3>
              <div style={{ position: 'relative', width: '350px' }}>
                <Search size={18} style={{ position: 'absolute', top: 16, left: 16, color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Cari SKU atau nama barang..." 
                  style={{ paddingLeft: '48px' }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Nama Produk</th>
                    <th>Kategori</th>
                    <th>Sisa Stok</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.sku}</td>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.category}</td>
                      <td>
                        {p.stock <= 0 ? (
                          <span className="badge badge-out">HABIS</span>
                        ) : p.stock <= 5 ? (
                          <span className="badge badge-warning">LIMIT ({p.stock})</span>
                        ) : (
                          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)' }}>
                            {p.stock} <span style={{fontSize: '0.75rem', fontWeight: 400}}>unit</span>
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="flex gap-3" style={{ justifyContent: 'flex-end' }}>
                          <button 
                            className="btn" 
                            style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '8px 16px' }}
                            onClick={() => setActiveModal({ type: 'IN', product: p })}
                          >
                            <PlusCircle size={18} /> Masuk
                          </button>
                          <button 
                            className="btn" 
                            style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--danger)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '8px 16px' }}
                            onClick={() => setActiveModal({ type: 'OUT', product: p })}
                          >
                            <MinusCircle size={18} /> Keluar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {activeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
          <div className="glass-panel animate-fade-in gradient-border" style={{ width: '100%', maxWidth: '480px', padding: '40px' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: 12, WebkitTextFillColor: 'white' }}>
              {activeModal.type === 'IN' ? <PlusCircle color="var(--success)" /> : <MinusCircle color="var(--danger)" />}
              Stok {activeModal.type === 'IN' ? 'Baru Masuk' : 'Baru Keluar'}
            </h3>
            
            <form onSubmit={handleTransaction}>
              <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--surface-border)' }}>
                 <div className="flex justify-between items-center">
                    <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>Varian</span>
                    <span style={{fontWeight: 700}}>{activeModal.product.name}</span>
                 </div>
              </div>

              <div className="flex gap-4">
                <div className="form-group" style={{flex: 1}}>
                  <label>Jumlah Unit</label>
                  <input type="number" min="1" className="form-control" value={qty} onChange={e => setQty(e.target.value)} autoFocus required />
                </div>
                {activeModal.type === 'IN' && (
                  <div className="form-group" style={{flex: 1}}>
                    <label>Metode</label>
                    <select className="form-control" value={method} onChange={e => setMethod(e.target.value)}>
                      <option value="CASH">Tunai / Cash</option>
                      <option value="MANUAL">Manual / Non-Tunai</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Nominal (Rp)</label>
                <input type="number" className="form-control" placeholder="0" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Catatan / Alasan</label>
                <input type="text" className="form-control" placeholder="Tulis keterangan singkat..." value={note} onChange={e => setNote(e.target.value)} required />
              </div>

              <div className="flex gap-4 justify-end mt-8">
                <button type="button" className="btn" onClick={() => setActiveModal(null)} style={{color: 'white'}}>Batalkan</button>
                <button type="submit" className="btn btn-primary" style={{ background: activeModal.type === 'IN' ? 'var(--success)' : 'var(--danger)' }}>
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPayment && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110
        }}>
          <div className="glass-panel animate-fade-in gradient-border" style={{ width: '100%', maxWidth: '400px', textAlign: 'center', padding: '40px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={32} />
              </div>
              <h3 style={{WebkitTextFillColor: 'white'}}>Transaksi Berhasil</h3>
              <p style={{color: 'var(--text-muted)'}}>{showPayment.type === 'IN' ? 'Stok baru telah dicatat.' : 'Pengeluaran stok berhasil.'}</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--surface-border)' }}>
               <div style={{color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px'}}>TRANSAKSI DICATAT</div>
               <div style={{fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)'}}>{showPayment.qty} UNIT</div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', height: '52px' }} onClick={() => setShowPayment(null)}>
              Selesai & Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
