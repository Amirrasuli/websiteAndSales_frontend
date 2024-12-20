import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton,
    Typography, Box,
} from '@mui/material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
const apiUrl = import.meta.env.VITE_API_URL;

const navItemStyle = {
    fontFamily: 'Lato',
    fontSize: { xs: '14.22px', lg: '16px' },
    color: '#fff',
    fontStyle: 'normal',
    lineHeight: '100%',
    textTransform: 'none'
};

const ResetPasswordDialog = ({ open, onClose, token }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const handleConfirm = () => {
        if (password !== confirmPassword) {
            showSnackbar('Passwords do not match.', 'error');
            return;
        }

        const sendApiUrl = `${apiUrl}/api/v1/reset-password/${token}`;
        const payload = { password };

        fetch(sendApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    onClose();
                    showSnackbar('Password reset successful!', 'success');
                } else {
                    console.error('Failed to reset password');
                    showSnackbar('Failed to reset password', 'error');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                showSnackbar('An unexpected error occurred. Please try again.', 'error');
            });
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => setOpenSnackbar(false);

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    onClose();
                }
            }}
            disableEscapeKeyDown
            PaperProps={{
                style: {
                    borderRadius: '15px',
                    backgroundColor: '#262626',
                    color: '#FFFFFF',
                    maxWidth: '380px',
                    overflow: 'hidden',
                    px: '48px',
                    maxHeight: '672px',
                    boxSizing: 'border-box',
                    pb: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
                    position:'relative'
                },
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                    p: { xs: '30px', md: '40px' },
                    width: '100%',
                    height: { xs: '337px', },
                    boxSizing: 'border-box'
                }}
            >
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Typography
                        sx={{
                            ...navItemStyle,
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#fff'
                        }}>
                        Reset password
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
                        Enter a new password to update your password
                    </Typography>
                </Box>

                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                    <InputLabel
                        htmlFor="password-input"
                        sx={{
                            color: confirmPasswordFocused ? 'rgba(38, 38, 38, 1)' : 'rgba(38, 38, 38, 1)',
                            opacity: passwordFocused || password ? 0 : 1,
                        }}
                    >
                        Enter your password
                    </InputLabel>
                    <OutlinedInput
                        id="password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        sx={{
                            backgroundColor: '#FFFFFF',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#a80d0d',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#a80d0d',
                                borderWidth: '2px',
                            },
                        }}

                        aria-label="Password"
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                    <InputLabel
                        htmlFor="confirm-password-input"
                        sx={{
                            color: confirmPasswordFocused ? 'rgba(38, 38, 38, 1)' : 'rgba(38, 38, 38, 1)',
                            opacity: confirmPasswordFocused || confirmPassword ? 0 : 1,
                        }}
                    >
                        Confirm your password
                    </InputLabel>
                    <OutlinedInput
                        id="confirm-password-input"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onFocus={() => setConfirmPasswordFocused(true)}
                        onBlur={() => setConfirmPasswordFocused(false)}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="off"
                        sx={{
                            backgroundColor: '#FFFFFF',
                            '&:hover': {
                                borderColor: '#a80d0d',
                            },
                            '&.Mui-focused': {
                                borderColor: '#a80d0d',
                                borderWidth: '2px',
                            },
                        }}

                        aria-label="Confirm Password"
                    />
                </FormControl>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    fullWidth
                    sx={{
                        textTransform: 'none',
                        py: 1.2,
                        mt: 1,
                        backgroundColor: '#a80d0d',
                        '&:hover': {
                            backgroundColor: '#ec0000',
                        },
                    }}
                >
                    Reset Password
                </Button>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default ResetPasswordDialog;
