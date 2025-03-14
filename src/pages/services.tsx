import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppWindow as Window, DoorOpen, Home, PaintBucket, Hammer, Wrench, ChevronDown, ChevronUp, MapPin, Phone, Star, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/components/PageWrapper';
import { AnimatedSection } from '@/components/AnimatedSection';
import { AnimatedCard } from '@/components/AnimatedCard';
import { ServiceDetailsModal } from '@/components/services/ServiceDetailsModal';

const services = [
  {
    icon: Window,
    name: 'Window Installation & Replacement',
    description:
      "Expert installation of energy-efficient windows to enhance your home's comfort and curb appeal.",
    details: [
      'Energy-efficient window options',
      'Professional installation by experienced craftsmen',
      'Custom sizing and styles available',
      'Warranty-backed installations',
    ],
    image:
      'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80',
  },
  {
    icon: DoorOpen,
    name: 'Door Installation',
    description:
      'Beautiful, secure doors installed with precision to welcome you home.',
    details: [
      'Entry doors, patio doors, and storm doors',
      'Security-focused installation',
      'Wide selection of styles and materials',
      'Professional fitting and finishing',
    ],
    image:
      'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
  },
  {
    icon: Home,
    name: 'Custom Interior Renovations',
    description:
      'Transform your living space with custom renovations tailored to your needs.',
    details: [
      'Kitchen and bathroom renovations',
      'Framing and Custom Remodelling',
      'Florring & Trim',
      'Accent Walls and Custom Features',
    ],
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
  },
  {
    icon: PaintBucket,
    name: 'Exterior Upgrades',
    description:
      "Enhance your home's exterior with quality siding, fascia, and gutter installations.",
    details: [
      'Siding installation and repair',
      'Fascia and soffit replacement',
      'Gutter installation and maintenance',
      'Exterior trim work',
    ],
    image:
      'https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
  },
 
  {
    icon: Wrench,
    name: 'Home Maintenaince and Repairs',
    description:
      'Professional repairs and maintenance to keep your home in perfect condition.',
    details: [
      'Decks',
      'Fences',
      'Sheds',
      'General property maintenance',
    ],
    image:
      'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
];

const testimonials = [
  {
    content:
      'Tim did an amazing job with our window installation. His attention to detail and professionalism were outstanding. The results exceeded our expectations.',
    author: 'S. Johnson',
    location: '',
    rating: 5,
  },
  {
    content:
      'The quality of work on our home renovation was exceptional. Tim and his team were professional and reliable throughout the entire project. We could not be happier.',
    author: 'M. Thompson',
    location: '',
    rating: 5,
  },
];

const serviceAreas = [
  'Chatham',
  'Blenheim',
  'Ridgetown',
  'Tilbury',
  'Wallaceburg',
  'Dresden',
  'Thamesville',
  'Wheatley',
  'Rondeau Estates',
  'Erie Beach'
];

export function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <PageWrapper variant="premium">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?q=80&w=2070&auto=format&fit=crop"
          alt="Window installation"
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
            Horst Home Renovation Services
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-white/90 max-w-2xl mx-auto">
          30+ years of trusted craftsmanship, serving your home renovation needs
            with quality and care in Chatham-Kent.
          </p>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="text-lg px-8 py-6 hover-lift">
              <Link to="/quote" className="text-white">Request a Free Quote</Link>
            </Button>
          </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Services Grid */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 text-center">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl text-center">
           Home Improvement Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
            From window installations to complete home renovations, we provide
            expert craftsmanship for all your home improvement needs.
          </p>
        </div>

        <AnimatedSection className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 px-4">
          {services.map((service, index) => (
            <AnimatedCard 
              key={service.name} 
              delay={index * 0.1} 
              className="flex flex-col items-start bg-gradient-card p-6 sm:p-8 hover-lift"
            >
              <div className="mr-6 inline-flex rounded-xl p-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg">
                <service.icon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl sm:text-2xl font-bold text-gradient-animated mb-3">
                  {service.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                <span className="text-sm text-blue-600 font-medium mt-3 block">Est. {service.date}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 flex-shrink-0 ml-4"
                onClick={() => setSelectedService(service)}
              >
                <Info className="h-5 w-5 text-blue-600" />
              </Button>
            </AnimatedCard>
          ))}
        </AnimatedSection>
        </div>
      </div>
      
      {/* Service Details Modal */}
      {selectedService && (
        <ServiceDetailsModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      )}

      {/* Service Areas */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Service Areas
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              Serving Chatham-Kent & Surrounding Areas
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none bg-gradient-card p-8 rounded-3xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-blue-600" />
                  {area}
                </div>
              ))}
            </div>
          </div>
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