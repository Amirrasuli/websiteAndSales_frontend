import React from "react";
import {
    Box,
    Typography,
    createTheme,
    ThemeProvider, Divider,
} from "@mui/material";
import linkedin from "../../assets/InIcon.svg";
import backgroundImage from "../../assets/aboutUs1.svg";

const theme = createTheme({
    typography: {
        h3: {
            fontFamily: 'Lato',
            fontWeight: {xs:700,sm:600},
            fontSize: {xs:'3.33vw',sm:'1.25vw'},
            color: "#FFFFFF",
            lineHeight: {xs:'4.2vw',sm:'1.3vw'},
        },
        h6: {
            fontFamily: 'Lato',
            fontSize: {xs:'3vw',sm:'1.11vw'},
            color: "rgba(191, 191, 191, 1)",
            fontWeight: 500,
            lineHeight: {xs:'4.2vw',sm:'1.3vw'},
        },
        caption: {
            fontFamily: 'Lato',
            fontSize: {xs:'2.82vw',sm:'0.97vw'},
            textTransform: 'none',
            lineHeight: {xs:'3.5vw',sm:'1.5vw'},
            fontWeight: 400,
            color: "#FFFFFF",
        },
    },
});


const imageContainerStyle = {
    position: 'relative',
    mt: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}
const Allinonecard = ({ data }) => { 
    return (
        <ThemeProvider theme={theme}>
            <Box
                fullWidth
                display="flex"
                flexDirection="column"
                sx={{
                    justifyItems: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    sx={{
                        gap: {xs:'5vw',sm:'1.86vw'},
                        width: {xs:'90vw',sm:'85vw'},
                    }}
                >
                    {data.map((box, index) => (
                        <Box
                            display="flex"
                            key={index}
                            sx={{
                                flexDirection: "column",
                                borderRadius: {xs:'2.22vw',sm:'1.11vw'},
                                width: {xs:'41.11vw',sm:'18vw'},
                                height: {xs:'61.11vw',sm:'26vw'},
                                boxSizing: 'border-box',
                                boxShadow: '0vw 0.61vw 0.61vw 0vw rgba(0, 0, 0, 0.45)',
                                position: "relative",
                                overflow: "hidden",
                                alignItems: "center",
                                background: "linear-gradient(180deg, rgba(74, 74, 74, 0.9) 0%, rgba(31, 31, 31, 0.9) 100%)",
                                transition: 'ease-in 200ms',
                                ":hover": {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            <Box
                                onClick={box.linked_in ? () => window.open(box.linked_in, "_blank") : null}
                                alt="LinkedIn"
                                sx={{
                                    width: {xs:'5.5vw',sm:'2.5vw'},
                                    height: {xs:'5.5vw',sm:'2.5vw'},
                                    position: "absolute",
                                    top: {xs:'2vw',sm:"0.625vw"},
                                    left: {xs:'2vw',sm:'0.625vw'},
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 3,
                                    backgroundImage: `url(${linkedin})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    filter: box.linked_in ? "none" : "grayscale(100%) brightness(0) invert(1)",
                                    cursor: box.linked_in ? "pointer" : "default",
                                    opacity: box.linked_in ? '100%' : '20%',
                                    transition: "background-color 0.3s, transform 0.3s",
                                    '&:hover': {
                                        transform: box.linked_in ? "scale(1.1)" : "none",
                                    },
                                }}
                            >
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    zIndex: 2,
                                    justifyItem: "center",
                                }}
                            >
                                <Box sx={imageContainerStyle}>
                                    <Box
                                        sx={{
                                            p: { xs: '1vw', sm: '0.52vw'},
                                            width: { xs: '19.44vw', sm: '7.9vw' },
                                            height: { xs: '19.44vw', sm: '7.9vw' },
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: 'ease-in 300ms',
                                            ":hover": {
                                                transform: 'scale(1.1)'
                                            },

                                        }}
                                    >
                                    <img
                                            src={box.photo}
                                            alt="circle"
                                            style={{
                                                width:'100%',
                                                height:'100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ width: "85%" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: '2.15vw'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            ...theme.typography.h3,
                                            textAlign: "center",

                                        }}
                                    >
                                        {box.full_name}
                                    </Typography>
                                </Box>

                                {/* Job */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                        mt: '0.7vw',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            ...theme.typography.h6,
                                            color: '#8AE6DE',

                                        }}
                                    >
                                        {box._job}
                                    </Typography>
                                </Box>
                                <Divider
                                    orientation="horizontal"
                                    flexItem
                                    sx={{
                                        width: '100%',
                                        mt: '2vw',
                                        display: box.details ? 'block' : 'none',
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        borderStyle: 'dashed',
                                    }}
                                />
                                {/* Details */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                        mt: '2vw',

                                    }}
                                >
                                    <Typography
                                        sx={{

                                            ...theme.typography.caption,
                                            fontWeight: 400,
                                            color: '#d9d9d9',
                                        }}
                                    >
                                        {box.details}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

        </ThemeProvider >
    );
};

export default Allinonecard;
