import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAuth } from "../../AuthContext.jsx";
const apiUrl = import.meta.env.VITE_API_URL;

const FeaturesContent = () => {
  const { authToken } = useAuth();
  const Token = localStorage.getItem('authToken') || authToken;
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState(["Geo tracking"]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setFeatures([
      "Select all",
      "Geo tracking",
      "Remote patient monitoring",
      "Staff management",
      "Electronic document management",
      "Feedback",
      "Adverse event reporting",
      "Video consultation",
      "Site management",
    ]);
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
    } catch (error) {
      console.error('Error purchase:', error);
    }
  };

  return (
    <Box sx={{ padding: 1.5, backgroundColor: '#262626' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <IconButton aria-label="close" sx={{ color: '#FFFFFF' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box>
        <Box component="span" sx={{ typography: 'h6' }}>
          Features
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
                    feature === "Select all"
                      ? selectedFeatures.length === features.length - 1
                      : selectedFeatures.includes(feature)
                  }
                  onChange={() =>
                    feature === "Select all" ? handleSelectAll() : handleFeatureToggle(feature)
                  }
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-checked': {
                      color: '#B50304',
                    },
                  }}
                />
              }
              label={feature}
              sx={{
                marginBottom: 0,
                '& .MuiFormControlLabel-label': {
                  typography: 'featureText',
                },
              }}
            />
            {index < features.length - 1 && (
              <hr style={{ borderColor: '#FFFFFF26', margin: '4px 0' }} />
            )}
          </React.Fragment>
        ))}

      </Box>

      <Button 
        onClick={handleSubmit} 
        variant="contained" 
        color="primary"
        sx={{
          width: '90%',
          minHeight: '50.82px',
          textTransform: 'none',
          gap: '8px',
          mt: 2,
        }}
      >
        Submit
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeaturesContent;
