import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, Star, Shield, Zap, Ruler, Palette, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { AdminButton } from '@/components/admin/AdminButton';
import { ProductsUploadModal } from '@/components/admin/products-upload-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageWrapper } from '@/components/PageWrapper';
import { AnimatedSection } from '@/components/AnimatedSection';
import { AnimatedCard } from '@/components/AnimatedCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { EmptyState } from '@/components/ui/empty-state';
import type { Product } from '@/lib/types';

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Top-tier materials and products from trusted manufacturers'
  },
  {
    icon: Zap,
    title: 'Energy Efficient',
    description: 'Products designed for optimal energy performance'
  },
  {
    icon: Ruler,
    title: 'Custom Sizes',
    description: 'Perfect fit for your specific requirements'
  },
  {
    icon: Palette,
    title: 'Style Options',
    description: 'Wide selection of designs and finishes'
  },
  {
    icon: CheckCircle,
    title: 'Professional Installation',
    description: 'Expert installation by certified professionals'
  }
];

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'windows', label: 'Windows' },
    { value: 'doors', label: 'Doors' },
    { value: 'siding', label: 'Siding & Exterior' },
    { value: 'interior', label: 'Interior Finishing' },
    { value: 'hardware', label: 'Hardware & Accessories' },
  ];

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

