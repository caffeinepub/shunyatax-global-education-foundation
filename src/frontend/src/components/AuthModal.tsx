import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Backend integration for user authentication
      // For now, just simulate the animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (mode === 'signup') {
        setSuccess('Account created successfully! Please log in.');
        setTimeout(() => {
          onSwitchMode('login');
          setSuccess('');
        }, 2000);
      } else {
        setSuccess('Login successful!');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchMode = () => {
    resetForm();
    onSwitchMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/20 backdrop-blur-xl">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 rounded-lg pointer-events-none gradient-animate" />
        
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all duration-300 hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="relative space-y-3">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-500">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground animate-in slide-in-from-bottom-4 duration-500 delay-100">
            {mode === 'login'
              ? 'Sign in to access your account and support our mission'
              : 'Join us in making education accessible to all'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative space-y-5 mt-4">
          {/* Email Field */}
          <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-150">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email Address
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/30"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground">
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-background/50 border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/30"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {mode === 'signup' && (
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 8 characters long
              </p>
            )}
          </div>

          {/* Confirm Password Field (Sign Up only) */}
          {mode === 'signup' && (
            <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-500 delay-250">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
                Confirm Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background/50 border-primary/20 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-in slide-in-from-bottom-4 duration-300">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 animate-in slide-in-from-bottom-4 duration-300">
              <p className="text-sm text-primary font-medium">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-primary via-accent to-secondary shadow-glow hover:shadow-glow-lg transition-all duration-500 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-500 delay-300"
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative font-bold">
              {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </span>
          </Button>

          {/* Switch Mode Link */}
          <div className="text-center pt-2 animate-in slide-in-from-bottom-4 duration-500 delay-350">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={handleSwitchMode}
                className="font-semibold text-primary hover:text-accent transition-colors duration-300 hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
