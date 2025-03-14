import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Trash2, PlusCircle, ImagePlus, Tag, Package, DollarSign } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

import Cropper from 'react-easy-crop';  
import { Point, Area } from 'react-easy-crop';
import { getCroppedImg } from '../../lib/image-utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';

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

const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  price: z.number({ invalid_type_error: "Price must be a number" }).min(0, "Price must be greater than or equal to 0"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url().optional(),
  variants: z.array(
    z.object({
      name: z.string().min(1, "Variant name is required"),
      price: z.number().min(0, "Variant price must be greater than or equal to 0"),
      stock: z.number().int().min(0, "Stock must be a non-negative number")
    })
  ).optional(),
  inStock: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductsUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [newTag, setNewTag] = useState('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue,
    control,
    watch
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      inStock: true,
      variants: [{ name: 'Default', price: 0, stock: 0 }],
      tags: []
    }
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'variants',
  });

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageCrop = async () => {
    try {
      if (!imageUrl) {
        console.error('No image URL available for cropping');
        return;
      }

      // Add null check for croppedAreaPixels
      if (!croppedAreaPixels) {
        console.error('No cropped area pixels defined');
        return;
      }

      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      
      if (croppedImage) {
        const file = await fetch(croppedImage)
          .then(r => r.blob())
          .then(blob => new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' }));

        await uploadImage(file);
        setIsCropping(false);
      }
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const uploadImage = async (file: File) => {
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Invalid File Type", {
        description: "Please upload a JPEG, PNG, WebP, or GIF image."
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File Too Large", {
        description: "Image must be less than 5MB."
      });
      return;
    }

    try {
      setIsUploading(true);
      
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path);

      setImageUrl(publicUrl);
      setValue('imageUrl', publicUrl);
      
      toast.success("Image Uploaded", {
        description: "Your product image has been successfully uploaded."
      });
    } catch (error) {
      toast.error("Upload Error", {
        description: error instanceof Error ? error.message : 'Failed to upload image'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          setImageUrl(img.src);
          setIsCropping(true);
        };
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif']
    },
    maxSize: MAX_FILE_SIZE
  });

  const addTag = () => {
    if (newTag.trim() && !watch('tags')?.includes(newTag.trim())) {
      const currentTags = watch('tags') || [];
      setValue('tags', [...currentTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = watch('tags') || [];
    setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!imageUrl) {
      toast.error("Upload Required", {
        description: "Please upload an image before submitting."
      });
      return;
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data: insertedData, error } = await supabase
        .from('products')
        .insert([
          {
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price,
            image_url: imageUrl,
            in_stock: data.inStock,
            variants: data.variants,
            tags: data.tags,
            created_by: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      toast.success("Product Created", {
        description: `${data.title} has been successfully added to your catalog.`
      });

      reset();
      setIsOpen(false);
      setImageUrl(null);
    } catch (error) {
      toast.error("Upload Failed", {
        description: error instanceof Error ? error.message : 'Failed to upload product'
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-lg border-2 border-blue-500/20 shadow-[0_8px_40px_rgb(0,0,0,0.12)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 bg-clip-text text-transparent">
            Add New Product
          </DialogTitle>
        </DialogHeader>
        
        <motion.form 
          onSubmit={handleSubmit(onSubmit)} 
          className="grid gap-6 py-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Product Title</Label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <Input 
                  {...register('title')} 
                  placeholder="Enter product title" 
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            
            <div>
              <Label>Product Category</Label>
              <Select onValueChange={(value) => setValue('category', value)}>
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
  <SelectItem value="plumbing">Plumbing</SelectItem>
  <SelectItem value="electrical">Electrical</SelectItem>
  <SelectItem value="carpentry">Carpentry</SelectItem>
  <SelectItem value="painting">Painting</SelectItem>
  <SelectItem value="flooring">Flooring</SelectItem>
  <SelectItem value="roofing">Roofing</SelectItem>
  <SelectItem value="windows">Windows</SelectItem>
  <SelectItem value="doors">Doors</SelectItem>
  <SelectItem value="siding">Siding</SelectItem>
</SelectContent>

              </Select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
          </div>

          <div>
            <Label>Product Description</Label>
            <Textarea 
              {...register('description')} 
              placeholder="Enter product description" 
              className="min-h-[120px] bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Base Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <Input 
                  type="number" 
                  {...register('price', { valueAsNumber: true })} 
                  placeholder="Enter product price" 
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div>
              <Label>In Stock</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={watch('inStock')}
                  onCheckedChange={(checked) => setValue('inStock', checked)}
                />
                <span>{watch('inStock') ? 'Available' : 'Out of Stock'}</span>
              </div>
            </div>
          </div>

          <div>
            <Label>Product Variants</Label>
            {variantFields.map((field, index) => (
              <div key={field.id} className="grid md:grid-cols-3 gap-2 mb-2">
                <Input 
                  {...register(`variants.${index}.name`)} 
                  placeholder="Variant Name (e.g., Size, Color)" 
                  className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
                <Input 
                  type="number" 
                  {...register(`variants.${index}.price`, { valueAsNumber: true })} 
                  placeholder="Variant Price" 
                  className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number" 
                    {...register(`variants.${index}.stock`, { valueAsNumber: true })} 
                    placeholder="Stock" 
                    className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                  {index > 0 && (
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      className="bg-red-500 hover:bg-red-600 transition-colors duration-200"
                      onClick={() => removeVariant(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="mt-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-all duration-200"
              onClick={() => appendVariant({ name: '', price: 0, stock: 0 })}
            >
              <PlusCircle className="mr-2" /> Add Variant
            </Button>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex items-center space-x-2 mb-2">
              <div className="relative flex-grow">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <Input 
                  placeholder="Add tags" 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
              </div>
              <Button type="button" variant="secondary" onClick={addTag}>
                Add Tag
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {watch('tags')?.map(tag => (
                <div 
                  key={tag} 
                  className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="ml-1 h-4 w-4"
                    onClick={() => removeTag(tag)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Product Image</Label>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed p-4 text-center cursor-pointer ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center">
                <ImagePlus className="text-gray-400 mb-2" size={40} />
                <p className="text-sm text-gray-600">
                  {isDragActive 
                    ? 'Drop the image here' 
                    : 'Drag & drop or click to upload product image'}
                </p>
              </div>
            </div>
            {imageUrl && (
              <div className="mt-2 relative">
                <img 
                  src={imageUrl} 
                  alt="Product" 
                  className="max-w-full h-auto rounded-md" 
                />
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 hover:from-blue-700 hover:via-indigo-700 hover:to-red-700 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            disabled={isUploading}
          >
            {isUploading ? 'Creating Product...' : 'Create Product'}
          </Button>
        </motion.form>

        <AnimatePresence>
          {isCropping && (
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
                    image={imageUrl || ''}
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
                    onClick={() => setIsCropping(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleImageCrop} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
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