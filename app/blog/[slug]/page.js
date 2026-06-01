import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import PublicLayout from '@/components/PublicLayout';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getBlogData() {
  const filePath = path.join(process.cwd(), 'data', 'blog.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blogData = getBlogData();
  const post = blogData.find(p => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const blogData = getBlogData();
  const post = blogData.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <PublicLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className={`badge badge-accent ${styles.heroBadge}`}>{post.category}</span>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <div className={styles.heroMeta}>
            <span>✍️ {post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className={styles.articleSection}>
        <div className="container">
          <div className={styles.articleWrap}>
            <nav className={styles.breadcrumb}>
              <Link href="/">Beranda</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <span className={styles.current}>{post.title}</span>
            </nav>
            <article className={styles.article} dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n## /g, '</p><h2>').replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>').replace(/<p><\/p>/g, '') }} />
            <div className={styles.backWrap}>
              <Link href="/blog" className="btn btn-secondary">← Kembali ke Blog</Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
