import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function VolunteerPipeline() {
    const [data, setData] = useState({
        metrics: { total_applications: 0, pending: 0, approved: 0, rejected: 0, active_hours_month: 0 },
        applications: [],
        activity_logs: []
    });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const [selectedApp, setSelectedApp] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [processing, setProcessing] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/admin/volunteers', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setData(res.data);
            
            // If an app is selected, update its data or close if it was removed (rare but good practice)
            if (selectedApp) {
                const refreshed = res.data.applications.find(a => a.id === selectedApp.id);
                setSelectedApp(refreshed || null);
            }
        } catch (err) {
            console.error("Error fetching pipeline", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReview = async (id, statusItem) => {
        if (statusItem === 'rejected' && !rejectReason) {
            alert('Please provide a reason for rejection.');
            return;
        }

        setProcessing(true);
        try {
            await axios.post(`/api/admin/volunteers/${id}/review`, {
                status: statusItem,
                reason: statusItem === 'rejected' ? rejectReason : null
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            setRejectReason('');
            fetchData();
        } catch (err) {
            console.error("Review failed", err);
            alert("Failed to review application.");
        } finally {
            setProcessing(false);
        }
    };

    const filteredApps = data.applications.filter(app => filter === 'all' ? true : app.status === filter);

    if (loading) return <div className="p-8 text-center text-gray-400">Loading Pipeline...</div>;

    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    return (
        <div className="bg-[#fdfbf8] rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 relative min-h-[80vh]">
            
            {/* Left Content Area */}
            <div className="flex-1 max-w-4xl space-y-8">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-brand-dark mb-2">Volunteer Pipeline</h1>
                        <p className="text-gray-500 text-sm">Manage and review incoming kitten-whisperer applications.</p>
                    </div>
                    <div className="flex gap-6 text-center">
                        <div>
                            <p className="text-[10px] font-bold text-[#b35e19] uppercase tracking-widest mb-1">Active Volunteers</p>
                            <p className="text-3xl font-display font-bold text-brand-dark">{data.metrics.approved}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#b35e19] uppercase tracking-widest mb-1">Hours This Month</p>
                            <p className="text-3xl font-display font-bold text-brand-dark">{parseFloat(data.metrics.active_hours_month || 0).toFixed(0)}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {[
                        { id: 'all', label: 'All Applications', count: data.metrics.total_applications },
                        { id: 'pending', label: 'Pending', count: data.metrics.pending },
                        { id: 'approved', label: 'Approved', count: data.metrics.approved },
                        { id: 'rejected', label: 'Rejected', count: data.metrics.rejected },
                    ].map(f => (
                        <button 
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === f.id ? 'bg-[#f5ead8] text-[#b35e19]' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                        >
                            {f.label} ({f.count})
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-4">
                    {filteredApps.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">No applications match this filter.</div>
                    ) : (
                        filteredApps.map(app => {
                            let parsedSkills = {};
                            try { parsedSkills = JSON.parse(app.skills); } catch(e){}

                            return (
                                <div 
                                    key={app.id}
                                    onClick={() => setSelectedApp(app)}
                                    className={`bg-white rounded-3xl p-6 border transition-all cursor-pointer flex gap-5 items-center shadow-sm ${selectedApp?.id === app.id ? 'border-[#b35e19] shadow-[#b35e19]/10' : 'border-gray-100 hover:border-gray-300'}`}
                                >
                                    <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=dfd5c5&color=b35e19`} alt={app.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-gray-900 truncate">{app.name}</h4>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0 ${app.status==='approved'?'bg-green-50 text-green-600':app.status==='rejected'?'bg-red-50 text-red-600':'bg-[#f5ead8] text-[#b35e19]'}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mb-3 overflow-x-hidden">
                                            <span className="bg-gray-100 px-3 py-1 rounded text-[10px] text-gray-500 font-bold whitespace-nowrap">
                                                &#128197; {app.preferred_shift}
                                            </span>
                                            {parsedSkills.petCare && (
                                                <span className="bg-gray-100 px-3 py-1 rounded text-[10px] text-gray-500 font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                                                    &#128062; Exp
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 line-clamp-1 italic">
                                            "{parsedSkills.petCare || 'Ready to help around the atelier...'}"
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-gray-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Right Drawer Panel */}
            {selectedApp && (
                <div className="hidden lg:block w-[420px] bg-[#fcf9f5] border border-[#f5ead8] rounded-[2.5rem] p-8 shadow-sm shrink-0 overflow-y-auto">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application Review</p>
                        <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-900"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </div>

                    <div className="text-center mb-10">
                        <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden shadow-sm relative">
                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedApp.name)}&background=dfd5c5&color=b35e19&size=200`} alt={selectedApp.name} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-brand-dark">{selectedApp.name}</h2>
                        <p className="text-xs text-gray-500 mt-1">Potential {selectedApp.preferred_shift} Nurturer</p>
                        <p className="text-xs text-[#b35e19] mt-2 font-medium">{selectedApp.email} • {selectedApp.phone}</p>
                    </div>

                    {/* Skills */}
                    <div className="bg-white rounded-[1.5rem] p-6 mb-6">
                        <h4 className="text-[10px] font-bold text-[#b35e19] uppercase tracking-widest mb-4">Core Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Pet Care', 'Organizing', 'Flexible'].map(s => (
                                <span key={s} className="bg-gray-100 px-3 py-1.5 rounded text-[10px] text-gray-600 font-bold">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* About Candidate */}
                    <div className="bg-white rounded-[1.5rem] p-6 mb-6">
                        <h4 className="text-[10px] font-bold text-[#b35e19] uppercase tracking-widest mb-4">About the Candidate</h4>
                        <p className="text-xs text-gray-500 leading-relaxed italic border-l-2 border-[#f5ead8] pl-3">
                            "{ (() => {
                                try {
                                    return JSON.parse(selectedApp.skills).petCare || "No specific experience detailed.";
                                } catch (e) {
                                    return selectedApp.skills;
                                }
                            })() }"
                        </p>
                    </div>

                    {/* Availability */}
                    <div className="bg-white rounded-[1.5rem] p-6 mb-8">
                        <h4 className="text-[10px] font-bold text-[#b35e19] uppercase tracking-widest mb-4">Availability Details</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {daysOfWeek.map(day => {
                                const isAvailable = selectedApp.availability?.includes(day);
                                return (
                                    <div key={day} className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                        <span className={`text-[10px] font-bold ${isAvailable ? 'text-gray-700' : 'text-gray-300'}`}>{day}: {isAvailable ? selectedApp.preferred_shift : 'N/A'}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Actions */}
                    {selectedApp.status === 'pending' ? (
                        <div className="space-y-4">
                            <input type="text" placeholder="Rejection reason (Optional)" value={rejectReason} onChange={e=>setRejectReason(e.target.value)} className="w-full bg-white border-0 shadow-sm rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-[#b35e19]/50 text-brand-dark" />
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => handleReview(selectedApp.id, 'rejected')}
                                    disabled={processing}
                                    className="flex-1 bg-gray-100 hover:bg-red-50 text-red-500 font-bold py-3.5 rounded-full transition-colors text-xs disabled:opacity-50"
                                >
                                    REJECT
                                </button>
                                <button 
                                    onClick={() => handleReview(selectedApp.id, 'approved')}
                                    disabled={processing}
                                    className="flex-1 bg-gradient-to-r from-brand-secondary to-[#b35e19] hover:from-[#b35e19] hover:to-orange-500 text-white font-bold py-3.5 rounded-full shadow-lg shadow-[#b35e19]/30 transition-all text-xs disabled:opacity-50"
                                >
                                    APPROVE
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={`text-center py-4 rounded-xl text-xs font-bold uppercase tracking-widest ${selectedApp.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            Candidate {selectedApp.status}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
