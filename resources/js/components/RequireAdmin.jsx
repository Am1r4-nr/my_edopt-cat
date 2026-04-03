import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireAdmin({ children }) {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Verifying access...</div>;
    }

    if (!user || user.role !== 'admin') {
        // Redirect to home if not logged in or not admin
        // If not logged in, maybe to login? But requirement says "match ui with correct role".
        // If regular user tries to access admin, go to home.
        // If guest tries to access admin, go to login?
        // Current logic was navigate to "/"
        // Let's stick to "/" for now as guests are technically "not admin".
        // But maybe cleaner to go to home.
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
