import { createTheme, Theme } from '@mui/material/styles'

const themeTypography = {
  h1_gradient: {
    fontWeight: 700,
    fontSize: '5.0vw',
    lineHeight: '5.0vw',
    textTransform: 'uppercase',
    display: 'inline-block',
    backgroundImage:
      'linear-gradient(135deg, #D0D0D0 0%, #616AAA 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontFamily: 'Kanit, sans-serif',
  },
  h1_gradient_mobile: {
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '36px',
    textTransform: 'uppercase',
    display: 'inline-block',
    backgroundImage:
      'linear-gradient(135deg, #D0D0D0 0%, #616AAA 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontFamily: 'Kanit, sans-serif',
  },
  h4: {
    fontWeight: 400,
    fontSize: '24px',
    fontFamily: 'Kanit, sans-serif',
  },
  h5: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#D0D0D0',
    fontFamily: 'Kanit, sans-serif',
  },
  h5_mobile: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#D0D0D0',
    fontFamily: 'Kanit, sans-serif',
  },
  h6: {
    fontWeight: 300,
    fontSize: '14px',
    color: '#D0D0D0',
    fontFamily: 'Kanit, sans-serif',
  },
  caption: {
    fontWeight: 300,
    fontSize: '12px',
    color: '#B1B3B9',
    fontFamily: 'Kanit, sans-serif',
  },
}

const darkTheme: Theme = createTheme({
  // @ts-ignore
  typography: {
    ...themeTypography,
  },
  palette: {
    mode: 'dark',
  },
})

export default darkTheme
