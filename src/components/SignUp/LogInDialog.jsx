import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, Box, Slide, Fade, IconButton, Snackbar, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import LoginDialog from './Login.jsx';
import ForgotPasswordDialog from './ForgetPassword.jsx';
import VerificationEmailDialog from './Verification.jsx';
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const SignUpDialog = ({ open, onClose, email: initialEmail = null }) => {
    const [dialogMode, setDialogMode] = useState('login');
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        if (initialEmail) {
            setEmail(initialEmail);
        }
    }, [initialEmail]);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleForgotPassword = () => setDialogMode('forgotPassword');
    const handleBackToLogin = () => setDialogMode('login');


    const handleVerificationEmail = (email, password) => {
        setEmail(email);
        setPassword(password)
        handleResendVerificationEmail(email,);
        setDialogMode('verificationEmail');
    };

    const handleResendVerificationEmail = (email) => {
        fetch(`${apiUrl}/api/v1/request-verification-code/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to send verification email');
                return response.json();
            })
            .then(data => {
                showSnackbar('Verification email sent successfully!');
            })
            .catch(error => {
                console.error('Error sending verification email:', error);
                showSnackbar('Error sending verification email.', 'error');
            });
    };

    const handleLoginSuccess = () => {
        navigate('/');
        window.location.reload();
    };

    const renderDialogContent = () => {
        switch (dialogMode) {
            case 'forgotPassword':
                return <ForgotPasswordDialog
                    onBack={handleBackToLogin}
                    showSnackbar={showSnackbar}
                />;
            case 'verificationEmail':
                return (
                    <VerificationEmailDialog
                        email={email}
                        password={password}
                        onResend={() => handleResendVerificationEmail(email)}
                        onBack={handleBackToLogin}
                        onSubmit={handleLoginSuccess}
                    />
                );
            case 'login':
            default:
                return (
                    <LoginDialog
                        email={email}
                        onForgotPassword={handleForgotPassword}
                        onLoginSuccess={handleLoginSuccess}
                        onSendResetLink={handleVerificationEmail}
                    />
                );
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            PaperProps={{
                style: {
                    borderRadius: '15px',
                    backgroundColor: '#262626',
                    color: '#FFFFFF',
                    maxWidth: '448px',
                    overflow: 'hidden',
                    px: '60px',
                    maxHeight: '672px',
                    boxSizing: 'border-box',
                    pb: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
                    position:'relative',
                    mb:'5px',
                },
            }}
        >

            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                    <Fade in={open} timeout={{ enter: 800, exit: 800 }} style={{ transitionDelay: '200ms' }}>
                        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                            {renderDialogContent()}
                        </Box>
                    </Fade>
                </Box>
            </Slide>
            {
                snackbarOpen &&
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            }

        </Dialog>
    );
};

export default SignUpDialog;
