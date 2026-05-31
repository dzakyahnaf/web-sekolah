'use client';
import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

export default function AdminBeranda() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(setData);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setMsg('✅ Berhasil disimpan!');
    } catch {
      setMsg('❌ Gagal menyimpan');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  if (!data) return <div className={styles.loading}><div className={styles.spinner} /></div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Edit Beranda</h1>
        <p className={styles.pageDesc}>Kelola konten halaman beranda website</p>
      </div>

      {msg && <div style={{ padding: '0.7rem 1rem', borderRadius: '8px', background: msg.includes('✅') ? '#ecfdf5' : '#fef2f2', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{msg}</div>}

      {/* Hero Section */}
      <div className={styles.formCard} style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🎬 Hero Section</h3>
        <div className="form-group">
          <label className="form-label">Greeting</label>
          <input className="form-input" value={data.hero?.greeting || ''} onChange={e => setData({...data, hero: {...data.hero, greeting: e.target.value}})} />
        </div>
        <div className="form-group">
          <label className="form-label">Deskripsi</label>
          <textarea className="form-textarea" rows={3} value={data.hero?.description || ''} onChange={e => setData({...data, hero: {...data.hero, description: e.target.value}})} />
        </div>
        <div className={styles.formGrid}>
          <div className="form-group">
            <label className="form-label">Tombol Primer</label>
            <input className="form-input" value={data.hero?.ctaPrimary || ''} onChange={e => setData({...data, hero: {...data.hero, ctaPrimary: e.target.value}})} />
          </div>
          <div className="form-group">
            <label className="form-label">Tombol Sekunder</label>
            <input className="form-input" value={data.hero?.ctaSecondary || ''} onChange={e => setData({...data, hero: {...data.hero, ctaSecondary: e.target.value}})} />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className={styles.formCard} style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>📖 Tentang Sekolah</h3>
        <div className={styles.formGrid}>
          <div className="form-group">
            <label className="form-label">Subtitle</label>
            <input className="form-input" value={data.about?.subtitle || ''} onChange={e => setData({...data, about: {...data.about, subtitle: e.target.value}})} />
          </div>
          <div className="form-group">
            <label className="form-label">Judul</label>
            <input className="form-input" value={data.about?.title || ''} onChange={e => setData({...data, about: {...data.about, title: e.target.value}})} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Deskripsi</label>
          <textarea className="form-textarea" rows={4} value={data.about?.description || ''} onChange={e => setData({...data, about: {...data.about, description: e.target.value}})} />
        </div>

        <h4 style={{ margin: '1.5rem 0 1rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>Fitur Unggulan</h4>
        {data.about?.features?.map((f, i) => (
          <div key={i} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '10px', marginBottom: '0.75rem' }}>
            <div className={styles.formGrid}>
              <div className="form-group">
                <label className="form-label">Judul Fitur {i+1}</label>
                <input className="form-input" value={f.title} onChange={e => {
                  const features = [...data.about.features];
                  features[i] = {...features[i], title: e.target.value};
                  setData({...data, about: {...data.about, features}});
                }} />
              </div>
              <div className="form-group">
                <label className="form-label">Icon</label>
                <input className="form-input" value={f.icon} onChange={e => {
                  const features = [...data.about.features];
                  features[i] = {...features[i], icon: e.target.value};
                  setData({...data, about: {...data.about, features}});
                }} />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Deskripsi</label>
              <textarea className="form-textarea" rows={2} value={f.description} onChange={e => {
                const features = [...data.about.features];
                features[i] = {...features[i], description: e.target.value};
                setData({...data, about: {...data.about, features}});
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Programs */}
      <div className={styles.formCard} style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🎓 Program Keahlian</h3>
        {data.programs?.items?.map((prog, i) => (
          <div key={i} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '10px', marginBottom: '0.75rem' }}>
            <div className={styles.formGrid}>
              <div className="form-group">
                <label className="form-label">Badge</label>
                <input className="form-input" value={prog.badge} onChange={e => {
                  const items = [...data.programs.items];
                  items[i] = {...items[i], badge: e.target.value};
                  setData({...data, programs: {...data.programs, items}});
                }} />
              </div>
              <div className="form-group">
                <label className="form-label">Judul</label>
                <input className="form-input" value={prog.title} onChange={e => {
                  const items = [...data.programs.items];
                  items[i] = {...items[i], title: e.target.value};
                  setData({...data, programs: {...data.programs, items}});
                }} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Deskripsi</label>
              <textarea className="form-textarea" rows={2} value={prog.description} onChange={e => {
                const items = [...data.programs.items];
                items[i] = {...items[i], description: e.target.value};
                setData({...data, programs: {...data.programs, items}});
              }} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Path Gambar</label>
              <input className="form-input" value={prog.image} onChange={e => {
                const items = [...data.programs.items];
                items[i] = {...items[i], image: e.target.value};
                setData({...data, programs: {...data.programs, items}});
              }} />
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
