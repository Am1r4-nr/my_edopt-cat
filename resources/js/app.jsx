import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

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

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Routes>
                    {/* Auth Routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Protected Admin Routes */}
                    <Route path="/" element={<AdminLayout />}>
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
        <App />
    </React.StrictMode>
);
