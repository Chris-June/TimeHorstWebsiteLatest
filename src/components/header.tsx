import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, Phone, X, Moon, Sun, 
  Home, Info, Briefcase, Package, 
  FolderKanban, FileText, MessageCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Our Work', href: '/portfolio', icon: FolderKanban },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Contact', href: '/contact', icon: MessageCircle },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'bg-gradient-premium shadow-lg backdrop-blur-lg border-b border-white/10' 
          : 'bg-transparent'
      )}
    >
      <nav
        className="mx-auto max-w-7xl w-full flex items-center justify-between px-4 py-3 lg:px-8 lg:py-4"
        aria-label="Global"
      >
        <div className="flex-1">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gradient-animated hover:scale-105 transition-transform"
          >
            Horst Home 
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group relative px-3 py-2 text-sm font-medium transition-all duration-300',
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon className={cn(
                      "h-4 w-4 transition-colors duration-300",
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-400 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400'
                    )} />
                    <span>{item.name}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Theme</span>
          </Button>
          <div className="flex justify-end">
            <Button asChild size="lg" className="hover-lift">
              <Link 
                to="/quote" 
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={cn(
          'fixed inset-0 z-50 bg-gradient-premium lg:hidden',
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gradient-animated"
              onClick={() => setMobileMenuOpen(false)}
            >
              Horst Home
            </Link>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="flex-1 px-4 py-6">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-300',
                      isActive 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-400 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400'
                    )} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
            <Button
              asChild
              size="lg"
              className="w-full justify-center hover-lift"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/quote" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}