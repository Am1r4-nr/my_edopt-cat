import React, { useState } from 'react';
import { User, Lock, Bell, Moon, Sun, Shield, Mail, Smartphone, Save, Key, Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

import { useTheme } from '@/contexts/ThemeContext';

export default function Settings() {
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Moon },
    ];

    const handleSave = () => {
        setIsLoading(true);
        // Mock save
        setTimeout(() => {
            setIsLoading(false);
            alert('Settings saved successfully!');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 space-y-2">
                    <div className="mb-6 px-2">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Settings</h1>
                        <p className="text-sm text-gray-500">Manage your preferences</p>
                    </div>

                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                        ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200'
                                        : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Public Profile</CardTitle>
                                    <CardDescription>This information will be displayed properly.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="relative group cursor-pointer">
                                            <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold border-4 border-white shadow-lg overflow-hidden">
                                                AD
                                            </div>
                                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Profile Photo</h3>
                                            <p className="text-sm text-gray-500 mb-3">Min 400x400px, PNG or JPG</p>
                                            <Button variant="outline" size="sm">Upload New</Button>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input id="firstName" defaultValue="Admin" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input id="lastName" defaultValue="User" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input id="email" type="email" defaultValue="admin@edoptcat.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Tell us a little about yourself"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSave} disabled={isLoading}>
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>Change your password correctly to keep your account secure.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current">Current Password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new">New Password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSave} disabled={isLoading}>Update Password</Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                    <CardDescription>Add an extra layer of security to your account.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                                                <Lock className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">2FA is currently disabled</p>
                                                <p className="text-sm text-gray-500">Enable 2FA to protect your account.</p>
                                            </div>
                                        </div>
                                        <Button variant="outline">Enable</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Preferences</CardTitle>
                                    <CardDescription>Manage how you receive updates.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {[
                                        { title: 'Email Notifications', desc: 'Receive daily digests and urgent alerts.', icon: Mail },
                                        { title: 'Browser Push', desc: 'Get notified immediately in your browser.', icon: Bell },
                                        { title: 'Mobile Push', desc: 'Receive notifications on your mobile device.', icon: Smartphone },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between pb-4 last:pb-0 border-b last:border-0 border-gray-100">
                                            <div className="flex gap-4">
                                                <div className="mt-1 text-gray-500">
                                                    <item.icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.title}</p>
                                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                                </div>
                                            </div>
                                            <div className="h-6 w-11 bg-indigo-600 rounded-full relative cursor-pointer">
                                                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm"></div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Theme Preferences</CardTitle>
                                    <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-3 gap-4">
                                    <div
                                        onClick={() => setTheme('light')}
                                        className="cursor-pointer space-y-2"
                                    >
                                        <div className={`h-32 rounded-lg bg-gray-100 border-2 shadow-sm relative overflow-hidden ${theme === 'light' ? 'border-indigo-600' : 'border-transparent'}`}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Sun className="h-8 w-8 text-indigo-600" />
                                            </div>
                                            {theme === 'light' && <div className="absolute bottom-2 right-2 h-4 w-4 bg-indigo-600 rounded-full text-white flex items-center justify-center text-[10px]">✓</div>}
                                        </div>
                                        <p className="text-center text-sm font-medium">Light</p>
                                    </div>
                                    <div
                                        onClick={() => setTheme('dark')}
                                        className="cursor-pointer space-y-2 group opacity-100 transition-opacity"
                                    >
                                        <div className={`h-32 rounded-lg bg-gray-900 border-2 relative overflow-hidden ${theme === 'dark' ? 'border-indigo-600' : 'border-transparent group-hover:border-gray-600'}`}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Moon className="h-8 w-8 text-white" />
                                            </div>
                                            {theme === 'dark' && <div className="absolute bottom-2 right-2 h-4 w-4 bg-indigo-600 rounded-full text-white flex items-center justify-center text-[10px]">✓</div>}
                                        </div>
                                        <p className="text-center text-sm font-medium">Dark</p>
                                    </div>
                                    <div
                                        onClick={() => setTheme('system')}
                                        className="cursor-pointer space-y-2 group opacity-100 transition-opacity"
                                    >
                                        <div className={`h-32 rounded-lg bg-white border-2 relative overflow-hidden flex ${theme === 'system' ? 'border-indigo-600' : 'border-transparent group-hover:border-gray-300'}`}>
                                            <div className="w-1/2 bg-gray-100 h-full"></div>
                                            <div className="w-1/2 bg-gray-900 h-full"></div>
                                            {theme === 'system' && <div className="absolute bottom-2 right-2 h-4 w-4 bg-indigo-600 rounded-full text-white flex items-center justify-center text-[10px]">✓</div>}
                                        </div>
                                        <p className="text-center text-sm font-medium">System</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
