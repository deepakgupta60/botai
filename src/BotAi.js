import { Box } from '@mui/material'
import React from 'react'
import HeroSection from './component/HeroSection'
import TextCards from './component/TextCards'
import SearchInput from './component/SearchInput'

const BotAi = () => {
    return (
        <Box sx={{display:"flex", justifyContent:"space-between", flexDirection:"column", width:"100%", height:"100%", margin:"20px", padding:"20px"}}>
            <HeroSection />
            <TextCards/>
            <SearchInput/>
        </Box>

    )
}

export default BotAi