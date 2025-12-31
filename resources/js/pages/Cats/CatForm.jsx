import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { X, PawPrint, Save, Upload } from 'lucide-react';

export default function CatForm({ cat, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        sex: '',
        status: 'Available',
        location: '',
        risk_score: 0,
        intake_date: '',
        image_url: ''
    });

    useEffect(() => {
        if (cat) {
            setFormData({
                name: cat.name || '',
                breed: cat.breed || '',
                age: cat.age || '',
                sex: cat.sex || '',
                status: cat.status || 'Available',
                location: cat.location || '',
                risk_score: cat.risk_score || 0,
                intake_date: cat.intake_date || '',
                image_url: cat.image_url || ''
            });
        } else {
            setFormData({
                name: '',
                breed: '',
                age: '',
                sex: '',
                status: 'Available',
                location: '',
                risk_score: 0,
                intake_date: '',
                image_url: ''
            });
        }
    }, [cat, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 opacity-100 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                            <PawPrint className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {cat ? 'Edit Cat Profile' : 'New Cat Admission'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
                    <div className="space-y-6">
                        {/* Section: Identity */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-gray-300"></span> Identity
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        placeholder="e.g. Whiskers"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="breed">Breed</Label>
                                    <Input
                                        id="breed"
                                        name="breed"
                                        value={formData.breed}
                                        onChange={handleChange}
                                        className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        placeholder="e.g. Siamese"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        placeholder="e.g. 2 years"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sex">Sex</Label>
                                    <div className="relative">
                                        <select
                                            id="sex"
                                            name="sex"
                                            value={formData.sex}
                                            onChange={handleChange}
                                            className="w-full h-11 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Sex</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Status & Location */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-gray-300"></span> Status & Location
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <div className="relative">
                                        <select
                                            id="status"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full h-11 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Available">Available</option>
                                            <option value="Adopted">Adopted</option>
                                            <option value="Medical Hold">Medical Hold</option>
                                            <option value="Foster">Foster</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        placeholder="e.g. Kennel A1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="intake_date">Intake Date</Label>
                                    <Input
                                        id="intake_date"
                                        type="date"
                                        name="intake_date"
                                        value={formData.intake_date}
                                        onChange={handleChange}
                                        className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="risk_score">AI Risk Score (0-100)</Label>
                                    <div className="relative">
                                        <Input
                                            id="risk_score"
                                            type="number"
                                            name="risk_score"
                                            min="0"
                                            max="100"
                                            value={formData.risk_score}
                                            onChange={handleChange}
                                            className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors pr-12"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                                            %
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Media */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-gray-300"></span> Media
                            </h3>
                            <div className="space-y-2">
                                <Label htmlFor="image_url">Profile Image URL</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="image_url"
                                            name="image_url"
                                            value={formData.image_url}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                            className="pl-9 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                        />
                                    </div>
                                </div>
                                {formData.image_url && (
                                    <div className="mt-2 h-32 w-32 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                                        <img src={formData.image_url} alt="Preview" className="h-full w-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} className="border-gray-200">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
                        <Save className="mr-2 h-4 w-4" />
                        {cat ? 'Update Cat' : 'Save Cat'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
