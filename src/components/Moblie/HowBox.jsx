import React from 'react';
import { Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import phonehow1 from '../../assets/phonehow1.png';
import phonehow2 from '../../assets/phonehow2.png';
import phonehow3 from '../../assets/phonehow3.png';
import phonehow4 from '../../assets/phonehow4.png';
import Platform from '../../assets/watch/platform.svg';
import Easy from '../../assets/watch/Easy.png';
import Time from '../../assets/watch/Time.png';
import Place from '../../assets/watch/Place.png';

const theme = createTheme({
    typography: {
        h6: {
            fontFamily: 'Lato',
            fontSize:{xs:'12px',md:'14px',lg:'16px'},
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: '0.4px',
            lineHeight: 'normal',
        },
        h3: {
            fontFamily: 'Lato',
            fontWeight: 400,
            fontSize:{md:'14px',lg:'16px'},
            color: "#F1F1F1",
            letterSpacing: '0.4px',
        },
        caption: {
            fontFamily: 'Lato',
            fontSize:{xs:'10px',sm:'11px',md:'12px'},
            fontWeight: 400,
            lineHeight:'13px',
            textTransform: 'none',
            color: '#EEEEEE',

        },
        h1: {
            fontFamily: 'Lato',
            fontWeight: 600,
            fontSize:{md:'18px',lg:'24px'},
            color: "#FFFFFF",
            letterSpacing: '0.4px',
        },
    },
});

const howData = [
    { title: 'Cross-Platform', description: "Available on both Android and iOS", image: phonehow1, icon: Platform },
    { title: 'Easy to Use', description: "Effortless Navigation for Everyone", image: phonehow2, icon: Easy },
    { title: 'Any Time', description: "24/7 assistance in emergency situations", image: phonehow3, icon: Time },
    { title: 'Any Place', description: "Outpatient medical follow-up", image: phonehow4, icon: Place },
];

const HowBox = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                background: 'radial-gradient(97.15% 97.15% at 50% 2.85%, #323232 0%, #1F1F1F 100%)',
                width: '100%',
                position: 'relative',
                padding: {xs:'0px',sm:'16px',md:'88px'},
                }}>
                <Box
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    sx={{
                        display:{xs:'none',sm:'none',md:'flex'},
                    }}
                >
                    <Typography
                        sx={{
                            ...theme.typography.h1,
                            mb: '0.5em',
                            lineHeight: '1.5',
                            width: '600',
                        }}
                    >
                        HOW IT WORKS
                    </Typography>
                    <Typography
                        sx={{
                            ...theme.typography.h3,
                            mb: '4em',
                        }}
                    >
                        Powerful tools designed to enhance your experience and simplify your tasks.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        my:'32px',
                        display:'flex',
                        flexWrap:'wrap',
                        justifyContent:'center',
                        columnGap:{xs:'1em',sm:'1.75em',md:'2.5em'},
                        rowGap:{xs:'3em',sm:'3.5em',md:'4em'}
                    }}
                >
                    {howData.map((box, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: {xs:'156px',md:'170px',lg:'18.5%'},
                                height: {xs:'170px',md:'180px',lg:'250px'},
                                borderRadius: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#0A0A0A',
                                border: '1px solid #262626',
                                boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.50)',
                                position: 'relative',
                            }}
                        >

                        <Box
                                sx={{
                                    position: 'absolute',
                                    top: {xs:'-0.7em',md:'-1.3em'},
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: {xs:'32px',sm:'36px',md:'40px'},
                                    height: {xs:'32px',sm:'36px',md:'40px'},
                                    padding: '8px',
                                    backgroundColor: '#B50304',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {typeof box.icon === 'string' ? (
                                    <Box
                                        component="img"
                                        src={box.icon}
                                        alt="Design"
                                        sx={{
                                            width: {xs:'22px',sm:'23px',md:'24px'},
                                            height: {xs:'22px',sm:'23px',md:'24px'},
                                        }}
                                    />
                                ) : (
                                    React.createElement(box.icon, { sx: { color: '#fff', fontSize: 30 } })
                                )}
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    justifyItems: 'center',
                                    alignItems: 'center',
                                    mt:{xs:'0px',md:'2em'},
                                    textAlign: 'center',
                                    width:'100%',
                                    px:1,
                                }}
                            >
                                <Typography
                                    sx={{...theme.typography.h6,mb:'0px',mt:'42px'}}
                                    gutterBottom
                                >
                                    {box.title}
                                </Typography>
                                <Typography
                                    sx={{...theme.typography.caption,px:1,mt:'8px',mb:{xs:'13px',sm:'10px',md:'16px'}}}
                                >
                                    {box.description}
                                </Typography>
                            </Box>

                            <Box
                                component="img"
                                src={box.image}
                                alt={box.title}
                                sx={{
                                    width: '100%',
                                    height: {xs:'82px',sm:'55%'},
                                    objectFit: 'cover',
                                    borderRadius: '0 0 16px 16px',
                                    mt: 'auto',
                                }}
                            /> 
                        </Box>
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default HowBox;
