    import React, { useState, useEffect } from 'react';
    import {
    Box,
    Typography,
    TextField,
    Avatar,
    Paper,
    ThemeProvider,
    createTheme,
    Autocomplete,
    Button,
    Dialog,
        Alert, Snackbar
    } from '@mui/material';
    import axios from 'axios';
    import { useAuth } from '../../AuthContext.jsx';
    import ChangeEmail from './ChangeEmail';
    import ChangePhone from './ChangePhone';
    import camera from '../../assets/cameraAddPic.png'
    import ImageCropDialog from "./CropDialog";
    const apiUrl = import.meta.env.VITE_API_URL;

    const theme = createTheme({
        typography: {
            h6: {
                fontFamily: 'Lato',
                fontSize: { xs: '12px', sm: '16px' },
                lineHeight: 'normal',
                color: '#8C8C8C',
                textTransform: 'none',
            },
            h3: {
                fontFamily: "Lato",
                fontWeight: 600,
                fontSize: { xs: '14px', sm: '19px' },
                color: "#FFFFFF",
                textTransform: 'none',
            },
            button: {
                fontFamily: 'Lato',
                fontSize: { xs: '14px', sm: '16px' },
                color: "#F1F1F1",
                textTransform: 'none',
                textAlign: 'left',
            },
        },
        palette: {
            text: {
                primary: "#F1F1F1",
                disabled: "#A5A5A5",
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        '&.Mui-disabled': {
                            fontSize: '14px',
                        },
                    },
                },
            },
        },
    });


    const getPhonePrefix = (countryCode) => {
        const country = countriesData.find(country => country.code === countryCode);
        return country ? country.phonePrefix : '';
    };

    const formatPhoneNumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{1,4})(\d{1,4})(\d{1,4})$/);
        return match ? `${match[1]}-${match[2]}-${match[3]}` : phone;
    };

    const ProfilePage = () => {
        const { authToken } = useAuth();
        const Token = localStorage.getItem('authToken') || authToken;
        const [isEditing, setIsEditing] = useState(false);
        const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phone: '', country: '', city: '' });
        const [initialFormData, setInitialFormData] = useState({ first_name: '', last_name: '', email: '', phone: '', country: '', city: '',picture:''});
        const [picData , setPicData] = useState(null);
        const [countryList, setCountryList] = useState([]);
        const [phonePrefix, setPhonePrefix] = useState('');
        const [dialogOpen, setDialogOpen] = useState(false);
        const [PhoneDialogOpen, setPhoneDialogOpen] = useState(false);
        const [focused, setFocused] = useState(false);
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const [srcPic, setSrcPic] = useState(null);
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const [snackbarMessage, setSnackbarMessage] = useState('');
        const [snackbarSeverity, setSnackbarSeverity] = useState('success');

        const showSnackbar = (message, severity = 'success') => {
            setSnackbarMessage(message);
            setSnackbarSeverity(severity);
            setSnackbarOpen(true);
        };

        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const { data } = await axios.get(`${apiUrl}/api/v1/user/settings`, { headers: { 'Authorization': `Bearer ${Token}` } }
                    );

                    console.log(data.picture);
                    setFormData(data);
                    setInitialFormData(data);

                    if (data.picture) {
                        await downloadAndStoreImage(data.picture);
                    }

                    const countriesResponse = await axios.get(`${apiUrl}/api/v1/countries`);
                    setCountryList(countriesResponse.data);

                    if (data.country) {
                        setPhonePrefix(await getPhonePrefix(data.country));
                    }
                } catch (error) {
                    console.error('Error fetching user data or countries:', error);
                }
            };

            const downloadAndStoreImage = async (imageUrl) => {
                try {
                    const response = await fetch(imageUrl, {
                        cache: 'no-cache',
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${Token}`,
                        },
                    });

                    if (response.ok) {
                        const imageBlob = await response.blob();

                        const imageObjectURL = URL.createObjectURL(imageBlob);

                        setPicData(imageObjectURL);
                    } else {
                        console.error(`Failed to fetch image. Status: ${response.status}`);
                    }
                } catch (error) {
                    console.error('Error downloading and storing image:', error);
                }
            };


            fetchUserData();
        }, [Token]);

        const handleCountryChange = async (event, newValue) => {
            const countryId = newValue ? newValue.id : '';
            setFormData(prev => ({ ...prev, country: countryId }));
            if (countryId) {
                const selectedCountry = countryList.find(country => country.id === countryId);
                if (selectedCountry) {
                    setPhonePrefix(selectedCountry.phone_prefix);
                }
            } else {
                setPhonePrefix('');
            }
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = async (e) => {
            if (e) e.preventDefault();
            const phoneWithPrefix = `${phonePrefix}${formData.phone}`;

            const dataToSend = { ...formData };
            delete dataToSend.picture;

            try {
                await axios.patch(
                    `${apiUrl}/api/v1/user/settings`,
                    { ...dataToSend, phone: formatPhoneNumber(phoneWithPrefix) },
                    { headers: { 'Authorization': `Bearer ${Token}` } }
                );
                console.log('Profile updated');
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        };


        const handleCancel = () => {
            setIsEditing(false);
            setFormData(initialFormData);
        };

        const handleFileChange = async (event) => {
            const selectedFile = event.target.files[0];
            const imageUrl = URL.createObjectURL(selectedFile);
            setSrcPic(imageUrl);
            setIsDialogOpen(true);
        };


        const uploadFile = async (file) => {
            try {
                const formData = new FormData();
                formData.append("picture", file);
                const response = await axios.post(
                    `${apiUrl}/api/v1/user/new-picture/`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${Token}`,
                        },
                    }
                );

                if (response.data) {
                    console.log("Upload Successful:", response.data);
                    alert("File uploaded successfully!");
                    window.location.reload();
                }
            } catch (error) {
                console.error("Upload Failed:", error.response?.data || error.message);
                alert("An error occurred while uploading the file.");
            }
        };

        const handleCropComplete = async (croppedArea) => {
            console.log("Cropped Area: ", croppedArea, croppedArea.type);
            const random = Date.now();
            const croppedFile = new File([croppedArea], `UserPic-${random}.png`, { type: "image/png" });
            console.log("Cropped File: ", croppedFile);
            // آپلود فایل
            if (croppedFile) {
                await uploadFile(croppedFile);
            }
        };

        return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', background: '#262626',alignContent:'center',height: '100%',mb:{ sm: '0vw', xs: '13vw' },pt:{ sm: '4.5vw', xs: '0vw' },pb:'3vw' }}>
                    <Box
                        sx={{
                            ml:{ sm: '5vw', xs: '0' },
                            display: 'flex',
                            alignItems: 'center',
                            mb: '32px',

                            flexDirection: { xs: 'column', sm: 'row' },
                        }}
                    >
                        <Box sx={{position: 'relative', width: '86.4px', height: '86.4px', justifyItems: 'flex-end'}}>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{
                                    display: "none",
                                }}
                                id="file-input"
                            />

                            <Avatar

                                alt={`${formData.first_name} ${formData.last_name}`}
                                src={picData}
                                onClick={() => {
                                    if (isEditing) {
                                        document.getElementById("file-input").click();
                                    }
                                }}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    border: "2px solid #B0EEE9",
                                    boxShadow: "0px 0px 5px 0px #8AE6DE99",
                                    position: "relative",
                                    zIndex: 1,
                                    cursor: !isEditing ? 'default' : 'pointer',
                                }}
                            />
                            <Box
                                onClick={() => {
                                    if (isEditing) {
                                        document.getElementById("file-input").click();
                                    }
                                }}
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundImage: `url(${camera})`,
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    borderRadius: '100%',
                                    width: '28px',
                                    height: '28px',
                                    backgroundColor: '#fff',
                                    zIndex: 2,
                                    cursor: !isEditing ? 'default' : 'pointer',
                                }}
                            />
                        </Box>


                        <Box
                            sx={{
                                ml: {sm: '24px', xs: '0'},
                                mt: {xs: '16px', sm: '0'},
                            }}
                        >
                            <Typography
                                sx={{
                                    ...theme.typography.h3,
                                    textAlign: {xs: 'center', sm: 'left'}, // Center on xs, left on sm and above
                                }}
                            >
                                {`${formData.first_name} ${formData.last_name}`}
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '0.5vw',
                                    ...theme.typography.h6,
                                    textAlign: { xs: 'center', sm: 'left' },
                                }}
                            >
                                {formData.email}
                            </Typography>
                        </Box>

                   </Box>
                    <Box sx={{ml:{ sm: '5vw', xs: '0' },}}>
                        <Paper component="form" onSubmit={handleSubmit} sx={{ml:{xs:'9vw',sm:'5px'},width:{xs:'0vw',sm:'60vw'},pb:'3vw', borderRadius: '16px',background: '#262626', border: '1px solid', borderImageSource: 'linear-gradient(180deg, rgba(31, 31, 31, 0.3) 0%, rgba(20, 20, 20, 0.3) 100%)', boxShadow: '0px 2px 8px 0px #0000001A', }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '2vw',
                                    ml:'3vw',
                                    mt:'3vw',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                }}
                            >
                                {['first_name', 'last_name', 'email', 'phone', 'country', 'city'].map((field, idx) => (
                                    <Box sx={{ width: {xs:'72vw',sm:'19.58vw'},mx:{xs:'4vw',sm:'1vw'},cursor: field === 'phone' ? 'not-allowed' : 'pointer', }} key={idx}>
                                        <Typography sx={{ mb: '0.5vw', ...theme.typography.button }}>
                                            {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                                        </Typography>

                                        {field === 'email' || field === 'phone' ? (
                                            <Button
                                                fullWidth
                                                sx={{
                                                    overflow: 'hidden',
                                                    backgroundColor: '#262626',
                                                    border: '1px solid #F5F5F5',
                                                    borderRadius: '4px',
                                                    ...theme.typography.button,
                                                    height: '48px',
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    paddingLeft: '10px',
                                                    color: !isEditing ? theme.palette.text.disabled : '#F1F1F1',
                                                    "&:hover": {
                                                        backgroundColor: !isEditing ? '#262626' : '#333',
                                                        cursor: field === 'phone' ? 'not-allowed' : 'pointer',
                                                    },
                                                    "&.Mui-disabled": {
                                                        ...theme.typography.button,
                                                        backgroundColor: '#262626',
                                                        borderColor: '#ccc',
                                                        color: theme.palette.text.disabled,
                                                        cursor: field === 'phone' ? 'not-allowed' : 'pointer',
                                                    },
                                                }}
                                                disabled={field === 'email' ? !isEditing : field === 'phone' ? true : false}
                                                onClick={() => {
                                                    if (field === 'email') {
                                                        setDialogOpen(true);
                                                    } else if (field === 'phone') {
                                                        setPhoneDialogOpen(true);
                                                    }
                                                }}
                                                disableRipple
                                            >
                                                {formData[field]}
                                            </Button>

                                        ) : field === 'country' ? (
                                            <Autocomplete
                                                fullWidth
                                                freeSolo
                                                disabled={!isEditing}
                                                value={countryList.find((country) => country.id === formData.country) || null}
                                                options={countryList}
                                                getOptionLabel={(option) => option.name}
                                                onChange={handleCountryChange}
                                                ListboxComponent={(props) => (
                                                    <ul
                                                        {...props}
                                                        style={{
                                                            maxHeight: '200px',
                                                            overflowY: 'auto',
                                                            backgroundColor: '#262626',
                                                            color: '#F5F5F5',
                                                            maxWidth:'60vw',
                                                            ...theme.typography.button,
                                                        }}
                                                    />
                                                )}
                                                renderInput={(params) => (
                                                    <TextField

                                                        {...params}
                                                        name="country"
                                                        sx={{
                                                            height: '48px',
                                                            ...theme.typography.button,
                                                            backgroundColor: '#262626',
                                                            border: '0.8x solid #F5F5F5',
                                                            borderRadius: '4px',
                                                            "& .MuiOutlinedInput-root": {
                                                                height: '48px',

                                                                "& fieldset": {
                                                                    ...theme.typography.button,
                                                                    borderColor: isEditing ? "#fff" : "#ccc",
                                                                },
                                                                ...(isEditing && {
                                                                    ...theme.typography.button,
                                                                    color:'#F1F1F1',
                                                                    "&:hover fieldset": {
                                                                        borderColor: "#ccc",
                                                                    },
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "#B0EEE9",
                                                                    },
                                                                }),
                                                            },
                                                            "& .Mui-disabled": {
                                                                ...theme.typography.button,
                                                                "& .MuiOutlinedInput-notchedOutline": {
                                                                    borderColor: "#ccc",
                                                                },
                                                                "& input": {
                                                                    color: "#fff",
                                                                },
                                                            },
                                                            "& input": {
                                                                color: "#ccc !important",
                                                            }

                                                        }}
                                                    />
                                                )}
                                                getOptionLimit={(options) => options.slice(0, 5)}
                                            />

                                        ) : (
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                disabled={!isEditing}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                                InputProps={{
                                                    style: {
                                                        color: "#fff",
                                                        ...theme.typography.button,
                                                    },
                                                }}
                                                sx={{
                                                    height: '48px',
                                                    "& .MuiOutlinedInput-root": {
                                                        ...theme.typography.button,
                                                        height: '48px',
                                                        "& fieldset": {
                                                            borderColor: isEditing ? "#fff" : "#ccc",
                                                        },
                                                        ...(isEditing && {
                                                            ...theme.typography.button,
                                                            "&:hover fieldset": {
                                                                borderColor: "#ccc",
                                                            },
                                                            "&.Mui-focused fieldset": {
                                                                borderColor: "#B0EEE9",
                                                            },
                                                        }),
                                                    },
                                                    "& .Mui-disabled": {
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#ccc !important",
                                                        },
                                                        "& input": {
                                                            color: "#fff",
                                                            backgroundColor: "transparent",
                                                        },
                                                    },
                                                }}
                                            />


                                        )}

                                    </Box>
                                ))}
                            </Box>
                        </Paper>

                    </Box>
                    <Box sx={{ display: 'flex',flexDirection:{xs:'column',sm:'row'},width:{xs:'72.2vw',sm:'120px'}, justifyContent: {xs:'center',sm:'start'}, mt:'0.2vw',ml:{sm:'5.2vw',xs:'14vw'}, }}>
                        {isEditing && (
                            <Button
                                variant="contained"
                                sx={{ mt: '24px', minWidth: {xs:'72vw',sm:'120px'}, minHeight: '40px', mr: {sm:2}, border: '1px solid #FFFFFF', background: 'transparent' }}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            sx={{ mt: '24px', minWidth: {xs:'72vw',sm:'120px'}, minHeight: '40px', background: '#B50304' }}
                            onClick={() => {
                                if (isEditing) {
                                    handleSubmit();
                                }
                                setIsEditing(!isEditing);
                            }}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                    </Box>
                </Box>
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

                <ChangeEmail open={dialogOpen} onClose={() => setDialogOpen(false)} />
                <ChangePhone open={PhoneDialogOpen} onClose={() => setPhoneDialogOpen(false)} />
                <ImageCropDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} imageSrc={srcPic} onCropComplete={handleCropComplete}/>
            </ThemeProvider>
        );
    };

    export default ProfilePage;
