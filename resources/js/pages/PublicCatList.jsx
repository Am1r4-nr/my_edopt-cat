import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Cat as CatIcon, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function PublicCatList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Available');

    // Mock data for public view - in real app would fetch from API
    const cats = [
        { id: 1, name: 'Luna', age: '2 years', breed: 'Tabby', sex: 'Female', status: 'Available', image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', location: 'Gombak Shelter' },
        { id: 2, name: 'Oliver', age: '4 months', breed: 'Siamese', sex: 'Male', status: 'Available', image_url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', location: 'Foster Home' },
        { id: 3, name: 'Mittens', age: '5 years', breed: 'Persian', sex: 'Female', status: 'Foster', image_url: 'https://images.unsplash.com/photo-1495360019602-e001922271aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', location: 'Foster Home' },
        { id: 4, name: 'Leo', age: '1 year', breed: 'Bengal', sex: 'Male', status: 'Available', image_url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', location: 'Gombak Shelter' },
        { id: 5, name: 'Milo', age: '3 years', breed: 'Domestic Short Hair', sex: 'Male', status: 'Adopted', image_url: 'https://images.unsplash.com/photo-1511044568932-338cba0fb803?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', location: 'Adopted' },
        { id: 6, name: 'Bella', age: '2 years', breed: 'Ragdoll', sex: 'Female', status: 'Available', image_url: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', location: 'Gombak Shelter' },
    ];

    const filteredCats = cats.filter(cat => {
        const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.breed.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || cat.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-brand-cream/30 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h1 className="text-4xl font-extrabold text-brand-mocha dark:text-brand-cream tracking-tight">
                        Meet Our Cats
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                        These lovable felines are waiting for their forever homes. Browse through their profiles and find your perfect match.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search by name or breed..."
                            className="pl-12 h-12 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-56 relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:ring-brand-mocha focus:border-brand-mocha"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Cats</option>
                            <option value="Available">Available for Adoption</option>
                            <option value="Foster">In Foster</option>
                            <option value="Adopted">Happily Adopted</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCats.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            <CatIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">No cats found matching your criteria.</p>
                        </div>
                    ) : (
                        filteredCats.map((cat) => (
                            <Card key={cat.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 shadow-md bg-white dark:bg-gray-800">
                                <div className="aspect-[4/3] relative overflow-hidden group">
                                    <img
                                        src={cat.image_url}
                                        alt={cat.name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm
                                            ${cat.status === 'Available' ? 'bg-emerald-500' :
                                                cat.status === 'Adopted' ? 'bg-indigo-500' : 'bg-amber-500'}`}>
                                            {cat.status}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white flex items-center text-sm">
                                            <MapPin className="h-4 w-4 mr-1" /> {cat.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{cat.name}</h3>
                                            <p className="text-brand-mocha dark:text-brand-cream text-sm font-medium">{cat.breed}</p>
                                        </div>
                                        {cat.sex === 'Female' ?
                                            <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-500 p-2 rounded-full"><CatIcon className="h-4 w-4" /></div> :
                                            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-500 p-2 rounded-full"><CatIcon className="h-4 w-4" /></div>
                                        }
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                                        <span>{cat.age}</span>
                                        <span className="mx-2">•</span>
                                        <span>{cat.sex}</span>
                                    </div>

                                    {cat.status === 'Available' ? (
                                        <Link to="/register" className="block w-full text-center py-2.5 px-4 rounded-lg bg-brand-mocha hover:bg-brand-mocha/90 dark:bg-brand-cream dark:text-brand-mocha dark:hover:bg-brand-cream/90 text-white font-medium transition-colors">
                                            Adopt {cat.name}
                                        </Link>
                                    ) : (
                                        <button disabled className="block w-full text-center py-2.5 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed font-medium">
                                            {cat.status}
                                        </button>
                                    )}
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
