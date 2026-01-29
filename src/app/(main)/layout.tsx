import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-300px)]">{children}</div>
      <Footer />
    </>
  );
}
