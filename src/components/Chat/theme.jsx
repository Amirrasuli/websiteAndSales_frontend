import { createTheme, ThemeProvider } from '@mui/material/styles';

// تعریف تم سفارشی
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        h1: {
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
        },
        button: {
            textTransform: 'none',
        },
    },
});

export default theme;
