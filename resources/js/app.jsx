import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Public/Home';
import Donate from './pages/Public/Donate';
import Events from './pages/Public/Events';
import EventDetail from './pages/Public/EventDetail';
import AboutUs from './pages/Public/AboutUs';
import VolunteerApply from './pages/Public/VolunteerApply';
import Incidents from './pages/Public/Incidents';
import GpsMap from './pages/Public/GpsMap';
import VolunteerDashboard from './pages/Volunteer/VolunteerDashboard';
import VolunteerPipeline from './pages/Admin/VolunteerPipeline';
import EventManagement from './pages/Admin/EventManagement';
import IncidentManagement from './pages/Admin/IncidentManagement';
import GpsLiveMap from './pages/Admin/GpsLiveMap';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

import CatList from './pages/Cats/CatList';
import CatDetail from './pages/Cats/CatDetail';
import AdoptionBoard from './pages/Adoptions/AdoptionBoard';
import FinanceDashboard from './pages/Finances/FinanceDashboard';
import IncidentMap from './pages/Incidents/IncidentMap';
import AnalyticsDashboard from './pages/Reports/AnalyticsDashboard';
import Messages from './pages/Messages/Messages';
import Calendar from './pages/Calendar/Calendar';
import Settings from './pages/Settings';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AuthProvider>
                <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<PublicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="about" element={<AboutUs />} />
                        {/* Placeholders for public module forms/pages */}
                        <Route path="cats" element={<div className="p-8">Public Cats Gallery</div>} />
                        <Route path="donate" element={<Donate />} />
                        <Route path="volunteer" element={<VolunteerApply />} />
                        <Route path="volunteer-dashboard" element={<VolunteerDashboard />} />
                        <Route path="events" element={<Events />} />
                        <Route path="events/:id" element={<EventDetail />} />
                        <Route path="incidents" element={<Incidents />} />
                        <Route path="gps" element={<GpsMap />} />
                    </Route>

                    {/* Protected Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />

                        <Route path="cats" element={<CatList />} />
                        <Route path="cats/:id" element={<CatDetail />} />

                        <Route path="adoptions" element={<AdoptionBoard />} />
                        <Route path="finances" element={<FinanceDashboard />} />
                        <Route path="incidents" element={<IncidentMap />} />
                        <Route path="reports" element={<AnalyticsDashboard />} />

                        <Route path="incidents-hub" element={<IncidentManagement />} />
                        <Route path="live-map" element={<GpsLiveMap />} />

                        <Route path="messages" element={<Messages />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="volunteers" element={<VolunteerPipeline />} />
                        <Route path="events" element={<EventManagement />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
