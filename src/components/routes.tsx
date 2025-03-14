import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Home from '../pages/home';
import { About } from '../pages/about';
import { Services } from '../pages/services';
import { Products } from '../pages/products';
import { Portfolio } from '../pages/portfolio';
import { Blog } from '../pages/blog';
import { Contact } from '../pages/contact';
import { Quote } from '../pages/quote';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export function Routes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
      </RouterRoutes>
    </AnimatePresence>
  );
}