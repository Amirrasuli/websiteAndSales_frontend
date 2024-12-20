import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Mediacard from './Mediacard';
import { Typography } from "@mui/material";
import Allinonecard from './AllInOneCard';
const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
    typography: {
        h6: {
            fontFamily:'Lato',
            fontSize: '1.1111vw',
            lineHeight: 'normal',
            letterSpacing: '0.4px',
            color: "#F1F1F1",
            textTransform: 'none',
        },

        h3: {
            fontFamily: "Lato",
            fontWeight:{xs:500,sm:700},
            fontSize:{xs:'3.2vw',sm:'1.6667vw'},
            color: "#F1F1F1",
            textTransform: 'none',
        },
        button: {
            fontFamily: 'Lato',
            fontSize: '1.1111vw',
            textTransform: 'none',
            color: "#F1F1F1",
        },
    },
});

const fetchNewsData = async () => {
    try {
        const topNewsResponse = await fetch(`${apiUrl}/api/v1/top-news`);
        const topNewsData = await topNewsResponse.json();

        const latestNewsResponse = await fetch(`${apiUrl}/api/v1/news`);
        const latestNewsData = await latestNewsResponse.json();

        const eventsNewsResponse = await fetch(`${apiUrl}/api/v1/event-news`);
        const eventsNewsData = await eventsNewsResponse.json();

        return [
            { team_name: "View All", members: latestNewsData.results },
            { team_name: "Top News", members: topNewsData.results },
            { team_name: "Latest News", members: latestNewsData.results },
            { team_name: "Events News", members: eventsNewsData.results },
        ];
    } catch (error) {
        console.error("Error fetching news data: ", error);
        return [];
    }
};


const TeamMembers = () => {
    const [selectedTeam, setSelectedTeam] = useState('View All');
    const [teamsData, setTeamsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchNewsData();
            setTeamsData(data);
        };

        fetchData();
    }, []);

    const handleToggle = (event, newSelection) => {
        if (newSelection !== null) {
            setSelectedTeam(newSelection);
        }
    };

    const renderContent = () => {
            const selectedTeamData = teamsData.find(team => team.team_name === selectedTeam)?.members || [];
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },}}>
                    <Box sx={{ width: '100%',}}>
                        <Allinonecard data={selectedTeamData} />
                    </Box>
                </Box>
            );
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: {xs:'none',sm:"block"},textAlign: 'left',mb:15,}}>
                <Box sx={{ mt: '40px', textAlign: 'center' }}>
                    <Typography sx={{ ...theme.typography.h3 }}>
                        News
                    </Typography>
                    <Typography sx={{ ...theme.typography.h6,mt: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },}}>
                        Meet our diverse team of world-class creators, designers, and problem solvers.
                    </Typography>
                </Box>
                <Box
                    sx={{

                        display: 'flex',
                        justifyContent: 'center',
                        mt: { xs: 1, sm: 2, md: 4, lg: 6, xl:8 },
                        maxHeight: '40px',

                    }}
                >
                    <ToggleButtonGroup
                        value={selectedTeam}
                        exclusive
                        onChange={handleToggle}
                        aria-label="Team selection"
                        sx={{
                            display: 'flex',
                            gap: { xs: 0.8, sm: 1, md: 2, lg: 3, xl: 4 },
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >


                        {teamsData.map(({ team_name }) => (
                            <ToggleButton
                                key={team_name}
                                value={team_name}
                                selected={selectedTeam === team_name}
                                sx={{
                                    padding: 0,
                                    minWidth: 0,
                                    color: '#e0e0e0',
                                    width: '10.3472vw',
                                    height: '2.7778vw',
                                    ...theme.typography.button,
                                    '&.Mui-selected': {
                                        borderRadius: '0.3125vw',
                                        backgroundColor: '#B50304',
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#B50304',
                                        },
                                    },
                                    '&:not(.Mui-selected)': {
                                        backgroundColor: 'rgba(31, 31, 31, 1)',
                                        borderRadius: '0.3125vw',
                                        border:'0.5px solid rgba(38, 38, 38, 1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(31, 31, 31, 1)',
                                        },
                                    },
                                }}
                                disableRipple
                            >
                                {team_name}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>

                <Box width={'100%'}>
                    {renderContent()}
                </Box>
            </Box>



            <Box sx={{display:{xs:'flex',sm:'none'},flexDirection: 'column',gap:'10vw',my:'4vw'}}>
                {teamsData.map((team, index) => (
                    <Box key={index}>
                        <Typography
                            sx={{ ...theme.typography.h3,ml:'8vw',mb:'2vw'}}
                        >
                            {team.team_name}
                        </Typography>

                        <Box sx={{ display: 'flex',ml:'8vw'}}>
                            <Mediacard data={team.members}/>
                        </Box>
                    </Box>
                ))}

            </Box>
        </ThemeProvider>
    );
};

export default TeamMembers;
