import { GlobalStyles } from '@mui/material';

const GlobalStyle = () => {
    return (
        <GlobalStyles
            styles={{
                'html, body': {
                    height: '100%',
                    msOverflowStyle: 'none',
                    margin: 0,
                    padding: 0,
                },
                'body::-webkit-scrollbar': {
                    display: 'none',
                },
                '#root': {
                    height: '100%',
                    maxWidth:'2000px'
                },
            }}
        />
    );
};

export default GlobalStyle;
