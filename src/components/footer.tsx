import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { LoginModal } from '@/components/admin/LoginModal';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ProductsUploadModal } from '@/components/admin/products-upload-modal';
import { PortfolioUploadModal } from '@/components/admin/portfolio-upload-modal';
import { BlogUploadModal } from '@/components/admin/blog-upload-modal';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Our Work', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/HORST-HOME-Improvements/61572186766274/?mibextid=wwXIfr&rdid=k9lFspogE0NKm228&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ECEMKZNsA%2F%3Fmibextid%3DwwXIfr',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/horsthomes/',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      name: 'X (Twitter)',
      href: '#',
      icon: Twitter,
    },
  ],
};

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

export function Footer() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out', {
        description: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  return (
    <motion.footer 
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-premium relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10" />

      <div className="relative w-full overflow-hidden px-4 py-12 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Company Info */}
            <motion.div variants={itemVariants}>
              <Link to="/" className="text-2xl font-bold text-gradient-animated">
               Horst Homes
              </Link>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                30+ years of experience in home renovations.
                Serving Chatham-Kent with quality craftsmanship and dedication.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gradient-animated mb-6">
                Contact Us
              </h3>
              <ul role="list" className="space-y-4">
                <li>
                  <a
                    href="tel:+19059647859"
                    className="group flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-2 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                      <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    1(905) 964 7859
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@horsthomes.ca"
                    className="group flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-2 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                      <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    contact@horsthomes.ca 
                  </a>
                </li>
                <li>
                  <div className="group flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-2">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    Chatham-Kent, Ontario
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gradient-animated mb-6">
                Quick Links
              </h3>
              <ul role="list" className="grid grid-cols-2 gap-4">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex justify-center space-x-8"
          >
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </motion.div>

          {/* Footer Text */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between"
          >
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>&copy; {new Date().getFullYear()} Horst Homes. All rights reserved.</p>
              <p className="mt-1">
                Powered by{' '}
                <a
                  href="https://home.intellisyncsolutions.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  IntelliSync Solutions
                </a>
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-4">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Logout
                  </Button>
                  <div className="fixed bottom-4 right-4 flex flex-col sm:flex-row gap-2">
                    <ProductsUploadModal />
                    <PortfolioUploadModal />
                    <BlogUploadModal />
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => document.getElementById('admin-login-trigger')?.click()}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    Admin Login
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hidden login modal trigger */}
      <LoginModal />
    </motion.footer>
  );
}