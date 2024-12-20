import React, { useState } from 'react';
import {
    FormControl, InputLabel, OutlinedInput, Box, Typography, Button, Fade
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormInput from '../custom/FormInput';
const apiUrl = import.meta.env.VITE_API_URL;

// Validation function for email
const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

const navItemStyle = {
    fontFamily: 'Lato',
    fontSize: { xs: '14.22px', lg: '16px' },
    color: '#fff',
    fontStyle: 'normal',
    lineHeight: '100%',
    textTransform: 'none'
};

const theme = createTheme({
    typography: {
        h6: {
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '19.25px',
            textAlign: 'center',
        },
        h9: {
            fontFamily: 'Lato',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '16px',
            textAlign: 'center',
        },
        h23: {
            fontFamily: 'Lato',
            fontSize: '23px',
            fontWeight: 500,
            lineHeight: '23px',
            textAlign: 'center',
        },
        text06: {
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
            textAlign: 'left',
        },
    },
});

const ForgotPasswordDialog = ({ onBack, showSnackbar, }) => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => setEmail(event.target.value);

    const handleSendResetLink = () => {
        if (!validateEmail(email)) {
            showSnackbar('Please enter a valid email address.', 'error');
            return;
        }

        fetch(`${apiUrl}/api/v1/forgot-password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to send reset link');
                return response.json();
            })
            .then(data => {
                showSnackbar('Reset link sent successfully!');
                onBack()
            })
            .catch(error => {
                console.error('Error sending reset link:', error);
                showSnackbar('User with this email does not exist.', 'error');
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Fade in={true} timeout={1000}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                        p: { xs: '30px', md: '40px' },
                        width: { xs: '340px', md:'450px'},
                        height: { xs: '337px', },
                        boxSizing: 'border-box'
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                        <Typography
                            sx={{
                                ...navItemStyle,
                                fontSize: '18px',
                                fontWeight: 600,
                                color: '#fff',
                                fontFamily:'Lato'
                            }}>
                            Forget password?
                        </Typography>
                        <Typography
                            sx={{
                                ...navItemStyle,
                                fontSize: '14px',
                                color: '#bfbfbf',
                                mt: '8px',
                                lineHeight: '100%',
                                fontFamily:'Lato'
                            }}
                        >
                            No worries, we'll send you reset instructions
                        </Typography>
                    </Box>
                    <form style={{ width: '100%', maxWidth: '380px' }}>
                        <FormInput
                            value={email}
                            setValue={setEmail}
                            inputname='email'
                            placeholder='Enter your email'
                            borderRadius='4px'
                            height='45px'
                        />
                        <Box
                            display="flex"
                            justifyContent="center"
                            width="100%"
                            mb={2}
                            mt='32px'
                        >
                            <Button
                                sx={{
                                    backgroundColor: '#B50304',
                                    color: '#FFFFFF',
                                    maxWidth: '380px',
                                    width: '100%',
                                    height: '44px',
                                    fontSize:'16px',
                                    fontWeight:600,
                                    fontFamily:'Lato',
                                    textTransform: 'none',
                                }}
                                onClick={handleSendResetLink} // استفاده از handleSendResetLink
                            >
                                Reset Password
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent="center" width="100%" mt='16px'>
                            <Button
                                variant="outlined"
                                sx={{
                                    border: '2px solid #F5F5F5',
                                    color: '#FFFFFF',
                                    maxWidth: '380px',
                                    width: '100%',
                                    height: '44px',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    fontFamily: 'Lato',
                                }}
                                onClick={onBack}
                            >
                                Back
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Fade>
        </ThemeProvider>
    );
};

export default ForgotPasswordDialog;
