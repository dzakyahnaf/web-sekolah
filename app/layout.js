import './globals.css';

export const metadata = {
  title: {
    default: 'SMK Islam ITM — Membangun Generasi Rabbani di Era Digital',
    template: '%s | Sekolah ITM',
  },
  description: 'SMK Islam ITM adalah pusat pendidikan vokasi teknologi yang memadukan kurikulum industri dengan nilai-nilai Islami.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
