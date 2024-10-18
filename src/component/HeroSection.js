import { Box, Typography } from '@mui/material'
import React from 'react'

import styles from "./HeroSection.css";

const HeroSection = () => {
  return (
    <>
    
        <Box sx={{display:"flex", justifyContent:"center", alignContent:"center", marginTop:"50px", width:"100%", height:"100%", position:"relative"}}>
            <Box src={"/Assets/logo.png"} component={"img"} sx={{width:"50px", height:"50px"}}>

            </Box>
            <Typography className={styles.para_color}>hello</Typography>
        </Box>        
    </>
  )
}

export default HeroSection