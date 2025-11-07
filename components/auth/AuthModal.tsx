import React, { useState, FormEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleIcon, CloseIcon } from '../icons';

interface AuthModalProps {
  isOpen: boolean;
  initialView?: 'login' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialView = 'login', onClose }) => {
  const [isLoginView, setIsLoginView] = useState(initialView === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, login, loginWithGoogle } = useAuth();

  useEffect(() => {
    setIsLoginView(initialView === 'login');
  }, [initialView]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLoginView) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || `Failed to ${isLoginView ? 'log in' : 'sign up'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
       setError(err.message || 'Failed to sign in with Google');
    } finally {
        setIsLoading(false);
    }
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-[0_12px_32px_rgba(89,74,78,0.15)]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#594a4e] hover:text-[#33272a] transition-colors" aria-label="Close modal">
          <CloseIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-[#33272a]">{isLoginView ? 'Welcome Back!' : 'Create Your Account'}</h2>
        <p className="text-[#594a4e] text-center mb-6">{isLoginView ? 'Log in to continue your journey.' : 'Get started with your free account.'}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#594a4e] mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-[#ffc6c7] rounded-2xl px-4 py-3 text-[#33272a] focus:ring-2 focus:ring-[#ff8ba7] focus:border-[#ff8ba7] transition placeholder:text-[#594a4e]/60"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-[#594a4e] mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white border border-[#ffc6c7] rounded-2xl px-4 py-3 text-[#33272a] focus:ring-2 focus:ring-[#ff8ba7] focus:border-[#ff8ba7] transition placeholder:text-[#594a4e]/60"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex items-center justify-center gap-3 text-lg font-bold px-8 py-4 rounded-2xl transition-all duration-300 ease-in-out bg-[#ff8ba7] text-[#33272a] shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? 'Processing...' : (isLoginView ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="flex items-center my-6">
            <hr className="flex-grow border-[#faeee7]" />
            <span className="mx-4 text-[#594a4e] text-sm">OR</span>
            <hr className="flex-grow border-[#faeee7]" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 font-semibold px-8 py-4 rounded-2xl transition-colors duration-300 bg-white text-[#33272a] border border-[#faeee7] hover:bg-[#faeee7] disabled:opacity-50"
        >
          <GoogleIcon className="h-5 w-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-[#594a4e] mt-6">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-[#ff8ba7] hover:underline ml-1">
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </p>

      </div>
    </div>
  , document.body);
};