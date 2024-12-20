import {useEffect, useState} from 'react';
import { Box, Typography, Button, createTheme } from '@mui/material';
import background from '../../assets/Mobile-BG1.png';
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ContactFormDialog from '../custom/ContactFormDialog.jsx';
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


const theme = createTheme({
    typography: {
        h6: {
            fontFamily: 'Lato',
            fontSize: { xs: '12px', sm: '12.64px', md: '14.22px', lg: '18px' },
            fontWeight: 400,
            color: "#EEEEEE",
            letterSpacing: '0.4px',
            lineHeight: {xs:'15px',md:'18px',lg:'24px'},
        },
        h3: {
            fontFamily: 'Lato',
            fontWeight: 600,
            fontSize: { xs: '14px', sm: '18px', md: '26px', lg: '32px' },
            color: "#FFFFFF",
            letterSpacing: '0.4px',
            lineHeight: {xs:'12px',md:'24px'}
        },
        button: {
            fontFamily: 'Lato',
            fontSize: {xs:'11px',md:'12.5px',lg:'14px'},
            fontWeight: 700,
            lineHeight: {xs:'11px',md:'12.5px',lg:'14px'}, 
            color: "#FCFCFC",
        },
    },
});


const Home = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const [latestLink, setLatestLink] = useState('');

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/applications`);
                const data = response.data;

                // پیدا کردن لینک با جدیدترین release_date
                const latestRelease = data
                    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))[0];

                // قرار دادن لینک جدیدترین نسخه
                setLatestLink(latestRelease.apk_file);
            } catch (error) {
                console.error('Error getting new link:', error);
            }
        };

        fetchLink();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {/* Parent Box that contains everything */}
                <Box
                    sx={{
                        position: 'relative',
                        maxHeight: '746px',
                        minHeight: { xs: '188px', sm: '300px', md: '600px', lg: '750px' },
                        width: '100%',
                        background: `linear-gradient(253.12deg, rgba(31, 31, 31, 0.2) 26.9%, rgba(31, 31, 31, 0.42) 33.25%, rgba(31, 31, 31, 0.563864) 40.56%, rgba(31, 31, 31, 0.707727) 51.89%, rgba(31, 31, 31, 0.9) 91.37%), url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                <Box
                    sx={{
                        position: 'absolute',
                        zIndex: 1,
                        ml: { xs: 5, sm: 10, md: 19, lg: 24, xl: 28 },
                        mt: { xs: '44px', sm: '100px', md: '230px', lg: '318px' },
                        maxWidth:'40%',
                    }}
                >
                    <Typography
                        sx={{
                            width:'150%',
                            mb: '0.4vw',
                            ml: '-0.2vw',
                            lineHeight: '1.5',
                            ...theme.typography.h3,
                        }}
                    >
                        The Mobile Application
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            ...theme.typography.h6,
                            display:{xs:'none',sm:'none',md:'block'},
                        }}
                    >
                        Introducing an innovative mobile app that empowers health management! With the Vitruvian Watch, users can track their health data, manage medication schedules, log seizures, and schedule online appointments with healthcare professionals anytime, anywhere.
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            ...theme.typography.h6,
                            display:{xs:'block',sm:'block',md:'none'},
                            width:{xs:'250px',sm:'325px'},
                            mt:1
                        }}
                    >
                        Introducing an innovative mobile app that empowers health management! With the Vitruvian Watch, users can track their health data
                    </Typography>

                    <Box sx={{ display: 'flex', gap: {xs:'8px',sm:'1.5vw',md:'0.78vw'}, marginTop: {xs:'18px',sm:'16px',md:'1.56vw'},}}>
                        <Button
                            variant="outlined"
                            sx={{
                                padding:0,
                                display: 'flex',
                                borderRadius: '4px',
                                width: {xs:'80px',md:'90px',lg:'138px'},
                                height: {xs:'30px',md:'28px',lg:'42px'},
                                ...theme.typography.button,
                                borderColor: 'white',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {},
                            }}
                            onClick={handleOpenDialog}
                            disableRipple
                        >
                            Contact us
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => {
                                if (latestLink) {
                                    const newTab = window.open(latestLink, "_blank");
                                    setTimeout(() => {
                                        if (newTab) newTab.close();
                                    }, 2000);
                                } else {
                                    alert("No download link available.");
                                }
                            }}
                            sx={{
                                ...theme.typography.button,
                                padding: 0,
                                display: 'flex',
                                borderRadius: '4px',
                                width: {xs:'80px',md:'90px',lg:'138px'},
                                height: {xs:'30px',md:'28px',lg:'42px'},
                                backgroundColor: '#B50304',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#B50304',
                                },
                            }}
                            disableRipple
                        >
                            Download
                        </Button>


                        <ContactFormDialog open={dialogOpen} onClose={handleCloseDialog} type={14}/>
                    </Box>
                </Box>

                </Box>
        </ThemeProvider>
    );
};

export default Home;
