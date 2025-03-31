import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, Star, Info, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { PortfolioUploadModal } from '@/components/admin/portfolio-upload-modal';
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
import type { PortfolioProject } from '@/lib/types';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'windows', label: 'Windows' },
  { value: 'doors', label: 'Doors' },
  { value: 'exterior', label: 'Exterior Renovations' },
  { value: 'interior', label: 'Interior Finishing' },
];

const testimonials = [
  {
    content: "Tim's attention to detail and craftsmanship is exceptional. Our new windows look amazing and have made a huge difference in our home's comfort and energy efficiency.",
    author: "Sarah M.",
    location: "Chatham",
    rating: 5
  },
  {
    content: "Professional, reliable, and excellent quality work. Tim and his team completed our renovation project on time and exceeded our expectations.",
    author: "John D.",
    location: "Blenheim",
    rating: 5
  }
];

export function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setProjects(data);
      } catch (err) {
        console.error('Error fetching portfolio projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      (project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       project.description?.toLowerCase().includes(searchQuery.toLowerCase())) ?? false;
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper variant="premium">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop"
            alt="Portfolio showcase"
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
              Our Portfolio
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-white/90 max-w-2xl mx-auto">
              Explore our completed projects and see the quality of our work firsthand. From window installations to complete home renovations, we take pride in every project.
            </p>
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" className="text-lg px-8 py-6 hover-lift">
                <Link to="/quote" className="text-white">Start Your Project</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Portfolio Grid */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Featured Projects
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              Our Recent Work
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Browse through our portfolio of completed projects and see the transformations we create.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
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
          
          {!isLoading && !error && filteredProjects.length === 0 && (
            <EmptyState message="No portfolio projects found" />
          )}
          
          {/* Project Grid */}
          {!isLoading && !error && filteredProjects.length > 0 && (
            <AnimatedSection className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <AnimatedCard 
                  key={project.id} 
                  delay={index * 0.1} 
                  className="group cursor-pointer overflow-hidden"
                >
                  <CardHeader className="p-0">
                    <div className="relative">
                      <DeleteButton
                        id={project.id}
                        table="portfolio_projects"
                        title={project.title}
                        onDelete={() => {
                          setProjects(projects.filter(p => p.id !== project.id));
                        }}
                      />
                      <div className="relative aspect-[16/9] overflow-hidden group">
                        {project.before_image_url && (
                          <img
                            src={project.before_image_url}
                            alt={`${project.title} - Before`}
                            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-500 ease-in-out transform group-hover:scale-110 group-hover:opacity-0"
                          />
                        )}
                        <img
                          src={project.after_image_url}
                          alt={`${project.title} - After`}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
                        />
                        {project.before_image_url && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/75 text-white px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm">
                              Before & After
                            </div>
                          </div>
                        )}
                      </div>
                      <Badge
                        variant="secondary"
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm shadow-lg"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{project.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <CardTitle className="mt-4">{project.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                    <div className="mt-4">
                      <Button 
                        variant="ghost" 
                        className="p-0 hover:bg-transparent hover:text-blue-600"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Info className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </AnimatedSection>
          )}
        </div>
      </div>

      {/* Project Details Dialog */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                {selectedProject.before_image_url && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Before</h4>
                    <img
                      src={selectedProject.before_image_url}
                      alt="Before"
                      className="w-full rounded-lg object-cover aspect-[4/3]"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium mb-2">After</h4>
                  <img
                    src={selectedProject.after_image_url}
                    alt="After"
                    className="w-full rounded-lg object-cover aspect-[4/3]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Project Details</h4>
                  <ul className="space-y-2">
                    {selectedProject.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProject.testimonial_content && (
                  <div className="bg-gradient-card rounded-lg p-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-center italic">
                      "{selectedProject.testimonial_content}"
                    </p>
                    <div className="mt-4 text-center">
                      <p className="font-medium text-gradient-animated">
                        {selectedProject.testimonial_author}
                      </p>
                      {selectedProject.testimonial_role && (
                        <p className="text-sm text-gray-500">
                          {selectedProject.testimonial_role}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center mt-4">
                <Button asChild size="lg">
                  <Link to="/quote">Get a Quote for a Similar Project</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

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
                className="flex flex-col gap-6 rounded-3xl bg-gradient-card p-8 hover-lift"
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
                  <p className="relative text-base leading-relaxed text-gray-700 dark:text-gray-300 italic">
                  {testimonial.content}
                  </p>
                  <span className="absolute -bottom-8 -right-2 text-6xl text-blue-200 opacity-50">"</span>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="font-bold text-gradient-animated">
                    {testimonial.author}
                  </p>
                  {testimonial.location && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{testimonial.location}</p>
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