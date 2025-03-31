import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, Star, Calendar, User, Clock, ArrowRight, Share2, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { BlogUploadModal } from '@/components/admin/blog-upload-modal';
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import type { BlogPost } from '@/lib/types';

const categories = [
  { value: 'all', label: 'All Posts' },
  { value: 'tips', label: 'Tips & Advice' },
  { value: 'projects', label: 'Project Highlights' },
  { value: 'trends', label: 'Industry Trends' },
  { value: 'guides', label: 'How-to Guides' },
  { value: 'news', label: 'Company News' }
];

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) throw error;

        setPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      (post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.content?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false;
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper variant="premium">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop"
            alt="Home renovation blog"
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
            <h1 className="text-4xl pb-1 font-bold tracking-tight text-gradient-animated sm:text-6xl lg:text-7xl mb-6">
              Home Renovation Tips, Tricks & Insights
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-white/90 max-w-2xl mx-auto">
              Expert advice, project highlights, and the latest in home improvement from Horst Home Improvements.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Blog Feed */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Horst Homes
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              Welcome to Contractors Corner
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
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
          
          {!isLoading && !error && filteredPosts.length === 0 && (
            <EmptyState message="No blog posts found" />
          )}
          
          {/* Blog Grid */}
          {!isLoading && !error && filteredPosts.length > 0 && (
          <AnimatedSection className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {filteredPosts.map((post, index) => (
              <Dialog key={post.id} open={selectedPost?.id === post.id} onOpenChange={(open) => !open && setSelectedPost(null)}>
                <DialogTrigger asChild>
                  <AnimatedCard 
                    delay={index * 0.1} 
                    className="cursor-pointer overflow-hidden bg-gradient-card hover-lift"
                    onClick={() => setSelectedPost(post)}
                  >
                  <CardHeader className="p-0">
                    <div className="relative">
                      <DeleteButton
                        id={post.id}
                        table="blog_posts"
                        title={post.title}
                        onDelete={() => {
                          setPosts(posts.filter(p => p.id !== post.id));
                        }}
                      />
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="aspect-[16/9] w-full object-cover"
                      />
                      {post.tags && post.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex gap-2">
                          {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.published_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.read_time}
                      </div>
                    </div>
                    <CardTitle className="mt-4">{post.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {post.content.slice(0, 150)}...
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button variant="ghost" className="ml-auto">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                  </AnimatedCard>
                </DialogTrigger>

                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{post.title}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.published_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.read_time}
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="relative">
                    <img
                      src={post.image_url}
                      alt={post.title} 
                      className="w-full rounded-lg object-cover max-h-[400px]"
                    />
                  </div>
                  <div className="mt-4 prose prose-blue max-w-none">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-600 dark:text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-2">
                      {post.tags && post.tags.length > 0 && (
                        post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </AnimatedSection>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Subscribe to our newsletter for the latest home improvement tips and insights.
            </p>
            <div className="mt-6 flex max-w-md mx-auto gap-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto"
              />
              <Button>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden isolate">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-gradient-to-l from-blue-600/10 via-blue-400/5 to-transparent" />
        <div className="absolute inset-y-0 left-0 -z-10 w-1/2 bg-gradient-to-r from-red-600/10 via-red-400/5 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="text-4xl font-bold tracking-tight text-gradient-animated sm:text-5xl lg:text-6xl">
                    Ready to Transform Your Home?
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    Let's discuss your vision and create something amazing together. Our expert team is ready to bring your dream home to life with quality craftsmanship and exceptional service.
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-3">
                        <Star className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gradient-animated">30+ Years Experience</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Trusted craftsmanship since 1994</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-3">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gradient-animated">Quality Guaranteed</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Professional service & satisfaction</p>
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
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gradient-premium rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20"
                >
                  <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gradient-animated">
                        Get Started Today
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Take the first step towards your dream home. Contact us for a free quote or call now to speak with our experts.
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