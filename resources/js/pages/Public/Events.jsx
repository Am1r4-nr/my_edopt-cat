import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full min-h-screen bg-brand-base pb-24 font-sans text-brand-dark">
            
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-xl z-10 relative">
                        <span className="bg-[#f5ead8] text-[#b35e19] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm inline-block mb-6">
                            Community & Connection
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-dark tracking-tight mb-6 leading-[1.1]">
                            Events for a <span className="text-[#b35e19] italic">Cause</span>
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
                            Join our nurturing atelier events. From sun-drenched adoption drives to boutique fundraisers, every moment spent here helps find a forever home.
                        </p>
                    </div>

                    <div className="relative z-0 h-[400px] lg:h-[500px]">
                        <div className="absolute inset-y-0 right-0 w-4/5 bg-brand-cream rounded-[3rem] overflow-hidden shadow-sm">
                            <img src="/images/hero_cat_1775141614458.png" className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="absolute -bottom-8 left-0 lg:-left-12 w-64 h-64 bg-white p-3 rounded-[2rem] shadow-xl rotate-[-4deg]">
                            <img src="/images/ui_ux_implementation_1775142993490.webp" className="w-full h-full object-cover rounded-3xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6 gap-6">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-brand-dark mb-2">Upcoming Gatherings</h2>
                        <p className="text-gray-500 text-sm max-w-md">Mark your calendars for our upcoming community activities and special fundraising moments.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-[#ebe2d3] text-brand-dark font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors hover:bg-[#dfd5c5]">Filter All</button>
                        <button className="bg-transparent border border-gray-200 text-gray-500 hover:border-gray-400 font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors">This Month</button>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-gray-400">Loading events...</div>
                ) : events.length === 0 ? (
                    <div className="py-20 text-center text-gray-400">No upcoming events scheduled right now. Check back soon!</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((evt) => (
                            <div key={evt.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex flex-col group transition-all hover:shadow-md hover:border-[#f5ead8]">
                                <div className="relative w-full h-48 rounded-[1.5rem] overflow-hidden mb-5">
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                                    <img src={evt.image_url || "/images/rescue_cat_1_1775141631751.png"} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={evt.title} />
                                    <span className="absolute top-4 left-4 bg-[#b35e19] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                                        {evt.type}
                                    </span>
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                    <p className="text-[#b35e19] text-xs font-bold font-display uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        ⏱ {new Date(evt.start_date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                    </p>
                                    <h3 className="font-display font-bold text-xl text-brand-dark leading-tight mb-2 group-hover:text-[#b35e19] transition-colors">{evt.title}</h3>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">📍 {evt.location || 'Sanctuary Atelier'}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3 flex-1">
                                        {evt.description}
                                    </p>
                                    
                                    <Link to={`/events/${evt.id}`} className="mt-auto bg-[#f5ead8] hover:bg-[#ebe2d3] text-[#b35e19] text-center font-bold text-xs py-3.5 rounded-xl transition-colors">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* CTA Banner */}
            <div className="max-w-4xl mx-auto px-6 py-12 mt-12 text-center relative z-10">
                <div className="bg-gradient-to-br from-[#d97c2a] to-[#a85011] rounded-[3rem] p-12 shadow-xl shadow-orange-900/10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-display font-bold mb-4">Want to host an event?</h2>
                        <p className="text-white/80 text-sm max-w-lg mx-auto mb-8 font-medium">Whether it's a corporate donation day or a neighborhood awareness walk, we'd love to partner with you.</p>
                        <div className="flex justify-center gap-4">
                            <button className="bg-white text-[#b35e19] font-bold px-8 py-3.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm">Get in Touch</button>
                            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-full transition-colors backdrop-blur-sm">Event Guidelines</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
