import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon paths
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

// Component to handle map clicks and drop a pin
function LocationSelector({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    return position === null ? null : (
        <Marker position={position} />
    );
}

function RecenterMap({ position }) {
    const map = useMap();
    if (position) map.setView(position, map.getZoom());
    return null;
}

export default function Incidents() {
    const [type, setType] = useState('Injury');
    const [catId, setCatId] = useState('');
    const [estTime, setEstTime] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [position, setPosition] = useState(null); // {lat, lng}
    
    // Default map center (e.g., IIUM Campus approx coordinates or generic city)
    const defaultCenter = [3.2505, 101.7346];

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!position) {
            alert('Please select the incident location on the map.');
            return;
        }

        setSubmitting(true);
        const formData = new FormData();
        formData.append('type', type);
        formData.append('description', description);
        formData.append('cat_id', catId);
        formData.append('latitude', position.lat);
        formData.append('longitude', position.lng);
        if (photo) formData.append('photo', photo);

        try {
            await axios.post('/api/incidents', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess(true);
            window.scrollTo(0, 0);
        } catch (err) {
            alert('Failed to submit report. ' + (err.response?.data?.message || ''));
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-brand-base pt-20">
                <div className="bg-white p-12 rounded-[3rem] shadow-sm text-center max-w-lg border border-brand-cream">
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl font-display">✓</div>
                    <h2 className="text-3xl font-display font-bold text-brand-dark mb-4">Report Submitted</h2>
                    <p className="text-gray-500 mb-8">Thank you for your vigilance. Our RapidResponse team will review this immediately.</p>
                    <button onClick={() => window.location.reload()} className="bg-brand-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg">Submit Another</button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-brand-base min-h-screen pt-32 pb-24 font-sans text-brand-dark">
            <div className="max-w-4xl mx-auto text-center px-6 mb-16">
                <p className="text-[#b35e19] text-[10px] uppercase font-bold tracking-widest mb-4">Care & Community</p>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-brand-dark mb-6">
                    Incident <span className="text-[#f5a623] italic">Reporting Hub</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    Your vigilance helps us maintain a safe sanctuary. If you've witnessed a feline in distress or found an orphan kitty, please provide the details below.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Form */}
                <div className="lg:col-span-7 bg-[#fdfbf8] rounded-[3rem] p-8 md:p-12 shadow-sm border border-[#dfd5c5]/50">
                    <h3 className="text-2xl font-display font-bold text-brand-dark mb-2">Report Details</h3>
                    <p className="text-gray-500 text-sm mb-8">Please fill out the information as accurately as possible.</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Incident Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Injury', 'Missing', 'Death'].map(t => (
                                    <button 
                                        key={t} type="button" onClick={() => setType(t)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${type === t ? 'border-[#b35e19] bg-[#f5ead8]/30 text-brand-dark' : 'border-transparent bg-[#ebe2d3] text-gray-500 hover:bg-[#dfd5c5]'}`}
                                    >
                                        <span className="text-2xl mb-2">{t === 'Injury' ? '🚑' : t === 'Missing' ? '🔍' : '💔'}</span>
                                        <span className="text-xs font-bold">{t}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Cat ID (Optional)</label>
                                <input type="text" placeholder="e.g. CAT-492" value={catId} onChange={e=>setCatId(e.target.value)} className="w-full bg-[#ebe2d3] border-none rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#b35e19]" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Estimated Time</label>
                                <input type="datetime-local" value={estTime} onChange={e=>setEstTime(e.target.value)} className="w-full bg-[#ebe2d3] border-none rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#b35e19]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                            <textarea required rows="4" placeholder="Describe the situation in detail..." value={description} onChange={e=>setDescription(e.target.value)} className="w-full bg-[#ebe2d3] border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#b35e19] resize-none"></textarea>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Photo Evidence</label>
                            <div className="w-full bg-[#ebe2d3]/50 border-2 border-dashed border-[#dfd5c5] rounded-3xl p-8 text-center relative overflow-hidden transition-colors hover:bg-[#ebe2d3]">
                                <input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                {photo ? (
                                    <div className="text-brand-dark font-bold text-sm">📸 {photo.name}</div>
                                ) : (
                                    <>
                                        <div className="text-3xl mb-3 text-[#b35e19]">📸</div>
                                        <div className="text-brand-dark font-bold text-sm mb-1">Drag and drop images or click to upload</div>
                                        <div className="text-gray-400 text-[10px]">JPG, PNG up to 10MB</div>
                                    </>
                                )}
                            </div>
                        </div>

                        <button disabled={submitting} type="submit" className="w-full bg-gradient-to-r from-brand-secondary to-orange-500 text-white font-bold py-4 rounded-full shadow-lg shadow-orange-500/30 hover:opacity-90">
                            {submitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </form>
                </div>

                {/* Right Map & Info */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-gray-500 rounded-[3rem] overflow-hidden p-6 relative flex flex-col items-center border-4 border-gray-100 shadow-xl shadow-gray-300/20">
                        <div className="flex justify-between w-full items-center mb-4 z-10 px-2 text-white drop-shadow-md">
                            <span className="text-xs font-bold tracking-widest uppercase">📍 Incident Location</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest bg-orange-500/80 px-2 py-1 rounded">Pin Point Required</span>
                        </div>
                        
                        <div className="w-full h-64 rounded-3xl overflow-hidden relative z-0 border-[6px] border-gray-400/30">
                            <MapContainer center={defaultCenter} zoom={15} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationSelector position={position} setPosition={setPosition} />
                                <RecenterMap position={position} />
                            </MapContainer>
                        </div>

                        <div className="w-full mt-4 bg-white/20 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center text-white">
                            <div className="text-[10px] font-bold tracking-widest">
                                SELECTED COORDINATES <br/>
                                <span className="text-xs">{position ? `${position.lat.toFixed(4)}°, ${position.lng.toFixed(4)}°` : 'None Selected'}</span>
                            </div>
                            <button onClick={()=>setPosition(null)} className="text-[10px] bg-white text-gray-800 px-4 py-2 rounded-full font-bold">Reselect</button>
                        </div>
                    </div>

                    <div className="bg-[#fcf9f5] border border-[#f5ead8] rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-brand-secondary text-white flex items-center justify-center font-bold">i</div>
                            <h4 className="font-bold text-brand-dark">Emergency Protocol</h4>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed mb-6">
                            If this is a life-threatening emergency for a cat and you are nearby, please contact our 24/7 RapidResponse team directly.
                        </p>
                        <div className="flex items-center gap-4 border-t border-[#f5ead8] pt-6">
                            <div className="w-12 h-12 bg-[#b35e19] text-white rounded-full flex items-center justify-center text-xl">📞</div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Emergency Hotlines</p>
                                <p className="text-lg font-display font-bold text-brand-dark">1-800-MEOW-HELP</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-32 bg-gray-200 rounded-[2.5rem] overflow-hidden relative shadow-sm group cursor-pointer">
                        <img src="/images/ui_ux_implementation_1775142993490.webp" className="absolute inset-0 w-full h-full object-cover blur-sm opacity-60 mix-blend-multiply group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent p-6 text-white flex flex-col justify-center">
                            <h4 className="font-bold text-sm mb-1">Our Community Impact</h4>
                            <p className="text-[10px] text-gray-300 mb-3 max-w-[200px]">Last month, community reports helped us rescue 42 street cats.</p>
                            <div className="flex -space-x-2">
                                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-400 border border-white"></div>)}
                                <div className="w-6 h-6 rounded-full bg-brand-primary border border-white text-[8px] flex items-center justify-center font-bold">+1.2k</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
