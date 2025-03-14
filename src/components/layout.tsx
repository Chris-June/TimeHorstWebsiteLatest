import { Header } from './header';
import { Footer } from './footer';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-[73px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}