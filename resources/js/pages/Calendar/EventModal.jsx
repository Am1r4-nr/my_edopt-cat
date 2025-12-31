import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, MapPin, AlignLeft, Type } from 'lucide-react';

export default function EventModal({ isOpen, onClose, onSubmit, editingEvent, onDelete }) {
    const [formData, setFormData] = useState({
        title: '',
        type: 'event',
        start_date: '',
        end_date: '',
        location: '',
        description: ''
    });

    useEffect(() => {
        if (editingEvent) {
            setFormData({
                title: editingEvent.title,
                type: editingEvent.type,
                start_date: editingEvent.start_date.slice(0, 16), // Format for datetime-local
                end_date: editingEvent.end_date ? editingEvent.end_date.slice(0, 16) : '',
                location: editingEvent.location || '',
                description: editingEvent.description || ''
            });
        } else {
            setFormData({
                title: '',
                type: 'event',
                start_date: '',
                end_date: '',
                location: '',
                description: ''
            });
        }
    }, [editingEvent, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {editingEvent ? 'Edit Event' : 'New Event'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Event Title
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-cream focus:border-transparent transition-all"
                            placeholder="e.g., Annual Adoption Drive"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Event Type
                        </label>
                        <div className="relative">
                            <Type className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-cream focus:border-transparent appearance-none transition-all"
                            >
                                <option value="event">General Event</option>
                                <option value="adoption_drive">Adoption Drive</option>
                                <option value="fundraiser">Fundraiser</option>
                                <option value="medical_camp">Medical Camp</option>
                                <option value="volunteer_meet">Volunteer Meet</option>
                            </select>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Start Date
                            </label>
                            <input
                                type="datetime-local"
                                required
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-cream focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                End Date
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-cream focus:border-transparent text-sm"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-cream focus:border-transparent transition-all"
                                placeholder="e.g., Central Park"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            rows="3"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-cream focus:border-transparent transition-all resize-none"
                            placeholder="Add details..."
                        ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                        {editingEvent && (
                            <button
                                type="button"
                                onClick={() => onDelete(editingEvent.id)}
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        )}
                        <div className={`flex gap-3 ${!editingEvent ? 'w-full justify-end' : ''}`}>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium text-brand-mocha bg-brand-cream hover:bg-[#E5D4A0] rounded-lg shadow-sm hover:shadow transition-all"
                            >
                                {editingEvent ? 'Update Event' : 'Create Event'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
