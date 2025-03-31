import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
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

// Zod schema for validation
const blogSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(2, "Author name is required"),
  read_time: z.string().min(1, "Read time is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

export function BlogUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema)
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid File Type", {
        description: "Please upload a JPEG, PNG, WebP, or GIF image.",
      });
      return;
    }

    // Check file size (max 4MB)
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (file.size > maxSize) {
      toast.error("File Too Large", {
        description: "Image must be less than 4MB.",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Upload to Supabase Storage
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${Date.now()}_${sanitizedFileName}`;
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path);

      setImageUrl(publicUrl);
      toast.success("Success", {
        description: "Image uploaded successfully"
      });
    } catch (error) {
      toast.error("Upload Error", {
        description: error instanceof Error ? error.message : 'Failed to upload image',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    if (!imageUrl) {
      toast.error("Error", {
        description: 'Please upload a featured image',
      });
      return;
    }

    try {
      // Insert blog post into Supabase
      const { error } = await supabase
        .from('blog_posts')
        .insert([
          {
            ...data,
            image_url: imageUrl,
            published_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      toast.success("Success", {
        description: 'Blog post published successfully'
      });
      reset();
      setIsOpen(false);
      setImageUrl(null);
    } catch (error) {
      console.error('Error publishing blog post:', error);
      toast.error("Error", {
        description: 'Failed to publish blog post',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">
          Add Blog Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg border-2 border-blue-500/20 shadow-[0_8px_40px_rgb(0,0,0,0.12)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
            Create New Blog Post
          </DialogTitle>
          <DialogDescription>
            Share your insights and expertise with your audience.
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
          <div>
            <Label>Blog Title</Label>
            <Input 
              {...register('title')} 
              placeholder="Enter blog title" 
              className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select onValueChange={(value) => setValue('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" className="h-12" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tips">Tips & Advice</SelectItem>
                  <SelectItem value="projects">Project Highlights</SelectItem>
                  <SelectItem value="trends">Industry Trends</SelectItem>
                  <SelectItem value="guides">How-to Guides</SelectItem>
                  <SelectItem value="news">Company News</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            <div>
              <Label>Read Time</Label>
              <Input 
                {...register('read_time')} 
                placeholder="5 min read" 
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
              {errors.read_time && <p className="text-red-500 text-sm">{errors.read_time.message}</p>}
            </div>
          </div>

          <div>
            <Label>Author</Label>
            <Input 
              {...register('author')} 
              placeholder="Author name" 
              className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
          </div>

          <div>
            <Label>Content</Label>
            <Textarea 
              {...register('content')} 
              placeholder="Write your blog post content here..." 
              className="min-h-[200px] bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>

          <div>
            <Label>Featured Image</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="w-full h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
                <Button
                  type="button"
                  disabled={isUploading}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200"
                  onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                >
                  <Upload size={20} />
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Accepted formats: JPEG, PNG, WebP, GIF (max 4MB)
              </p>
            </div>
            {imageUrl && (
              <div className="mt-2">
                <img 
                  src={imageUrl} 
                  alt="Blog featured image" 
                  className="max-w-xs rounded-lg shadow-md" 
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white font-semibold h-12 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Publish Post
            </Button>
          </DialogFooter>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}