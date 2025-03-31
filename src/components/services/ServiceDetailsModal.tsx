import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    icon: LucideIcon;
    name: string;
    description: string;
    details: string[];
    image: string;
    importance?: {
      toClients: string;
      toTim: string;
      personalMessage: string;
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

const serviceImportance = {
  'Window Installation & Replacement': {
    toClients: "Energy-efficient windows not only enhance your home's comfort but also lead to significant savings on energy bills. Our professional installation ensures perfect fit and optimal performance.",
    toTim: "Window installation has been at the core of our business for over three decades. Each installation is a chance to improve a home's comfort and efficiency.",
    personalMessage: "I take immense pride in every window installation. The right windows, properly installed, can transform both the look and feel of your home. I personally oversee each project to ensure it meets our high standards of quality and craftsmanship."
  },
  'Door Installation': {
    toClients: "Your home's doors are crucial for security, energy efficiency, and curb appeal. Professional installation ensures proper operation and lasting performance.",
    toTim: "Door installation requires precision and attention to detail. It's about more than just functionality – it's about creating a welcoming entrance to your home.",
    personalMessage: "Every door installation is an opportunity to enhance both the security and beauty of your home. I ensure each door is perfectly fitted and operates smoothly, giving you peace of mind for years to come."
  },
  'Custom Interior Renovations': {
    toClients: "Interior renovations can dramatically improve your living space and increase your home's value. Our expertise ensures your vision becomes reality with minimal disruption.",
    toTim: "Interior renovations allow me to showcase the full range of our craftsmanship skills. Each project is unique and requires careful planning and execution.",
    personalMessage: "I love helping homeowners transform their living spaces. Whether it's a small update or a complete renovation, I treat each project with the same level of dedication and attention to detail."
  },
  'Exterior Upgrades': {
    toClients: "Your home's exterior is its first line of defense against the elements. Quality materials and expert installation protect your investment while enhancing curb appeal.",
    toTim: "Exterior work demands a thorough understanding of building science and weather protection. It's about creating a beautiful and durable shield for your home.",
    personalMessage: "I understand that your home's exterior is both its protection and its presentation to the world. My team and I work diligently to ensure every exterior project enhances both aspects."
  },
  'Home Maintenaince and Repairs': {
    toClients: "Regular maintenance and prompt repairs protect your investment and prevent small issues from becoming major problems. Our experienced team ensures everything is done right.",
    toTim: "Maintenance and repairs require a broad knowledge base and problem-solving skills. It's satisfying to help homeowners maintain their properties in top condition.",
    personalMessage: "I believe in addressing issues promptly and thoroughly. Whether it's routine maintenance or unexpected repairs, you can count on us to keep your home in excellent condition."
  }
};

export function ServiceDetailsModal({ isOpen, onClose, service }: ServiceDetailsModalProps) {
  const details = serviceImportance[service.name as keyof typeof serviceImportance];
  const Icon = service.icon;

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
                    className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                  >
                    <Icon className="h-8 w-8" />
                  </motion.div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-gradient-animated">
                      {service.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      {service.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Why This Matters to You</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {details.toClients}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Why This Matters to Us</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {details.toTim}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">A Personal Message from Tim</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {details.personalMessage}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Service Features</h3>
                    <ul className="space-y-2">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                          {detail}
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