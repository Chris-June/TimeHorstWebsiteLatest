import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PageWrapper } from '@/components/PageWrapper';
import { AnimatedSection } from '@/components/AnimatedSection';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/HORST-HOME-Improvements/61572186766274/?mibextid=wwXIfr&rdid=k9lFspogE0NKm228&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ECEMKZNsA%2F%3Fmibextid%3DwwXIfr',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/horsthomes/',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: Linkedin,
  },
  {
    name: 'X (Twitter)',
    href: '#',
    icon: Twitter,
  },
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Here we would typically send the data to a backend service
      console.log('Form data:', data);
      
      toast({
        title: 'Message Sent!',
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageWrapper variant="premium">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
            alt="Contact Tim Horst"
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
              Let's Talk About Your Next Project
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-white/90 max-w-2xl mx-auto">
              Contact Horst Homes today for expert window installation and home renovation services in Chatham-Kent.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Contact Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-gradient-card p-8 rounded-3xl hover-lift">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Contact Us</h2>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated">Get in Touch</h3>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Ready to start your project? Have questions about our services? We're here to help.
              </p>

              <dl className="mt-8 space-y-6 divide-y divide-gray-100 dark:divide-gray-800">
                <div className="flex gap-x-4 py-6">
                  <dt>
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Phone className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                  </dt>
                  <dd>
                    <p className="text-sm font-semibold text-gradient-animated">Phone</p>
                    <a
                      href="tel:+19059647859"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                    >
                      1(905) 964 7859
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4 py-6">
                  <dt>
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Mail className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                  </dt>
                  <dd>
                    <p className="text-sm font-semibold text-gradient-animated">Email</p>
                    <a
                      href="mailto:Contact@horsthomes.ca"
                      className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                    >
                      Contact@horsthomes.ca
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4 py-6">
                  <dt>
                    <div className="rounded-lg bg-blue-100 p-2">
                      <MapPin className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                  </dt>
                  <dd>
                    <p className="text-sm font-semibold text-gradient-animated">Location</p>
                    <p className="text-base text-gray-600 dark:text-gray-300">
                      Serving Chatham-Kent and surrounding areas
                    </p>
                  </dd>
                </div>
              </dl>

              {/* Social Links */}
              <div className="mt-8 bg-gradient-premium rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gradient-animated">Follow Us</h3>
                <div className="mt-4 flex gap-x-6 justify-center">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transform hover:scale-110 transition-all duration-300"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 bg-gradient-premium rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gradient-animated mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Saturday</span>
                    <span>By Appointment</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <AnimatedSection className="bg-gradient-card p-8 rounded-3xl hover-lift">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Contact Form</h2>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated">Send Us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 555-5555" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Service Area Map Placeholder */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Service Area</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              Serving Chatham-Kent & Surrounding Areas
            </p>
          </div>
          <div className="bg-gradient-card rounded-3xl p-8 hover-lift">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[
                'Chatham',
                'Blenheim',
                'Ridgetown',
                'Tilbury',
                'Wallaceburg',
                'Dresden',
                'Thamesville',
                'Wheatley',
                'Erie Beach',
                'Pain Court',
                'Merlin',
                'Rondeau'
              ].map((area) => (
                <div key={area} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}