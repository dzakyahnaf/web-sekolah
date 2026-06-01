import Image from 'next/image';
import styles from './page.module.css';
import PublicLayout from '@/components/PublicLayout';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Visi & Misi',
  description: 'Visi, Misi dan Tujuan SMK Islam ITM — Mencetak generasi Rabbani yang inovatif dan berjiwa technopreneur.',
};

function getVisiData() {
  const filePath = path.join(process.cwd(), 'data', 'visi.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export default function VisiPage() {
  const visiData = getVisiData();
  const { hero, visi, misi } = visiData;

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/images/hero.jpg" alt="Visi Misi" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroSub}>{hero.subtitle}</span>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.heroDesc}>{hero.description}</p>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="var(--color-bg)" />
          </svg>
        </div>
      </section>

      {/* Visi */}
      <section className={styles.visiSection}>
        <div className="container">
          <div className={styles.visiCard}>
            <div className={styles.quoteIcon}>❝</div>
            <h2 className={styles.visiTitle}>Visi Sekolah</h2>
            <p className={styles.visiText}>{visi}</p>
          </div>
        </div>
      </section>

      {/* Misi */}
      <section className={`section ${styles.misiSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Langkah Strategis</span>
            <h2 className="section-title">Misi Sekolah</h2>
          </div>
          <div className={styles.misiGrid}>
            {misi.map((item) => (
              <div key={item.id} className={styles.misiCard}>
                <div className={styles.misiNum}>{item.id}</div>
                <h3 className={styles.misiTitle}>{item.title}</h3>
                <p className={styles.misiDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
