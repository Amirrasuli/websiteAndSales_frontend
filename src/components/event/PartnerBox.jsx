import React from "react";
import { Box, Typography, createTheme, ThemeProvider } from "@mui/material";
import BG from '../../assets/wensummitBG.png'
import paulo from '../../assets/paulo.png'
import bruno from '../../assets/bruno.png'
import tayo from '../../assets/tayo.png'
import vahid from '../../assets/vahid.png'

const theme = createTheme({
    typography: {
        name: {
            fontFamily: 'Lato',
            fontWeight: 700,
            fontSize: '16px',
            color: "#FFFFFF",
            letterSpacing: '0.4px',
            lineHeight: {xs:'12px',sm:'19.2px'},
        },
        detail: {
            fontFamily: 'Lato',
            fontWeight: 500,
            fontSize: '12px',
            color: "#FCFCFC",
            letterSpacing: '0.4px',
            lineHeight: '16px',
        },
        job: { 
            fontFamily: 'Lato',
            fontWeight: 400,
            fontSize: '14px',
            color: "#8AE6DE",
            lineHeight: '12px',
            letterSpacing: '0.4px',
        },
        
    },
});

const PartnerData = [
    {
      picture: paulo,
      name: 'Paulo Martins',
      detail: 'Management, sales, marketing, design, R&D',
      job: 'Founder and CEO',
    },
    {
      picture: bruno,
      name: 'Bruno Carrilho',
      job: 'General Manager',
    },
    {
      picture: tayo,
      name: 'Mogboluwaga Otegbayo',
      detail: 'BSc in Computer Engineering',
      job: 'QA',
    },
    {
      picture: vahid,
      name: 'Vahid Khazaei Nezhad',
      detail: 'MSc in Software Engineering Data Scientist and Software Designer',
      job: 'CTO',
    },
];

const PartnerCard = ({ picture, name, detail, job }) => {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: {xs:'220px',sm:'329px'},
          width: {xs:'146px',sm:'248px'},
          px:2,
          borderRadius: '16px',
          background:'linear-gradient(180deg, rgba(74, 74, 74, 0.9) 0%, rgba(31, 31, 31, 0.9) 100%)',
          justifyContent: 'center',
          boxShadow: '0px 4px 4px 0px #00000073',
          textAlign: 'start',
          border: '1px solid rgba(38, 38, 38, 1)',
        }}
      >
        <Box
        sx={{
            position: 'absolute',
            top: {xs:'16px',sm:'48px'},
            width: {xs:'70px',sm:'120px'},
            height: {xs:'70px',sm:'120px'},
            overflow: 'hidden',
        }}
        >
        <img
            src ={picture}
            alt={name}
            style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            }}
        />
        </Box>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            flexGrow: 1,
            width: '120%',
          }}
        >
          <Typography
            variant="name"
            sx={{
              width: '100%',
              fontSize: {xs:'12px',sm:'16px'},
              marginTop: {xs:'64px',sm:'165px'},
            }}
          >
            {name}
          </Typography>
          <Typography 
    variant="job" 
    sx={{ 
      fontSize: { xs: '10px', sm: '14px' }, 
      textAlign: 'center', 
      width: '100%' 
    }}
  >
    {job} {/* Changed from email to job */}
  </Typography>

  {/* Conditionally render the line only if detail exists */}
  {detail && (
    <Box 
    sx={{ 
      width: '60%', // Adjust the width as needed
      borderTop: '1px dashed rgba(255, 255, 255, 0.20)', // Dashed line
      margin: '8px auto 0 auto' // 8px margin-top, auto centers horizontally
    }} 
  />
  
  )}

  <Typography 
    variant="detail" 
    sx={{ 
      width: '100%', 
      marginTop: '10px', 
      fontSize: { xs: '10px', sm: '12px' }, 
      textAlign: 'center', 
      //borderTop: detail ? '0.052vw dashed rgba(255, 255, 255, 0.20)' : 'none', 
      py: 1, 
      px: { xs: 0, sm: 1 } 
    }}
  >
    {detail}
  </Typography>
        </Box>
      </Box>
    );
};

const PartnerBox = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
            sx={{
                width:'100%',
                height: '100%',
                justifyItems: "center",
                background: `url(${BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                px: { xs: '10px', sm: '70px', md: '60px', lg: '80px', xl: '100px' },
                pb: { xs: '30px', sm: '40px', md: '80px', lg: '70px' },
                pt: { xs: '64px', sm: '140px', md: '170px' }
            }}>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                        gap: {xs:'5px',sm:'20px'}
                    }}>
                    {PartnerData.map((box, index) => (
                        <PartnerCard
                            key={index}
                            picture={box.picture}
                            name={box.name}
                            detail={box.detail}
                            job={ 
                                <a
                                    href={`mailto:${box.job}`} // Updated to use job
                                    style={{
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        color: "#8AE6DE",
                                    }}
                                >
                                    {box.job} {/* Updated to use job */}
                                </a>
                            }
                            //linkedinUrl={box.linkedinUrl}
                            // instagramUrl={box.instagramUrl}
                            // twitterUrl={box.twitterUrl}
                        />
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default PartnerBox;