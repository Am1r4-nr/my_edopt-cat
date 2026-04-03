import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

export default function VolunteerDashboard() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Form states
    const [activityName, setActivityName] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [hours, setHours] = useState('1.0');
    const [logging, setLogging] = useState(false);

    const fetchDashboard = async () => {
        try {
            const res = await axios.get('/api/volunteer/dashboard', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const handleLogActivity = async (e) => {
        e.preventDefault();
        setLogging(true);
        try {
            await axios.post('/api/volunteer/activities', {
                activity_name: activityName,
                description: desc,
                activity_date: date,
                hours_logged: hours
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            // Reset and refresh
            setActivityName('');
            setDesc('');
            setHours('1.0');
            fetchDashboard();
        } catch (err) {
            console.error("Failed to log activity", err);
        } finally {
            setLogging(false);
        }
    };

    if (loading) return <div className="min-h-screen pt-32 text-center bg-brand-base">Loading Atelier...</div>;

    if (error || !data) return (
        <div className="min-h-screen pt-32 text-center bg-brand-base">
            <h2 className="text-2xl font-display text-brand-dark">Access Denied</h2>
            <p className="text-gray-500 mt-2">{error || "You do not have an approved volunteer profile."}</p>
        </div>
    );

    return (
        <div className="w-full relative min-h-screen bg-brand-base pb-24">
            <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-b border-gray-200 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#f5ead8] text-[#b35e19] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">Approved Volunteer</span>
                            <span className="text-xs text-gray-400 font-medium">Assigned: {data.volunteer.preferred_shift} Nurturer</span>
                        </div>
                        <h1 className="text-5xl font-display font-bold text-brand-dark tracking-tight mb-2">Volunteer Atelier</h1>
                        <p className="text-gray-500 text-sm">Welcome back, {user.name}. Your nurturing touch makes a world of difference.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white px-6 py-4 rounded-[1.5rem] shadow-sm border border-gray-100 text-center min-w-[120px]">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Hours</p>
                            <p className="text-3xl font-display font-bold text-brand-dark">{parseFloat(data.total_hours).toFixed(1)}</p>
                        </div>
                        <div className="bg-white px-6 py-4 rounded-[1.5rem] shadow-sm border border-gray-100 text-center min-w-[120px]">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sessions</p>
                            <p className="text-3xl font-display font-bold text-[#b35e19]">{data.sessions}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    
                    {/* Left Column: Form */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="bg-[#f3ece0] rounded-[2rem] p-8">
                            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                                <span className="text-[#b35e19]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></span>
                                Log New Activity
                            </h3>
                            <form onSubmit={handleLogActivity} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Category / Title</label>
                                    <select value={activityName} onChange={e=>setActivityName(e.target.value)} required className="w-full bg-[#ebe2d3] border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark appearance-none">
                                        <option value="" disabled>Select Activity Type...</option>
                                        <option>Evening Feeding & Cleanup</option>
                                        <option>Kitten Socialization</option>
                                        <option>Vet Visit Transportation</option>
                                        <option>Photography for Gallery</option>
                                        <option>Facility Maintenance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">What did you do today?</label>
                                    <textarea value={desc} onChange={e=>setDesc(e.target.value)} required rows="3" placeholder="Socializing with seniors..." className="w-full bg-[#ebe2d3] border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark resize-none"></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Date</label>
                                        <input type="date" value={date} onChange={e=>setDate(e.target.value)} required className="w-full bg-[#ebe2d3] border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Hours Spent</label>
                                        <select value={hours} onChange={e=>setHours(e.target.value)} className="w-full bg-[#ebe2d3] border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark appearance-none">
                                            <option value="0.5">0.5 hrs</option>
                                            <option value="1.0">1.0 hrs</option>
                                            <option value="1.5">1.5 hrs</option>
                                            <option value="2.0">2.0 hrs</option>
                                            <option value="2.5">2.5 hrs</option>
                                            <option value="3.0">3.0 hrs</option>
                                            <option value="4.0">4.0 hrs</option>
                                            <option value="5.0">5.0 hrs</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" disabled={logging || !activityName} className="w-full mt-2 bg-gradient-to-r from-brand-secondary to-[#b35e19] hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-opacity shadow-md disabled:opacity-50">
                                    {logging ? 'Logging...' : 'Post Contribution'}
                                </button>
                            </form>
                        </div>

                        <div className="relative rounded-[2rem] overflow-hidden h-40 shadow-sm">
                            <img src="/images/rescue_cat_2_1775141647261.png" className="w-full h-full object-cover" alt="Cat" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-5">
                                <p className="text-white text-xs italic font-medium">"One cat just leads to another."<br/><span className="text-[#b35e19]">— Ernest Hemingway</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: History */}
                    <div className="md:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 h-max">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-display font-bold text-xl flex items-center gap-2 text-brand-dark">
                                <span className="text-[#b35e19]"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                                Activity History
                            </h3>
                            <button className="text-xs font-bold text-gray-500 hover:text-brand-dark flex items-center">
                                View Full Log <span className="ml-1">&rsaquo;</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {data.activities.length === 0 ? (
                                <div className="text-center py-10 text-gray-400 text-sm">No activities logged yet. Start contributing to see your history!</div>
                            ) : (
                                data.activities.map((act) => (
                                    <div key={act.id} className="bg-[#fdfbf8] border border-[#f5ead8] p-5 rounded-2xl flex items-center justify-between group hover:border-[#b35e19] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#f5ead8] text-[#b35e19] flex items-center justify-center shrink-0">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg> 
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-brand-dark text-sm leading-tight">{act.activity_name}</h4>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{new Date(act.activity_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-bold text-brand-dark text-sm">{parseFloat(act.hours_logged).toFixed(1)} hrs</p>
                                            <p className="text-[9px] font-bold text-[#b35e19] uppercase tracking-wider mt-1">Verified</p>
                                        </div>
                                    </div>
                                ))
                            )}

                            {/* Milestone Marker */}
                            <div className="mt-8 bg-brand-primary/10 border border-brand-primary/20 p-4 rounded-xl flex items-center gap-3 text-brand-primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                <p className="text-xs font-bold">Awesome work! Keep it up to reach the 'Gold Guardian' milestone!</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
