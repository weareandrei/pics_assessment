import React, { CSSProperties } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface HomeProps {
  isMobile: boolean
}

const Home = ({ isMobile }: HomeProps) => {
  const style: { [key: string]: CSSProperties } = {
    mainContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    topSection: {
      padding: '24px',
      paddingBottom: '100px'
    }
  }

  return (
    <Box style={style.mainContainer}>
      <div style={style.topSection}>
      {isMobile ? (
        // @ts-ignore
        <Typography variant={'h1_gradient_mobile'}>
          This can be used as a Home page
        </Typography>
        ) : (
        // @ts-ignore
        <Typography variant={'h1_gradient'}>
          This can be used as a Home page
        </Typography>
      )}
      </div>
    </Box>
  )
}

export default Home
