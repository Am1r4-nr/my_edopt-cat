import React, { useState } from 'react';
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Megaphone,
    Heart,
    Stethoscope,
    GraduationCap,
    Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_EVENTS = [
    {
        id: 1,
        type: 'Awareness',
        icon: Megaphone,
        color: 'blue',
        status: 'Upcoming',
        title: 'Campus Cat Awareness Week',
        description: 'Join us for a week-long awareness campaign about responsible cat care and the importance of stray cat management in supporting SDG 15 (Life on Land).',
        date: 'Wednesday, January 15, 2025',
        time: '09:00 AM - 05:00 PM',
        location: 'University Main Hall',
        registered: 45,
        capacity: 100
    },
    {
        id: 2,
        type: 'Adoption',
        icon: Heart,
        color: 'orange',
        status: 'Upcoming',
        title: 'Adoption Drive - Find Your Feline Friend',
        description: 'Meet our rescued cats ready for adoption! Browse profiles, interact with cats, and complete adoption applications on-site.',
        date: 'Monday, January 20, 2025',
        time: '10:00 AM - 04:00 PM',
        location: 'Student Center Plaza',
        registered: 28,
        capacity: 50
    },
    {
        id: 3,
        type: 'Medical',
        icon: Stethoscope,
        color: 'red',
        status: 'Upcoming',
        title: 'Free Veterinary Checkup Day',
        description: 'Free health checkups and vaccinations for stray and community cats. Veterinary professionals will be available for consultations.',
        date: 'Saturday, January 25, 2025',
        time: '08:00 AM - 02:00 PM',
        location: 'AHC Medical Station',
        registered: 15,
        capacity: 30
    },
    {
        id: 4,
        type: 'Education',
        icon: GraduationCap,
        color: 'purple',
        status: 'Upcoming',
        title: 'Cat Care Workshop for New Owners',
        description: 'Learn essential skills for cat care including feeding, grooming, health monitoring, and creating a safe environment.',
        date: 'Saturday, February 1, 2025',
        time: '02:00 PM - 05:00 PM',
        location: 'Lecture Hall 3',
        registered: 32,
        capacity: 60
    },
    {
        id: 5,
        type: 'Fundraising',
        icon: Users,
        color: 'green',
        status: 'Upcoming',
        title: 'Charity Fundraising Gala - Paws for a Cause',
        description: 'Annual fundraising gala to support our rescue operations, medical care, and shelter improvements. Dinner, entertainment, and silent auction included.',
        date: 'Monday, February 10, 2025',
        time: '06:00 PM - 10:00 PM',
        location: 'Grand Ballroom, Hotel Seri Malaysia',
        registered: 67,
        capacity: 150
    },
    {
        id: 6,
        type: 'Education',
        icon: GraduationCap,
        color: 'purple',
        status: 'Upcoming',
        title: 'TNR (Trap-Neuter-Return) Training Program',
        description: 'Hands-on training for volunteers on humane cat trapping, the TNR process, and colony management techniques.',
        date: 'Saturday, February 15, 2025',
        time: '09:00 AM - 03:00 PM',
        location: 'AHC Training Center',
        registered: 18,
        capacity: 25
    }
];

export default function Events() {
    const [activeTab, setActiveTab] = useState('Upcoming');

    const getBadgeStyles = (type) => {
        switch (type) {
            case 'Awareness': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Adoption': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
            case 'Medical': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            case 'Education': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Fundraising': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mx-auto h-16 w-16 mb-4 text-orange-500">
                        <Calendar className="h-full w-full" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Events & Activities
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Join Abu Hurairah Club (AHC) in our mission to support SDG 15 (Life on Land) through community engagement, education, and compassionate care for cats.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-orange-50 dark:bg-gray-800 p-1 rounded-full inline-flex">
                        {['Upcoming', 'Ongoing', 'All Events'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    px-8 py-2 rounded-full text-sm font-medium transition-all duration-200
                                    ${activeTab === tab
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_EVENTS.map((event) => (
                        <div key={event.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">

                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyles(event.type)}`}>
                                    <event.icon size={14} />
                                    {event.type}
                                </div>
                                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {event.status}
                                </span>
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 min-h-[56px] line-clamp-2">
                                {event.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 min-h-[60px]">
                                {event.description}
                            </p>

                            {/* Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    <span className="truncate">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <MapPin className="h-4 w-4 text-orange-500" />
                                    <span className="truncate">{event.location}</span>
                                </div>
                            </div>

                            {/* Registration Progress */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-green-500" />
                                        <span>{event.registered} / {event.capacity} registered</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                                    Register Now
                                </button>
                                <button className="w-full bg-transparent border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-2.5 rounded-lg text-sm transition-colors">
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
