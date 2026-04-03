import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

function RecenterMap({ position }) {
    const map = useMap();
    if (position) map.setView(position, map.getZoom(), { animate: true });
    return null;
}

export default function GpsLiveMap() {
    const [data, setData] = useState({ cats: [], stats: { online: 0, pending_alerts: 0 } });
    const [selectedCat, setSelectedCat] = useState(null);
    const [logNotes, setLogNotes] = useState('');
    const [statusFlag, setStatusFlag] = useState('');

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/admin/gps', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setData(res.data);
            if (selectedCat) {
                const stillExists = res.data.cats.find(c => c.id === selectedCat.id);
                if (stillExists) setSelectedCat(stillExists);
            }
        } catch(err) { console.error(err); }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15000); // Poll every 15s
        return () => clearInterval(interval);
    }, []);

    const submitLogEntry = async () => {
        if (!selectedCat) return;
        try {
            await axios.post('/api/admin/gps/log', {
                cat_id: selectedCat.id,
                latitude: selectedCat.latitude,
                longitude: selectedCat.longitude,
                notes: logNotes,
                status_flag: statusFlag
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setLogNotes('');
            setStatusFlag('');
            alert('Log submitted successfully');
            fetchData();
        } catch(err) { alert('Failed to log entry'); }
    };

    const handleSelectCat = (cat) => {
        setSelectedCat(cat);
        setLogNotes('');
        setStatusFlag('');
    };

    // Simulated center based on first cat or generic
    const center = data.cats.length > 0 ? [data.cats[0].latitude, data.cats[0].longitude] : [3.2505, 101.7346];

    return (
        <div className="relative w-full h-[85vh] rounded-[2.5rem] overflow-hidden -mt-4 shadow-inner bg-gray-100">
            {/* The Map */}
            <div className="absolute inset-0 z-0">
                <MapContainer center={center} zoom={16} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                    {selectedCat && <RecenterMap position={[selectedCat.latitude, selectedCat.longitude]} />}
                    
                    {data.cats.map(cat => (
                        <Marker 
                            key={cat.id} 
                            position={[cat.latitude, cat.longitude]}
                            eventHandlers={{ click: () => handleSelectCat(cat) }}
                        >
                            <Popup>
                                <div className="text-center font-sans">
                                    <div className="font-bold text-brand-dark">{cat.name}</div>
                                    <div className="text-xs text-gray-500">{cat.cat_id_formatted}</div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Top Bar Floating */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex gap-4 w-[90%] max-w-2xl bg-white/60 backdrop-blur-md rounded-full shadow-lg p-2 px-6 items-center border border-white">
                <span className="font-display font-bold text-brand-dark text-lg mr-4">GPS Map</span>
                <input type="text" placeholder="Search cats or locations..." className="flex-1 bg-[#ebe2d3]/50 border-none rounded-full px-4 text-sm py-2" />
                <button className="bg-[#b35e19] text-white font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-orange-600 transition shadow-md whitespace-nowrap">Report Incident</button>
            </div>

            {/* Left Floating Stat Box */}
            <div className="absolute top-24 left-6 z-10 w-72 bg-[#fdfbf8] rounded-[2.5rem] shadow-2xl p-6 border border-[#f5ead8]">
                <h3 className="font-display font-bold text-[#b35e19] mb-6">Active Tracking</h3>
                <div className="flex justify-between items-center mb-4">
                    <span className="flex items-center gap-2 text-sm text-gray-600"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Cats Online</span>
                    <span className="font-bold font-display text-xl">{String(data.stats.online).padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#f5ead8]">
                    <span className="flex items-center gap-2 text-sm text-gray-600"><div className="w-2 h-2 bg-orange-400 rounded-full"></div> Pending Alerts</span>
                    <span className="font-bold font-display text-xl">{String(data.stats.pending_alerts).padStart(2, '0')}</span>
                </div>

                <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Activity</h4>
                <div className="space-y-4 mb-6">
                    {data.cats.slice(0, 2).map((c, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#ebe2d3] flex items-center justify-center text-xs shrink-0">{i === 0 ? '🐾' : '⚠️'}</div>
                            <div>
                                <p className="text-xs font-bold text-brand-dark leading-tight">{c.name} {i===0?'moved 50m':'Boundary Alert'}</p>
                                <p className="text-[10px] text-gray-500">{c.last_seen}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full bg-[#ebe2d3] text-[#b35e19] font-bold text-[10px] uppercase tracking-widest py-3 rounded-full hover:bg-[#dfd5c5] transition">View Full Feed</button>
            </div>

            {/* Right Live Update Drawer/Panel */}
            {selectedCat && (
                <div className="absolute top-24 right-6 z-10 w-80 bg-[#fdfbf8]/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-6 border border-white flex flex-col max-h-[70vh] overflow-y-auto hidden-scrollbar">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-display font-bold text-brand-dark text-xl leading-none">Live Update</h3>
                            <p className="text-[10px] text-gray-500">{selectedCat.name} | {selectedCat.cat_id_formatted}</p>
                        </div>
                        <button onClick={()=>setSelectedCat(null)} className="text-gray-400 hover:text-red-500 transition">✕</button>
                    </div>

                    <div className="w-full h-40 bg-gray-200 rounded-3xl overflow-hidden relative mb-6 shadow-sm">
                        <img src={selectedCat.image_url || '/images/hero_cat_1775141614458.png'} className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 bg-[#b35e19] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded shadow-md">
                            {selectedCat.battery}
                        </span>
                    </div>

                    <div className="mb-6 flex-1 flex flex-col">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">New Log Entry</label>
                        <textarea 
                            value={logNotes} onChange={e=>setLogNotes(e.target.value)}
                            className="w-full bg-white border border-[#f5ead8] rounded-2xl p-4 text-sm text-gray-600 focus:ring-2 focus:ring-[#b35e19] flex-1 min-h-[100px] resize-none"
                            placeholder="Observations, health check notes, or habitat changes..."
                        ></textarea>
                    </div>

                    <div className="mb-6">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Status Change</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Sighted', 'Missing', 'Relocated', 'Medical Need'].map(flag => (
                                <button 
                                    key={flag} type="button" onClick={()=>setStatusFlag(statusFlag === flag ? '' : flag)}
                                    className={`py-2 px-1 text-[10px] font-bold uppercase tracking-wider rounded-xl transition ${statusFlag === flag ? 'bg-[#b35e19] text-white shadow-md' : 'bg-[#ebe2d3] text-gray-500 hover:bg-[#dfd5c5]'}`}
                                >
                                    {flag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={submitLogEntry}
                        className="w-full bg-[#b35e19] hover:bg-orange-600 text-white font-bold py-4 rounded-full shadow-xl transition shadow-orange-900/20"
                    >
                        Submit Log Entry
                    </button>
                </div>
            )}
        </div>
    );
}
