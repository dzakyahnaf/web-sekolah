import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import blogData from '@/data/blog.json';
import PublicLayout from '@/components/PublicLayout';

export const metadata = {
  title: 'Blog',
  description: 'Artikel, berita, dan pengumuman terbaru dari SMK Islam ITM.',
};

export default function BlogPage() {
  const posts = blogData.filter(p => p.status === 'published');

  return (
    <PublicLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/images/hero.jpg" alt="Blog" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroSub}>Informasi Terkini</span>
          <h1 className={styles.heroTitle}>Blog & Artikel</h1>
          <p className={styles.heroDesc}>Berita, pengumuman, dan cerita inspiratif dari Sekolah ITM.</p>
        </div>
      </section>

      {/* Posts */}
      <section className={`section ${styles.postsSection}`}>
        <div className="container">
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p>Belum ada artikel.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={`card ${styles.postCard}`}>
                  <div className={styles.postImg}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={240}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className={styles.postBody}>
                    <span className={`badge badge-primary`}>{post.category}</span>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postMeta}>
                      <span>✍️ {post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
