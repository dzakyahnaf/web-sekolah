'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import PublicLayout from '@/components/PublicLayout';

export default function SPMBPage() {
  const [form, setForm] = useState({
    nama: '', tempatLahir: '', tanggalLahir: '', jenisKelamin: '',
    alamat: '', asalSekolah: '', noHp: '', jurusan: '',
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/spmb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ nama: '', tempatLahir: '', tanggalLahir: '', jenisKelamin: '', alamat: '', asalSekolah: '', noHp: '', jurusan: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/images/hero.jpg" alt="SPMB" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroSub}>Penerimaan Siswa Baru</span>
          <h1 className={styles.heroTitle}>Formulir Pendaftaran SPMB</h1>
          <p className={styles.heroDesc}>Isi formulir di bawah untuk mendaftar sebagai calon siswa baru SMK Islam ITM.</p>
        </div>
      </section>

      {/* Form */}
      <section className={`section ${styles.formSection}`}>
        <div className="container">
          <div className={styles.formCard}>
            {status === 'success' && (
              <div className={styles.alert + ' ' + styles.alertSuccess}>
                ✅ Pendaftaran berhasil dikirim! Kami akan menghubungi Anda segera.
              </div>
            )}
            {status === 'error' && (
              <div className={styles.alert + ' ' + styles.alertError}>
                ❌ Terjadi kesalahan. Silakan coba lagi.
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label" htmlFor="nama">Nama Lengkap *</label>
                  <input id="nama" name="nama" className="form-input" placeholder="Masukkan nama lengkap"
                    value={form.nama} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tempatLahir">Tempat Lahir *</label>
                  <input id="tempatLahir" name="tempatLahir" className="form-input" placeholder="Kota kelahiran"
                    value={form.tempatLahir} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tanggalLahir">Tanggal Lahir *</label>
                  <input id="tanggalLahir" name="tanggalLahir" type="date" className="form-input"
                    value={form.tanggalLahir} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Jenis Kelamin *</label>
                  <div className="form-radio-group">
                    <label className="form-radio-label">
                      <input type="radio" name="jenisKelamin" value="Laki-laki"
                        checked={form.jenisKelamin === 'Laki-laki'} onChange={handleChange} required />
                      Laki-laki
                    </label>
                    <label className="form-radio-label">
                      <input type="radio" name="jenisKelamin" value="Perempuan"
                        checked={form.jenisKelamin === 'Perempuan'} onChange={handleChange} required />
                      Perempuan
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" htmlFor="alamat">Alamat Lengkap *</label>
                  <textarea id="alamat" name="alamat" className="form-textarea" rows={3} placeholder="Masukkan alamat lengkap"
                    value={form.alamat} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="asalSekolah">Asal Sekolah (SMP/MTs) *</label>
                  <input id="asalSekolah" name="asalSekolah" className="form-input" placeholder="Nama sekolah asal"
                    value={form.asalSekolah} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="noHp">No. HP Orang Tua/Wali *</label>
                  <input id="noHp" name="noHp" type="tel" className="form-input" placeholder="08xxxxxxxxxx"
                    value={form.noHp} onChange={handleChange} required />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" htmlFor="jurusan">Pilihan Jurusan *</label>
                  <select id="jurusan" name="jurusan" className="form-select" value={form.jurusan} onChange={handleChange} required>
                    <option value="">-- Pilih Jurusan --</option>
                    <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                    <option value="TKJ">Teknik Komputer & Jaringan (TKJ)</option>
                    <option value="DKV">Desain Komunikasi Visual (DKV)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', marginTop: 'var(--space-md)' }}>
                {loading ? 'Mengirim...' : '📝 Kirim Pendaftaran'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
