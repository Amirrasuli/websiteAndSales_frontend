import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  IconButton,
  Box,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAuth } from '../../AuthContext.jsx';
const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
  typography: {
    h6: {
      fontFamily: 'Lato',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '20px',
    },
    body1: {
      fontFamily: 'Lato',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '14px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    featureText: {
      fontFamily: 'Lato',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '19.2px',
      color: '#FFFFFF',
    },
  },
  palette: {
    primary: {
      main: '#B50304',
    },
    background: {
      paper: '#262626',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      divider: '#FFFFFF26',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '15px',
          overflow: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: '#B50304',
        },
        containedPrimary: {
          backgroundColor: '#B50304',
          '&:hover': {
            backgroundColor: '#8f0203',
          },
        },
      },
    },
  },
});

const FeaturesDialog = () => {
  const { authToken } = useAuth();
  const Token = localStorage.getItem('authToken') || authToken;
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState(["Geo tracking"]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setFeatures([
      "Select all",
      "ECG",
      "Emergency call",
      "Geo tracking",
      "Video consultation",
      "Adverse event reporting",
      "e-Consent",
      "Vital signs",
      "Electronic data management",
    ]);
  }, []);

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prev) =>
        prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleSelectAll = () => {
    setSelectedFeatures(
        selectedFeatures.length === features.length - 1 ? [] : features.slice(1)
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    const payload = {
      geo_tracking: selectedFeatures.includes("Geo tracking"),
      remote_patient_monitoring: selectedFeatures.includes("Remote patient monitoring"),
      staff_management: selectedFeatures.includes("Staff management"),
      electronic_document_management: selectedFeatures.includes("Electronic document management"),
      feedback: selectedFeatures.includes("Feedback"),
      adverse_event_reporting: selectedFeatures.includes("Adverse event reporting"),
      video_consultation: selectedFeatures.includes("Video consultation"),
      site_management: selectedFeatures.includes("Site management"),
    };

    try {
      await axios.post(`${apiUrl}/api/v1/feature-req`, payload, {
        headers: {
          'Authorization': `Bearer ${Token}`
        }
      });
      setSnackbarMessage('Your purchase request has been successfully submitted.');
      setSnackbarOpen(true);
      setOpen(false);
    } catch (error) {
      console.error('Error purchase:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
        }}
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        Buy
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent
          dividers
          sx={{
            width: { sm: '410px', md: '420px', lg: '440px', xl: '460px' },
            height: { sm: '600px', md: '600px', lg: '600px', xl: '620px' },
            backgroundColor: theme.palette.background.paper,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{ color: '#FFFFFF' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ typography: 'body1', marginBottom: 2, marginTop: 2 }}>
            Select the features you want
          </Box>
          
          {features.map((feature, index) => (
            <React.Fragment key={feature}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      feature === 'Select all'
                        ? selectedFeatures.length === features.length - 1
                        : selectedFeatures.includes(feature)
                    }
                    onChange={() =>
                      feature === 'Select all' ? handleSelectAll() : handleFeatureToggle(feature)
                    }
                    sx={{
                      color: theme.palette.text.secondary,
                      '&.Mui-checked': { color: theme.palette.primary.main },
                      '&:hover': { backgroundColor: 'transparent' },
                    }}
                  />
                }
                label={feature}
                sx={{
                  display: 'flex',
                  marginBottom: 0,
                  '& .MuiFormControlLabel-label': { typography: 'featureText' },
                }}
              />
              {index < features.length - 1 && (
                <hr style={{ borderColor: theme.palette.text.divider, margin: '4px 0' }} />
              )}
            </React.Fragment>
          ))}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              width: '90%',
              minHeight: '50.82px',
              textTransform: 'none',
              gap: '8px',
              mb: 4,
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default FeaturesDialog;
