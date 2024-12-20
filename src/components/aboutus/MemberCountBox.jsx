import React, { useState, useEffect } from 'react';
import { Box, Typography, createTheme, ThemeProvider } from "@mui/material";
const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
    typography: {
        h6: {
            fontFamily: 'sen',
            fontSize: { xs: '13px', sm: '13px', md: '16px', lg: '21px', xl: '26px' },
            color: "#F1F1F1",
            letterSpacing: '0.4px',
            lineHeight: 'normal',
        },
        h3: {
            fontFamily: 'Lato',
            fontWeight: 700,
            fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '35px', xl: '41px' },
            color: "#FFFFFF",
            letterSpacing: '0.4px',
        },
    },
});

const MemberCountBox = () => {
    const [data, setData] = useState([
        { value: "1.5M", label: "Global Happy Clients" },// default
        { value: "0", label: "Team Members" }, // default
        { value: "1", label: "Project Complemented" },// default
    ]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/members`);
                const apiData = await response.json();

                const totalMembers = apiData.reduce((acc, team) => acc + team.members.length, 0);

                setData(prevData => prevData.map(item =>
                    item.label === "Team Members" ? { ...item, value: totalMembers } : item
                ));
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                width: '100%',
                backgroundColor: 'rgba(20, 20, 20, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                textAlign:'center',
                alignItems: 'center',
                gap: { xs: '28px', sm: '45px', md: '70px', lg: '120px', xl: '160px' },
                py: { xs: '20px', sm: '24px', md: '28px', lg: '35px', xl: '42px' },
            }}>
                {data.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ ...theme.typography.h3 }}>{item.value}</Typography>
                        <Typography sx={{ ...theme.typography.h6 }}>{item.label}</Typography>
                    </Box>
                ))}
            </Box>
        </ThemeProvider>
    );
};

export default MemberCountBox;
