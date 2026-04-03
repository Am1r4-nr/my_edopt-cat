import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

export default function GpsMap() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setLoading(true);
        try {
            const res = await axios.get('/api/gps/search', { params: { q: searchQuery } });
            setResults(res.data);
        } catch(err) { console.error(err); }
        finally { setLoading(false); }
    };

    const defaultCenter = [3.2505, 101.7346];

    return (
        <div className="bg-brand-base min-h-screen pt-32 pb-24 font-sans text-brand-dark">
            <div className="max-w-4xl mx-auto text-center px-6 mb-12">
                <p className="text-[#b35e19] text-[10px] uppercase font-bold tracking-widest mb-4">Location Finder</p>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-brand-dark mb-6">
                    Public <span className="text-[#f5a623] italic">GPS Tracking</span>
                </h1>
                
                <form onSubmit={handleSearch} className="max-w-xl mx-auto relative mt-8">
                    <input 
                        type="text" 
                        placeholder="Search cat by name or ID (e.g. CAT-492)" 
                        value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                        className="w-full bg-[#fcf9f5] border-2 border-[#f5ead8] rounded-full px-6 py-4 text-base focus:ring-0 focus:border-[#b35e19] transition-colors"
                    />
                    <button type="submit" disabled={loading} className="absolute right-2 top-2 bottom-2 bg-[#b35e19] text-white font-bold px-6 rounded-full hover:bg-orange-600 transition">
                        {loading ? '...' : 'Search'}
                    </button>
                </form>
            </div>

            <div className="max-w-6xl mx-auto px-6 h-[60vh]">
                <div className="w-full h-full bg-gray-200 rounded-[3rem] overflow-hidden border-4 border-white shadow-xl relative z-0">
                    <MapContainer center={results.length > 0 ? [results[0].latitude, results[0].longitude] : defaultCenter} zoom={15} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                        {results.map((r, i) => (
                            <Marker key={i} position={[r.latitude, r.longitude]}>
                                <Popup>
                                    <div className="text-center font-sans">
                                        <div className="font-bold text-brand-dark text-base">{r.name}</div>
                                        <div className="text-[10px] text-gray-500 mb-2">#CAT-{r.cat_id}</div>
                                        <div className="text-xs text-[#b35e19] font-medium">Last seen: {new Date(r.timestamp).toLocaleString()}</div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                    
                    {results.length === 0 && !loading && (
                        <div className="absolute inset-0 pointer-events-none bg-white/40 backdrop-blur-sm flex items-center justify-center z-[1000]">
                            <div className="bg-white px-8 py-4 rounded-full shadow-lg font-bold text-gray-500 shadow-gray-200/50">Search for a cat to view its last known location</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
