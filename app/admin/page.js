'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blog: 0, spmb: 0, struktur: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/blog').then(r => r.json()),
      fetch('/api/spmb').then(r => r.json()),
      fetch('/api/struktur').then(r => r.json()),
    ]).then(([blog, spmb, struktur]) => {
      setStats({
        blog: Array.isArray(blog) ? blog.length : 0,
        spmb: Array.isArray(spmb) ? spmb.length : 0,
        struktur: Array.isArray(struktur) ? struktur.length : 0,
      });
    });
  }, []);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageDesc}>Selamat datang di panel admin SMK Islam ITM</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#ecfdf5', color: '#065f46' }}>📝</div>
          <div>
            <div className={styles.statValue}>{stats.blog}</div>
            <div className={styles.statLabel}>Total Artikel</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#1e40af' }}>📋</div>
          <div>
            <div className={styles.statValue}>{stats.spmb}</div>
            <div className={styles.statLabel}>Pendaftar SPMB</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#92400e' }}>🏛️</div>
          <div>
            <div className={styles.statValue}>{stats.struktur}</div>
            <div className={styles.statLabel}>Anggota Struktur</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fce7f3', color: '#9d174d' }}>🎓</div>
          <div>
            <div className={styles.statValue}>3</div>
            <div className={styles.statLabel}>Program Keahlian</div>
          </div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Menu Cepat</h2>
        </div>
        <div style={{ padding: 'var(--space-xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
          {[
            { href: '/admin/blog', icon: '📝', label: 'Kelola Blog', desc: 'Tambah & edit artikel' },
            { href: '/admin/spmb', icon: '📋', label: 'Data SPMB', desc: 'Lihat pendaftar' },
            { href: '/admin/beranda', icon: '🏠', label: 'Edit Beranda', desc: 'Ubah konten beranda' },
            { href: '/admin/visi', icon: '🎯', label: 'Edit Visi Misi', desc: 'Ubah visi & misi' },
            { href: '/admin/struktur', icon: '🏛️', label: 'Struktur', desc: 'Kelola organisasi' },
            { href: '/admin/pengaturan', icon: '⚙️', label: 'Pengaturan', desc: 'Info kontak & lainnya' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '1rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)', textDecoration: 'none',
              transition: 'all 0.2s', color: 'var(--color-text)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.background = 'var(--color-primary-50)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
