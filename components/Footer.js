import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Column 1: About */}
          <div className={styles.col}>
            <div className={styles.brand}>
              <span className={styles.brandIcon}>🕌</span>
              <span className={styles.brandText}>Sekolah ITM</span>
            </div>
            <p className={styles.tagline}>
              Mencetak tenaga kerja profesional yang terampil di bidang teknologi dan memiliki akhlakul karimah berlandaskan nilai-nilai Islam.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Tautan</h4>
            <ul className={styles.links}>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/visi">Visi & Misi</Link></li>
              <li><Link href="/struktur">Struktur Organisasi</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/spmb">SPMB</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Kontak</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <span className={styles.contactLabel}>Alamat</span>
                  <span className={styles.contactValue}>Jl. Pendidikan No. 123, Jakarta Selatan</span>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <span className={styles.contactLabel}>Telepon</span>
                  <a href="tel:02112345678" className={styles.contactValue}>021-1234-5678</a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <div>
                  <span className={styles.contactLabel}>Mobile</span>
                  <a href="tel:081234567890" className={styles.contactValue}>0812-3456-7890</a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:info@sekolahitm.sch.id" className={styles.contactValue}>info@sekolahitm.sch.id</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p>&copy; {new Date().getFullYear()} SMK Islam ITM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
