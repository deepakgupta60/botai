import { Box } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import HeroSection from './component/HeroSection'

const BotAi = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box
                component="main"
            
            >
                <HeroSection/>

            </Box>
        </Box>
    )
}

export default BotAi