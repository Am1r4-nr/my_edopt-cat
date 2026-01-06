import React, { useState, useEffect } from 'react';
import { X, Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import api from '@/lib/api';
import { useAuth } from '../contexts/AuthContext';

export default function AdoptionFormModal({ cat, isOpen, onClose }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        applicant_name: '',
        email: '',
        phone: '',
        address: '',
        reason: '',
        has_pets: false,
        housing_type: 'House'
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                applicant_name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/adoptions', {
                ...formData,
                cat_id: cat.id,
                cat_name: cat.name, // Sending cat name for redundancy/easier backend handling if needed
                status: 'New Application',
                stage: 1
            });
            setSuccess(true);
        } catch (error) {
            console.error('Failed to submit adoption:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 opacity-100 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-brand-cream/20 dark:bg-gray-900/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-brand-mocha/10 rounded-full text-brand-mocha dark:text-brand-cream">
                            <Heart className="h-5 w-5" fill="currentColor" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Adopt {cat.name}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {success ? (
                        <div className="text-center py-10 space-y-4">
                            <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                <Heart className="h-10 w-10 fill-current" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Application Received!</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                Thank you for your interest in adopting {cat.name}. We will review your application and contact you soon!
                            </p>
                            <Button onClick={onClose} className="mt-6 bg-brand-mocha hover:bg-brand-mocha/90 text-white min-w-[140px]">
                                Close
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="applicant_name">Full Name</Label>
                                    <Input
                                        id="applicant_name"
                                        name="applicant_name"
                                        value={formData.applicant_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Jane Doe"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="012-345 6789"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your full address"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="housing_type">Housing Type</Label>
                                        <select
                                            id="housing_type"
                                            name="housing_type"
                                            value={formData.housing_type}
                                            onChange={handleChange}
                                            className="w-full h-11 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-mocha/50 transition-all dark:text-white"
                                        >
                                            <option value="House">Landed House</option>
                                            <option value="Apartment">Apartment/Condo</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-8">
                                        <input
                                            type="checkbox"
                                            id="has_pets"
                                            name="has_pets"
                                            checked={formData.has_pets}
                                            onChange={handleChange}
                                            className="h-4 w-4 rounded border-gray-300 text-brand-mocha focus:ring-brand-mocha"
                                        />
                                        <Label htmlFor="has_pets" className="mb-0 cursor-pointer">I currently have pets</Label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason">Why do you want to adopt {cat.name}?</Label>
                                    <textarea
                                        id="reason"
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-mocha/50 transition-all dark:text-white resize-none"
                                        placeholder="Tell us a bit about yourself and your home environment..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-1 bg-brand-mocha hover:bg-brand-mocha/90 text-white">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                                        </>
                                    ) : 'Submit Application'}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
