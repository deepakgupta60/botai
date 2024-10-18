import { Box, Button, Grid2, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../SearchProvider'


const SearchInput = () => {
    const { setSearchInputText } = useContext(SearchContext);
    const [localInput, setLocalInput] = useState('');

    // setSearchInputText("Web Testing")
    // console.log("Search Input from the context", searchInputText)

    const navigate = useNavigate();
    const handleSearch = () => {
        navigate("/searchresult")
        // console.log(localInput)
        setLocalInput(localInput)
    }


    return (
        <>
            <Box sx={{ padding: "20px" }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, md: 8, lg: 8 }} >
                        <TextField value={localInput} onChange={(e) => setLocalInput(e.target.value)} variant='outlined' sx={{ width: "100%" }} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                            <Button onClick={handleSearch} variant='contained' sx={{ width: "50%", marginLeft: "15px", marginRight: "15px" }}>Ask</Button>
                            <Button variant='contained' sx={{ width: "50%", marginLeft: "15px", marginRight: "15px" }}>Save</Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    )
}

export default SearchInput