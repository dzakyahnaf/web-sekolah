'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        setError('Username atau password salah');
      }
    } catch {
      setError('Terjadi kesalahan koneksi');
    }
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.icon}>🕌</span>
          <h1 className={styles.title}>Dashboard Admin</h1>
          <p className={styles.subtitle}>SMK Islam ITM</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-user">Username</label>
            <input id="login-user" className="form-input" placeholder="Masukkan username"
              value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="login-pass">Password</label>
            <input id="login-pass" type="password" className="form-input" placeholder="Masukkan password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem' }}>
            {loading ? 'Masuk...' : '🔐 Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}
