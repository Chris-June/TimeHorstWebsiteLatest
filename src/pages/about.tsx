import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { AnimatedSection } from '../components/AnimatedSection';
import { AnimatedCard } from '../components/AnimatedCard';
import { FaTools, FaHardHat, FaHandshake, FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TimelineDetailsModal } from '@/components/about/TimelineDetailsModal';
import { Info } from 'lucide-react';
import { useState } from 'react';

const companyTimeline = [
  {
    title: 'Humble Beginnings',
    description: 'Growing up in a large family, we all had a love for carpentry and creativity. From an early age, I had a vision—I wanted to work for myself, providing quality workmanship and professional service while building strong relationships with every client.',
    date: '',
    icon: FaTools
  },
  {
    title: 'Community Growth',
    description: 'Through word-of-mouth recommendations and unwavering commitment to quality, the business expanded its services across Chatham-Kent.',
    date: '',
    icon: FaHandshake
  },
  {
    title: 'Expertise in Skilled Trades',
    description: 'I pursued my passion by attending college for construction trades, gaining valuable experience both in school and through hands-on training from industry professionals.',
    date: '',
    icon: FaHardHat
  },
  {
    title: 'Recognition',
    description: 'Now, I strive to bring all these qualities and expertise to the Chatham-Kent community, ensuring that every project reflects the dedication, craftsmanship, and care that our clients deserve.',
    date: '',
    icon: FaTrophy
  }
];



export function About() {
  const [selectedMilestone, setSelectedMilestone] = useState<typeof companyTimeline[0] | null>(null);

  return (
    <PageWrapper variant="premium">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop"
            alt="Home renovation project"
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
            Crafting Homes, Building Dreams
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-white/90 max-w-2xl mx-auto">
            With over three decades of dedicated service, Tim Horst has been transforming houses into homes. Our journey is defined by passion, precision, and a profound commitment to excellence in every project we undertake.
          </p>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="text-lg px-8 py-6 hover-lift">
              <Link to="/quote" className="text-white">Get a Free Quote</Link>
            </Button>
          </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Company Timeline */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-blue-600 text-center">
          Our Journey
        </h2>
        <h3 className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl text-center">
          Our Evolutionary Journey
        </h3>
        <p className="mt-4 mb-8 text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
          From humble beginnings to industry leadership, discover the milestones that have shaped our commitment to excellence.
        </p>
        <div className="space-y-8">
          {companyTimeline.map((milestone, index) => (
            <AnimatedCard 
              key={index} 
              delay={index * 0.2} 
              className="flex items-center bg-gradient-card p-6 sm:p-8 hover-lift"
            >
              <div className="mr-6 inline-flex rounded-xl p-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg">
                <milestone.icon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl sm:text-2xl font-bold text-gradient-animated mb-3">
                  {milestone.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{milestone.description}</p>
                
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 flex-shrink-0 ml-4"
                onClick={() => setSelectedMilestone(milestone)}
              >
                <Info className="h-5 w-5 text-blue-600" />
              </Button>
            </AnimatedCard>
          ))}
        </div>
        </div>
      </div>

          {/* Timeline Details Modal */}
          {selectedMilestone && (
            <TimelineDetailsModal
              isOpen={!!selectedMilestone}
              onClose={() => setSelectedMilestone(null)}
              milestone={selectedMilestone}
            />
          )}

      {/* Mission & Values */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-gradient-card p-10 rounded-3xl hover-lift">
        <h2 className="text-base font-semibold leading-7 text-blue-600 text-center">
          Our Purpose
        </h2>
        <h3 className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl text-center mb-8">
          Our Mission & Core Values
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="p-6 rounded-2xl bg-gradient-premium shadow-lg">
              <h4 className="text-xl font-bold mb-4 text-gradient-animated">
                Mission Statement
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To provide exceptional home renovation services that not only meet but exceed our clients' expectations, by combining traditional craftsmanship with modern innovation.
              </p>
            </div>
          </div>
          <div>
            <div className="p-6 rounded-2xl bg-gradient-premium shadow-lg">
              <h4 className="text-xl font-bold mb-4 text-gradient-animated">
                Our Core Values
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-300">Integrity in Every Detail</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-300">Customer-Centric Approach</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-300">Professional Workmanship</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-300">Sustainable Practices</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-600 dark:text-gray-300">Affordable Pricing with Guarantees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>
      </div>
      </div>

    </PageWrapper>
  );
}