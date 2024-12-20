import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    ButtonBase,
    Fade,
    createTheme,
    ThemeProvider, useMediaQuery
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSwipeable } from "react-swipeable";
import {useNavigate} from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
    typography: {
        h6: {
            fontFamily: 'Lato',
            fontSize: {xs:'12px',sm:'1.25vw'},
            lineHeight: {xs:'15px',sm:'1.6667vw'},
            color: "#D9D9D9",
            textTransform: 'none',
        },
        h3: {
            fontFamily: "Lato",
            fontWeight: {xs:600,sm:700},
            fontSize: {xs:'14px',sm:'2.2222vw'},
            color: "#FFFFFF",
            textTransform: 'none',
        },
        button: {
            fontFamily: 'Lato',
            fontSize: {xs:'11px',sm:'0.9722vw'},
            textTransform: 'none',
            color: "#F1F1F1",
        },
        caption: {
            fontFamily: 'Lato',
            fontSize: {xs:'2.22vw',sm:'1.04vw'},
            lineHeight: 'normal',
            color: "#F1F1F1",
            textTransform: 'none',
        },
    },
});

const Mediacard = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [progress, setProgress] = useState(0);
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const maxLength = isXs ? 150 : 250;

    useEffect(() => {
        const fetchTopNews = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/top-news`);
                const newsData = await response.json();
                setData(newsData.results.slice(0, 3));
            } catch (error) {
                console.error("Error fetching top news data: ", error);
            }
        };
    fetchTopNews();
    }, []);
    const navigate = useNavigate();

    const handleClick = (slug) => {
        navigate(`/news/${slug}`);
    };
    const currentData = data[currentIndex];

    const handleNext = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
            setFade(true);
            setProgress(0);
        }, 300);
    };

    const handlePrev = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
            setFade(true);
            setProgress(0);
        }, 300);
    };

    const handleCircleClick = (index) => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex(index);
            setFade(true);
            setProgress(0);
        }, 300);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    handleNext();
                    return 0;
                }
                return oldProgress + 1;
            });
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [handleNext]);

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                position="relative"
                {...swipeHandlers}
                sx={{ width: '100%', backgroundColor: "transparent", }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.738) 14.54%, rgba(0, 0, 0, 0.686) 23.41%, rgba(0, 0, 0, 0.584) 40.86%, rgba(0, 0, 0, 0.164) 100%), url(${currentData.picture})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <Fade in={fade} timeout={200}>
                        <Box
                            sx={{
                                position: "absolute",
                                display:'flex',
                                top: {xs:'15%',sm:"42%"},
                                left: "10%",
                                width: "55%",
                                borderRadius: "10px",
                                flexDirection: 'column',
                                gap:{xs:'3.3vw',sm:'1.4vw'},
                                mt:{xs:'5vw',sm:'0'}
                            }}
                        >
                            <Typography sx={{ ...theme.typography.h3 }}>
                                {currentData.title}
                            </Typography>
                            <Typography
                                sx={{
                                    maxWidth: { xs: '75vw', sm: '50vw' },
                                    ...theme.typography.h6,
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: {xs:2,sm:4},
                                    mt:{xs:'-8px',sm:0}
                                }}
                            >
                                {currentData.details.length > maxLength
                                    ? `${currentData.details.substring(0, maxLength)}...`
                                    : currentData.details}
                            </Typography>
                            <Button
                                onClick={() => handleClick(currentData.slug)}
                                sx={{
                                    ...theme.typography.button,
                                    borderRadius: '4px',
                                    backgroundColor: '#B50304',
                                    textTransform: 'none',
                                    width:{xs:'80px',sm:'9.5833vw'},
                                    height: {xs:'30px',sm:'2.9167vw'},
                                    padding:0,
                                    '&:hover': {
                                        backgroundColor: '#B50304',
                                    },
                                }}
                                disableRipple
                            >
                                Read more
                            </Button>

                            <Box alignItems="center" sx={{display:{xs:'none',sm:'flex'}}}>
                                <Typography variant="caption" sx={{mr: '4vw' ,...theme.typography.caption,}}>
                                    {currentData.read_time} min read
                                </Typography>
                                <VisibilityIcon sx={{mr: '0.5vw' ,...theme.typography.caption,}} />
                                <Typography variant="caption" sx={{...theme.typography.caption,}}>
                                    {currentData.views}
                                </Typography>
                            </Box>


                        </Box>
                    </Fade>
                </Box>

                <IconButton
                    onClick={handlePrev}
                    sx={{

                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        color: "#fff",
                    }}
                >
                    <ArrowBackIosIcon sx={{...theme.typography.h6}}/>
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        color: "#fff",
                    }}
                >
                    <ArrowForwardIosIcon sx={{...theme.typography.h6}}/>
                </IconButton>

                <Box display="flex" justifyContent="center">
                    {/* <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: {xs:'2px',sm:'2px',md:'4px'},
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        <Box
                            sx={{
                                width: `${progress}%`,
                                height: "100%",
                                backgroundColor: "#ca0000",
                                transition: "width 0.1s linear",
                            }}
                        />
                    </Box> */}

                </Box>
                <Box
                     flexDirection="row"
                     alignItems="center"
                     sx={{position:'absolute',top:'90%',display:{xs:'none',sm:'flex'}}}
                >
                    {data.map((_, index) => (
                        <ButtonBase
                            key={index}
                            onClick={() => handleCircleClick(index)}
                            sx={{
                                position: 'relative',
                                width: '0.7vw',
                                height: '0.7vw',
                                borderRadius: "50%",
                                backgroundColor: currentIndex === index ? "#ca0000" : "rgba(255, 255, 255, 0.5)",
                                mx: {xs:0.2,sm:0.3,md:0.5,lg:0.8,xl:0.8},
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Mediacard;
