import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Cat as CatIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

import CatForm from './CatForm';

export default function CatList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchCats = async () => {
        setLoading(true);
        try {
            const response = await api.get('/cats', {
                params: {
                    search: searchTerm,
                    status: statusFilter
                }
            });
            setCats(response.data);
        } catch (error) {
            console.error('Failed to fetch cats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchCats();
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchTerm, statusFilter]);

    const handleSaveCat = async (catData) => {
        try {
            await api.post('/cats', catData);
            setIsFormOpen(false);
            fetchCats(); // Refresh list
        } catch (error) {
            console.error('Failed to save cat:', error);
            alert('Failed to save cat. Please try again.');
        }
    };

    // Derived state
    const filteredCats = cats;

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-sm sticky top-4 z-30 transition-all duration-300">
                    <div>
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Cat Inventory
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track your feline residents</p>
                    </div>
                    <Button onClick={() => setIsFormOpen(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all duration-300 hover:scale-105 border-0">
                        <Plus className="mr-2 h-5 w-5" /> Add New Cat
                    </Button>
                </div>

                <CatForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSaveCat}
                />

                {/* Filters & Search - Glassmorphic floating bar */}
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-2 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-sm flex flex-col md:flex-row gap-3 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
                        <Input
                            placeholder="Search by name, breed, or ID..."
                            className="pl-12 h-12 bg-white/50 dark:bg-gray-900/50 border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-200 dark:focus:border-indigo-800 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 rounded-xl transition-all duration-300 text-base dark:text-white dark:placeholder-gray-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-56">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-400" />
                            <select
                                className="w-full h-12 pl-10 pr-4 rounded-xl border-transparent bg-white/50 dark:bg-gray-900/50 focus:bg-white dark:focus:bg-gray-900 focus:border-indigo-200 dark:focus:border-indigo-800 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition-all duration-300 appearance-none text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Statuses</option>
                                <option value="Available">Available</option>
                                <option value="Adopted">Adopted</option>
                                <option value="Medical Hold">Medical Hold</option>
                                <option value="Foster">Foster</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                            <p>Loading your cats...</p>
                        </div>
                    ) : filteredCats.length === 0 ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                            <CatIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                            <p className="text-lg">No cats found matching your criteria.</p>
                        </div>
                    ) : (
                        filteredCats.map((cat) => (
                            <Link key={cat.id} to={`/cats/${cat.id}`}>
                                <Card className="group border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full rounded-2xl">
                                    <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                        <img
                                            src={cat.image_url}
                                            alt={cat.name}
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 will-change-transform"
                                        />

                                        <div className="absolute top-3 left-3 z-20">
                                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-white shadow-sm border border-white/20 backdrop-blur-md
                                            ${cat.status === 'Available' ? 'bg-emerald-500/90' :
                                                    cat.status === 'Medical Hold' ? 'bg-rose-500/90' :
                                                        cat.status === 'Adopted' ? 'bg-indigo-500/90' : 'bg-amber-500/90'}`}>
                                                {cat.status}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <p className="text-white font-semibold text-sm flex items-center gap-1">
                                                <CatIcon className="h-3 w-3" /> View Profile
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cat.name}</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full inline-block mt-1">{cat.breed}</p>
                                            </div>
                                            <div className={`flex items-center justify-center p-2 rounded-full ${cat.sex === 'Male' ? 'bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-pink-50 text-pink-500 dark:bg-pink-900/20 dark:text-pink-400'}`}>
                                                <CatIcon className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <div className="h-px bg-gray-100 dark:bg-gray-700 my-3" />

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">{cat.age}</span>
                                            <div className="flex items-center gap-1.5" title="AI Risk Score">
                                                <div className={`w-2 h-2 rounded-full ${cat.risk_score > 50 ? 'bg-red-500 animate-pulse' :
                                                    cat.risk_score > 20 ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`} />
                                                <span className={`font-mono font-bold
                                                ${cat.risk_score > 50 ? 'text-red-600 dark:text-red-400' :
                                                        cat.risk_score > 20 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                                                    {cat.risk_score}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
