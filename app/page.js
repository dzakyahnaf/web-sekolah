import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import PublicLayout from '@/components/PublicLayout';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getHomeData() {
  const contentPath = path.join(process.cwd(), 'data', 'content.json');
  const blogPath = path.join(process.cwd(), 'data', 'blog.json');
  return {
    content: JSON.parse(fs.readFileSync(contentPath, 'utf-8')),
    blogData: JSON.parse(fs.readFileSync(blogPath, 'utf-8')),
  };
}

export default function Home() {
  const { content, blogData } = getHomeData();
  const { hero, about, programs } = content;
  const recentPosts = blogData.filter(p => p.status === 'published').slice(0, 3);

  return (
    <PublicLayout>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/hero.jpg"
            alt="Sekolah ITM"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.heroGreeting}>{hero.greeting}</p>
          <h1 className={styles.heroTitle}>
            Selamat Datang di<br />
            <span className={styles.heroAccent}>SMK Islam ITM</span>
          </h1>
          <p className={styles.heroDesc}>{hero.description}</p>
          <div className={styles.heroCta}>
            <Link href="/spmb" className="btn btn-primary btn-lg">{hero.ctaPrimary}</Link>
            <a href="#programs" className="btn btn-outline btn-lg">{hero.ctaSecondary}</a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Siswa Aktif</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Program Keahlian</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>95%</span>
              <span className={styles.statLabel}>Lulusan Terserap</span>
            </div>
          </div>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" fill="var(--color-bg)" />
          </svg>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className={`section ${styles.about}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <div className={styles.aboutImgWrap}>
                <Image
                  src="/images/Sekolah ITM Membangun Generasi Unggul di Era Digital.png"
                  alt="Sekolah ITM"
                  width={560}
                  height={400}
                  style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
                />
              </div>
              <div className={styles.aboutBadge}>
                <span className={styles.aboutBadgeIcon}>🕌</span>
                <div>
                  <strong>Tahfidz</strong>
                  <small>Min. 3 Juz</small>
                </div>
              </div>
            </div>
            <div className={styles.aboutText}>
              <span className="section-subtitle">{about.subtitle}</span>
              <h2 className="section-title">{about.title}</h2>
              <p className={styles.aboutDesc}>{about.description}</p>
              <div className={styles.featureList}>
                {about.features.map((f, i) => (
                  <div key={i} className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      {f.icon === 'quran' ? '📖' : f.icon === 'facility' ? '🖥️' : '💼'}
                    </div>
                    <div>
                      <h4 className={styles.featureTitle}>{f.title}</h4>
                      <p className={styles.featureDesc}>{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMS ═══ */}
      <section className={`section ${styles.programs}`} id="programs">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{programs.subtitle}</span>
            <h2 className="section-title">{programs.title}</h2>
            <p className="section-desc">{programs.description}</p>
          </div>
          <div className={styles.programGrid}>
            {programs.items.map((prog, i) => (
              <div key={prog.id} className={`card ${styles.programCard}`}>
                <div className={styles.programImg}>
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    width={400}
                    height={240}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                  <div className={styles.programImgOverlay} />
                  <span className={`badge badge-accent ${styles.programBadge}`}>{prog.badge}</span>
                </div>
                <div className={styles.programBody}>
                  <h3 className={styles.programTitle}>{prog.title}</h3>
                  <p className={styles.programDesc}>{prog.description}</p>
                  <Link href={`/#programs`} className={styles.programLink}>
                    Baca Selengkapnya
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BLOG PREVIEW ═══ */}
      <section className={`section ${styles.blogSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Informasi Terkini</span>
            <h2 className="section-title">Artikel & Pengumuman</h2>
          </div>
          <div className={styles.blogGrid}>
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`card ${styles.blogCard}`}>
                <div className={styles.blogCardImg}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={220}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className={styles.blogCardBody}>
                  <span className={`badge badge-primary ${styles.blogBadge}`}>{post.category}</span>
                  <h3 className={styles.blogCardTitle}>{post.title}</h3>
                  <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                  <div className={styles.blogCardMeta}>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
            <Link href="/blog" className="btn btn-secondary">Lihat Semua Berita</Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Siap Bergabung dengan Keluarga Besar ITM?</h2>
            <p className={styles.ctaDesc}>Daftarkan diri Anda sekarang dan mulai perjalanan menjadi generasi Rabbani yang menguasai teknologi.</p>
            <Link href="/spmb" className="btn btn-primary btn-lg">Daftar Sekarang →</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
