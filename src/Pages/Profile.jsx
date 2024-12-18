import React, { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    createTheme,
} from '@mui/material';
//Icons
import myprofileicon from '../assets/myprofileicon.png';
import myappsicon from '../assets/myappsicon.png';
import chaticon from '../assets/chaticon.png';
import Notificationicon from '../assets/notificationicon.png';
import paymenticon from '../assets/paymenticon.png';
import appointmenticon from '../assets/appointmenticon.png';
import configicon from '../assets/configicon.png';

//Pages
import ProfilePage from '../components/Proflie/ProfilePage';
import BillingPage from '../components/Proflie/BillingPage';
import AppsPage from '../components/Proflie/AppsPage';
import Consultation from '../components/Proflie/Consultation';

const theme = createTheme({
    typography: {
        h1: {
            fontFamily: 'Lato',
            fontSize: { xs: '12.64px', sm: '16px', md: '18px', lg: '20px' },
            lineHeight: '20px',
            fontWeight: 600,
            color: "#FFF",
            letterSpacing: '0.4px',
        },
        body1: {
            fontFamily: 'Lato',
            fontSize: { xs: '12.64px', sm: '13px', md: '13.5px', lg: '14px' },
            lineHeight: '18.5px',
            fontWeight: 500,
            color: "#FFFFFFCC",
            letterSpacing: '0.4px',
        },
        body2: {
            fontFamily: 'Lato',
            fontSize: { xs: '12.64px', sm: '13.5px', md: '14px', lg: '15px' },
            lineHeight: '18px',
            fontWeight: 500,
            color: "#FFFFFF",
            letterSpacing: '0.4px',
        },
    },
});


const Sidebar = ({ activePage, setActivePage }) => (
    <Box
        component="nav"
        sx={{
            display:{xs:'none',sm:'block'},
            width: '329px',
            height:'auto',
            flexShrink: 0,
            background: 'linear-gradient(180deg, #1F1F1F 0%, #141414 100%)',
            p: '42px 32px 42px 32px',
            gap:'32px',
        }}
    >
        <Typography variant="h1" sx={{ mb: '14px' }}>
            Settings
        </Typography>
        <Typography variant="body1" sx={{ mb: '14px' }}>
            Manage your personal information, billing and payments, and apps.
        </Typography>
        <List
        variant="body2"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            {[
                { text: 'My Profile', icon: myprofileicon, page: 'profile' },
                // { text: 'My Apps', icon: myappsicon, page: 'apps' },
                { text: 'Consultation', icon: chaticon, page: 'consultation' },
                // { text: 'Notification', icon: Notificationicon, page: 'notification' },
                // { text: 'Billing and payments', icon: paymenticon, page: 'billing' },
                // { text: 'Appointment', icon: appointmenticon, page: 'billing' },
                // { text: 'Config Plan', icon: configicon, page: 'billing' },
            ].map((item) => (
                <ListItem
                    key={item.text}
                    onClick={() => setActivePage(item.page)}
                    sx={{
                        borderRadius: '20px',
                        height:'40px',
                        mb: '14px',
                        gap: 1,
                        background: activePage === item.page
                            ? '#00544D80'
                            : 'linear-gradient(90deg, rgba(74, 74, 74, 0.9) 0%, rgba(31, 31, 31, 0.9) 100%)',
                        border: activePage === item.page ? '1.5px solid #008F82' : '0px solid transparent',
                        boxShadow: '0px 4px 4px 0px #00000040',
                        '&:hover': {
                            background: activePage === item.page
                                ? '#00544D80'
                                : 'linear-gradient(90deg, rgba(74, 74, 74, 0.9) 0%, rgba(31, 31, 31, 0.9) 100%)',
                            border: '1.5px solid #8AE3BE4D',
                            cursor: 'pointer',
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 28,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={item.icon} alt={`${item.text} icon`} style={{ width: 24, height: 24}} />
                    </ListItemIcon>
                    <ListItemText 
                        primary={item.text} 
                        sx={{
                            margin: 0
                        }} 
                    />
                </ListItem>
            ))}
        </List>

    </Box>
);

const Profile = () => {
    const [activePage, setActivePage] = useState('profile');

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '600px', background: '#262626' }}>
                <Sidebar activePage={activePage} setActivePage={setActivePage} />
                <Box sx={{width:'100%'}}>
                    {activePage === 'profile' && <ProfilePage />}
                    {activePage === 'billing' && <BillingPage />}
                    {activePage === 'apps' && <AppsPage />}
                    {activePage === 'consultation' && <Consultation />}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Profile;
