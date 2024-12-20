import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const navigate = useNavigate();

    const login = (token, refresh) => {
        setAuthToken(token);
        setRefreshToken(refresh);
        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refresh);
    };

    const logout = () => {
        setAuthToken(null);
        setRefreshToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
        window.location.reload();
    };

    const isTokenExpired = (token) => {
        try {
            if (!token) return true;
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp * 1000;
            return Date.now() > expiry;
        } catch (e) {
            return true;
        }
    };

    const refreshAccessToken = async () => {
        if (!refreshToken) return;
        try {
            const response = await fetch(`${apiUrl}/api/v1/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            const data = await response.json();
            if (response.ok) {
                setAuthToken(data.access);
                localStorage.setItem('authToken', data.access);
            } else {
                logout();
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
        }
    };

    useEffect(() => {
        if (isTokenExpired(authToken)) {
            refreshAccessToken();
        }
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ authToken, refreshToken, login, logout, isTokenExpired, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
