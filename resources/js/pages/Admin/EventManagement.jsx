import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EventManagement() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [loadingAttendees, setLoadingAttendees] = useState(false);

    // Form Modal
    const [showForm, setShowForm] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', start_date: '', type: 'Adoption Drive', location: '', capacity: '', expecttext: '', packagetext: '' });

    const fetchEvents = async () => {
        try {
            const res = await axios.get('/api/admin/events', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
            setEvents(res.data);
        } catch(err) { console.error('Failed to fetch events', err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchEvents(); }, []);

    const handleSelectEvent = async (e) => {
        setSelectedEvent(e);
        setLoadingAttendees(true);
        try {
            const res = await axios.get(`/api/admin/events/${e.id}/attendees`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
            setAttendees(res.data.attendees);
        } catch(err) { console.error('Failed to fetch attendees', err); }
        finally { setLoadingAttendees(false); }
    };

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        
        let processedFeatures = [];
        if (formData.expecttext?.trim()) processedFeatures.push({ title: 'What to Expect', items: formData.expecttext.split('\n').filter(i=>i.trim()) });
        if (formData.packagetext?.trim()) processedFeatures.push({ title: 'Adoption Package', items: formData.packagetext.split('\n').filter(i=>i.trim()) });

        const payload = { ...formData, features: processedFeatures };

        try {
            if (editingEventId) {
                await axios.put(`/api/admin/events/${editingEventId}`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
            } else {
                await axios.post('/api/admin/events', payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
            }
            setShowForm(false);
            setEditingEventId(null);
            
            if (editingEventId && selectedEvent) {
                setSelectedEvent({ ...selectedEvent, ...payload });
            }
            fetchEvents();
        } catch(err) { console.error('Failed to save event', err); }
    };

    const openEditForm = () => {
        let defaultExpect = '';
        let defaultPackage = '';
        if (selectedEvent.features && Array.isArray(selectedEvent.features)) {
            const exp = selectedEvent.features.find(f => f.title === 'What to Expect');
            if (exp) defaultExpect = exp.items.join('\n');
            const pkg = selectedEvent.features.find(f => f.title === 'Adoption Package');
            if (pkg) defaultPackage = pkg.items.join('\n');
        }

        setFormData({
            title: selectedEvent.title,
            description: selectedEvent.description || '',
            start_date: selectedEvent.start_date ? new Date(selectedEvent.start_date).toISOString().slice(0, 16) : '',
            type: selectedEvent.type,
            location: selectedEvent.location || '',
            capacity: selectedEvent.capacity || '',
            expecttext: defaultExpect,
            packagetext: defaultPackage
        });
        setEditingEventId(selectedEvent.id);
        setShowForm(true);
    };

    return (
        <div className="bg-[#fdfbf8] rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 relative min-h-[80vh]">
            <div className="flex-1 max-w-4xl space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-brand-dark mb-2">Event Management</h1>
                        <p className="text-gray-500 text-sm max-w-sm">Coordinate adoption drives and community sanctuary tours.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-gray-100 hover:bg-gray-200 text-brand-dark font-bold text-xs px-6 py-3 rounded-full flex items-center shadow-sm">
                            <span className="mr-2">▼</span> Filter
                        </button>
                        <button onClick={() => { 
                            setFormData({ title: '', description: '', start_date: '', type: 'Adoption Drive', location: '', capacity: '', expecttext: '', packagetext: '' });
                            setEditingEventId(null);
                            setShowForm(true); 
                        }} className="bg-[#b35e19] hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-full flex items-center shadow-md">
                            <span className="mr-2">+</span> Create New Event
                        </button>
                    </div>
                </div>

                {/* Event List */}
                <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#f5ead8]">
                    <div className="grid grid-cols-12 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
                        <div className="col-span-5">Title</div>
                        <div className="col-span-3">Date</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Status</div>
                    </div>
                    
                    <div className="space-y-4">
                        {loading ? <div className="text-center py-10 text-gray-400">Loading events...</div> : events.map(evt => (
                            <div 
                                key={evt.id} 
                                onClick={() => handleSelectEvent(evt)}
                                className={`grid grid-cols-12 items-center bg-[#fdfbf8] border rounded-2xl p-4 cursor-pointer transition-colors ${selectedEvent?.id === evt.id ? 'border-[#b35e19] shadow-sm' : 'border-[#f5ead8] hover:border-gray-300'}`}
                            >
                                <div className="col-span-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#f5ead8] flex items-center justify-center shrink-0">
                                        🐈
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-dark text-sm">{evt.title}</h4>
                                        <p className="text-[10px] text-gray-500 line-clamp-1">{evt.location || 'Sanctuary Atelier'}</p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <p className="text-xs text-gray-600">{new Date(evt.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-[9px] font-bold uppercase shrink-0">{evt.type}</span>
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold">
                                        {evt.registrations_count || 0} Attendees
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Drawer */}
            {selectedEvent && (
                <div className="w-[380px] bg-[#f5ead8]/30 border border-[#f5ead8] rounded-[2.5rem] p-6 shadow-sm shrink-0 flex flex-col h-auto">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-display font-bold text-brand-dark leading-tight max-w-[250px]">{selectedEvent.title}</h3>
                            <button onClick={openEditForm} className="text-[10px] bg-white border border-[#f5ead8] px-3 py-1.5 rounded-full text-[#b35e19] hover:bg-[#f5ead8] transition-colors mt-3 mb-1 shadow-sm font-bold flex items-center gap-1.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                Edit Details
                            </button>
                            <p className="text-[10px] font-bold text-[#b35e19] uppercase tracking-widest mt-2">{loadingAttendees ? 'Loading Attendees...' : 'Registered Attendees'}</p>
                        </div>
                        <button onClick={() => setSelectedEvent(null)} className="text-gray-400">&times;</button>
                    </div>

                    <div className="bg-[#ebe2d3] rounded-2xl p-4 flex gap-4 mb-6">
                        <div className="flex-1 text-center border-r border-[#dfd5c5]">
                            <p className="text-2xl font-display font-bold text-brand-dark">{attendees.length}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Confirmed</p>
                        </div>
                        <div className="flex-1 text-center">
                            <p className="text-2xl font-display font-bold text-brand-dark">{selectedEvent.capacity ? Math.max(0, selectedEvent.capacity - attendees.length) : '∞'}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Open Spots</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                        {attendees.map(att => (
                            <div key={att.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(att.name)}&background=random`} className="w-8 h-8 rounded-full" />
                                <div className="flex-1 min-w-0">
                                    <h5 className="font-bold text-sm text-brand-dark truncate">{att.name}</h5>
                                    <p className="text-xs text-gray-400 truncate">{att.email}</p>
                                </div>
                                <div className="text-[9px] text-gray-400 font-bold shrink-0">{att.registeredAt}</div>
                            </div>
                        ))}
                        {attendees.length === 0 && !loadingAttendees && <p className="text-xs text-gray-400 text-center py-4">No attendees registered yet.</p>}
                    </div>

                    <button className="w-full mt-6 bg-transparent border border-gray-300 hover:bg-white text-gray-500 font-bold text-xs py-3.5 rounded-full transition-all">
                        Export Guest List (CSV)
                    </button>
                </div>
            )}

            {/* Create Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative">
                        <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
                            &times;
                        </button>
                        <h3 className="text-2xl font-display font-bold text-brand-dark mb-6">{editingEventId ? 'Edit Event' : 'Create New Event'}</h3>
                        <form onSubmit={handleSubmitEvent} className="space-y-4">
                            <div><label className="text-xs font-bold text-gray-500">Title</label><input required className="w-full bg-brand-input rounded-xl px-4 py-3 mt-1" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})}/></div>
                            <div><label className="text-xs font-bold text-gray-500">Event Date and Time</label><input type="datetime-local" required className="w-full bg-brand-input rounded-xl px-4 py-3 mt-1" value={formData.start_date} onChange={e=>setFormData({...formData, start_date: e.target.value})}/></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500">Type</label>
                                    <select className="w-full bg-brand-input rounded-xl px-4 py-3 mt-1" value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})}>
                                        <option>Adoption Drive</option><option>Fundraiser</option><option>Workshop</option><option>Awareness</option>
                                    </select>
                                </div>
                                <div><label className="text-xs font-bold text-gray-500">Capacity</label><input type="number" className="w-full bg-brand-input rounded-xl px-4 py-3 mt-1" value={formData.capacity} onChange={e=>setFormData({...formData, capacity: e.target.value})}/></div>
                            </div>
                            <div><label className="text-xs font-bold text-gray-500">Location</label><input className="w-full bg-brand-input rounded-xl px-4 py-3 mt-1" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})}/></div>
                            <div><label className="text-xs font-bold text-gray-500">Description</label><textarea required rows="4" className="w-full bg-brand-input rounded-xl px-4 py-3 mt-1" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})}></textarea></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-xs font-bold text-gray-500">What to Expect (One per line)</label><textarea rows="3" className="w-full bg-brand-input rounded-xl px-4 py-3 mt-1" value={formData.expecttext} onChange={e=>setFormData({...formData, expecttext: e.target.value})} placeholder="Interactive games..."></textarea></div>
                                <div><label className="text-xs font-bold text-gray-500">Adoption Package (One per line)</label><textarea rows="3" className="w-full bg-brand-input rounded-xl px-4 py-3 mt-1" value={formData.packagetext} onChange={e=>setFormData({...formData, packagetext: e.target.value})} placeholder="Health check..."></textarea></div>
                            </div>
                            <button type="submit" className="w-full bg-[#b35e19] text-white font-bold py-4 rounded-xl mt-4">
                                {editingEventId ? 'Save Changes' : 'Publish Event'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
