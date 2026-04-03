import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Ensure proper defaults for Laravel SPA authentication
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkUserStatus = async () => {
        try {
            const response = await axios.get('/api/user');
            setUser(response.data.user || response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, []);

    const login = async (data) => {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/api/login', data);
        setUser(response.data.user);
    };

    const register = async (data) => {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/api/register', data);
        setUser(response.data.user);
    };

    const logout = async () => {
        await axios.post('/api/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading, checkUserStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
