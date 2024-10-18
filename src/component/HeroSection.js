import { Box, Typography } from '@mui/material'
import React from 'react'

import styles from "./HeroSection.module.css";

const HeroSection = () => {
    return (
        <Box className={styles.hero_section}>
          
          <Typography>How Can I Help You Today?</Typography>
          <Box src={"/Assets/logo.png"} component={"img"} className={styles.logo_img}></Box>
        </Box>
    )
}

export default HeroSection