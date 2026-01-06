import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';
import RequireAdmin from './components/RequireAdmin'; // Added RequireAdmin
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout'; // Added Public Layout
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'; // Added Home Page
import PublicCatList from './pages/PublicCatList';
import About from './pages/About';
import Donate from './pages/Donate';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicCatDetail from './pages/PublicCatDetail';
import UserProfile from './pages/UserProfile';
import Events from './pages/Events';

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
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/cats" element={<PublicCatList />} />
                        <Route path="/cats/:id" element={<PublicCatDetail />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/donate" element={<Donate />} />
                        <Route path="/profile" element={<UserProfile />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Protected Admin Routes */}
                    <Route path="/admin" element={
                        <RequireAdmin>
                            <AdminLayout />
                        </RequireAdmin>
                    }>
                        <Route index element={<Dashboard />} />

                        <Route path="cats" element={<CatList />} />
                        <Route path="cats/:id" element={<CatDetail />} />

                        <Route path="adoptions" element={<AdoptionBoard />} />
                        <Route path="finances" element={<FinanceDashboard />} />
                        <Route path="incidents" element={<IncidentMap />} />
                        <Route path="reports" element={<AnalyticsDashboard />} />

                        <Route path="messages" element={<Messages />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
