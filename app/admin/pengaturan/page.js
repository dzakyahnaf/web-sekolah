'use client';
import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

export default function AdminPengaturan() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(setData);
  }, []);

  const handleSave = async () => {
    setSaving(true); setMsg('');
    try {
      await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      setMsg('✅ Berhasil disimpan!');
    } catch { setMsg('❌ Gagal'); }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (!data) return <div className={styles.loading}><div className={styles.spinner} /></div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Pengaturan</h1>
        <p className={styles.pageDesc}>Informasi kontak dan pengaturan umum website</p>
      </div>

      {msg && (
        <div className={`${styles.toast} ${msg.includes('❌') ? styles.toastError : ''}`}>
          {msg}
        </div>
      )}

      <div className={styles.formCard} style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🏫 Info Sekolah</h3>
        <div className="form-group">
          <label className="form-label">Nama Sekolah</label>
          <input className="form-input" value={data.schoolName || ''} onChange={e => setData({...data, schoolName: e.target.value})} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Tagline Footer</label>
          <textarea className="form-textarea" rows={3} value={data.footer?.tagline || ''} onChange={e => setData({...data, footer: {...data.footer, tagline: e.target.value}})} />
        </div>
      </div>

      <div className={styles.formCard} style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>📞 Informasi Kontak</h3>
        <div className={styles.formGrid}>
          <div className="form-group"><label className="form-label">Alamat</label><input className="form-input" value={data.contact?.address || ''} onChange={e => setData({...data, contact: {...data.contact, address: e.target.value}})} /></div>
          <div className="form-group"><label className="form-label">Telepon</label><input className="form-input" value={data.contact?.phone || ''} onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} /></div>
          <div className="form-group"><label className="form-label">Mobile</label><input className="form-input" value={data.contact?.mobile || ''} onChange={e => setData({...data, contact: {...data.contact, mobile: e.target.value}})} /></div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={data.contact?.email || ''} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} /></div>
        </div>
      </div>

      <div className={styles.formActions}>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}</button>
      </div>
    </>
  );
}
