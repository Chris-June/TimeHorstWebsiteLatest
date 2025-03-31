import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    icon: LucideIcon;
    name: string;
    description: string;
    color: string;
    details?: {
      personalMessage: string;
      clientBenefit: string;
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

const featureDetails = {
  '30+ Years Experience': {
    personalMessage: "Every project we take on carries the weight of three decades of learning, growth, and dedication. This isn't just about installing windows or renovating homes – it's about the countless families we've had the privilege to help, and the trust that's been placed in our hands year after year.",
    clientBenefit: "When you choose someone with decades of experience, you're getting peace of mind. Every challenge has been seen before, every problem has a tried-and-true solution, and every project benefits from years of refined craftsmanship."
  },
  'Quality Craftsmanship': {
    personalMessage: "Craftsmanship isn't just about the end result – it's about the pride and care taken in every step of the process. We treat each project as if we were working on our own home, paying attention to the smallest details because we believe that's what makes the difference between good work and exceptional work.",
    clientBenefit: "Quality craftsmanship means your home improvements will stand the test of time. It means fewer repairs, better energy efficiency, and a finished product that not only functions perfectly but adds lasting value to your home."
  },
  'WSIB Certified': {
    personalMessage: "Safety and compliance are fundamental to our business. Being WSIB certified means we maintain the highest standards of workplace safety and professional conduct. It's about protecting our team and our clients while delivering exceptional results.",
    clientBenefit: "Working with a WSIB certified contractor gives you complete peace of mind. You know that your project is being handled by a properly insured and compliant professional who takes safety seriously."
  },
  'Fully Insured': {
    personalMessage: "Having comprehensive insurance coverage is about more than just meeting requirements – it's about providing absolute peace of mind to our clients. We take full responsibility for every aspect of our work, backed by complete insurance coverage.",
    clientBenefit: "With full insurance coverage, you can rest easy knowing that your property and investment are protected. Our comprehensive coverage ensures that you're never exposed to liability or unexpected costs during your renovation project."
  },
  'Member of the Chatham-Kent Chamber of Commerce': {
    personalMessage: "Being a member of the Chamber of Commerce reflects our commitment to the local business community. It's about being part of something bigger than ourselves and contributing to the growth and prosperity of our region.",
    clientBenefit: "When you work with a Chamber member, you're choosing a business that's invested in the community's success. We maintain high standards of professionalism and ethics, backed by our Chamber membership and reputation."
  }
};

export function FeatureDetailsModal({ isOpen, onClose, feature }: FeatureDetailsModalProps) {
  const details = featureDetails[feature.name as keyof typeof featureDetails];
  const Icon = feature.icon;

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
                    className={`p-3 rounded-lg ${feature.color}`}
                  >
                    <Icon className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
                      {feature.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      {feature.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Why This Matters to Us</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {details.personalMessage}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Why This Matters to You</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {details.clientBenefit}
                    </p>
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