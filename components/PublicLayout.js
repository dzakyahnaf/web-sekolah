import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main style={{ marginTop: 'var(--header-height)', minHeight: 'calc(100vh - var(--header-height))' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
