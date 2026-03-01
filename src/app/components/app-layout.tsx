import { useState } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { Sidebar } from './sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      <Header onMenuToggle={toggleSidebar} />
      
      <div className="flex pt-[73px] w-full">
        {/* Sidebar - visible on desktop, toggleable on mobile */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Main Content - with left margin on desktop to account for sidebar */}
        <main className="flex-1 lg:ml-64 w-full min-w-0">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}