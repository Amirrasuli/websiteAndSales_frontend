import React, { useState } from 'react';
import {
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import pci from '../assets/pci.png';
import biopole from '../assets/biopole.png';
import astrolab from '../assets/astrolab.png';
import footerloc from '../assets/footerloc.svg';
import { useNavigate } from 'react-router-dom';
import footerBG from '../assets/footerBG.png';
import ContactFormDialog from '../components/custom/ContactFormDialog.jsx';
import footerM from '../assets/footerM.png';
import footerIN from '../assets/footerIN.png';
import footerYT from '../assets/footerYT.png';

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: 'Lato',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '16px',
      letterSpacing: '0.5px',
      color: '#8AE6DE',
    },
    h6: {
      fontFamily: 'Lato',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '14px',
      letterSpacing: '0.5px',
      color: '#FFFFFF',
    },
    body1: {
      fontFamily: 'Lato',
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '18.98px',
      letterSpacing: '0.5px',
      color: '#FFFFFF',
    },
    body3: {
      fontFamily: 'Lato',
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: '18.98px',
      letterSpacing: '0.5px',
      color: '#BFBFBF',
    },
    body9: {
      fontFamily: 'Lato',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '25.2px',
      color: '#EEEEEE',

    },
    button: {
        fontFamily: 'Lato',
        fontSize: { xs: '11px', sm: '12px', md: '16px' },
        color: "#FCFCFC",
    },
  },
});

const locations = [
  {
    image: biopole,
    name: 'VITRUVIAN SHIELD SA',
    address: 'Rue de la Corniche n°3a, Bâtiment Phenyl, 1066 Epalinges; Switzerland',
  },
  {
    image: astrolab,
    name: 'VITRUVIAN SHIELD DMCC',
    address: 'Parkside Retail Level; Cluster R - Jumeirah Lake Towers; Dubai - United Arab Emirates',
  },
  {
    image: pci,
    name: 'VITRUVIAN SHIELD - PT',
    address: 'PCI - Creative Science Park; Via do Conhecimento, Edf. Central, 3830-352 Ílhavo, Portugal',
  },
];

const IconButton = ({ icon }) => {
  return (
    <Box
      sx={{
        width: "45px",
        height: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#141414",
        border: "1px solid #FFFFFF30",
        padding: "14px 10px",
        gap: "10px",
        borderRadius: '50%',
        opacity: 1, // Change opacity if needed
      }}
    >
      {icon}
    </Box>
  );
};

const solutionsItems = [
  {
    id: 1,
    title: 'CTMD',
    link: '/company'
  
  },
  {
    id: 2,
    title: 'telemedicine',
    link: '/company'
  
  },
  {
    id: 3,
    title: 'API Set',
  
  },
  // {
  //   id: 4,
  //   title: 'Analytics Service',
  
  // },
  // {
  //   id: 5,
  //   title: 'AI/ML Development',
  
  // },
  {
    id: 6,
    title: 'EDMS',
  
  },
  // {
  //   id: 7,
  //   title: 'Data Integration',
  
  // },
  // {
  //   id: 8,
  //   title: 'Digital Recruitment',
  
  // },
  {
    id: 9,
    title: 'Wearable Devices',
    link: '/products/smart-watch'
  
  },
  {
    id: 10,
    title: 'Mobile App',
    link: '/products/mobile-app'
  
  },
  
]//array for solutions data

const aboutItems = [
  // {
  //   id: 1,
  //   title: 'Our Vision',
  
  // },
  {
    id: 2,
    title: 'Our Team',
    link: '/about'

  },
  {
    id: 3,
    title: 'Our Partners',
    link: '/partnership'

  },
  {
    id: 4,
    title: 'Become a Partner',
    link: '/partnership'

  },
  // {
  //   id: 5,
  //   title: 'Donations',
  
  // },
  {
    id: 6,
    title: 'Certification',
    link: '/company'

  },
]//array for solutions data


