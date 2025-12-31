import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for registration logic
        console.log('Register attempt', { name, email, password });
        navigate('/');
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="name" className="dark:text-gray-200">Full Name</Label>
                <div className="mt-1">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                </div>
            </div>

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
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
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
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                </div>
            </div>

            <div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                    Create Account
                </Button>
            </div>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
}
