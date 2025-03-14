import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, ImagePlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import { getCroppedImg } from '@/lib/image-utils';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const modalVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 25,
      stiffness: 500,
      duration: 0.5 
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.3 }
  }
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const portfolioSchema = z.object({
  title: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(2, "Location is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Status is required"),
  details: z.array(z.string().min(1, "Detail cannot be empty")),
  testimonial_content: z.string().min(10, "Testimonial content must be at least 10 characters"),
  testimonial_author: z.string().min(2, "Testimonial author is required"),
  testimonial_role: z.string().optional(),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

export function PortfolioUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [beforeImageUrl, setBeforeImageUrl] = useState<string | null>(null);
  const [afterImageUrl, setAfterImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentImageType, setCurrentImageType] = useState<'before' | 'after'>('before');
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue,
    watch
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      details: [''],
      status: 'Completed'
    }
  });

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageCrop = async () => {
    try {
      if (!tempImageUrl || !croppedAreaPixels) return;

      const croppedImage = await getCroppedImg(tempImageUrl, croppedAreaPixels);
      
      if (croppedImage) {
        const file = await fetch(croppedImage)
          .then(r => r.blob())
          .then(blob => new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' }));

        await uploadImage(file, currentImageType);
        setIsCropping(false);
        setTempImageUrl(null);
      }
    } catch (error) {
      toast.error('Image Crop Failed', {
        description: 'Unable to crop the image. Please try again.',
      });
    }
  };

  const uploadImage = async (file: File, type: 'before' | 'after') => {
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Invalid File Type", {
        description: "Please upload a JPEG, PNG, WebP, or GIF image.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File Too Large", {
        description: "Image must be less than 5MB.",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(data.path);

      if (type === 'before') {
        setBeforeImageUrl(publicUrl);
      } else {
        setAfterImageUrl(publicUrl);
      }
      
      toast.success("Image Uploaded", {
        description: `${type === 'before' ? 'Before' : 'After'} image has been uploaded successfully.`
      });
    } catch (error) {
      toast.error("Upload Error", {
        description: error instanceof Error ? error.message : 'Failed to upload image',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[], type: 'before' | 'after') => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempImageUrl(reader.result as string);
        setCurrentImageType(type);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps: getBeforeRootProps, getInputProps: getBeforeInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'before'),
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif']
    },
    maxSize: MAX_FILE_SIZE
  });

  const { getRootProps: getAfterRootProps, getInputProps: getAfterInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'after'),
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif']
    },
    maxSize: MAX_FILE_SIZE
  });

  const onSubmit = async (data: PortfolioFormData) => {
    if (!afterImageUrl) {
      toast.error("Upload Required", {
        description: 'Please upload an after image',
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('portfolio_projects')
        .insert([{
          title: data.title,
          description: data.description,
          category: data.category,
          location: data.location,
          date: data.date,
          status: data.status,
          details: data.details.filter(detail => detail.trim() !== ''),
          before_image_url: beforeImageUrl,
          after_image_url: afterImageUrl,
          testimonial_content: data.testimonial_content,
          testimonial_author: data.testimonial_author,
          testimonial_role: data.testimonial_role,
          created_by: user.id
        }]);

      if (error) throw error;

      toast.success("Project Added", {
        description: 'Your portfolio project has been successfully added.'
      });
      
      reset();
      setIsOpen(false);
      setBeforeImageUrl(null);
      setAfterImageUrl(null);
    } catch (error) {
      toast.error("Upload Failed", {
        description: error instanceof Error ? error.message : 'Failed to upload project',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
          Add Portfolio Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg border-2 border-blue-500/20 shadow-[0_8px_40px_rgb(0,0,0,0.12)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
            Add New Portfolio Project
          </DialogTitle>
          <DialogDescription>
            Showcase your work by adding a new project to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <motion.form 
          onSubmit={handleSubmit(onSubmit)} 
          className="grid gap-6"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Project Title</Label>
              <Input 
                {...register('title')} 
                placeholder="Enter project title" 
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
              <Label>Project Category</Label>
              <Select onValueChange={(value) => setValue('category', value)}>
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="windows">Windows</SelectItem>
                  <SelectItem value="doors">Doors</SelectItem>
                  <SelectItem value="exterior">Exterior Renovations</SelectItem>
                  <SelectItem value="interior">Interior Finishing</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
          </div>

          <div>
            <Label>Project Description</Label>
            <Textarea 
              {...register('description')} 
              placeholder="Enter project description" 
              className="min-h-[120px] bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Location</Label>
              <Input 
                {...register('location')} 
                placeholder="Project location" 
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            <div>
              <Label>Project Date</Label>
              <Input 
                type="date" 
                {...register('date')} 
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>
          </div>

          <div>
            <Label>Project Status</Label>
            <Select onValueChange={(value) => setValue('status', value)} defaultValue="Completed">
              <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Before Image</Label>
              <div 
                {...getBeforeRootProps()} 
                className="border-2 border-dashed p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <input {...getBeforeInputProps()} />
                <div className="flex flex-col items-center justify-center">
                  <ImagePlus className="text-gray-400 mb-2" size={40} />
                  <p className="text-sm text-gray-600">
                    Upload before image
                  </p>
                </div>
              </div>
              {beforeImageUrl && (
                <img 
                  src={beforeImageUrl} 
                  alt="Before" 
                  className="mt-2 rounded-lg shadow-md" 
                />
              )}
            </div>

            <div>
              <Label>After Image</Label>
              <div 
                {...getAfterRootProps()} 
                className="border-2 border-dashed p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <input {...getAfterInputProps()} />
                <div className="flex flex-col items-center justify-center">
                  <ImagePlus className="text-gray-400 mb-2" size={40} />
                  <p className="text-sm text-gray-600">
                    Upload after image
                  </p>
                </div>
              </div>
              {afterImageUrl && (
                <img 
                  src={afterImageUrl} 
                  alt="After" 
                  className="mt-2 rounded-lg shadow-md" 
                />
              )}
            </div>
          </div>

          <div>
            <Label>Project Details</Label>
            <div className="space-y-2">
              {watch('details')?.map((_, index) => (
                <Input
                  key={index}
                  {...register(`details.${index}`)}
                  placeholder={`Detail ${index + 1}`}
                  className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const currentDetails = watch('details') || [];
                setValue('details', [...currentDetails, '']);
              }}
              className="mt-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Add Detail
            </Button>
          </div>

          <div>
            <Label>Testimonial</Label>
            <div className="space-y-4">
              <Textarea
                {...register('testimonial_content')}
                placeholder="Client testimonial"
                className="min-h-[100px] bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.testimonial_content && (
                <p className="text-red-500 text-sm">{errors.testimonial_content.message}</p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    {...register('testimonial_author')}
                    placeholder="Client name"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                  {errors.testimonial_author && (
                    <p className="text-red-500 text-sm">{errors.testimonial_author.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    {...register('testimonial_role')}
                    placeholder="Client role/title (optional)"
                    className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </motion.form>

        <AnimatePresence>
          {isCropping && tempImageUrl && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            >
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white p-4 rounded-lg max-w-2xl w-full"
              >
                <div className="relative h-[400px]">
                  <Cropper
                    image={tempImageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      setIsCropping(false);
                      setTempImageUrl(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleImageCrop}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Crop & Upload
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}