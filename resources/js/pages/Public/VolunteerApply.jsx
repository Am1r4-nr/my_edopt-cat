import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function VolunteerApply() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [status, setStatus] = useState(null); // 'idle', 'review_in_progress', 'approved', 'rejected'
    const [phone, setPhone] = useState('');
    const [availableDays, setAvailableDays] = useState([]);
    const [shift, setShift] = useState('Morning (9 AM - 12 PM)');
    const [petCare, setPetCare] = useState('');
    const [photography, setPhotography] = useState('');
    const [events, setEvents] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    // If user is not logged in, they must login first.
    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=/volunteer');
        } else {
            // Check if they already applied
            fetchStatus();
        }
    }, [user]);

    const fetchStatus = async () => {
        try {
            const res = await axios.get('/api/volunteer/dashboard', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.data.volunteer) {
                if (res.data.volunteer.status === 'pending') setStatus('review_in_progress');
                else if (res.data.volunteer.status === 'approved') navigate('/volunteer-dashboard');
                else setStatus('rejected');
            }
        } catch (err) {
            if (err.response?.status !== 403) {
                console.error("Error fetching status", err);
            }
        }
    };

    const toggleDay = (day) => {
        setAvailableDays(prev => 
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setError(null);

        const skillsPayload = JSON.stringify({
            petCare, photography, events
        });

        try {
            await axios.post('/api/volunteer/apply', {
                phone,
                skills: skillsPayload,
                availability: availableDays,
                preferred_shift: shift,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            setStatus('review_in_progress');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application.');
        } finally {
            setProcessing(false);
        }
    };

    if (!user) return <div className="min-h-screen pt-32 text-center">Redirecting to login...</div>;

    const daysList = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    return (
        <div className="w-full relative min-h-screen bg-brand-base pb-24">
            <div className="text-center pt-20 pb-12 px-6 max-w-4xl mx-auto">
                <p className="text-[10px] font-bold tracking-widest text-[#b35e19] uppercase mb-3 drop-shadow-sm">JOIN OUR MISSION</p>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-brand-dark tracking-tight mb-6">
                    Apply to be a <span className="text-[#b35e19] italic">Nurturer</span>
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-sm">
                    Share your heart and your time. Every whisker deserves a helping hand from someone who cares as much as you do.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-brand-dark">
                
                {/* Left Sidebar */}
                <div className="md:col-span-4 space-y-8">
                    <div className="bg-transparent">
                        <h4 className="font-bold mb-4 font-display text-lg">Application Status</h4>
                        
                        {status === 'review_in_progress' ? (
                            <div className="bg-[#fcf8f2] border border-[#f5ead8] p-5 rounded-2xl mb-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-2 text-[#b35e19]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                                    <h5 className="font-bold text-sm">Review in Progress</h5>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">Our coordinators are currently reviewing your previous submission. We'll be in touch soon!</p>
                            </div>
                        ) : (
                            <div className="space-y-6 pl-2 relative before:absolute before:inset-y-2 before:left-[15px] before:w-px before:bg-gray-200">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-6 h-6 rounded-full bg-[#b35e19] text-white flex items-center justify-center text-[10px] font-bold">1</div>
                                    <p className="text-sm font-bold">Personal Details</p>
                                </div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-bold">2</div>
                                    <p className="text-sm text-gray-400">Availability</p>
                                </div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] font-bold">3</div>
                                    <p className="text-sm text-gray-400">Skills & Passion</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-xl shadow-brand-primary/10">
                        <img src="/images/hero_cat_1775141614458.png" className="w-full h-full object-cover" alt="Cat"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#885025]/90 to-transparent flex items-end p-6">
                            <p className="text-white font-medium text-sm leading-relaxed italic">"The best way to find yourself is to lose yourself in the service of others."</p>
                        </div>
                    </div>
                </div>

                {/* Right Form Area */}
                <div className="md:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
                    {status === 'review_in_progress' ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-[#f5ead8] text-[#b35e19] rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </div>
                            <h2 className="text-2xl font-display font-bold text-brand-dark mb-3">Application Received</h2>
                            <p className="text-gray-500 max-w-md mx-auto">Thank you for stepping up to help our feline friends. Your application is currently under review. We will notify you via email shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-12">
                            {error && <div className="bg-red-50 text-red-500 text-sm p-4 rounded-xl">{error}</div>}
                            
                            {/* Personal Info */}
                            <section>
                                <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                                    <span className="text-[#b35e19]"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></span>
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                                        <input type="text" disabled value={user.name} className="w-full bg-brand-input/60 border-0 rounded-xl px-4 py-3.5 text-sm text-gray-500 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                        <input type="email" disabled value={user.email} className="w-full bg-brand-input/60 border-0 rounded-xl px-4 py-3.5 text-sm text-gray-500 cursor-not-allowed" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                                    <input type="tel" required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full bg-brand-input border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark transition-all" />
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Availability */}
                            <section>
                                <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                                    <span className="text-[#b35e19]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                                    Availability
                                </h3>
                                <p className="text-sm text-gray-500 mb-6">Select the days you are available to join us at the atelier.</p>
                                
                                <div className="flex flex-wrap gap-3 mb-6 basis-full">
                                    {daysList.map(d => (
                                        <button 
                                            type="button" 
                                            key={d} 
                                            onClick={()=>toggleDay(d)}
                                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${availableDays.includes(d) ? 'bg-[#f5ead8] border-[#f5ead8] text-[#b35e19]' : 'bg-transparent border-gray-200 text-gray-400 hover:border-[#b35e19]'}`}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Preferred Shift</label>
                                    <select value={shift} onChange={e=>setShift(e.target.value)} className="w-full md:w-1/2 bg-brand-input border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark appearance-none transition-all">
                                        <option>Morning (9 AM - 12 PM)</option>
                                        <option>Afternoon (1 PM - 4 PM)</option>
                                        <option>Evening (5 PM - 8 PM)</option>
                                        <option>On-Call / Flexible</option>
                                    </select>
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Skills */}
                            <section>
                                <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                                    <span className="text-[#b35e19]"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></span>
                                    Skills & Experience
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Pet Care Experience</label>
                                        <textarea required value={petCare} onChange={e=>setPetCare(e.target.value)} rows="3" placeholder="Tell us about your history with cats..." className="w-full bg-brand-input border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark transition-all"></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Photography / Social Media</label>
                                            <textarea value={photography} onChange={e=>setPhotography(e.target.value)} rows="2" placeholder="Do you have content creation skills?" className="w-full bg-brand-input border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark transition-all"></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Events / Outreach</label>
                                            <textarea value={events} onChange={e=>setEvents(e.target.value)} rows="2" placeholder="Experience in public engagement?" className="w-full bg-brand-input border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark transition-all"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="flex justify-between items-center pt-6">
                                <p className="text-[10px] text-gray-400 max-w-xs leading-relaxed uppercase">By clicking submit, you agree to our Volunteer Guidelines.</p>
                                <div className="flex gap-4">
                                    <button type="button" className="text-xs font-bold text-gray-400 hover:text-brand-dark px-4">Save Draft</button>
                                    <button type="submit" disabled={processing} className="bg-gradient-to-r from-brand-secondary to-[#b35e19] hover:from-[#b35e19] hover:to-orange-500 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-[#b35e19]/30 transition-all">
                                        {processing ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
