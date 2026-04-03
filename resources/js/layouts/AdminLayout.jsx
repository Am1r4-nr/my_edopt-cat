import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Cat,
    FileText,
    Mail,
    Calendar,
    Settings,
    Menu,
    X,
    LogOut,
    Bell,
    Heart,
    DollarSign,
    AlertTriangle,
    BarChart
} from 'lucide-react';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Cats', href: '/admin/cats', icon: Cat },
        { name: 'Adoptions', href: '/admin/adoptions', icon: Heart },
        { name: 'Volunteers', href: '/admin/volunteers', icon: BarChart },
        { name: 'Events', href: '/admin/events', icon: Calendar },
        { name: 'Incidents Hub', href: '/admin/incidents-hub', icon: AlertTriangle },
        { name: 'Live Map', href: '/admin/live-map', icon: Calendar },
        { name: 'Finances', href: '/admin/finances', icon: DollarSign },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const isActive = (path) => {
        return location.pathname === path
            ? 'bg-brand-cream text-brand-mocha dark:bg-brand-cream/20 dark:text-brand-cream'
            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex transition-colors duration-200">
            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 border-r border-gray-200 dark:border-gray-700
                `}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-mocha to-[#8B7E74] dark:from-brand-cream dark:to-[#E5D4A0]">
                                E-DOPTCAT
                            </span>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                                    ${isActive(item.href)}
                                `}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="font-semibold text-gray-600 dark:text-gray-300">AD</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@edoptcat.com</p>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col min-w-0 overflow-hidden md:ml-64`}>
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
                    <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex-1 px-4 flex justify-end">
                            <div className="flex items-center space-x-4">
                                <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative">
                                    <Bell size={20} />
                                    <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
