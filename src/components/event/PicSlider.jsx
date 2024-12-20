import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, LinearProgress, createTheme } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const apiUrl = import.meta.env.VITE_API_URL;


const theme = createTheme({
    typography: {
        h6: {
            fontFamily: "Lato",
            fontSize: '1.25vw',
            lineHeight: 'normal',
            letterSpacing: '0.4px',
            color: "#F1F1F1",
            textTransform: 'none',
        },
        h3: {
            fontFamily: "Lato",
            fontWeight: 600,
            fontSize: '2.22vw',
            color: "#F1F1F1",
            textTransform: 'none',
        },
    },
});

const Slider = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const fallbackResponse = await fetch(`${apiUrl}/api/v1/events/websummit`);
                const fallbackData = await fallbackResponse.json();

                const sortedData = fallbackData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setSlides(sortedData);
            } catch (error) {
                console.error('Error fetching slides:', error);
            }
        };

        fetchSlides();

        const intervalId = setInterval(fetchSlides, 30000);

        return () => clearInterval(intervalId);
    }, []);



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    if (slides.length === 0) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: '100vw',
                    position: 'relative',
                    backgroundImage: `url(${slides[currentSlide].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: { xs: '360px', sm: '480px', md: '720px', lg: '900px' }
                }}
            >
                <Box
                    sx={{
                        mt: { xs: '180px', sm: '150px', md: '300px', lg: '318px' },
                        minHeight: { xs: '180px', sm: '220px', md: '270px', lg: '318px' },
                        position: 'relative',
                        display: {xs:'none',sm:'flex'},
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        ml: { xs: 5, sm: 10, md: 12, lg: 24, xl: 28 },
                    }}
                >
                    {/*<Typography sx={{ ...theme.typography.h3,maxWidth: '30vw',mb:'1vw' }}>
                        {slides[currentSlide].title}
                    </Typography>
                    <Typography sx={{ maxWidth: '30vw', ...theme.typography.h6 }}>
                        {slides[currentSlide].description.length > 240
                            ? `${slides[currentSlide].description.substring(0, 240)}`
                            : slides[currentSlide].description}
                    </Typography>*/}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }, mt: { xs: 1, sm: 0, md: 3, lg: 4, xl: 4 },ml: { xs: 5, sm: 10, md: 15, lg: 20, xl: 24 }, }}>
                    <Button
                        onClick={handlePreviousSlide}
                        sx={{
                            minWidth: { xs: '10px', sm: '50px', md: '60px', lg: '70px' },
                            minHeight: { xs: '10px', sm: '50px', md: '60px', lg: '70px' },
                            borderRadius: '50%',
                            backgroundColor: 'rgba(217, 217, 217, 1)',
                            color: '#000000',
                            display: {xs:'none',sm:'flex'},
                            alignItems: 'center',
                            justifyContent: 'center',
                            pl: 1.5,
                        }}
                    >
                        <ArrowBackIosIcon sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' } }} />
                    </Button>
                    <Button
                        onClick={handleNextSlide}
                        sx={{
                            minWidth: { xs: '10px', sm: '50px', md: '60px', lg: '70px' },
                            minHeight: { xs: '10px', sm: '50px', md: '60px', lg: '70px' },
                            borderRadius: '50%',
                            backgroundColor: 'rgba(217, 217, 217, 1)',
                            color: '#000000',
                            display: {xs:'none',sm:'flex'},
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ArrowForwardIosIcon sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' }}} />
                    </Button>

                    <Box sx={{display: {xs:'none',sm:'flex'}, alignItems: 'center', ml: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={((currentSlide + 1) / slides.length) * 100}
                            sx={{
                                width: { xs: '160px', sm: '180px', md: '200px', lg: '260px' },
                                height: { xs: '2.0px', sm: '2px', md: '2px', lg: '2px' },
                                borderRadius: 5,
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#B50304',
                                },
                            }}
                        />
                        <Typography  sx={{ ml: 2, color: '#FFF',...theme.typography.h3,fontSize:'1.67vw', }}>
                            {String(currentSlide + 1).padStart(2, '0')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Slider;
