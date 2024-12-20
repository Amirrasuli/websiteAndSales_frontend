import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
    Box,
    Link,
} from "@mui/material";
import { useAuth } from '../../AuthContext.jsx';
import { createTheme } from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
    typography: {
        h1: {
            fontFamily: "Lato",
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "24px",
            textAlign: "center",
        },
        caption: {
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "16.8px",
            textAlign: "center",
        },
        h3: {
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "16px",
            textAlign: "left",
        },
    },
});

const ChangeEmailDialog = ({ open, onClose }) => {
    const { authToken } = useAuth();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState([]);
    const [step, setStep] = useState(1); // 1 for change email, 2 for submit code
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [timeLeft, setTimeLeft] = useState(0);
    const navigate = useNavigate();


    const inputRefs = React.useRef([]);
    const VERIFICATION_TIME_KEY = `verificationRequestTime_${email}`;

    const onResend = () => {
        fetch(`${apiUrl}/api/v1/request-verification-code/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) throw new Error(data.detail || 'Failed to resend verification email');
                showSnackbar(data.detail || 'Verification email resent successfully!', 'success');
            })
            .catch(error => {
                console.error('Error resending verification email:', error);
                showSnackbar(error.message || 'Error resending verification email.', 'error');
            });
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

    const handleResend = () => {
        localStorage.setItem(VERIFICATION_TIME_KEY, Date.now().toString());
        setTimeLeft(150);
        setCode('');
        inputRefs.current[0].focus();
        onResend();
        showSnackbar('Verification code resent!', 'info');
    };

    const handleSendCode = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/user/new-email/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setStep(2);
                setSnackbar({ open: true, message: data.detail || "Verification code sent!", severity: "success" });
            } else {
                throw new Error(data.detail || "Failed to send verification code.");
            }
        } catch (error) {
            setSnackbar({ open: true, message: error.message, severity: "error" });
        }
    };

    const handleSubmitCode = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/user/new-email/submit-code/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ email, verification_code: code.join("") }),
            });

            const data = await response.json();
            if (response.ok) {
                setSnackbar({ open: true, message: data.message || "Email successfully changed!", severity: "success" });

                setTimeout(() => {
                    window.location.href = '/profile';
                }, 2000);
            } else {
                throw new Error(data.message || "Verification failed.");
            }
        } catch (error) {
            setSnackbar({ open: true, message: error.message, severity: "error" });
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

        if (pasteData.length <= 6) {
            const newCode = [...code];
            pasteData.split("").forEach((digit, index) => {
                if (index < 6) newCode[index] = digit;
            });
            setCode(newCode);

            const lastFilledIndex = pasteData.length - 1;
            if (lastFilledIndex < inputRefs.current.length) {
                inputRefs.current[lastFilledIndex]?.focus();
            }
        }
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '15px',
                        backgroundColor: '#262626',
                        color: '#FFFFFF',
                        maxWidth: '480px',
                        overflow: 'hidden',
                        px: '48px',
                        maxHeight: '672px',
                        boxSizing: 'border-box',
                        pb: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
                        position:'relative'
                    },
                }}
            >
                <DialogContent>
                    {step === 1 ? (
                        <>
                            <Typography sx={{ textAlign: "center", mt: '16px', ...theme.typography.h1, color: '#FFFFFF' }}>
                                Change your email
                            </Typography>
                            <Typography sx={{ mt: 1, textAlign: "center", display: "block", ...theme.typography.caption, Color: '#BFBFBF' }}>
                                Enter a new email to change your email
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    mt: 3,
                                    backgroundColor: 'white',
                                    borderRadius: "4px",
                                    border: "1px solid rgba(0, 201, 183, 1)",
                                    ...theme.typography.h3
                                }}
                            />
                            <Box display="flex" justifyContent="space-between" mt={4} gap={1} height='45px' mb={2}>
                                <Button variant="outlined" color="inherit" onClick={onClose} fullWidth disableRipple sx={{ textTransform: 'none', ...theme.typography.h3 }}>
                                    Cancel
                                </Button>
                                <Button
                                    disableRipple
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: "#B50304", color: "#FFFFFF", textTransform: 'none', ...theme.typography.h3 }}
                                    onClick={handleSendCode}
                                >
                                    Send code
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: { xs: "30px", md: "40px" }, boxSizing: "border-box" }}>
                            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                                <Typography
                                    sx={{
                                        ...theme.typography.h1,
                                        color: '#fff'
                                    }}>
                                    Verify your email address
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: "center", display: "block", ...theme.typography.caption, Color: '#BFBFBF',mt: '21px',
                                    }}
                                >
                                    Enter vitrification code we sent to
                                </Typography>
                                <Typography
                                    sx={{
                                        textAlign: "center", display: "block", ...theme.typography.caption, Color: '#BFBFBF',
                                        mt: '4px',

                                    }}
                                >
                                    {email}
                                </Typography>

                            </Box>
                            <Box display="flex" gap={2}>
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <TextField
                                        key={index}
                                        value={code[index]}
                                        inputRef={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        inputProps={{
                                            maxLength: 1,
                                            style: {
                                                fontFamily: 'Lato',
                                                fontSize: '23px',
                                                fontWeight: 500,
                                                textAlign: 'center',
                                                width: '25px',
                                                height: '25px',
                                                backgroundColor: 'white',
                                                color: '#262626',
                                                borderRadius: '4px',
                                                border: '1px solid rgba(0, 201, 183, 1)',
                                            },
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                        }}
                                    />
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: '350px' }}>
                                <Typography  sx={{ textAlign: 'center' ,...theme.typography.caption,Color: '#BFBFBF', mt:2,}}>
                                    Your verification code may take a few moments to arrive. Didn't receive a verification code? {timeLeft > 0 ? formatTime(timeLeft) : (
                                    <Link
                                        component="button"
                                        onClick={handleResend}
                                        sx={{
                                            ...theme.typography.caption,
                                            mb: 0.5,
                                            color: 'inherit',
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
                                mt='24px'
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
                                    onClick={handleSubmitCode}
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
                                    onClick={onClose}
                                >
                                    Back
                                </Button>
                            </Box>

                        </Box>
                    )}
                </DialogContent>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ChangeEmailDialog;
