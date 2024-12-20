import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography, Button, Link, ThemeProvider, createTheme, Snackbar, Alert } from '@mui/material';
const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffffff',
        },
        error: {
            main: '#ff0000',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
    },
    typography: {
        caption: {
            fontFamily: 'Lato',
            fontSize: { xs: '14.22px', lg: '16px' },
            color: 'black',
            fontStyle: 'normal',
            lineHeight: '100%',
            textTransform: 'none'
        },
        h5: {
            fontFamily: 'Lato',
            fontSize: '23px',
            fontWeight: 600,
            lineHeight: '23px',
            textAlign: 'center',
        },
    },
});

const navItemStyle = {
    fontFamily: 'Lato',
    fontSize: { xs: '14.22px', lg: '16px' },
    color: '#fff',
    fontStyle: 'normal',
    lineHeight: '100%',
    textTransform: 'none'
};

const EmailVerification = ({ email, password, onSubmit, onResend, onBack }) => {
    const [code, setCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(150); // 2:30 in seconds
    const inputRefs = useRef([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const VERIFICATION_TIME_KEY = `verificationRequestTime_${email}`;

    const loginAgain = async (email, password) => {
        try {
            const loginResponse = await fetch(`${apiUrl}/api/v1/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (loginResponse.status === 200) {
                const loginData = await loginResponse.json();
                localStorage.setItem('authToken', loginData.access);
                localStorage.setItem('refreshToken', loginData.refresh);
                showSnackbar('Login successful!', 'success');
                onSubmit(loginData);
            } else {
                showSnackbar('Try again later...', 'error');
            }
        } catch (error) {
            console.error("Error during login:", error);
            showSnackbar('An error occurred. Please try again later.', 'error');
        }
    };

    useEffect(() => {
        const storedTime = localStorage.getItem(VERIFICATION_TIME_KEY);
        if (storedTime) {
            const elapsed = Math.floor((Date.now() - parseInt(storedTime, 10)) / 1000);
            if (elapsed < 150) {
                setTimeLeft(150 - elapsed);
            } else {
                setTimeLeft(0);
            }
        } else {
            localStorage.setItem(VERIFICATION_TIME_KEY, Date.now().toString());
            setTimeLeft(150);
        }
    }, [VERIFICATION_TIME_KEY]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handlePaste = (e, index) => {
        const pasteData = e.clipboardData.getData('Text');

        if (/^\d+$/.test(pasteData)) {
            const newCode = code.split('');


            let lastFilledIndex = index;
            for (let i = 0; i < pasteData.length && index + i < 6; i++) {
                newCode[index + i] = pasteData[i];
                lastFilledIndex = index + i;
            }

            setCode(newCode.join(''));

            if (lastFilledIndex < 5) {
                inputRefs.current[lastFilledIndex + 1].focus();
            } else {
                inputRefs.current[5].focus();
            }

            e.preventDefault();
        }
    };

    const handleChange = (e, index) => {
        const { value } = e.target;

        if (/^\d$/.test(value)) {
            const newCode = code.split('');
            newCode[index] = value;
            setCode(newCode.join(''));

            if (index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };


    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (code[index]) {
                const newCode = code.split('');
                newCode[index] = '';
                setCode(newCode.join(''));
            } else if (index > 0) {
                const newCode = code.split('');
                newCode[index - 1] = '';
                setCode(newCode.join(''));
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1].focus();
                }
            }
        }
    };

    const handleSubmit = async () => {
        if (code.length === 6) {
            try {
                const response = await fetch(`${apiUrl}/api/v1/verify-email/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ verification_code: code, email: email }),
                });

                if (response.ok) {
                    const result = await response.json();
                    showSnackbar('Verification successful!', 'success');
                    await loginAgain(email, password);
                } else {
                    showSnackbar('Verification failed. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error verifying code:', error);
                showSnackbar('An error occurred. Please try again later.', 'error');
            }
        } else {
            showSnackbar('Please enter all 6 digits', 'warning');
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleResend = () => {
        localStorage.setItem(VERIFICATION_TIME_KEY, Date.now().toString());
        setTimeLeft(150);
        setCode('');
        inputRefs.current[0].focus();
        if (onResend) {
            onResend();
            showSnackbar('Verification code resent!', 'info');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                    p: { xs: '30px', md: '40px' },
                    width:'100%',
                    boxSizing: 'border-box'
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Typography
                        sx={{
                            ...navItemStyle,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#fff'
                        }}>
                        Verify your email address
                    </Typography>
                    <Typography
                        sx={{
                            ...navItemStyle,
                            fontSize: '14px',
                            color: '#bfbfbf',
                            mt: '14px',
                            lineHeight: '100%'
                        }}
                    >
                        Enter vitrification code we sent to
                    </Typography>
                    <Typography
                        sx={{
                            ...navItemStyle,
                            fontSize: '14px',
                            color: '#bfbfbf',
                            mt: '8px',
                            lineHeight: '100%'
                        }}
                    >
                        {email}
                    </Typography>

                </Box>

                <Box display="flex" justifyContent="center" gap={1.5} mt={2} mb={2}>
                    <Box display="flex" justifyContent="center" gap={1.5} mt={2} mb={2}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TextField
                                key={index}
                                value={code[index] || ''}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={(e) => handlePaste(e, index)}
                                inputRef={(el) => (inputRefs.current[index] = el)}
                                inputProps={{
                                    maxLength: 1,
                                    style: {
                                        padding:'0',
                                        fontFamily: 'Lato',
                                        fontSize: '23px',
                                        fontWeight: 500,
                                        textAlign: 'center',
                                        width: '100%',
                                        height: '50px',
                                        backgroundColor: 'white',
                                        color: '#262626',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(0, 201, 183, 1)',
                                    },
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                variant="outlined"
                            />
                        ))}
                    </Box>

                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: '360px' }}>
                    <Typography variant="body2" sx={{ textAlign: 'center',color:'#BFBFBF' }}>
                    Your verification code may take a few moments to arrive Didn't receive a verification code? {timeLeft > 0 ? formatTime(timeLeft) : (
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleResend}
                            sx={{
                                mb: 0.5,
                                color: '#FCFCFC',
                                '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Resend
                        </Link>
                    )}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mb={1.5}
                    mt='32px'
                >
                    <Button
                        sx={{
                            backgroundColor: '#B50304',
                            color: '#FFFFFF',
                            maxWidth: '380px',
                            width: '100%',
                            height: '48px',
                            fontSize:'16px',
                            fontWeight:600,
                            fontFamily:'Lato',
                            textTransform: 'none',
                        }}
                        onClick={handleSubmit}
                    >
                        Confirm
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" width="100%">
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: 'white',
                            color: '#FFFFFF',
                            maxWidth: '380px',
                            width: '100%',
                            height: '44px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 400,
                            fontFamily: 'Lato',
                        }}
                        onClick={onBack}
                    >
                        Back
                    </Button>
                </Box>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ backgroundColor: theme.palette[snackbarSeverity].main, color: '#fff' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default EmailVerification;
