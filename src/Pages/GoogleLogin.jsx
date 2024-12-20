import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const GoogleLogin = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            console.log("Code received:", code);
            handleGoogleCallback(code);
        } else {
            console.error("No code found in URL");
            alert("Invalid Google callback");
            setLoading(false);
        }
    }, [searchParams]);

    const handleGoogleCallback = async (code) => {
        // console.log(code)
        const response = await fetch(`${apiUrl}/api/v1/auth/google/callback/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ code }),
        });
        // console.log(response.code)

        if (!response.ok) {
            throw new Error("Failed to exchange code for tokens");
        }

        const data = await response.json();
        localStorage.setItem("authToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        // console.log("access:",data.access_token)
        // console.log("refresh:",data.refresh_token)

        window.location.href = "/";
    };

    return <div>{loading ? "Processing Google Login..." : "Failed to process login. Please try again."}</div>;
};

export default GoogleLogin;
