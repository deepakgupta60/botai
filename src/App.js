import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BotAi from './BotAi'
import Conversation from './Conversation'
import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import ShowResult from './component/ShowResult'


const App = () => {
  return (
    <>

      <Box sx={{ display: "flex", }} >
        <Sidebar/>
        <Routes>
          <Route path='/' element={<BotAi />} />
          <Route path='/searchresult' element={<ShowResult />} />
          <Route path='/conversation' element={<Conversation />} />
        </Routes>
      </Box>
    </>
  )
}

export default App