const testimonials = [
  {
    content: "The windows Tim installed are fantastic. They have made a huge difference in our home's comfort and energy efficiency. The quality and craftsmanship are outstanding.",
    author: 'Sarah J',
    location: '',
    rating: 5,
  },
  {
    content: 'High-quality products and expert installation. Our new doors look amazing and function perfectly. Tim has incredible attention to detail that made all the difference.',
    author: 'Mike T',
    location: '',
    rating: 5,
  },
];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      (product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.description?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper variant="premium">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?q=80&w=2070&auto=format&fit=crop"
            alt="Premium windows and doors"
            className="absolute inset-0 h-full w-full object-cover opacity-30 transform scale-105"
            data-aos="zoom-out"
            data-aos-duration="2000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="text-center max-w-3xl mx-auto"
          >
          <h1 className="text-4xl font-bold tracking-tight text-gradient-animated sm:text-6xl lg:text-7xl mb-6">
            High-Quality  Renovation Materials
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-white/90 max-w-2xl mx-auto">
            Only the best materials for durability, efficiency, and beauty in every installation.
          </p>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="text-lg px-8 py-6 hover-lift">
              <a href="#products" className="text-white">Browse Our Products</a>
            </Button>
          </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Features Grid */}
      <div className="relative py-24 sm:py-32 overflow-hidden bg-gradient-pattern-alt">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Why Choose Our Products
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              Quality You Can Trust
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We partner with leading manufacturers to bring you the best in quality and innovation.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <AnimatedCard
                key={feature.title}
                delay={index * 0.1}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-3 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gradient-animated">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>

      {/* Product Features */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Our Partners
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl mb-4">
            Proud Canadian Suppliers
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We partner with leading Canadian manufacturers to bring you the highest quality products and materials.
            Our commitment to supporting local businesses helps strengthen our community while ensuring you get the best value.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: 'Northstar Windows and Doors',
                url: 'https://www.northstarwindows.com/',
                description: 'Premium energy-efficient windows and doors manufactured in Ontario',
                category: 'Windows & Doors'
              },
              { 
                name: 'Royal Building Products',
                url: 'https://www.royalbuildingproducts.com/',
                description: 'Industry-leading exterior building materials and solutions',
                category: 'Exterior Products'
              },
              { 
                name: 'Mitten Building Products',
                url: 'https://www.mittensiding.com/',
                description: 'High-quality siding and exterior finishing products',
                category: 'Siding & Trim'
              },
              { 
                name: 'Premium Decking by Envision',
                url: 'https://envisionoutdoorliving.com/',
                description: 'Innovative composite decking solutions for outdoor living',
                category: 'Outdoor Living'
              },
              { 
                name: 'TruBilt Door Systems',
                url: 'https://www.trubilt.com/',
                description: 'Custom door solutions crafted with precision',
                category: 'Doors'
              },
              { 
                name: 'VanHoof Siding',
                url: 'https://www.vanhoofsiding.ca/',
                description: 'Local Chatham-Kent supplier of premium siding products',
                category: 'Siding'
              }
            ].map((supplier) => (
              <motion.div
                key={supplier.name}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-premium rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-sm font-medium text-blue-600 mb-2">
                  {supplier.category}
                </div>
                <h3 className="text-lg font-semibold text-gradient-animated mb-3">
                  {supplier.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {supplier.description}
                </p>
                <a 
                  href={supplier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Visit Website
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 italic max-w-2xl mx-auto">
              By choosing Canadian-made products, we ensure superior quality while supporting our local economy.
              Our partnerships with these trusted manufacturers allow us to offer you the best materials and
              warranty coverage for your home improvement projects.
            </p>
          </div>
        </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Why Choose Our Products
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl mb-4">
            Quality You Can Trust
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Experience the perfect blend of quality, innovation, and reliability with our carefully selected product range.
          </p>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Shield,
              title: 'Premium Quality',
              description: 'Top-tier materials and products from trusted manufacturers, built to last and exceed expectations.',
              color: 'from-blue-600 to-blue-800'
            },
            {
              icon: Zap,
              title: 'Energy Efficient',
              description: 'Products designed for optimal energy performance, helping you save on utility bills while protecting the environment.',
              color: 'from-green-600 to-green-800'
            },
            {
              icon: Ruler,
              title: 'Custom Sizes',
              description: 'Perfect fit guaranteed with our custom sizing options, ensuring seamless integration with your home.',
              color: 'from-amber-500 to-amber-700'
            },
            {
              icon: Palette,
              title: 'Style Options',
              description: "Wide selection of designs and finishes to match your home's aesthetic and personal preferences.",
              color: 'from-purple-600 to-purple-800'
            }
          ].map((feature, index) => (
            <AnimatedCard
              key={feature.title}
              delay={index * 0.1}
              className="flex flex-col items-center text-center p-8 hover:scale-105"
            >
              <div className={`rounded-2xl bg-gradient-to-br ${feature.color} p-4 text-white shadow-lg`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gradient-animated">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-6 w-12 h-1 rounded-full bg-gradient-to-r from-blue-600 to-red-600" />
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Product Catalog */}
      <div id="products" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Our Products
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              Browse Our Selection
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} />}
          
          {!isLoading && !error && filteredProducts.length === 0 && (
            <EmptyState message="No products found" />
          )}
          
          {/* Product Grid */}
          {!isLoading && !error && filteredProducts.length > 0 && (
          <AnimatedSection className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <AnimatedCard key={product.id} delay={index * 0.1} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <DeleteButton
                      id={product.id}
                      table="products"
                      title={product.title}
                      onDelete={() => {
                        setProducts(products.filter(p => p.id !== product.id));
                      }}
                    />
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    {product.tags && product.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                      <span className="text-sm text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{product.brand}</span>
                  </div>
                  <CardTitle className="mt-4">{product.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {product.description}
                  </CardDescription>
                  <ul className="mt-4 space-y-2">
                    {product.features?.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link to="/quote" className="flex items-center justify-center gap-2">
                      Request Quote
                    </Link>
                  </Button>
                </CardFooter>
              </AnimatedCard>
            ))}
          </AnimatedSection>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 mb-2">
              Testimonials
            </h2>
            <p className="text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              What Our Clients Say
            </p>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Hear directly from our satisfied customers about their experience working with us.
            </p>
          </div>
          <AnimatedSection className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-center sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-red-50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_30px_60px_rgb(0,0,0,0.35)] hover:scale-105"
              >
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 text-yellow-400 drop-shadow-md transition-transform duration-300 hover:scale-110"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-blue-200 opacity-50">"</span>
                  <p className="relative text-base leading-relaxed text-gray-700 italic">
                  {testimonial.content}
                  </p>
                  <span className="absolute -bottom-8 -right-2 text-6xl text-blue-200 opacity-50">"</span>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                    {testimonial.author}
                  </p>
                  {testimonial.location && (
                    <p className="text-sm text-gray-600 mt-1">{testimonial.location}</p>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </AnimatedSection>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden isolate">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-gradient-to-l from-blue-600/10 via-blue-400/5 to-transparent" />
        <div className="absolute inset-y-0 left-0 -z-10 w-1/2 bg-gradient-to-r from-red-600/10 via-red-400/5 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-4xl font-bold tracking-tight text-gradient-animated sm:text-5xl lg:text-6xl">
                    Ready to Transform Your Home?
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    Let our experts help you choose the perfect products for your home. Schedule a free consultation today and get personalized recommendations tailored to your needs.
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-3">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gradient-animated">Free Consultation</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Expert advice on the best solutions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-3">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gradient-animated">Quality Guaranteed</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Premium products and expert installation</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - CTA Card */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gradient-premium rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20"
                >
                  <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gradient-animated">
                        Get Started Today
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Take the first step towards your home improvement journey. Contact us for a free quote or call now to speak with our experts.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Button asChild size="lg" className="w-full text-lg py-6 hover-lift">
                        <Link to="/quote">Get Your Free Quote</Link>
                      </Button>
                      <Button 
                        asChild 
                        variant="outline" 
                        size="lg" 
                        className="w-full text-lg py-6 hover-lift"
                      >
                        <a href="tel:+15555555555" className="flex items-center justify-center gap-2">
                          <Phone className="h-5 w-5" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}