import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Cat, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function PublicLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Cats', href: '/cats' },
        { name: 'Events', href: '/events' },
        { name: 'Donate', href: '/donate' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-brand-cream/30 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="bg-brand-mocha/10 p-2 rounded-full">
                                    <Cat className="h-6 w-6 text-brand-mocha dark:text-brand-cream" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-mocha to-[#8B7E74] dark:from-brand-cream dark:to-[#E5D4A0]">
                                    E-DOPTCAT
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`text-sm font-medium transition-colors hover:text-brand-mocha dark:hover:text-brand-cream
                                        ${isActive(item.href) ? 'text-brand-mocha dark:text-brand-cream' : 'text-gray-600 dark:text-gray-300'}
                                    `}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {user ? (
                                <div className="flex items-center gap-4 ml-4">
                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all gap-2"
                                        >
                                            <LayoutDashboard size={16} />
                                            Dashboard
                                        </Link>
                                    )}
                                    <span className="text-sm font-medium text-brand-mocha dark:text-brand-cream">
                                        Hi, {user.name}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 ml-4">
                                    <Link
                                        to="/login"
                                        className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-mocha dark:hover:text-brand-cream transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-brand-mocha hover:bg-brand-mocha/90 dark:bg-brand-cream dark:text-brand-mocha dark:hover:bg-brand-cream/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-mocha transition-all"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-mocha"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                        <div className="pt-2 pb-3 space-y-1 px-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-mocha hover:bg-gray-50 dark:hover:bg-gray-700"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col space-y-3">
                                {user ? (
                                    <>
                                        <div className="px-3 py-2 text-base font-medium text-brand-mocha dark:text-brand-cream">
                                            Hi, {user.name}
                                        </div>
                                        {user.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-mocha hover:bg-gray-50 dark:hover:bg-gray-700"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-mocha hover:bg-brand-mocha/90 dark:bg-brand-cream dark:text-brand-mocha"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        {/* Social placeholders */}
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </a>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2024 E-DOPTCAT. Managed by Abu Hurairah Club (AHC). All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
