'use client';
import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

export default function AdminVisi() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/content?type=visi').then(r => r.json()).then(setData);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _type: 'visi' }),
      });
      setMsg('✅ Berhasil disimpan!');
    } catch {
      setMsg('❌ Gagal menyimpan');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const addMisi = () => {
    const newId = data.misi.length > 0 ? Math.max(...data.misi.map(m => m.id)) + 1 : 1;
    setData({ ...data, misi: [...data.misi, { id: newId, title: '', description: '' }] });
  };

  const removeMisi = (id) => {
    setData({ ...data, misi: data.misi.filter(m => m.id !== id) });
  };

  const updateMisi = (id, field, value) => {
    setData({ ...data, misi: data.misi.map(m => m.id === id ? { ...m, [field]: value } : m) });
  };

  if (!data) return <div className={styles.loading}><div className={styles.spinner} /></div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Edit Visi & Misi</h1>
        <p className={styles.pageDesc}>Kelola visi dan misi sekolah</p>
      </div>

      {msg && (
        <div className={`${styles.toast} ${msg.includes('❌') ? styles.toastError : ''}`}>
          {msg}
        </div>
      )}

      {/* Hero */}
      <div className={styles.formCard} style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🎬 Hero Banner</h3>
        <div className={styles.formGrid}>
          <div className="form-group">
            <label className="form-label">Subtitle</label>
            <input className="form-input" value={data.hero?.subtitle || ''} onChange={e => setData({...data, hero: {...data.hero, subtitle: e.target.value}})} />
          </div>
          <div className="form-group">
            <label className="form-label">Judul</label>
            <input className="form-input" value={data.hero?.title || ''} onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Deskripsi</label>
          <textarea className="form-textarea" rows={2} value={data.hero?.description || ''} onChange={e => setData({...data, hero: {...data.hero, description: e.target.value}})} />
        </div>
      </div>

      {/* Visi */}
      <div className={styles.formCard} style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🎯 Visi Sekolah</h3>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <textarea className="form-textarea" rows={3} value={data.visi || ''} onChange={e => setData({...data, visi: e.target.value})} />
        </div>
      </div>

      {/* Misi */}
      <div className={styles.formCard} style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem' }}>📋 Misi Sekolah</h3>
          <button className="btn btn-secondary btn-sm" onClick={addMisi}>+ Tambah Misi</button>
        </div>
        {data.misi?.map((item, i) => (
          <div key={item.id} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '10px', marginBottom: '0.75rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
              <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => removeMisi(item.id)}>Hapus</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span style={{ background: 'var(--color-primary-50)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary)' }}>{i + 1}</span>
            </div>
            <div className="form-group">
              <label className="form-label">Judul</label>
              <input className="form-input" value={item.title} onChange={e => updateMisi(item.id, 'title', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Deskripsi</label>
              <textarea className="form-textarea" rows={2} value={item.description} onChange={e => updateMisi(item.id, 'description', e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.formActions}>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
        </button>
      </div>
    </>
  );
}
