import { Box, Typography } from '@mui/material'
import React from 'react'
import BG from '../assets/CertificationsBG.svg'
import isocertification1 from '../assets/isocertification1.svg'
import isocertification2 from '../assets/isocertification2.svg'
import isocertification3 from '../assets/isocertification3.svg'
import isocertification4 from '../assets/isocertification4.svg'
import isocertification5 from '../assets/isocertification5.svg'
import isocertification6 from '../assets/isocertification6.svg'
import isocertification7 from '../assets/isocertification7.svg'
import isocertification8 from '../assets/isocertification8.svg'


const typoStyle = {
    fontFamily: 'Lato',
    fontSize: { xs: '12px', sm: '15px', md: '18px', lg: '24px' },
    color: '#fff',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '100%',
    textTransform: 'none'
}

const typoStyle2 = {
    fontFamily: 'Lato',
    fontSize: { xs: '10px', sm: '13px', md: '18px', lg: '20px' },
    color: '#B4D5EB',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '100%',
    textTransform: 'none'
}
const typoStyle3 = {
    fontFamily: 'Lato',
    fontSize: { xs: '14px', sm: '15px', md: '20px', lg: '24px' },
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '100%',
    textTransform: 'none'
}
const typoStyle4 = {
    fontFamily: 'Lato',
    fontSize: { xs: '12px', sm: '15px', md: '18px', lg: '20px' },
    color: '#F1F1F1',
    fontWeight: 400,
    lineHeight: {xs:'14.4px',sm:'100%'},
    textTransform: 'none'
}
const Certifications = () => {
    const certifications = [
        {
            id: 1,
            title: 'ISO 27001',
            desc: 'ISMS certification',
            src: isocertification1
        },
        {
            id: 2,
            title: 'ISO 13485',
            desc: 'QMS certification',
            src: isocertification2
        },
        {
            id: 3,
            title: 'ISO 14971',
            desc: 'Risk management',
            src: isocertification3
        },
        {
            id: 4,
            title: 'ISO 10993',
            desc: 'Bio compatibility evidence',
            src: isocertification4
        },
        {
            id: 5,
            title: 'ISO 13485',
            desc: 'Transport validation',
            src: isocertification5
        },
        {
            id: 6,
            title: 'ISO 80601-2-56',
            desc: 'Skin temp parameter accuracy',
            src: isocertification6
        },
        {
            id: 7,
            title: 'ISO 80601-2-61',
            desc: 'PPG parameter accuracy',
            src: isocertification7
        },
        {
            id: 8,
            title: 'IEC 60601-2-27',
            desc: 'ECG parameter accuracy',
            src: isocertification8
        },
        {
            id: 9,
            title: 'IEC 60601 / IEC 60601-1-2',
            desc: 'Watch safety and EMC validation',
            src: isocertification8
        },
    ]//Certifications card
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top right',
                backgroundRepeat: 'no-repeat',
                pt: { xs: '24px', sm: '36px', md: '48px', lg: '56px' },
                pb: { xs: '80px', sm: '90px', md: '100px', lg: '112px' },
                boxSizing: 'border-box'
            }}
        >
            <Typography
                sx={{
                    ...typoStyle3,
                    textAlign: 'center'
                }}
            >
                OUR CERTIFICATIONS
            </Typography>
            <Typography
                sx={{
                    ...typoStyle4,
                    textAlign: 'center',
                    mt: '8px',
                    px:4,

                }}
            >
                At the moment, we are undergoing the following certifications:
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        mt: {xs:'24px',sm:'56px'},
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                        justifyItems: 'center',
                        alignItems: 'center',
                        rowGap: '32px', // Keeping the original row gap
                        gridTemplateRows: 'auto',
                        width: {xs:'90%',sm:'72.68%'},
                        maxWidth: '100%'
                    }}
                    
                >
                    {
                        certifications.map((item, index) => {
                            return (

                                <Card
                                    key={index}
                                    title={item.title}
                                    desc={item.desc}
                                    src={item.src}
                                />
                            )
                        })
                    }
                </Box>
            </Box>
        </Box >
    )
}


const Card = ({ src, title, desc }) => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.30) 0%, rgba(31, 31, 31, 0.30) 100%)',
                boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.32)',
                borderRadius: '16px',
                py: { xs: '16px', sm: '26px', md: '28px', lg: '32px' },
                px: { xs: '10px', sm: '18px', md: '20px', lg: '24px' },
                width: { xs:'142px',sm: '247px' },
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                boxSizing: 'border-box',


            }}
        >
            <Box sx={{ width: {xs:'85px',sm:'140px'}, height: {xs:'85px',sm:'140px'} }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>

            <Typography
                sx={{
                    ...typoStyle,
                    fontWeight: 'bolder',
                    fontSize: { xs: '14.22px', sm: '16px', md: '18px', lg: '20px' },
                    mt: {xs:'16px',sm:'24px'},
                    textAlign:'center',
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    ...typoStyle2,
                    fontWeight: 'normal',
                    fontSize: { xs: '10px', sm: '12px', md: '12.64px', lg: '14px' },
                    mt: '8px',
                    textAlign:'center',

                }}
            >
                {desc}
            </Typography>
        </Box>
    )
}
export default Certifications