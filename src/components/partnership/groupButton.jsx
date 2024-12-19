import React, { useState, useEffect } from "react";
import { Box, Typography, createTheme, ThemeProvider } from "@mui/material";
import partnerBG from '../../assets/partnerBG.png';
const apiUrl = import.meta.env.VITE_API_URL;

const customTheme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Lato',
      fontWeight: 700,
      fontSize: '24px',
      color: "#FFFFFF",
      letterSpacing: '0.4px',
    },
    h2: {
      fontFamily: 'Lato',
      fontWeight: 600,
      fontSize: '16px',
      color: "#EEEEEE",
      letterSpacing: '0.4px',
    },
    h3: {
      fontFamily: 'Lato',
      fontWeight: 700,
      fontSize: { xs: '12px', sm: '20px' },
      lineHeight: { xs: '12px', sm: '20px' },
      color: "#FFFFFF",
      letterSpacing: '0.4px',
    },
    h4: {
      fontFamily: 'Lato',
      fontWeight: 400,
      fontSize: { xs: '10px', sm: '16px' },
      lineHeight: { xs: '15px', sm: '16px' },
      color: "#F1F1F1",
      letterSpacing: '0.4px',
    },
    h5: {
      fontFamily: 'Lato',
      fontWeight: 400,
      fontSize: { xs: '12px', sm: '15px' },
      lineHeight: { xs: '14.4px', sm: '15px' },
      color: "#5EA5D4",
      letterSpacing: '0.4px',
    },
  },
});

const categoryMapping = {
  1: "Financial",
  2: "Development",
  3: "Technological",
};

const GroupButton = () => {
  const [selectedCategory, setSelectedCategory] = useState("view_all");
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch partners data
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/partners`);
        const data = await response.json();
        setPartners(data); // Store fetched data 
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  // Filter partners based on selected category
  const filteredPartners = selectedCategory === "view_all"
    ? partners
    : partners.filter(partner => categoryMapping[partner.category] === selectedCategory);

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundImage: `radial-gradient(97.15% 97.15% at 50% 2.85%, rgba(50, 50, 50, 0.5) 0%, rgba(31, 31, 31, 0.5) 100%), url(${partnerBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          marginTop={5}
          sx={{
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          <Typography sx={{ ...customTheme.typography.h1, mb: '1vw' }}>
            OUR PARTNERS
          </Typography>
          <Typography sx={{ ...customTheme.typography.h2, mb: '2vw' }}>
            Explore our trusted partners who help us deliver exceptional experiences
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center">
          <Box
            sx={{
              width: { xs: '330px', sm: '1024px' },
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'start', sm: 'center' },
              columnGap: { xs: '1em', sm: '2.5em' },
              rowGap: { xs: '3em', sm: '4em' },
              px: { xs: '0px', sm: '3vw' },
              pt: '3vw',
              pb: '5vw',
              my: { xs: '32px', sm: 3, md: 0 }
            }}
          >
            {loading ? (
              <Typography>Loading...</Typography>
            ) : filteredPartners.map((partner) => (
              <Box
                key={partner.id}
                sx={{
                  width: { xs: '156px', sm: '230px' },
                  height: { xs: '178px', sm: '271px' },
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#1F1F1FE5',
                  border: '1px solid #1F1F1F',
                  position: 'relative',
                  boxShadow: '0px 4px 4px 0px #00000040',
                }}
              >
                <Box
                  component="img"
                  src={partner.photo}
                  alt={partner.name}
                  sx={{
                    width: { xs: '156px', sm: '230px' },
                    height: { xs: '80px', sm: '129px' },
                    backgroundColor: '#FFFFFF',
                    objectFit: 'contain',
                    borderRadius: '16px 16px 0 0',
                    padding: { xs: 1.5, sm: 3 }
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Typography sx={{ ...customTheme.typography.h3, mt: { xs: '16px', sm: '32px' } }}>
                    {partner.name}
                  </Typography>
                  <Typography sx={{ ...customTheme.typography.h4, mt: '8px' }}>
                    {partner.expertise}
                  </Typography>
                  <Typography
                    onClick={() => window.open(partner.link, "_blank")}
                    sx={{
                      ...customTheme.typography.h5,
                      mt: { xs: '12px', sm: '24px' },
                      textDecoration: 'none',
                      cursor: "pointer",
                    }}
                  >
                    Visit Website
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default GroupButton;
