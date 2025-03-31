import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, resetPassword } from '../../lib/auth';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Username or email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", damping: 25, stiffness: 500 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      if (isForgotPasswordMode) {
        await resetPassword(data.identifier);
        toast.success('Password reset link sent', {
          description: 'Check your email to reset your password',
        });
        setIsForgotPasswordMode(false);
      } else {
        await signIn(data.identifier, data.password);
        toast.success('Logged in successfully');
        setIsOpen(false);
      }
      reset();
    } catch (error) {
      toast.error(isForgotPasswordMode ? 'Password Reset Failed' : 'Login Failed', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button id="admin-login-trigger" className="hidden">Admin Login</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
              {isForgotPasswordMode ? 'Reset Password' : 'Welcome Back'}
            </span>
          </DialogTitle>
          <DialogDescription className="text-center">
            {isForgotPasswordMode
              ? 'Enter your email to receive a password reset link'
              : 'Enter your credentials to access the admin dashboard'}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.form
            key={isForgotPasswordMode ? 'forgot' : 'login'}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="relative">
              <Label htmlFor="identifier">
                {isForgotPasswordMode ? 'Email' : 'Username or Email'}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <Input
                  id="identifier"
                  type="text"
                  {...register('identifier')}
                  placeholder={isForgotPasswordMode ? 'Enter your email' : 'Enter username or email'}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              {errors.identifier && (
                <p className="text-sm text-red-500 mt-1">{errors.identifier.message}</p>
              )}
            </div>

            {!isForgotPasswordMode && (
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="••••••••"
                    className="pl-10 pr-12 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading
                ? 'Processing...'
                : isForgotPasswordMode
                ? 'Send Reset Link'
                : 'Login'}
            </Button>
          </motion.form>
        </AnimatePresence>

        <DialogFooter className="justify-center">
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setIsForgotPasswordMode(!isForgotPasswordMode);
              reset();
            }}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isForgotPasswordMode
              ? 'Back to Login'
              : 'Forgot Password?'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}