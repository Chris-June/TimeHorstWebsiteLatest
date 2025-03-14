import { useAuth } from '@/contexts/AuthContext';

interface AdminButtonProps {
  children: React.ReactNode;
}

export function AdminButton({ children }: AdminButtonProps) {
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return null;
  }

  return <>{children}</>;
}