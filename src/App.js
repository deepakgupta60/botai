import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BotAi from './BotAi'
import Conversation from './Conversation'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BotAi />} />
          <Route path='/conversation' element={<Conversation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App