'use client';
import { useEffect, useState } from 'react';
import styles from '../admin.module.css';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', excerpt: '', content: '', image: '/images/hero.jpg', status: 'published' });

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = () => {
    fetch('/api/blog').then(r => r.json()).then(d => setPosts(Array.isArray(d) ? d : []));
  };

  const openNew = () => {
    setEditPost(null);
    setForm({ title: '', category: '', excerpt: '', content: '', image: '/images/hero.jpg', status: 'published' });
    setShowModal(true);
  };

  const openEdit = (post) => {
    setEditPost(post);
    setForm({ title: post.title, category: post.category, excerpt: post.excerpt, content: post.content, image: post.image, status: post.status });
    setShowModal(true);
  };

  const handleSave = async () => {
    const method = editPost ? 'PUT' : 'POST';
    const body = editPost ? { ...form, originalSlug: editPost.slug } : form;
    await fetch('/api/blog', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setShowModal(false);
    loadPosts();
  };

  const handleDelete = async (slug) => {
    if (!confirm('Yakin hapus?')) return;
    await fetch(`/api/blog?slug=${slug}`, { method: 'DELETE' });
    loadPosts();
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Kelola Blog</h1>
        <p className={styles.pageDesc}>Tambah, edit, dan hapus artikel</p>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Artikel ({posts.length})</h2>
          <button className="btn btn-primary btn-sm" onClick={openNew}>+ Baru</button>
        </div>
        {posts.length === 0 ? (
          <div className={styles.emptyState}><div className={styles.emptyIcon}>📝</div><p>Belum ada artikel</p></div>
        ) : (
          <table className={styles.table}>
            <thead><tr><th>Judul</th><th>Kategori</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.slug}>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td><span className="badge badge-primary">{p.category}</span></td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{p.date}</td>
                  <td><span className={`${styles.statusBadge} ${p.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>{p.status}</span></td>
                  <td><div className={styles.actions}>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openEdit(p)}>Edit</button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(p.slug)}>Hapus</button>
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
            <h2 className={styles.modalTitle}>{editPost ? '✏️ Edit' : '📝 Baru'}</h2>
            <div className="form-group"><label className="form-label">Judul</label><input className="form-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
            <div className={styles.formGrid}>
              <div className="form-group"><label className="form-label">Kategori</label><input className="form-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={e => setForm({...form, status: e.target.value})}><option value="published">Published</option><option value="draft">Draft</option></select></div>
            </div>
            <div className="form-group"><label className="form-label">Gambar</label><input className="form-input" value={form.image} onChange={e => setForm({...form, image: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Excerpt</label><textarea className="form-textarea" rows={2} value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Konten</label><textarea className="form-textarea" rows={8} value={form.content} onChange={e => setForm({...form, content: e.target.value})} /></div>
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
