import React, { useState, useCallback } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar, Alert, Box, Slider } from "@mui/material";
import Cropper from "react-easy-crop";
import Compressor from "compressorjs";

const ImageCropDialog = ({ open, onClose, imageSrc, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1.3);
    const [croppedArea, setCroppedArea] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const handleCropComplete = useCallback((_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels), []);

    const getCroppedImg = (src, area) => new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.crossOrigin = "anonymous";
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = 500;
            canvas.height = 500;

            ctx.drawImage(
                image,
                area.x,
                area.y,
                area.width,
                area.height,
                0,
                0,
                500,
                500
            );

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const random = Date.now();
                        const file = new File([blob], `UserPic-${random}.png`, { type: "image/png" });
                        resolve(file);
                    } else {
                        reject(new Error("Failed to create a PNG file"));
                    }
                },
                "image/png",
                1
            );
        };
        image.onerror = () => reject(new Error("Failed to load image"));
    });

    const compressImage = (imageFile) => new Promise((resolve, reject) => {
        new Compressor(imageFile, { quality: 0.8, maxWidth: 500, maxHeight: 500, success: resolve, error: reject });
    });

    const handleSave = async () => {
        if (!croppedArea) {
            setSnackbarMessage("Please select an area to crop.");
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }

        try {
            const croppedFile = await getCroppedImg(imageSrc, croppedArea);
            const compressedFile = await compressImage(croppedFile);
            onCropComplete(compressedFile);
            setSnackbarMessage("Uploading the file, please wait...");
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            onClose();
        } catch (e) {
            setSnackbarMessage("Error processing the image.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
                    PaperProps={{
                        style: {
                            borderRadius: '15px',
                            backgroundColor: '#262626',
                            color: '#FFFFFF',
                            maxWidth: '458px',
                            overflow: 'hidden',
                            maxHeight: '692px',
                            boxSizing: 'border-box',
                            position: 'relative',
                        },
                    }}
            >
                <DialogTitle>Crop Picture</DialogTitle>
                <DialogContent
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "100%",
                        height: "450px",
                        position: 'relative',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            background: "rgba(0, 0, 0, 0.4)",
                            borderRadius: "5%",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            cropShape="round"
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "5%",
                                border: "2px solid #fff",
                                pointerEvents: "none",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 0,
                            mt: 1,
                            width: '100%',
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}
                    >
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(e, newValue) => setZoom(newValue)}
                            sx={{
                                width: { xs: '90%', sm: '80%' },
                                ml: 1,
                                mr: 2,
                                color: '#8C8C8C',
                            }}
                        />
                        <Button onClick={onClose} variant="contained"
                                sx={{ minWidth: { xs: '93%', sm: '80px' }, minHeight: '40px', mr: { xs: '0', sm: '10px' }, border: '1px solid #FFFFFF', background: 'transparent' }}
                        >Cancel</Button>
                        <Button onClick={handleSave} variant="contained"
                                sx={{ minWidth: { xs: '93.3%', sm: '80px' }, minHeight: '40px', background: '#B50304', mt: { xs: '10px', sm: '0px' } }}>Save</Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ImageCropDialog;
