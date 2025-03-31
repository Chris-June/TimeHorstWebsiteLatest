import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';

interface TimelineDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestone: {
    title: string;
    description: string;
    date: string;
    icon: IconType;
    details?: {
      personalMessage: string;
      impact: string;
      achievements: string[];
    };
  };
}

const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.3
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const milestoneDetails = {
  'Humble Beginnings': {
    personalMessage: "Starting this business was a leap of faith. I had my skills, my tools, and an unwavering commitment to quality work. Every window I installed back then was more than just a job – it was a chance to prove myself and build trust in our community.",
    impact: "Those early years taught me the value of personal connections and word-of-mouth referrals. Each satisfied customer became part of our extended family, and their trust helped lay the foundation for everything we've built since.",
    achievements: [
      'Secured our first major window installation project',
      'Our reputation and word of mouth referrals helped expand our reach and connections',
      'Developed relationships with quality suppliers',
      'Built reputation for reliability and craftsmanship'
    ]
  },
  'Community Growth': {
    personalMessage: "The early years were transformative. As our reputation grew, so did the trust people placed in us. Every recommendation from a satisfied customer meant another family welcoming us into their home, another chance to demonstrate our commitment to excellence.",
    impact: "This organic growth allowed us to maintain our high standards while expanding our services. We weren't just growing a business – we were strengthening our bonds with the community.",
    achievements: [
      'Expanded our service offerings',
      'Added comprehensive renovation services',
      'Built strong contractor partnerships',
      'Increased workforce with skilled local talent'
    ]
  },
  'Expertise in Skilled Trades': {
    personalMessage: "Each year brought new challenges and opportunities. We embraced modern techniques while holding onto our traditional values. Every new service we added was carefully considered to ensure we could deliver the same level of excellence our clients had come to expect.",
    impact: "This period of growth allowed us to offer more comprehensive solutions to our clients, turning their renovation dreams into reality while maintaining the personal touch that set us apart from the beginning.",
    achievements: [
      'Introduced full home renovation services',
      'Implemented advanced installation techniques',
      'Developed custom solution capabilities',
      'Established training program for new staff'
    ]
  },
  Recognition: {
    personalMessage: "The recognition we've received in recent years are a testament to our team's dedication. But what truly matters isn't the accolades – it's the satisfaction of our clients and the lasting relationships we've built over decades of service.",
    impact: "The referrals from past clients have reinforced our commitment to excellence and pushed us to continue raising the bar in everything we do. It represents not just our success, but the trust our community has placed in us.",
    achievements: [
      '800+ client referrals',
      '1000+ completed projects',
      'Environmental sustainability',
      '30+ years experience and still going'
    ]
  }
};

export function TimelineDetailsModal({ isOpen, onClose, milestone }: TimelineDetailsModalProps) {
  const details = milestoneDetails[milestone.title as keyof typeof milestoneDetails];
  const Icon = milestone.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg border-2 border-blue-500/20">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="p-3 rounded-lg bg-blue-50 text-blue-600"
                  >
                    <Icon className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
                      {milestone.title} - {milestone.date}
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      {milestone.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">A Personal Reflection</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {details.personalMessage}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Community Impact</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {details.impact}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Key Achievements</h3>
                    <ul className="space-y-2">
                      {details.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}