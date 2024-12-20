import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from "@mui/material";
import Allinonecard from './AllInOneCard';
import bg from '../../assets/membersBG1.svg';
const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
    typography: {
        h6: {
            fontFamily: "Lato",
            fontWeight: 400,
            fontSize: {xs:'2.78vw',sm:'1.11vw'},
            textAlign: 'center',

            color: '#F1F1F1',
        },
        h3: {
            fontFamily: "Lato",
            fontWeight: {xs:500,sm:600},
            fontSize: {xs:'3.89vw',sm:'1.67vw'},
            textAlign: 'center',
            color: '#FFFFFF',
        },
    },
});

const SectionHeader = ({ title, subtitle, data }) => (
    <Box sx={{  display: 'flex', flexDirection: 'column',textAlign: 'center',my:'5.56vw',gap:'0.5vw' }}>
        <Typography sx={{ ...theme.typography.h3,}}>
            {title}
        </Typography>
        <Typography sx={{...theme.typography.h6,}}>
            {subtitle}
        </Typography>
        <Box sx={{ width: '100%',mt:'2.2vw' }}>
            {data && data.length > 0 && <Allinonecard data={data} />}
        </Box>
    </Box>
);

const TeamMembers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch(`${apiUrl}/api/v1/members`);
            const teamsData = await response.json();
            setData(teamsData);
        };
        fetchTeams();
    }, []);

    const Management = data.find(team => team.team_name === "Management");
    const Developers = data.find(team => team.team_name === "Developers");
    const Advisors = data.find(team => team.team_name === "Advisors");
    const combinedMembers = [
        ...(Management ? Management.members : []),
        ...(Developers ? Developers.members : [])
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                width: '100vw',
                position: 'relative',
                backgroundImage: `url(${bg})`,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat-y',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <SectionHeader title="OUR ADVISORS" subtitle="Meet our world-class advisors" data={Advisors ? Advisors.members : []} />
                <SectionHeader title="OUR TEAM" subtitle="Meet our world-class team members" data={combinedMembers} />
            </Box>

        </ThemeProvider>
    );
};

export default TeamMembers;
