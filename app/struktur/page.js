import Image from 'next/image';
import styles from './page.module.css';
import PublicLayout from '@/components/PublicLayout';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Struktur Organisasi',
  description: 'Struktur organisasi SMK Islam ITM.',
};

function getStrukturData() {
  const filePath = path.join(process.cwd(), 'data', 'struktur.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export default function StrukturPage() {
  const strukturData = getStrukturData();
  const sorted = [...strukturData].sort((a, b) => a.order - b.order);
  const kepala = sorted[0];
  const rest = sorted.slice(1);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/images/hero.jpg" alt="Struktur" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroSub}>Profil Sekolah</span>
          <h1 className={styles.heroTitle}>Struktur Organisasi</h1>
          <p className={styles.heroDesc}>Jajaran pimpinan dan pengurus SMK Islam ITM.</p>
        </div>
      </section>

      {/* Struktur */}
      <section className={`section ${styles.strukturSection}`}>
        <div className="container">
          {/* Kepala Sekolah */}
          {kepala && (
            <div className={styles.kepalaCard}>
              <div className={styles.avatar}>
                {kepala.foto ? (
                  <Image src={kepala.foto} alt={kepala.nama} width={120} height={120} style={{ objectFit: 'cover' }} />
                ) : (
                  <span className={styles.avatarPlaceholder}>👤</span>
                )}
              </div>
              <h2 className={styles.kepalaName}>{kepala.nama}</h2>
              <p className={styles.kepalaRole}>{kepala.jabatan}</p>
            </div>
          )}

          {/* Connector */}
          <div className={styles.connector} />

          {/* Rest */}
          <div className={styles.grid}>
            {rest.map((member) => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.memberAvatar}>
                  {member.foto ? (
                    <Image src={member.foto} alt={member.nama} width={80} height={80} style={{ objectFit: 'cover' }} />
                  ) : (
                    <span className={styles.memberAvatarPlaceholder}>👤</span>
                  )}
                </div>
                <h3 className={styles.memberName}>{member.nama}</h3>
                <p className={styles.memberRole}>{member.jabatan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
