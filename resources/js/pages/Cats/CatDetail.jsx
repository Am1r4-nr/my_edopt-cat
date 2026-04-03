import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, QrCode, Activity, Heart, Shield, FileText, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import api from '@/lib/api';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

import CatForm from './CatForm';

export default function CatDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cat, setCat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

    const fetchCat = async () => {
        try {
            const response = await api.get(`/api/cats/${id}`);
            setCat(response.data);
        } catch (error) {
            console.error('Failed to fetch cat details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCat();
    }, [id]);

    const handleUpdateCat = async (catData) => {
        try {
            await api.put(`/api/cats/${id}`, catData);
            setIsEditFormOpen(false);
            fetchCat(); // Refresh data
        } catch (error) {
            console.error('Failed to update cat:', error);
            alert('Failed to update cat.');
        }
    };

    const handleDeleteCat = async () => {
        if (confirm('Are you sure you want to delete this cat? This action cannot be undone.')) {
            try {
                await api.delete(`/api/cats/${id}`);
                navigate('/cats');
            } catch (error) {
                console.error('Failed to delete cat:', error);
                alert('Failed to delete cat.');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4 mx-auto"></div>
                    <p className="text-gray-500">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!cat) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Cat Not Found</h2>
                    <p className="text-gray-500 mb-4">The cat you are looking for does not exist or has been removed.</p>
                    <Link to="/cats">
                        <Button variant="outline">Return to Inventory</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const getRiskColor = (score) => {
        if (score >= 70) return '#ef4444'; // red-500
        if (score >= 40) return '#eab308'; // yellow-500
        return '#22c55e'; // green-500
    };

    const riskData = [
        { name: 'Risk', value: cat.risk_score, fill: getRiskColor(cat.risk_score) },
        { name: 'Safe', value: 100 - cat.risk_score, fill: '#f3f4f6' }
    ];

    const healthStats = [
        { name: 'Health Stability', value: 85, color: '#10b981' },
        { name: 'Behavioral Adaptability', value: 60, color: '#f59e0b' },
        { name: 'Genetic Disposition', value: 45, color: '#6366f1' },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-6 pb-20">
            <CatForm
                cat={cat}
                isOpen={isEditFormOpen}
                onClose={() => setIsEditFormOpen(false)}
                onSave={handleUpdateCat}
            />

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-4 rounded-xl border border-white/50 dark:border-gray-700/50 shadow-sm sticky top-4 z-30">
                    <div className="flex items-center gap-4">
                        <Link to="/cats">
                            <Button variant="ghost" size="icon" className="hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full">
                                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                {cat.name}
                                <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-mono border border-gray-200 dark:border-gray-600">
                                    #{cat.id}
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hidden sm:flex bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 dark:text-gray-300">
                            <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                        <Button variant="outline" size="sm" className="hidden sm:flex bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 dark:text-gray-300">
                            <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                        <Button onClick={() => setIsEditFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
                            Edit Profile
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteCat} className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/30 shadow-none">
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Identity Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800 relative group">
                            <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-700 relative">
                                <img
                                    src={cat.image_url}
                                    alt={cat.name}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h2 className="text-3xl font-bold">{cat.name}</h2>
                                    <p className="opacity-90">{cat.breed} • {cat.sex}</p>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md backdrop-blur-md
                                    ${cat.status === 'Available' ? 'bg-emerald-500/90' :
                                            cat.status === 'Medical Hold' ? 'bg-rose-500/90' :
                                                cat.status === 'Adopted' ? 'bg-indigo-500/90' : 'bg-amber-500/90'}`}>
                                        {cat.status}
                                    </span>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider">Location</p>
                                        <p className="font-semibold text-gray-700 dark:text-gray-200">{cat.location}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider">Age</p>
                                        <p className="font-semibold text-gray-700 dark:text-gray-200">{cat.age}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider">Intake Date</p>
                                        <p className="font-semibold text-gray-700 dark:text-gray-200">{cat.intake_date}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider">Weight</p>
                                        <p className="font-semibold text-gray-700 dark:text-gray-200">4.2 kg</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <Button variant="outline" className="w-full border-dashed border-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                                        <QrCode className="mr-2 h-4 w-4" /> Generate Kennel Card
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Detailed Stats */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* AI Risk Analysis - Recharts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-400">
                                        <Activity className="h-5 w-5 text-indigo-500" />
                                        Prediction Model
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center p-0 pb-6">
                                    <div className="h-48 w-full relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={riskData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    startAngle={180}
                                                    endAngle={0}
                                                    stroke="none"
                                                >
                                                    {riskData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-4">
                                            <span className="text-4xl font-bold" style={{ color: getRiskColor(cat.risk_score) }}>
                                                {cat.risk_score}%
                                            </span>
                                            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Risk Score</span>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto px-4">
                                        Calculated based on breed ({cat.breed}), age ({cat.age}), and intake health.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 dark:text-white">Health Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-2">
                                    {healthStats.map((stat) => (
                                        <div key={stat.name}>
                                            <div className="flex justify-between text-sm mb-1.5">
                                                <span className="text-gray-600 dark:text-gray-400 font-medium">{stat.name}</span>
                                                <span className="font-bold text-gray-900 dark:text-white">{stat.value}/100</span>
                                            </div>
                                            <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Medical Timeline */}
                        <Card className="border-0 shadow-md bg-white dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 dark:text-white">
                                    <Heart className="h-5 w-5 text-rose-500" />
                                    Medical History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6 relative before:absolute before:left-8 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-700">
                                    <div className="relative flex gap-6 group">
                                        <div className="h-16 w-16 bg-rose-50 dark:bg-rose-900/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-rose-100 dark:border-rose-900/30 shadow-sm z-10 group-hover:scale-110 transition-transform bg-white dark:bg-gray-800">
                                            <Shield className="h-8 w-8 text-rose-500" />
                                        </div>
                                        <div className="py-2">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-bold text-gray-900 dark:text-white">Vaccination: FVRCP</h4>
                                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">Completed</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Administered primary vaccination series.</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">Dec 01, 2023 • Dr. Aminah</p>
                                        </div>
                                    </div>

                                    <div className="relative flex gap-6 group">
                                        <div className="h-16 w-16 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-blue-100 dark:border-blue-900/30 shadow-sm z-10 group-hover:scale-110 transition-transform bg-white dark:bg-gray-800">
                                            <FileText className="h-8 w-8 text-blue-500" />
                                        </div>
                                        <div className="py-2">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-bold text-gray-900 dark:text-white">Intake Exam</h4>
                                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">Record</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">General physical examination upon arrival. No major parasites found.</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">Nov 28, 2023 • Dr. Smith</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
