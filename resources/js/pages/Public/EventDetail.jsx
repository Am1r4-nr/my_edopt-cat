import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

export default function EventDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [interest, setInterest] = useState('Just looking around');
    const [processing, setProcessing] = useState(false);
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        axios.get(`/api/events/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            await axios.post(`/api/events/${id}/register`, { name, email, interest });
            setRegistered(true);
            setEvent({...event, registrations_count: event.registrations_count + 1});
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to register.');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="min-h-screen pt-32 text-center">Loading Event Details...</div>;
    if (!event) return <div className="min-h-screen pt-32 text-center">This event could not be found or is not published.</div>;

    const eventDate = new Date(event.start_date);

    return (
        <div className="w-full min-h-screen bg-brand-base pb-24 font-sans text-brand-dark">
            
            {/* Hero */}
            <div className="max-w-6xl mx-auto px-6 pt-24 mb-10">
                <div className="relative w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-sm">
                    <img src={event.image_url || "/images/hero_cat_1775141614458.png"} className="absolute inset-0 w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent flex flex-col justify-end p-10 md:p-16">
                        <span className="bg-[#b35e19] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm inline-block mb-4 w-max shadow-sm">
                            {event.type}
                        </span>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight mb-6 leading-tight">{event.title}</h1>
                        <div className="flex flex-wrap gap-6 text-white/90 text-sm font-medium items-center">
                            <span className="flex items-center gap-2">📅 {eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}</span>
                            <span className="flex items-center gap-2">🕒 {eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'})}</span>
                            <span className="flex items-center gap-2">📍 {event.location || 'Sanctuary Atelier'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Split */}
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Main Content */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-display font-bold text-brand-dark mb-6">About the Event</h2>
                    
                    <div className="prose prose-sm md:prose-base text-gray-500 leading-relaxed mb-10 whitespace-pre-wrap">
                        {event.description}
                    </div>

                    {(event.features && Array.isArray(event.features) && event.features.length > 0) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {event.features.map((feature, idx) => (
                                <div key={idx} className="bg-[#fcf9f5] rounded-3xl p-6 border border-[#f5ead8]">
                                    <h4 className="flex items-center gap-2 text-[12px] font-bold text-brand-dark uppercase tracking-widest mb-4">
                                        <span className="w-8 h-8 rounded-full bg-[#f5ead8] text-[#b35e19] flex justify-center items-center">
                                            {feature.title.includes('Package') ? '✔️' : '🐾'}
                                        </span>
                                        {feature.title}
                                    </h4>
                                    <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                        {feature.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2"><span className="text-[#b35e19]">•</span> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-[#fcf9f5] rounded-3xl p-6 border border-[#f5ead8]">
                                <h4 className="flex items-center gap-2 text-[12px] font-bold text-brand-dark uppercase tracking-widest mb-4">
                                    <span className="w-8 h-8 rounded-full bg-[#f5ead8] text-[#b35e19] flex justify-center items-center">🐾</span>
                                    What to Expect
                                </h4>
                                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                                    <li className="flex items-start gap-2"><span className="text-[#b35e19]">•</span> Interactive kitten play zones</li>
                                    <li className="flex items-start gap-2"><span className="text-[#b35e19]">•</span> Professional behavioral guidance</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-32 md:h-48 rounded-2xl overflow-hidden"><img src="/images/rescue_cat_1_1775141631751.png" className="w-full h-full object-cover"/></div>
                        <div className="h-32 md:h-48 rounded-2xl overflow-hidden"><img src="/images/rescue_cat_2_1775141647261.png" className="w-full h-full object-cover"/></div>
                        <div className="h-32 md:h-48 rounded-2xl overflow-hidden"><img src="/images/rescue_cat_3_1775141665152.png" className="w-full h-full object-cover"/></div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 sticky top-6 space-y-6">
                    <div className="bg-[#ebe2d3] rounded-[2.5rem] p-8 shadow-sm">
                        <h3 className="text-xl font-display font-bold text-brand-dark mb-6">Secure Your Spot</h3>
                        
                        {registered ? (
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#dfd5c5]">
                                <div className="text-4xl mb-3">✓</div>
                                <h4 className="font-bold text-brand-dark mb-2">You're on the list!</h4>
                                <p className="text-xs text-gray-500">We look forward to seeing you at the {event.title}.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Full Name</label>
                                    <input required disabled={!!user} type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-[#dfd5c5]/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-[#b35e19]/50" placeholder="Enter your name" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Email Address</label>
                                    <input required disabled={!!user} type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-[#dfd5c5]/50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-[#b35e19]/50" placeholder="hello@example.com" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Interested in...</label>
                                    <select value={interest} onChange={e=>setInterest(e.target.value)} className="w-full bg-[#dfd5c5]/50 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none">
                                        <option>Just looking around</option>
                                        <option>Adopting a single kitten</option>
                                        <option>Adopting a bonded pair</option>
                                        <option>Fostering opportunities</option>
                                    </select>
                                </div>
                                <div className="pt-2">
                                    <button disabled={processing} type="submit" className="w-full bg-gradient-to-r from-brand-secondary to-[#b35e19] text-white font-bold py-3.5 rounded-full shadow-lg shadow-[#b35e19]/30 hover:opacity-90 transition-opacity">
                                        {processing ? 'Processing...' : 'Register for Event'}
                                    </button>
                                    <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed font-medium">Free to attend. No registration fee required.</p>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col gap-5">
                         <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                             <span className="text-xs text-gray-500">Event Type</span>
                             <span className="text-xs font-bold text-[#b35e19]">{event.type}</span>
                         </div>
                         <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                             <span className="text-xs text-gray-500">Capacity</span>
                             <span className="text-xs font-bold text-brand-dark">{event.capacity || 'Unlimited'} Guests</span>
                         </div>
                         <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                             <span className="text-xs text-gray-500">Attendees</span>
                             <span className="text-xs font-bold text-[#b35e19]">{event.registrations_count || 0} Registered</span>
                         </div>
                         <div className="h-28 bg-gray-200 mt-2 rounded-2xl flex items-center justify-center text-xs text-gray-400">Map Placeholder</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
