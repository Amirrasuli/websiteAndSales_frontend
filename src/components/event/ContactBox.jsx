import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useAuth } from '../../AuthContext.jsx';
import BG from "../../assets/newsBoxBG.svg";
import SignUpDialog from '../SignUp/LogInDialog.jsx';
const apiUrl = import.meta.env.VITE_API_URL;


const theme = createTheme({
  palette: {
    primary: { main: "#B50304" },
    background: { default: "#fff", paper: "#262626" },
    text: { primary: "#fff", secondary: "#fff" },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
    button: {
      textTransform: "none",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "16px",
      textAlign: "center",
    },
    subtitle2: {
      fontFamily: "Sen",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19.25px",
      textAlign: "center",
      color: "#FFFFFFA6",
    },
    h1: {
      fontFamily: "Lato",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "18px",
      textAlign: "center",
      color: "#FFFFFF",
    },
    body1: {
      fontFamily: "Lato",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16.8px",
      textAlign: "center",
      color: "#FFFFFFA6",
    },
    h2: {
      fontFamily: "Lato",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "24px",
      textAlign: "center",
      color: "#FFFFFF",
    },
    body2: {
      fontFamily: "Lato",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19.2px",
      textAlign: "center",
      color: "#F1F1F1",
    },
  },
});

const ContactBox = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { authToken } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    subject:"event",
    message: "",
    type: 13,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message
    setSuccessMessage(''); // Clear previous success message

    if (authToken) {
        try {
            const response = await fetch(`${apiUrl}/api/v1/contact-req`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    subject: 'event',
                    message: '',
                    type: 13,
                });
                setSuccessMessage('Form submitted successfully!'); // Show success message
            } else {
                setErrorMessage('Error submitting the form. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error submitting the form. Please try again.');
        }
    } else {
        setDialogOpen(true);
    }
};

  const textFieldStyle = {
    backgroundColor: "#EEEEEE",
    color: "#262626",
    borderRadius: "4px",
    border: "1px solid #8C8C8C",
    opacity: 1,
  };
  const textFieldSize = isSmallScreen ? "small" : "normal";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100%",
          justifyItems: "center",
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.01) 40.5%, rgba(0, 0, 0, 0.8) 71%, rgba(0, 0, 0, 0.9) 100%), url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          px: { xs: "20px", sm: "70px", md: "60px", lg: "80px", xl: "100px" },
          pb: { xs: "30px", sm: "40px", md: "80px", lg: "70px" },
          pt: { xs: "30px", sm: "40px", md: "70px" },
        }}
      >
        <Box>
      
      <Typography variant="h2" sx={{ fontSize: {xs:'14px',sm:"24px"}, }}>
            CONTACT US
            </Typography>
            <Typography variant="body2" marginTop="10px" sx={{ fontSize: {xs:'12px',sm:"16px"}, }}>
            Integrate advanced features to improve user experience
            </Typography>
        </Box>
        <Box
          sx={{
            width: {xs:'88.88vw',sm:"368px"},
            borderRadius: "16px",
            background: "#262626",
            mt:{xs:'24px',sm:'48px'},
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              top: 0,
            }}
          >
            <Typography variant="h1" sx={{ mt: 4,fontSize: {xs:'14px',sm:"18px"}, }}>
              Contact us
            </Typography>
            <Typography variant="body1" sx={{ mt: 1,fontSize: {xs:'12px',sm:"14px"}, }}>
              Please fill this form in a decent manner
            </Typography>
          </Box>
          <Box sx={{ padding: "32px 32px 0px 32px" }}>
            <Box sx={{ display: "flex", gap: 1,justifyContent:'center' }}>
              <TextField
                fullWidth
                id="outlined-size-small"
                defaultValue="Small"
                size={textFieldSize}
                name="first_name"
                placeholder="First name"
                variant="outlined"
                value={formData.first_name}
                onChange={handleInputChange}
                InputProps={{ style: { color: "#262626" } }}
                sx={textFieldStyle}
                required
              />
              <TextField
                fullWidth
                id="outlined-size-small"
                defaultValue="Small"
                size={textFieldSize}
                name="last_name"
                placeholder="Last name"
                variant="outlined"
                value={formData.last_name}
                onChange={handleInputChange}
                InputProps={{ style: { color: "#262626" } }}
                sx={textFieldStyle}
                required
              />
            </Box>

            {["email", "phone_number", "message"].map((field) => (
              <Box key={field} sx={{ mt: 1.75 }}>
                <TextField
                  id="outlined-size-small"
                  defaultValue="Small"
                  size={textFieldSize}
                  fullWidth
                  name={field}
                  placeholder={field === "message" ? "Type here..." : `Enter your ${field.replace("_", " ")}`}
                  variant="outlined"
                  value={formData[field]}
                  onChange={handleInputChange}
                  InputProps={{ style: { color: "#262626" } }}
                  sx={textFieldStyle}
                  required
                  multiline={field === "message"}
                  rows={field === "message" ? 4 : 1}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex",paddingX:'32px',alignItems:'center', justifyContent: "center", pb: 4,mt:'24px', flexDirection: 'column' }}>
            <Button
              fullWidth
              onClick={handleSubmit}
              sx={{
                minHeight: "44px",
                color:'#FCFCFC',
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
                borderRadius: "4px",
              }}
            >
              Submit
            </Button>
            {errorMessage && (
                        <Typography color="error" sx={{ mt:1,textAlign: 'center' }}>
                            {errorMessage}
                        </Typography>
                    )}
                    {successMessage && (
                        <Typography color="success" sx={{mt:1,bottom:0, textAlign: 'center'}}>
                            {successMessage}
                        </Typography>
                    )}
            <SignUpDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ContactBox;
