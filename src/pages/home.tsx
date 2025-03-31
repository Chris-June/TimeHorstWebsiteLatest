import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Star, Info, Shield, Award, Zap, Hammer, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/components/PageWrapper';
import { AnimatedSection } from '@/components/AnimatedSection';
import { AnimatedCard } from '@/components/AnimatedCard';
import { FeatureDetailsModal } from '@/components/features/FeatureDetailsModal';
import { containerVariants, itemVariants } from '@/lib/animations';

const stats = [
  { label: 'Years Experience', value: '30+' },
  { label: 'Projects Completed', value: '1000+' },
  { label: 'Referred Clients', value: '800+' },
  { label: 'Service Areas', value: '10+' },
];

const features = [
  {
    icon: Shield,
    name: '30+ Years Experience',
    description: 'Decades of expertise in window installations and home renovations.',
    color: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white',
  },
  {
    icon: Award,
    name: 'Quality Craftsmanship',
    description: 'Attention to detail and superior workmanship in every project.',
    color: 'bg-gradient-to-br from-red-600 to-red-800 text-white',
  },
  {
    icon: Zap,
    name: 'WSIB Certified',
    description: 'Fully certified and compliant with all safety standards.',
    color: 'bg-gradient-to-br from-amber-500 to-amber-700 text-white',
  },
  {
    icon: Hammer,
    name: 'Fully Insured',
    description: 'Complete coverage for your peace of mind.',
    color: 'bg-gradient-to-br from-green-600 to-green-800 text-white',
  },
  {
    icon: Building2,
    name: 'Member of the Chatham-Kent Chamber of Commerce',
    description: 'Proud member of our local business community.',
    color: 'bg-gradient-to-br from-purple-600 to-purple-800 text-white',
  }
];

const testimonials = [
  {
    content: "We've known Tim from Horst Home Improvements for years—his craftsmanship has stood the test of time, starting with my parents' windows and doors over 35 years ago. From windows, doors, and siding to meticulous aluminum work, his attention to detail is unmatched. His latest project for us, a beautifully crafted covered deck, was no exception. Tim shows up on time, delivers flawless work, and leaves the site spotless—highly recommended!",
    author: "Jim B.",
    rating: 5
  },

  {
    content: "I have had Tim replace all my windows at my residence. I can say that the workmanship, quality and his knowledge was Outstanding.  I also found the cost to be very reasonable and Tim to be very friendly. I have passed Tim's name to many of my friends, and they had Tim replace their windows and doors and also had Tim do other work around their houses. The feedback I received was that they thanked me for giving Tim name and also they found Tims work to be outstanding.  Above all I found Tim to be very reliable.",
    author: "Tony",
    rating: 5
  },
  
  {
    content: "It was a pleasure having Tim and his team take care of replacing all my windows and sliding doors. I initially chose Tim because he was local but also very flexible, professional and personable. I am very happy with Tim's service and would hire him again for future projects. Thanks Tim",
    author: "James T.",
    rating: 5
  }
];

function Home() {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <PageWrapper variant="premium">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop')`,
              filter: 'brightness(0.5)',
            }}
            data-aos="zoom-out"
            data-aos-duration="2000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
        </div>
        <div className="relative z-10 w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="text-center mx-auto max-w-3xl"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gradient-animated sm:text-6xl lg:text-7xl mb-6">
              Horst Home Improvements
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-8 text-white/90 max-w-2xl mx-auto">
             With more than 30 years of experience, we proudly provide Chatham-Kent homeowners with outstanding craftsmanship and dependable service.
            </p>
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" className="text-lg px-8 py-6 hover-lift">
                <Link to="/quote" className="text-white">Get a Free Quote</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 text-white border-white/30 hover:bg-white/10 hover:border-white/50"
              >
                <Link to="/portfolio" className="flex items-center gap-2">
                  View Our Work
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Stats Section */}
      <div className="relative py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-pattern opacity-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gradient-premium rounded-xl p-8 text-center hover-lift"
              >
                <div className="text-4xl font-bold text-gradient-animated mb-3">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <AnimatedSection 
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
        variant="premium"
      >
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 text-center">
            Why Choose Horst Homes
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl text-center">
            Experience the Difference
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 text-center max-w-2xl mx-auto">
            Delivering quality craftsmanship and exceptional service to every
            project, big or small.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={itemVariants}
              className="relative overflow-hidden rounded-3xl bg-gradient-card p-6 sm:p-8 hover-lift"
            >
              <div className={`inline-flex rounded-xl p-4 ${feature.color} shadow-lg`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <h3 className="text-lg sm:text-xl font-bold text-gradient-animated">
                  {feature.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <Info className="h-4 w-4 text-blue-600" />
                </Button>
              </div>
              <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      {/* Feature Details Modal */}
      {selectedFeature && (
        <FeatureDetailsModal
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
          feature={selectedFeature}
        />
      )}

      {/* Testimonials Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-2xl lg:text-center">
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
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-center sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col gap-6 rounded-3xl bg-gradient-card p-8 hover-lift"
            >
              <div className="flex justify-center space-x-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 blur-xl" />
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="relative h-6 w-6 text-yellow-400 drop-shadow-lg transition-transform duration-300 hover:scale-110"
                    fill="currentColor"
                  />
                ))}
              </div>
              <div className="relative">
                <span className="absolute -top-4 -left-2 text-6xl text-gradient-animated opacity-50">"</span>
                <p className="relative text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 italic">
                {testimonial.content}
                </p>
                <span className="absolute -bottom-8 -right-2 text-6xl text-gradient-animated opacity-50">"</span>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="font-bold text-gradient-animated">
                  {testimonial.author}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
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

export default Home;