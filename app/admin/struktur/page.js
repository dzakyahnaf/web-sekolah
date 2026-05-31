'use client';
import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

export default function AdminStruktur() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ nama: '', jabatan: '', order: 1 });

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    fetch('/api/struktur').then(r => r.json()).then(d => setData(Array.isArray(d) ? d.sort((a,b) => a.order - b.order) : []));
  };

  const openNew = () => {
    setEditItem(null);
    setForm({ nama: '', jabatan: '', order: data.length + 1 });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({ nama: item.nama, jabatan: item.jabatan, order: item.order });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (editItem) {
      await fetch('/api/struktur', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editItem.id, ...form }) });
    } else {
      await fetch('/api/struktur', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setShowModal(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus?')) return;
    await fetch(`/api/struktur?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Struktur Organisasi</h1>
        <p className={styles.pageDesc}>Kelola jajaran pimpinan sekolah</p>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Anggota ({data.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openNew}>+ Tambah</button>
        </div>
        {data.length === 0 ? (
          <div className={styles.emptyState}><div className={styles.emptyIcon}>🏛️</div><p>Belum ada data</p></div>
        ) : (
          <table className={styles.table}>
            <thead><tr><th>#</th><th>Nama</th><th>Jabatan</th><th>Aksi</th></tr></thead>
            <tbody>
              {data.map((m, i) => (
                <tr key={m.id}>
                  <td>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{m.nama}</td>
                  <td style={{ fontSize: '0.88rem' }}>{m.jabatan}</td>
                  <td><div className={styles.actions}>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEdit(m)}>Edit</button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(m.id)}>Hapus</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>{editItem ? '✏️ Edit' : '➕ Tambah'} Anggota</h2>
            <div className="form-group"><label className="form-label">Nama</label><input className="form-input" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Jabatan</label><input className="form-input" value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Urutan</label><input className="form-input" type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 1})} /></div>
            <div className={styles.formActions}>
              <button className="btn btn-primary" onClick={handleSave}>💾 Simpan</button>
              <button className="btn" style={{ border: '1px solid var(--color-border)' }} onClick={() => setShowModal(false)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
