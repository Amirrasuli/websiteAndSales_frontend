import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    IconButton,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const apiUrl = import.meta.env.VITE_API_URL;

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const loginResponse = await fetch(`${apiUrl}/api/v1/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (loginResponse.status === 200) {
                const data = await loginResponse.json();
                localStorage.setItem('token', data.token);
                setStatus('idle');
                return;
            }

            if (loginResponse.status === 202) {
                setStatus('verifying');
                return;
            }

            if (loginResponse.status === 401) {
                const registerResponse = await fetch(`${apiUrl}/api/v1/register/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (registerResponse.status === 201) {
                    setStatus('verifying');
                    return;
                }

                throw new Error('Registration failed');
            }

            throw new Error('Login failed');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const verifyResponse = await fetch(`${apiUrl}/api/v1/verify-email/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: verificationCode }),
            });

            if (verifyResponse.ok) {
                setStatus('idle');
            } else {
                throw new Error('Email verification failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={4}
            bgcolor="background.default"
            color="text.primary"
            sx={{mb:1000}}
        >
            <Box width="100%" maxWidth="400px">
                <Typography variant="h4" align="center" gutterBottom>
                    Get started
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" mb={3}>
                    Welcome to Vitruvian Shield
                </Typography>

                {status === 'idle' ? (
                    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <Box display="flex" alignItems="center" position="relative">
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                            />
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ position: 'absolute', right: 8 }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </Box>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Get started
                        </Button>
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleVerify} display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Verification Code"
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Verify Email
                        </Button>
                    </Box>
                )}

                {error && (
                    <Box mt={2} p={2} bgcolor="error.main" color="common.white" borderRadius={1} textAlign="center">
                        {error}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
