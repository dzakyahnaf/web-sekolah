'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const [schoolName, setSchoolName] = useState('Sekolah ITM');
  const [tagline, setTagline] = useState('Mencetak tenaga kerja profesional yang terampil di bidang teknologi dan memiliki akhlakul karimah berlandaskan nilai-nilai Islam.');
  const [contact, setContact] = useState({
    address: 'Jl. Pendidikan No. 123, Jakarta Selatan',
    phone: '021-1234-5678',
    mobile: '0812-3456-7890',
    email: 'info@sekolahitm.sch.id'
  });

  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then(data => {
        if (data) {
          if (data.schoolName) setSchoolName(data.schoolName);
          if (data.footer?.tagline) setTagline(data.footer.tagline);
          if (data.contact) setContact(data.contact);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Column 1: About */}
          <div className={styles.col}>
            <div className={styles.brand}>
              <span className={styles.brandIcon}>🕌</span>
              <span className={styles.brandText}>{schoolName}</span>
            </div>
            <p className={styles.tagline}>
              {tagline}
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
                  <span className={styles.contactValue}>{contact.address}</span>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <span className={styles.contactLabel}>Telepon</span>
                  <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`} className={styles.contactValue}>{contact.phone}</a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <div>
                  <span className={styles.contactLabel}>Mobile</span>
                  <a href={`tel:${contact.mobile?.replace(/[^0-9+]/g, '')}`} className={styles.contactValue}>{contact.mobile}</a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <a href={`mailto:${contact.email}`} className={styles.contactValue}>{contact.email}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p>&copy; {new Date().getFullYear()} {schoolName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
