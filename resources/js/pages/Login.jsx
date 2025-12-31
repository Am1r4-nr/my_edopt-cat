import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for authentication logic
        console.log('Login attempt', { email, password });
        navigate('/');
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="email" className="dark:text-gray-200">Email address</Label>
                <div className="mt-1">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                <div className="mt-1">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:border-gray-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                        Forgot your password?
                    </a>
                </div>
            </div>

            <div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                    Sign in
                </Button>
            </div>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" className="w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors">
                        <span className="sr-only">Sign in with Google</span>
                        Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 transition-colors">
                        <span className="sr-only">Sign in with GitHub</span>
                        GitHub
                    </Button>
                </div>
            </div>
        </form>
    );
}
