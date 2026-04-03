import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/lib/api';
import { ArrowLeft, Heart, Shield, Activity, Calendar, MapPin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AdoptionFormModal from '@/components/AdoptionFormModal';

export default function PublicCatDetail() {
    const { id } = useParams();
    const [cat, setCat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const response = await api.get(`/api/cats/${id}`);
                setCat(response.data);
            } catch (error) {
                console.error('Failed to fetch cat:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCat();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-brand-cream/30 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-mocha"></div>
                <span className="ml-3 text-brand-mocha font-medium">Loading...</span>
            </div>
        );
    }

    if (!cat) {
        return (
            <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-brand-cream/30 dark:bg-gray-900">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Cat Not Found</h2>
                <Link to="/cats" className="mt-4 text-brand-mocha hover:underline">Return to Cats list</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-cream/30 dark:bg-gray-900 pt-20 pb-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <Link to="/cats" className="inline-flex items-center text-gray-500 hover:text-brand-mocha transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cats
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left: Image Card */}
                    <div className="relative group h-fit">
                        <div className="absolute inset-0 bg-brand-mocha/20 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-200">
                            <img
                                src={cat.image_url}
                                alt={cat.name}
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute top-4 right-4 z-10">
                                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-brand-mocha shadow-lg flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${cat.status === 'Available' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></div>
                                    {cat.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-2 font-display">{cat.name}</h1>
                            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 text-lg">
                                <span className="font-medium">{cat.breed}</span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                <span>{cat.age}</span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                <span>{cat.sex}</span>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>
                                Meet {cat.name}, a wonderful {cat.breed} looking for a forever home.
                                {cat.status === 'Available'
                                    ? " This lovely feline is currently available for adoption and is waiting to meet you!"
                                    : " This cat is currently under care or already found a home."}
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-brand-cream/50 dark:border-gray-700 shadow-sm flex items-start gap-3">
                                <div className="p-2.5 bg-rose-100 dark:bg-rose-900/20 text-rose-500 rounded-xl">
                                    <Heart className="h-5 w-5" fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Health</p>
                                    <p className="font-semibold text-gray-800 dark:text-white mt-0.5">Vaccinated</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-brand-cream/50 dark:border-gray-700 shadow-sm flex items-start gap-3">
                                <div className="p-2.5 bg-blue-100 dark:bg-blue-900/20 text-blue-500 rounded-xl">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</p>
                                    <p className="font-semibold text-gray-800 dark:text-white mt-0.5">Neutered</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-brand-cream/50 dark:border-gray-700 shadow-sm flex items-start gap-3">
                                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-500 rounded-xl">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                                    <p className="font-semibold text-gray-800 dark:text-white mt-0.5">{cat.location}</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-brand-cream/50 dark:border-gray-700 shadow-sm flex items-start gap-3">
                                <div className="p-2.5 bg-amber-100 dark:bg-amber-900/20 text-amber-500 rounded-xl">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Arrived</p>
                                    <p className="font-semibold text-gray-800 dark:text-white mt-0.5">{cat.intake_date}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                onClick={() => setIsAdoptionModalOpen(true)}
                                size="lg"
                                className="flex-1 bg-brand-mocha hover:bg-brand-mocha/90 text-white shadow-xl shadow-brand-mocha/20 h-14 text-lg rounded-xl"
                                disabled={cat.status !== 'Available'}
                            >
                                <Heart className="mr-2 h-5 w-5 fill-current" />
                                {cat.status === 'Available' ? 'Adopt Me' : 'Not Available'}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 px-8 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 bg-transparent"
                            >
                                <Share2 className="mr-2 h-5 w-5" /> Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdoptionFormModal
                cat={cat}
                isOpen={isAdoptionModalOpen}
                onClose={() => setIsAdoptionModalOpen(false)}
            />
        </div>
    );
}
