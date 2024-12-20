import React from "react";
import {Box, Button} from "@mui/material";
import google from '../../assets/Google.png';
const apiUrl = import.meta.env.VITE_API_URL;

const GoogleSignInButton = () => {
  const googleClientId =
    "1037115696115-5cvfcpvi40n6fhk2hepv8450vn712qud.apps.googleusercontent.com";
  const redirectUri = `${apiUrl}/google/callback`;

  const handleSignIn = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&access_type=offline`;

    window.location.href = authUrl;
  };

  return (

    <button
      onClick={handleSignIn}
      style={{
        padding: "10px 20px",
        border: "1px solid #FCFCFC", // Fixed `borderColor`
        borderRadius:'4px',
        background: "transparent",
        maxWidth: "380px",
        width: "100%",
        height: "44px",
        textTransform: "none",
        color:'#FFFFFF',
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "14px",
        display: "flex", // Added flexbox for alignment
        alignItems: "center",
        justifyContent: "center",
        gap: "10px", // Space between logo and text
        cursor: "pointer",
      }}
      aria-label="Sign in with Google"
    >
      <img
        src={google}
        alt="Google Logo"
        style={{
          width: "24px",
          height: "24px",
          display: "block", // Ensures proper rendering
        }}
      />
      Log in with Google
    </button>
  );
};

export default GoogleSignInButton;
