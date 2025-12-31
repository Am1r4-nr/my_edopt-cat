import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card } from '@/components/ui/Card';
import api from '@/lib/api';
import { AlertTriangle, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in React
// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

export default function IncidentMap() {
    const center = [3.2535, 101.7346]; // IIUM Coordinates (approx)
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await api.get('/incidents');
                setIncidents(response.data);
            } catch (error) {
                console.error('Failed to fetch incidents:', error);
            }
        };

        fetchIncidents();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Incident & Rescue Map</h1>
                <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-xs font-medium flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Critical
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span> Medium
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Map Container */}
                <Card className="lg:col-span-3 overflow-hidden h-[600px] border-0 shadow-lg dark:bg-gray-800">
                    <MapContainer center={center} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {incidents.map((incident) => (
                            <Marker key={incident.id} position={incident.location}>
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold text-gray-900">{incident.type}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                                        <span className={`text-xs px-2 py-1 rounded font-medium 
                                            ${incident.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {incident.severity}
                                        </span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Card>

                {/* Incident List Sidebar */}
                <div className="space-y-4 h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {incidents.map((incident) => (
                        <Card key={incident.id} className="hover:border-blue-500 transition-colors cursor-pointer dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-2">
                                        <AlertTriangle className={`h-4 w-4 ${incident.severity === 'Critical' ? 'text-red-500' : 'text-yellow-500'}`} />
                                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{incident.type}</h4>
                                    </div>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">{incident.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                                    {incident.description}
                                </p>
                                <div className="mt-3 flex items-center text-xs text-blue-600 dark:text-blue-400">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    View on map
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
