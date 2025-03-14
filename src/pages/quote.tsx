import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InlineWidget } from 'react-calendly';
import { Phone, Mail, Star, Shield, Calendar, ArrowRight } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PageWrapper } from '@/components/PageWrapper';
import { AnimatedSection } from '@/components/AnimatedSection';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  timeline: z.string().min(1, 'Please select a timeline'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const projectTypes = [
  { value: 'windows', label: 'Window Installation' },
  { value: 'doors', label: 'Door Installation' },
  { value: 'siding', label: 'Siding & Exterior' },
  { value: 'interior', label: 'Interior Renovation' },
  { value: 'other', label: 'Other' },
];

const timelines = [
  { value: 'immediate', label: 'As Soon as Possible' },
  { value: '1-3months', label: '1-3 Months' },
  { value: '3-6months', label: '3-6 Months' },
  { value: '6months+', label: '6+ Months' },
];

const budgetRanges = [
  { value: 'under5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k+', label: '$50,000+' },
];

export function Quote() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      timeline: '',
      budget: '',
      message: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Here we would typically send the data to a backend service
      console.log('Form data:', data);
      
      toast({
        title: 'Quote Request Sent!',
        description: "We'll get back to you as soon as possible to discuss your project.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem sending your request. Please try again.',
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
            src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop"
            alt="Get a quote"
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
              Get Your Free Quote
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-white/90 max-w-2xl mx-auto">
              Take the first step towards your dream home. Fill out our form below or schedule a consultation to discuss your project.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

     {/* Quote Form Section */}
<div className="relative py-24 sm:py-32 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-12"> {/* Was 2 cols before */}
      {/* Quote Form */}
      <AnimatedSection className="bg-gradient-card p-8 rounded-3xl hover-lift">
        <h2 className="text-2xl font-bold text-gradient-animated mb-6">
          Request a Quote
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
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

            {/* Email + Phone */}
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

            {/* Project Type */}
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timeline + Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Timeline</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timelines.map((timeline) => (
                          <SelectItem key={timeline.value} value={timeline.value}>
                            {timeline.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Details</FormLabel>
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

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
            </Button>
          </form>
        </Form>
      </AnimatedSection>
    </div>
  </div>
</div> {/* ✅ Closes the section cleanly */}

      {/* Features Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gradient-animated sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Experience excellence in home renovation with our professional team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: '30+ Years Experience',
                description: 'Decades of expertise in home renovations and installations.'
              },
              {
                icon: Shield,
                title: 'Licensed & Insured',
                description: 'Fully licensed, bonded, and insured for your peace of mind.'
              },
              {
                icon: Calendar,
                title: 'Flexible Scheduling',
                description: 'Project timelines that work with your schedule.'
              },
              {
                icon: ArrowRight,
                title: 'Fast Turnaround',
                description: 'Efficient service without compromising on quality.'
              }
            ].map((feature, index) => (
              <AnimatedSection
                key={feature.title}
                className="bg-gradient-premium p-6 rounded-xl text-center hover-lift"
                delay={index * 0.1}
              >
                <div className="inline-flex rounded-xl p-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gradient-animated mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-pattern opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection className="bg-gradient-premium p-8 rounded-xl text-center hover-lift">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gradient-animated mb-2">
                Phone
              </h3>
              <a 
                href="tel:+19059647859"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                1(905) 964 7859
              </a>
            </AnimatedSection>

            <AnimatedSection className="bg-gradient-premium p-8 rounded-xl text-center hover-lift" delay={0.1}>
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gradient-animated mb-2">
                Email
              </h3>
              <a 
                href="mailto:Contact@horsthomes.ca"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                Contact@horsthomes.ca
              </a>
            </AnimatedSection>

            <AnimatedSection className="bg-gradient-premium p-8 rounded-xl text-center hover-lift" delay={0.2}>
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gradient-animated mb-2">
                Business Hours
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: By Appointment<br />
                Sunday: Closed
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}