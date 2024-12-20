import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Autocomplete,
    Box,
} from "@mui/material";
import { parsePhoneNumberFromString, AsYouType } from "libphonenumber-js";
import InputMask from "react-input-mask";
const apiUrl = import.meta.env.VITE_API_URL;


const ChangeNumberDialog = ({ open, onClose }) => {
    const [step, setStep] = useState(1);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [verificationCode, setVerificationCode] = useState("");

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch(`${apiUrl}/api/v1/countries`);
            const data = await response.json();
            setCountries(data);
        };

        fetchCountries();
    }, []);

    const handleCountryChange = (event, value) => {
        setSelectedCountry(value);
        setError("");

        if (value) {
            setPhoneNumber(value.phone_prefix + " ");
        } else {
            setPhoneNumber("");
        }
    };


    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;

        if (selectedCountry && selectedCountry.phone_prefix) {
            const formatter = new AsYouType(selectedCountry.phone_prefix);
            const formattedNumber = formatter.input(input);
            setPhoneNumber(formattedNumber);
        } else {
            setPhoneNumber(input);
        }
        setError("");
    };



    const handleSendCode = async () => {
        if (!selectedCountry) {
            setError("Please select a country");
            return;
        }

        const countryCode = selectedCountry.phone_prefix.replace("+", "");

        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, countryCode);

        if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
            setError("Invalid phone number");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/v1/verify-number/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    country: selectedCountry.name,
                    phone: parsedPhoneNumber.number,
                }),
            });

            if (response.ok) {
                setStep(2);
            } else {
                const data = await response.json();
                setError(data.message || "Failed to send code");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        }
    };



    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
        setError("");
    };

    const handleVerifyCode = async () => {
        if (!verificationCode || verificationCode.length !== 6) {
            setError("Invalid verification code");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/v1/submit-number/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: `${selectedCountry.phone_prefix}${phoneNumber}`,
                    code: verificationCode,
                }),
            });

            if (response.ok) {
                onClose();
            } else {
                const data = await response.json();
                setError(data.message || "Invalid code");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        }
    };

    return (
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
            {step === 1 ? (
                <>
                    <DialogTitle>Change your number</DialogTitle>
                    <DialogContent>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Autocomplete
                                options={countries}
                                getOptionLabel={(option) => option.name}
                                onChange={handleCountryChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Country" variant="outlined" />
                                )}
                            />
                            <TextField
                                label="Phone number"
                                variant="outlined"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                error={!!error}
                                helperText={error}
                                InputProps={{
                                    inputComponent: InputMask,
                                    inputProps: {
                                        mask: selectedCountry ? `${selectedCountry.phone_prefix} (999) 999-9999` : "",
                                        value: phoneNumber,
                                        onChange: (e) => setPhoneNumber(e.target.value),
                                    },
                                }}
                            />


                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleSendCode}
                            >
                                Send code
                            </Button>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                        </Box>
                    </DialogContent>
                </>
            ) : (
                <>
                    <DialogTitle>Verify your number</DialogTitle>
                    <DialogContent>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Enter verification code"
                                variant="outlined"
                                value={verificationCode}
                                onChange={handleVerificationCodeChange}
                                error={!!error}
                                helperText={error}
                            />
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleVerifyCode}
                            >
                                Verify
                            </Button>
                            <Button variant="outlined" onClick={() => setStep(1)}>
                                Back
                            </Button>
                        </Box>
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
};

export default ChangeNumberDialog;
