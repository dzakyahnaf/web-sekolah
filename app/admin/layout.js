'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

const NAV_ITEMS = [
  { href: '/admin', icon: '📊', label: 'Dashboard' },
  { href: '/admin/beranda', icon: '🏠', label: 'Beranda' },
  { href: '/admin/visi', icon: '🎯', label: 'Visi & Misi' },
  { href: '/admin/blog', icon: '📝', label: 'Blog' },
  { href: '/admin/spmb', icon: '📋', label: 'Data SPMB' },
  { href: '/admin/struktur', icon: '🏛️', label: 'Struktur' },
  { href: '/admin/pengaturan', icon: '⚙️', label: 'Pengaturan' },
];

export default function AdminLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthenticated(true);
      return;
    }
    fetch('/api/auth')
      .then(res => {
        if (!res.ok) throw new Error();
        setAuthenticated(true);
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return children;
  if (authenticated === null) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.sidebarLogo}>
            <span>🕌</span>
            <span>Sekolah ITM</span>
          </Link>
        </div>
        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.navActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            🚪 Keluar
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span /><span /><span />
          </button>
          <div className={styles.topbarRight}>
            <Link href="/" className={styles.viewSite} target="_blank">🌐 Lihat Website</Link>
            <button onClick={handleLogout} className={styles.logoutBtnTop}>Keluar</button>
          </div>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
