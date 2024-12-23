import React from 'react';
import { Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import howwatch1 from '../../assets/howwatch1.jpg';
import howwatch2 from '../../assets/howwatch2.jpg';
import howwatch3 from '../../assets/howwatch3.jpg';
import howwatch4 from '../../assets/howwatch4.jpg';
import icon1 from '../../assets/watch/watch-icon1.svg';
import icon2 from '../../assets/watch/watch-icon2.svg';
import icon3 from '../../assets/watch/watch-icon3.svg';
import icon4 from '../../assets/watch/watch-icon4.svg';

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
    { title: 'Continuous Monitoring', description: "Track your vital signs in real-time for accurate data collection. ", image: howwatch1, icon: icon1 },
    { title: 'On-Demand Spot Check', description: "Instantly check your health metrics anytime, anywhere with just a tap!", image: howwatch2, icon: icon2 },
    { title: 'Data Synchronization', description: "Seamlessly store and sync multiparameter data for convenient access and analysis.", image: howwatch3, icon: icon3 },
    { title: 'Versatile Compatibility', description: "Compatible with Windows, Android, and iOS for flexible monitoring options.", image: howwatch4, icon: icon4 },
];

const HowBox = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                background: 'radial-gradient(97.15% 97.15% at 50% 2.85%, #323232 0%, #1F1F1F 100%)',
                width: '100%',
                position: 'relative',
                padding: {xs:'8px',sm:'16px',md:'88px'},
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
                                    width:'100%'
                                }}
                            >
                                <Typography
                                    sx={{...theme.typography.h6,mb:'0px',mt:'42px'}}
                                    gutterBottom
                                >
                                    {box.title}
                                </Typography>
                                <Typography
                                    sx={{...theme.typography.caption,px:0.5,mt:'8px',mb:{xs:'13px',sm:'10px',md:'16px'}}}
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