const Footer = () => {
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
  return (
    <ThemeProvider theme={theme}>
      {/* Desktop version */}
      <Box
        sx={{
          background: `linear-gradient(
            0deg, 
            rgba(0, 0, 0, 0) 0%, 
            rgba(0, 0, 0, 0.0780267) 20.38%, 
            rgba(0, 0, 0, 0.254689) 46.82%, 
            rgba(0, 0, 0, 0.4) 60.82%, 
            rgba(0, 0, 0, 0.4) 72.93%, 
            rgba(0, 0, 0, 0.4) 93.52%
          ), url(${footerBG})`,
          backgroundSize: 'cover', // Ensures the image covers the entire box
          backgroundPosition: 'center', // Centers the background image
          backgroundRepeat: 'no-repeat', // Prevents repeating the image
          py: 8,
          width: '100%',
          minHeight: '800px',
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: {sm:'10px',md:'18px',lg:'48px'} }}>
          
          {/* Visit us Section */}
          <Box sx={{ ...commonBoxStyles, width: '22em' }}>
            <Typography variant="h3" marginTop="16px">Branches</Typography>
            {locations.map((location, index) => (
              <Box marginTop="32px" key={index}>
                <img src={location.image} alt={location.name} style={{ width: '103px', height: 'auto', marginRight: '8px', display: 'flex', justifyContent: 'flex-start' }} />
                <Box marginTop="16px">
                  <Box display="flex" alignItems="center" justifyContent="flex-start">
                    <img src={footerloc} alt="locationLogo" style={{ width: '1em', height: 'auto', marginRight: '8px' }} />
                    <Typography variant="h6" gutterBottom>{location.name}</Typography>
                  </Box>
                  <Typography variant="body3" sx={{ mt: '12px', display: 'flex', textAlign: 'left' }}>
                    {location.address}
                  </Typography>

                </Box>
              </Box>
            ))}
          </Box>

          <Divider orientation='vertical' sx={{ borderColor: '#424242B2', height: '471px', marginTop: '32px', borderStyle: 'dashed' }} />

          {/* OUR SOLUTIONS Box */}
          <Box sx={{ ...commonBoxStyles, width: '11em' }}>
            <Typography gutterBottom variant="h3" marginTop="16px" marginBottom="24px">OUR SOLUTIONS</Typography>
            {solutionsItems.map((item, index) => (
              <Typography
                variant="body9"
                marginTop="8px"
                sx={{
                  cursor: `${item.link ? 'pointer' : 'default'}`
                }}
                key={index}
                onClick={item.link ? () => { window.location.href = item.link } : undefined}
              >
                {item.title}
              </Typography>
            ))}
          </Box>

          <Divider orientation='vertical' sx={{ borderColor: '#424242B2', height: '471px', marginTop: '32px', borderStyle: 'dashed' }} />

          {/* ABOUT US Box */}
          <Box sx={{ ...commonBoxStyles, width: '11em' }}>
            <Typography gutterBottom variant="h3" marginTop="16px" marginBottom="24px">ABOUT US</Typography>
            {aboutItems.map((item, index) => (
                <Typography
                    variant="body9"
                    marginTop="8px"
                    sx={{
                      cursor: `${item.link ? 'pointer' : 'default'}`
                    }}
                    key={index}
                    onClick={item.link ? () => { window.location.href = item.link } : undefined}
                >
                  {item.title}
                </Typography>
            ))}
          </Box>

          <Divider orientation='vertical' sx={{ borderColor: '#424242B2', height: '471px', marginTop: '32px', borderStyle: 'dashed' }} />

          {/* GET IN TOUCH */}
          <Box
            sx={{ ...commonBoxStyles, width: '22em' }}
          >
            <Typography gutterBottom variant="h3" marginTop="16px" marginBottom="24px">GET IN TOUCH</Typography>
            <Typography gutterBottom variant="body1" marginTop="16px" marginBottom="24px">Let's contact with us. Ask what answer you need. You can also contact with the agent if you have any question.</Typography>

            <Button
              variant="contained"
              onClick={handleOpenDialog}
              sx={{
                  ...theme.typography.button,
                  borderRadius: '4px',
                  border:'1px solid #FFF',
                  textTransform: 'none',
                  backgroundColor: 'transparent',
                  width: {xs:'80px',md:'90px',lg:'299px'},
                  height: {xs:'30px',md:'28px',lg:'37px'},
                  '&:hover': {
                      backgroundColor: 'transparent',
                  },
              }}
              disableRipple
            >
              Contact Us
            </Button>
            <ContactFormDialog open={openDialog} onClose={handleCloseDialog} type={17}/>
            {/* links */}
            <Box sx={{ display: "flex", gap: "16px", mt: '24px' }}>
              <a href="https://www.youtube.com/@vitruvianshield3647/" target="_blank" rel="noopener noreferrer">
                <IconButton icon={<img src={footerYT} alt="YouTube" width="100%" />} />
              </a>
              <a href="https://www.linkedin.com/company/vitruvianshield/" target="_blank" rel="noopener noreferrer">
                <IconButton icon={<img src={footerIN} alt="LinkedIn" width="100%" />} />
              </a>
              <a href="https://www.messenger.com" target="_blank" rel="noopener noreferrer">
                <IconButton icon={<img src={footerM} alt="M Icon" width="100%" />} />
              </a>
            </Box>
            
          </Box>
        </Box>
      </Box>

      {/* Mobile version */}
      <Box
        sx={{
          width: '100%',
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
          alignItems: 'center',
          bottom: 0,         // Aligns to bottom
          left: 0,           // Aligns to left edge
          zIndex: 1300,
        }}
      >
        <Box sx={{ width: '100vw', backgroundColor: '#141414', display: 'flex', flexDirection: 'column', }}>
          {/* OUR SOLUTIONS Accordion */}
          <Accordion sx={{ backgroundColor: '#141414' }}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Add the arrow icon to the left side */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ExpandMoreIcon sx={{ color: 'white' }} /> {/* Left arrow in white */}
                <Typography variant="h3" sx={{ 
                    fontSize: {xs:'12px',sm:'16px'},
                    lineHeight: {xs:'12px',sm:'16px'}, }}>Our solution</Typography> {/* Text in white */}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['The problem', 'Concept', 'The Smartwatch', 'Mobile App', 'Research API', 'Data & Research', 'Certifications'].map((text, index) => (
                <Typography variant="body9" key={index}>{text}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>

          <Box sx={{ borderBottom: '1px solid #D9D9D912' }} />



          {/* ABOUT US Accordion */}
          <Accordion sx={{ backgroundColor: '#141414' }}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Add the arrow icon to the left side */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ExpandMoreIcon sx={{ color: 'white' }} /> {/* Left arrow in white */}
                <Typography variant="h3" sx={{ 
                    fontSize: {xs:'12px',sm:'16px'},
                    lineHeight: {xs:'12px',sm:'16px'},}}>About us</Typography> {/* Text in white */}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Our Vision', 'Our Team', 'Our Partners', 'Become a Partner', 'Donations', 'Contact us', 'Gallery'].map((text, index) => (
                <Typography variant="body9" key={index}>{text}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>

          <Box sx={{ borderBottom: '1px solid #D9D9D912' }} />

          {/* Visit us Accordion */}
          <Accordion sx={{ backgroundColor: '#141414' }}>
          <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ExpandMoreIcon sx={{ color: 'white' }} /> {/* Left arrow in white */}
                <Typography variant="h3" sx={{
                    fontSize: {xs:'12px',sm:'16px'},
                    lineHeight: {xs:'12px',sm:'16px'},}}>Visit Us</Typography> {/* Text in white */}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {locations.map((location, index) => (
                  <Box marginTop={7} key={index}>
                    <img src={location.image} alt={location.name} style={{ width: '103px', height: 'auto', marginRight: '8px', display: 'flex', justifyContent: 'flex-start' }} />
                    <Box marginTop="16px">
                      <Box display="flex" alignItems="center" justifyContent="flex-start">
                        <img src={footerloc} alt="locationLogo" style={{ width: '22px', height: 'auto', marginRight: '8px' }} />
                        <Typography variant="h6" gutterBottom>{location.name}</Typography>
                      </Box>
                      <Typography variant="body3" sx={{ mt: '12px', display: 'flex', textAlign: 'left' }}>
                        {location.address}
                      </Typography>

                    </Box>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ borderBottom: '1px solid #D9D9D912' }} />
          <Box sx={{ width: '100vw', backgroundColor: '#141414', display: 'flex', flexDirection: 'column' }}>
            {/* ... Existing accordions ... */}

            {/* Social Media Icons */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', mt: 2 }}>
              <img
                src={FacebookCircled}
                alt="Facebook"
                style={{
                  width: '40px',
                  height: '40px',
                  opacity: 0.9,
                }}
              />
              <img
                src={LinkedInCircled}
                alt="Linkedin"
                style={{
                  width: '40px',
                  height: '40px',
                  opacity: 0.9,
                }}
              />
              <img
                src={YoutubeCircled}
                alt="Youtube"
                style={{
                  width: '40px',
                  height: '40px',
                  opacity: 0.9,
                }}
              />
            </Box> */}
          </Box>




        </Box>
      </Box>
    </ThemeProvider >
  );
}

// Common styles for the boxes
const commonBoxStyles = {
  padding: 2,
  width: '17.656vw',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

export default Footer;
