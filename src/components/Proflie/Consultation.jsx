import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Typography,
    ThemeProvider,
    createTheme,
    Divider
} from '@mui/material';
import { ChevronLeft, Add } from '@mui/icons-material';
import CustomerSupport from '../../assets/CustomerSupport.png';
import DoctorsBag from '../../assets/DoctorsBag.png';
import CardPayment from '../../assets/CardPayment.png';
import ShoppingCard from '../../assets/ShoppingCart.png';
import { useAuth } from '../../AuthContext.jsx';
import axios from "axios";
import NewMessage from '../Chat/SendMessage';

const apiUrl = import.meta.env.VITE_API_URL;
const theme = createTheme({
    typography: {
        subtitle1: {
            fontFamily: 'Lato',
            fontSize: '16px',
            lineHeight: '21.6px',
            fontWeight: 400,
            color: "#FFF",
            letterSpacing: '0.4px',
        },
        caption: {
            fontFamily: 'Lato',
            fontSize: { xs: '10px', sm: '11.1px', md: '12.2px', lg: '13px' },
            lineHeight: '15.6px',
            fontWeight: 400,
            color: "#59BA63",
            letterSpacing: '0.4px',
        },
        h4: {
            fontFamily: 'Lato',
            fontSize: { xs: '20px', sm: '20.2px', md: '22.1px', lg: '24px' },
            lineHeight: '24px',
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: '0.4px',
        },
        body1: {
            fontFamily: 'Lato',
            fontSize: { xs: '10px', sm: '11.1px', md: '12.2px', lg: '14px' },
            lineHeight: '14px',
            fontWeight: 500,
            color: "#FFFFFFE5",
            letterSpacing: '0.4px',
        },
        button: {
            textTransform: 'none'
        }
    }
});

const supportCategories = [
    { icon: CustomerSupport, title: 'Website support',id:1 },
    { icon: DoctorsBag, title: 'Service purchase',id:2 },
    { icon: CardPayment, title: 'Medical and technical',id:3 },
    { icon: ShoppingCard, title: 'Finance and payment',id:4 }
];

const SupportChat = () => {
    const { authToken } = useAuth();
    const Token = authToken;
    const [oldThread, setOldThread] = useState(null);
    const [threads, setThreads] = useState([]);
    const [chatType, setChatType] = useState(0);
    const [ChatMode, setChatMode] = useState(false);
    useEffect(() => {
        const fetchOlderChats = async () => {
            try {
                const { data } = await axios.get(
                    `${apiUrl}/api/v1/chat/threads/`,
                    { headers: { 'Authorization': `Bearer ${Token}` } }
                );
                console.log(data);
                setThreads(data);
            } catch (error) {
                console.error('Error fetching older chats:', error);
            }
        };

        fetchOlderChats();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', minHeight: '90vh', backgroundColor: 'transparent', display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ width: '80%', minHeight: '90vh', backgroundColor: '#262626', display: ChatMode ? 'none' : 'flex', flexDirection: 'column' }}>
                    <Box sx={{ background: 'linear-gradient(0deg, #00544D 0%, #008F82 100%)', p: '16px 32px', display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, width: 50, height: 50, border: '2px solid #B0EEE9', boxShadow: '0px 0px 5px 0px #8AE6DE99' }} />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontSize: { xs: '12.64px', sm: '16px' }, mb: 1 }}>
                                Support Team Name
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#59BA63', mr: 1 }} />
                                <Typography variant="caption">Active</Typography>
                            </Box>
                        </Box>
                        <Button startIcon={<ChevronLeft />} sx={{ color: '#EEEEEE', background: '#00544D8C', borderRadius: '30px' }}>Profile</Button>
                    </Box>

                    <Box sx={{ flexGrow: 1, p: { xs: '16px', md: '136px 310.5px' } }}>
                        <Box textAlign="center" mb={6}>
                            <Typography variant="h4" gutterBottom>Welcome to Chat</Typography>
                            <Typography variant="body1">Get started chat. Not sure where to start?</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                            {supportCategories.map((category, index) => (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    onClick={() => {
                                        setChatMode(false)
                                        setOldThread(null)
                                        setChatType(category.id)
                                        setChatMode(true)
                                    }}
                                    startIcon={
                                        <Box
                                            sx={{
                                                width: '37px',
                                                height: '37px',
                                                padding: '6px',
                                                ml: 1,
                                                borderRadius: '40px',
                                                background: 'linear-gradient(180deg, #1F1F1F 0%, #303130 100%)'
                                            }}
                                        >
                                            <img src={category.icon} alt={category.title} style={{ width: '25px', height: '25px' }} />
                                        </Box>
                                    }
                                    endIcon={<Add />}
                                    sx={{
                                        width: '240px',
                                        height: '49px',
                                        padding: '6px 16px 6px 8px',
                                        justifyContent: 'space-between',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(180deg, #1F1F1F 0%, #141414 100%)',
                                        color: '#ffffff',
                                        borderColor: '#8AE3BE4D',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                        <Typography sx={{ display: 'flex' }}>{category.title}</Typography>
                                    </Box>
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '80%', minHeight: '90vh', backgroundColor: '#262626', display: ChatMode ? 'flex' : 'none', flexDirection: 'column' }}>
                    {ChatMode && <NewMessage token={Token} typeID={chatType} threads={oldThread} />}
                </Box>
                <Box sx={{ width: '20%', height: '90vh', backgroundColor: '#1f1f1f', display: 'flex', flexDirection: 'column', pl: '20px', pt: '10px',overflow:'scroll' }}>
                    <Typography sx={{ mb: '8px' }}>
                        Older Chat
                    </Typography>
                    <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{
                            width: '100%',
                            mb: '1.5vw',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderStyle: 'dashed',
                        }}
                    />
                    {threads.map((threads, index) => (
                        <Typography key={`${threads.type_}-${index}`} sx={{ mb: '14px' }}
                                    onClick={() => {
                                        setOldThread(threads.thread_id)
                                        setChatMode(true)
                                    }}
                        >
                            {threads.type_}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default SupportChat;
