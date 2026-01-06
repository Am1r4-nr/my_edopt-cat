import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Cat, ArrowLeft } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login({ email, password });

            // Fetch user to check role or just redirect
            const userResponse = await api.get('/api/user');
            const role = userResponse.data.role;

            // Redirect to home page
            navigate('/');
        } catch (err) {
            console.error('Login failed', err);
            setError('Invalid credentials or failed to log in.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Image/Decor */}
            <div className="hidden lg:relative lg:block relative overflow-hidden bg-brand-mocha">
                <div className="absolute inset-0 bg-brand-mocha/20 mix-blend-multiply z-10" />
                <img
                    src="https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Sleeping Cat"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
                    <Link to="/" className="flex items-center gap-2 w-fit bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                        <ArrowLeft size={16} />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <div className="space-y-6 max-w-lg">
                        <div className="h-16 w-16 bg-brand-cream/90 rounded-2xl flex items-center justify-center text-brand-mocha shadow-lg">
                            <Cat size={32} />
                        </div>
                        <h2 className="text-4xl font-bold font-display leading-tight">
                            Every cat deserves a <br />
                            <span className="text-brand-cream">safe and loving home.</span>
                        </h2>
                        <p className="text-lg text-brand-cream/80">
                            Join our community to adopt, donate, and make a difference in the lives of stray cats in IIUM Gombak.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-gray-900">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start lg:hidden mb-6">
                            <div className="h-12 w-12 bg-brand-mocha/10 rounded-xl flex items-center justify-center text-brand-mocha">
                                <Cat size={24} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-display">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="dark:text-gray-200">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="mt-1 dark:bg-gray-800 dark:border-gray-700 focus:ring-brand-mocha focus:border-brand-mocha"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="mt-1 dark:bg-gray-800 dark:border-gray-700 focus:ring-brand-mocha focus:border-brand-mocha"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-brand-mocha focus:ring-brand-mocha border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-gray-600 dark:text-gray-400">
                                    Remember for 30 days
                                </label>
                            </div>
                            <a href="#" className="font-medium text-brand-mocha hover:text-brand-mocha/80">
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-mocha hover:bg-brand-mocha/90 text-white h-11 rounded-lg shadow-lg shadow-brand-mocha/20 transition-all font-semibold text-base"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" type="button" className="w-full h-10 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" type="button" className="w-full h-10 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </Button>
                        </div>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-brand-mocha hover:text-brand-mocha/80">
                                Sign up for free
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
