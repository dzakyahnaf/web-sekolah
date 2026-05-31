'use client';
import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

export default function AdminSPMB() {
  const [data, setData] = useState([]);

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    fetch('/api/spmb').then(r => r.json()).then(d => setData(Array.isArray(d) ? d : []));
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus data ini?')) return;
    await fetch(`/api/spmb?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Data Pendaftar SPMB</h1>
        <p className={styles.pageDesc}>Daftar calon siswa baru yang mendaftar via website</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#eff6ff' }}>📋</div>
          <div><div className={styles.statValue}>{data.length}</div><div className={styles.statLabel}>Total Pendaftar</div></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#ecfdf5' }}>👦</div>
          <div><div className={styles.statValue}>{data.filter(d => d.jenisKelamin === 'Laki-laki').length}</div><div className={styles.statLabel}>Laki-laki</div></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fce7f3' }}>👧</div>
          <div><div className={styles.statValue}>{data.filter(d => d.jenisKelamin === 'Perempuan').length}</div><div className={styles.statLabel}>Perempuan</div></div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Data Pendaftar</h2>
        </div>
        {data.length === 0 ? (
          <div className={styles.emptyState}><div className={styles.emptyIcon}>📋</div><p>Belum ada pendaftar</p></div>
        ) : (
          <table className={styles.table}>
            <thead><tr><th>Nama</th><th>TTL</th><th>Asal Sekolah</th><th>Jurusan</th><th>No HP</th><th>Tgl Daftar</th><th>Aksi</th></tr></thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 600 }}>{d.nama}</td>
                  <td style={{ fontSize: '0.85rem' }}>{d.tempatLahir}, {d.tanggalLahir}</td>
                  <td style={{ fontSize: '0.85rem' }}>{d.asalSekolah}</td>
                  <td><span className="badge badge-accent">{d.jurusan}</span></td>
                  <td style={{ fontSize: '0.85rem' }}>{d.noHp}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{d.tanggalDaftar ? new Date(d.tanggalDaftar).toLocaleDateString('id-ID') : '-'}</td>
                  <td><button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(d.id)}>Hapus</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
