import React, { useEffect, useState } from 'react';
import {
    FormControl, InputLabel, OutlinedInput, Box, Button, Link,
    InputAdornment, IconButton, Snackbar, Alert, Typography, TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import FormInput from '../custom/FormInput';
import GoogleSignInButton from './GoogleSignInButton';
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
    typography: {},
});

const AuthForm = ({ email: initialEmail = null, onForgotPassword, onLoginSuccess, onSendResetLink, }) => {
    const [email, setEmail] = useState(initialEmail);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [signIn,setSignIn] = useState(false);
    const formFields = ["first_name", "last_name"];
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const [formData, setFormData] = useState({first_name: "", last_name: "",});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (initialEmail) {
            setEmail(initialEmail);
        }
    }, [initialEmail]);




    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            showSnackbar('Please enter a valid email address.', 'error');
            return;
        }

        try {
            if (!signIn) {
                const loginResponse = await fetch(`${apiUrl}/api/v1/token/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password}),
                });

                if (loginResponse.status === 200) {
                    const loginData = await loginResponse.json();
                    localStorage.setItem('authToken', loginData.access);
                    localStorage.setItem('refreshToken', loginData.refresh);
                    localStorage.setItem('role', loginData.role)
                    onLoginSuccess();
                    showSnackbar('Login successful!', 'success');
                } else if (loginResponse.status === 202) {
                    showSnackbar('User not verified.', 'error');
                    onSendResetLink(email);
                } else if (loginResponse.status === 401) {
                    showSnackbar('No account found with given credentials!,please signUp First', 'error');
                } else {
                    const errorData = await loginResponse.json();
                    showSnackbar(errorData.message || 'Login failed. Please try again.', 'error');
                }
            } else {
                const registerResponse = await fetch(`${apiUrl}/api/v1/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password,...formData}),
                });

                if (registerResponse.ok) {
                    onSendResetLink(email, password);
                    showSnackbar('Registration successful!', 'success');
                } else {
                    const errorData = await registerResponse.json();
                    showSnackbar(errorData.password || errorData.email || errorData.first_name || errorData.last_name || 'Registration failed. Please try again.', 'error');
                }
            }
        } catch (error) {
            showSnackbar('An unexpected error occurred. Please try again.', 'error');
        }
    };

        const handleCloseSnackbar = () => setOpenSnackbar(false);

    const handleSuccessGoogle = async (response) => {
        try {
            const res = await fetch(`${apiUrl}/api/v1/auth/google/callback/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: response.code }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                showSnackbar('Login successful!', 'success');
            } else {
                showSnackbar(loginData.message);
            }
        } catch (error) {
            showSnackbar('An unexpected error occurred. Please try again.', 'error');
        }
    };
    const handleFailureGoogle = (error) => {
        showSnackbar('google login failed.', 'error');
    };


    return (
        <Box sx={{width: '80%',}}>
            <form onSubmit={handleSubmit}>
                    <Box sx={{display: signIn ? 'flex' : 'none',flexDirection:'row',gap:'12px',mb:'12px' }}>
                        {formFields.map((field) => (
                            <Box key={field} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <TextField
                                    id={field}
                                    fullWidth
                                    variant="outlined"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    placeholder={field === "first_name" ? "First name" : "Last name"}
                                    InputProps={{
                                        style: {
                                            color: "#000",
                                            height: "48px",
                                            fontSize: "13px",
                                            textJustify: "center",
                                        },
                                    }}
                                    sx={{
                                        borderRadius: "6px",
                                        height: "48px",
                                        boxSizing: "border-box",
                                        backgroundColor: "#FFFFFF",
                                        transition: "border-color 0.3s, box-shadow 0.3s",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "transparent",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "transparent", // Transparent-like hover effect
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderWidth: "1px",
                                            borderColor: "transparent", // Slightly darker focus border
                                        },
                                        "& .MuiOutlinedInput-input": {
                                            padding: "12px 14px",

                                        },
                                    }}
                                />

                            </Box>
                        ))}
                </Box>
                <FormControl variant="outlined" fullWidth sx={{ mb: '12px' }}>
                    <FormInput
                        placeholder='Enter your email'
                        value={email}
                        setValue={setEmail}
                        borderRadius='6px'
                        height='48px'
                        aria-label="Email address"
                        inputname='email'
                        hiddenError={true}
                        ml={0}
                    />
                </FormControl>
                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                    <InputLabel
                        htmlFor="password-input"
                        sx={{
                            color: passwordFocused ? 'rgba(38, 38, 38, 1)' : 'rgba(38, 38, 38, 1)',
                            opacity: passwordFocused || password ? 0 : 0.4,
                            fontSize:'13px',
                            textJustify:'center',
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
                            borderRadius: "6px",
                            pl:1.3,
                            height: '48px',
                            boxSizing: 'border-box',
                            backgroundColor: '#FFFFFF',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: passwordFocused ? '#a80d0d' : 'rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {

                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {

                                borderWidth: '1px',
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: '12px 14px',
                            },
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        aria-label="Password"
                    />
                </FormControl>


                <Box
                    justifyContent="left"
                    width="380px"
                    sx={{
                        mb: '24px',
                        ml:1,
                        display: signIn ? 'none' : 'flex'
                    }}
                >
                    <Link
                        href="#"
                        variant="h6"
                        color="#5EA5D4"
                        sx={{ textDecoration: 'none', fontSize: '14px', color: 'white' }}
                        onClick={onForgotPassword}
                    >
                        Forgot your password?
                    </Link>
                </Box>

                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                        mb: '20px',
                        backgroundColor: '#B50304',
                        height:'44px',
                        textTransform:'none',
                        fontFamily:'Lato',
                        fontWeight:500,
                        fontSize:'16px',
                        fontStyle:'normal',
                        '&:hover': {
                            backgroundColor: '#B50304',
                        },
                        
                    }}
                >
                    {signIn ? 'SignUp' : 'LogIn'}
                </Button>
            </form>
            <Box sx={{display: signIn ? 'none' : 'block' }}>
            <Box display="flex" alignItems="center" width="100%" maxWidth="380px" mb="28px">
                <Box flexGrow={1} height="1px" bgcolor="#9f9b9b" />
                <Typography
                    sx={{
                        mx: 1.3,
                        color: '#9f9b9b',
                        fontSize: '14px',
                        fontFamily: 'Lato',
                    }}
                >
                    Or
                </Typography>
                <Box flexGrow={1} height="1px" bgcolor="#9f9b9b" />
            </Box>
            <GoogleSignInButton onSuccess={handleSuccessGoogle} onFailure={handleFailureGoogle} />
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                fullWidth
                sx={{
                    mt: '24px',
                    mb: '24px',
                }}
            >
                <Typography
                    sx={{
                        mx: 0.5,
                        color: '#9f9b9b',
                        fontSize: '14px',
                        fontFamily: 'Lato',
                    }}
                >
                    {signIn ? 'Already have an account?' : 'Don’t have an account?'}
                </Typography>
                <Link
                    href="#"
                    variant="h6"
                    color="#5EA5D4"
                    sx={{ textDecoration: 'none', fontSize: '14px', color: 'white' }}
                    onClick={() => setSignIn((prevSignIn) => !prevSignIn)}
                    >
                    {signIn ? 'Log in' : 'Sign up'}
                </Link>
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
        </Box>

    );
};

AuthForm.propTypes = {
    onForgotPassword: PropTypes.func.isRequired,
    onLoginSuccess: PropTypes.func.isRequired,
    onSendResetLink: PropTypes.func.isRequired,
};

export default AuthForm;
