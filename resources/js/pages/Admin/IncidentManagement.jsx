import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon paths
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

export default function IncidentManagement() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('Pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIncident, setSelectedIncident] = useState(null);

    const fetchIncidents = async () => {
        try {
            const res = await axios.get('/api/admin/incidents', {
                params: { type: typeFilter, status: statusFilter, q: searchQuery },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setIncidents(res.data);
            
            // If currently selected incident is in the new list, update it, else clear if filtered out
            if (selectedIncident) {
                const stillExists = res.data.find(i => i.id === selectedIncident.id);
                if (stillExists) setSelectedIncident(stillExists);
            }
        } catch(err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchIncidents(); }, [typeFilter, statusFilter, searchQuery]);

    const handleStatusChange = async (id, action) => {
        try {
            await axios.post(`/api/admin/incidents/${id}/${action}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchIncidents();
        } catch(err) { console.error('Failed to change status', err); }
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Pending': return 'bg-yellow-50 text-[#b35e19] border border-[#f5ead8]';
            case 'In Progress': return 'bg-blue-50 text-blue-600 border border-blue-100';
            case 'Resolved': return 'bg-gray-100 text-gray-500 border border-gray-200';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className="bg-[#fdfbf8] rounded-[2.5rem] p-8 flex flex-col min-h-[80vh]">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-brand-dark mb-1">Incident Management</h1>
                    <p className="text-gray-500 text-sm">Reviewing active reports in the atelier district.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <input 
                        type="text" placeholder="Search by Cat ID..." 
                        value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                        className="w-full bg-[#ebe2d3] border-none rounded-full px-12 py-3 text-sm focus:ring-2 focus:ring-[#b35e19]" 
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                </div>
            </div>

            {/* Filters & Urgent Widget */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex gap-4 items-end">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Incident Type</label>
                        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="bg-white border-none shadow-sm rounded-xl px-4 py-3 text-sm text-brand-dark cursor-pointer min-w-[150px]">
                            <option>All Types</option><option>Injury</option><option>Missing</option><option>Death</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Status</label>
                        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="bg-white border-none shadow-sm rounded-xl px-4 py-3 text-sm text-brand-dark cursor-pointer min-w-[150px]">
                            <option>All Statuses</option><option>Pending</option><option>In Progress</option><option>Resolved</option>
                        </select>
                    </div>
                </div>

                <div className="md:ml-auto bg-orange-100/50 border border-orange-200 rounded-2xl flex items-center p-4 gap-4 flex-1 max-w-sm">
                    <div className="w-10 h-10 rounded-full bg-[#b35e19] text-white flex items-center justify-center text-xl shrink-0">✴</div>
                    <div className="flex-1">
                        <h4 className="font-bold text-brand-dark text-sm">Urgent Notification</h4>
                        <p className="text-[10px] text-gray-500 leading-tight">3 new reports near the North Shelter.</p>
                    </div>
                    <button className="bg-[#b35e19] text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-orange-600 transition">View Alert</button>
                </div>
            </div>

            {/* Main Content Split if Selected */}
            <div className="flex flex-col lg:flex-row gap-8 flex-1">
                
                {/* List View */}
                <div className={`bg-white rounded-[2.5rem] shadow-sm border border-[#f5ead8] overflow-hidden ${selectedIncident ? 'lg:w-1/2' : 'w-full'}`}>
                    <div className="grid grid-cols-12 text-[10px] font-bold text-gray-400 uppercase tracking-widest p-6 border-b border-gray-100">
                        <div className="col-span-4">Incident / Type</div>
                        <div className="col-span-3">Cat ID</div>
                        <div className="col-span-3">Reporter</div>
                        <div className="col-span-2">Status</div>
                    </div>
                    <div className="overflow-y-auto max-h-[60vh] p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-200">
                        {loading && <div className="p-10 text-center text-gray-400">Loading...</div>}
                        {!loading && incidents.length === 0 && <div className="p-10 text-center text-gray-400">No records found.</div>}
                        {incidents.map(inc => (
                            <div 
                                key={inc.id} 
                                onClick={() => setSelectedIncident(inc)}
                                className={`grid grid-cols-12 items-center p-4 rounded-2xl cursor-pointer transition-all border ${selectedIncident?.id === inc.id ? 'bg-[#fcf9f5] border-[#b35e19] shadow-sm relative' : 'border-transparent hover:bg-gray-50'}`}
                            >
                                {selectedIncident?.id === inc.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#b35e19] rounded-r-md"></div>}
                                
                                <div className="col-span-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">🚑</div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-brand-dark text-sm truncate">{inc.type}</h4>
                                        <p className="text-[10px] text-gray-400 truncate">Reported {inc.time_ago}</p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="font-bold text-[#b35e19] text-xs bg-[#f5ead8]/50 px-2 py-0.5 rounded w-max">{inc.cat_id}</div>
                                </div>
                                <div className="col-span-3 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0"></div>
                                    <p className="text-xs text-gray-500 font-medium truncate">{inc.reporter_name}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm ${getStatusStyle(inc.status)}`}>
                                        {inc.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details Panel */}
                {selectedIncident && (
                    <div className="lg:w-1/2 bg-[#fcf9f5] border border-[#f5ead8] rounded-[2.5rem] p-8 shadow-sm flex flex-col h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#dfd5c5]">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="bg-orange-500 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm">Active Investigation</span>
                                <h2 className="text-2xl font-display font-bold text-brand-dark mt-3">Case {selectedIncident.cat_id} Details</h2>
                            </div>
                            <div className="flex gap-2">
                                {selectedIncident.status === 'Pending' && (
                                    <button onClick={()=>handleStatusChange(selectedIncident.id, 'mark-in-progress')} className="bg-white border border-gray-200 hover:border-[#b35e19] text-[#b35e19] font-bold text-[10px] px-4 py-2 rounded-full uppercase tracking-wider transition">Mark In Progress</button>
                                )}
                                {selectedIncident.status !== 'Resolved' && (
                                    <button onClick={()=>handleStatusChange(selectedIncident.id, 'mark-resolved')} className="bg-[#b35e19] text-white font-bold text-[10px] px-4 py-2 rounded-full uppercase tracking-wider hover:bg-orange-600 transition shadow-md">Mark Resolved</button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-3xl border border-[#f5ead8] shadow-sm flex flex-col">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Observation Notes</h4>
                                <p className="text-sm text-gray-600 leading-relaxed italic flex-1">"{selectedIncident.description}"</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="w-full h-32 rounded-3xl overflow-hidden relative shadow-sm border border-gray-100 bg-gray-900 group">
                                    {selectedIncident.photo_url ? (
                                        <img src={selectedIncident.photo_url} className="w-full h-full object-cover opacity-80" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-[#ebe2d3]">
                                            <span className="text-2xl mb-1">📷</span>
                                            <span className="text-[10px] uppercase font-bold tracking-widest">No Photo</span>
                                        </div>
                                    )}
                                    <span className="absolute bottom-3 right-3 text-[9px] text-white font-bold tracking-widest">Evidence Photo #1</span>
                                </div>
                                <div className="flex gap-4 h-full">
                                    <div className="flex-1 bg-white border border-[#f5ead8] rounded-2xl flex flex-col items-center justify-center p-3 text-center">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Time Spotted</span>
                                        <span className="font-display font-bold text-brand-dark text-sm">{selectedIncident.time_spotted}</span>
                                    </div>
                                    <div className="flex-1 bg-white border border-[#f5ead8] rounded-2xl flex flex-col items-center justify-center p-3 text-center">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Severity</span>
                                        <span className={`font-display font-bold text-sm ${selectedIncident.severity === 'Critical' ? 'text-red-500' : 'text-[#b35e19]'}`}>{selectedIncident.severity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-auto">
                            <div className="h-40 rounded-3xl overflow-hidden shadow-sm border border-gray-200 relative">
                                <MapContainer center={[selectedIncident.latitude, selectedIncident.longitude]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[selectedIncident.latitude, selectedIncident.longitude]} />
                                </MapContainer>
                                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur text-[9px] font-bold px-2 py-1 rounded z-[1000]">
                                    {selectedIncident.location_desc}
                                </div>
                            </div>
                            <div className="bg-white border border-[#f5ead8] rounded-3xl p-6 shadow-sm flex flex-col justify-center">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Reporter Information</h4>
                                <div className="flex gap-3 items-center mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#ebe2d3] flex items-center justify-center text-[#b35e19]">👤</div>
                                    <div>
                                        <p className="font-bold text-sm text-brand-dark">{selectedIncident.reporter_name}</p>
                                        <p className="text-[10px] text-gray-500">Verified Reporter</p>
                                    </div>
                                </div>
                                <button className="w-full bg-[#fdfbf8] border border-[#dfd5c5] text-brand-dark hover:bg-[#ebe2d3] transition text-[10px] font-bold uppercase tracking-widest py-2 rounded-full">Contact Reporter</button>
                            </div>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
}
