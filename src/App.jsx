import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import AppRoutes from './Routes';
import Footer from './Pages/Footer';
import { AuthProvider } from './AuthContext.jsx';
import "@fontsource/lato";
import './App.css';
import ScrollToTop from './ScrollToTop.jsx';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <ScrollToTop />
                <MainContent />
            </AuthProvider>
        </Router>
    );
};

const MainContent = () => {
    const location = useLocation();

    const isProfilePage = location.pathname === '/profile';

    return (
        <>
            <AppRoutes />
            {!isProfilePage && <Footer />}
        </>
    );
};

export default App;
