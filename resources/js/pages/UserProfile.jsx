import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '@/lib/api';
import { User, Mail, Calendar, MapPin, Heart, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function UserProfile() {
    const { user, isLoading } = useAuth();
    const [adoptions, setAdoptions] = useState([]);
    const [loadingAdoptions, setLoadingAdoptions] = useState(true);

    useEffect(() => {
        const fetchUserAdoptions = async () => {
            if (!user) return;
            try {
                const response = await api.get('/api/user/adoptions');
                setAdoptions(response.data);
            } catch (error) {
                console.error('Failed to fetch user adoptions:', error);
            } finally {
                setLoadingAdoptions(false);
            }
        };

        if (user) {
            fetchUserAdoptions();
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-brand-cream/30 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-mocha"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen pt-32 px-4 text-center bg-brand-cream/30 dark:bg-gray-900">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Please log in to view your profile</h2>
                <Button className="mt-4 bg-brand-mocha text-white" onClick={() => window.location.href = '/login'}>
                    Log In
                </Button>
            </div>
        );
    }

    const getStageInfo = (stage) => {
        switch (stage) {
            case 1: return { label: 'Application Received', color: 'text-blue-600 bg-blue-100', icon: FileText };
            case 2: return { label: 'Under Review', color: 'text-yellow-600 bg-yellow-100', icon: Clock };
            case 3: return { label: 'Interview', color: 'text-purple-600 bg-purple-100', icon: Calendar };
            case 4: return { label: 'Approved', color: 'text-green-600 bg-green-100', icon: CheckCircle };
            default: return { label: 'Unknown', color: 'text-gray-600 bg-gray-100', icon: AlertCircle };
        }
    };

    // Fallback for missing icon import
    const FileText = ({ className }) => <span className={className}>📄</span>;

    return (
        <div className="min-h-screen bg-brand-cream/30 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Profile Header */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-brand-cream/50 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-brand-mocha/10 flex items-center justify-center text-3xl font-bold text-brand-mocha">
                        {user.name.charAt(0)}
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <Mail className="h-4 w-4" /> {user.email}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <User className="h-4 w-4" /> {user.role === 'admin' ? 'Administrator' : 'Member'}
                            </div>
                        </div>
                    </div>
                    <div className="md:ml-auto">
                        <Button variant="outline" className="border-gray-200 dark:border-gray-700">Edit Profile</Button>
                    </div>
                </div>

                {/* Applications Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Heart className="h-5 w-5 text-rose-500" /> My Adoption Applications
                    </h2>

                    {loadingAdoptions ? (
                        <div className="text-center py-10 opacity-60">Loading history...</div>
                    ) : adoptions.length === 0 ? (
                        <Card className="border-dashed border-2 shadow-none bg-transparent">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
                                <Heart className="h-12 w-12 mb-3 opacity-20" />
                                <p>You haven't submitted any adoption applications yet.</p>
                                <Button className="mt-4" variant="link" onClick={() => window.location.href = '/cats'}>Browse Cats</Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {adoptions.map(adoption => {
                                const status = getStageInfo(adoption.stage);
                                return (
                                    <Card key={adoption.id} className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden">
                                                        {/* Placeholder or fetch cat image if available in relation */}
                                                        <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs text-center p-1">
                                                            Cat Photo
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{adoption.cat_name || 'Unknown Cat'}</h3>
                                                        <p className="text-sm text-gray-500">Application #{adoption.id} • {new Date(adoption.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>

                                                <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${status.color}`}>
                                                    {status.label}
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mt-6">
                                                <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                                                    <span>Applied</span>
                                                    <span>Review</span>
                                                    <span>Interview</span>
                                                    <span>Finalized</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-brand-mocha transition-all duration-1000"
                                                        style={{ width: `${(adoption.stage / 4) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
