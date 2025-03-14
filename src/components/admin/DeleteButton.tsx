import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  id: string;
  table: 'blog_posts' | 'products' | 'portfolio_projects';
  title: string;
  onDelete?: () => void;
}

export function DeleteButton({ id, table, title, onDelete }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();

  if (!user?.isAdmin) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Deleted Successfully', {
        description: `${title} has been deleted.`
      });

      if (onDelete) onDelete();
    } catch (error) {
      toast.error('Delete Failed', {
        description: error instanceof Error ? error.message : 'Failed to delete item'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="icon"
          className="absolute top-2 right-2 z-10 bg-red-500/90 hover:bg-red-600 transition-colors duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{' '}
            <span className="font-semibold">{title}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}