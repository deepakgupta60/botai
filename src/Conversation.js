import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'



const Conversation = () => {

  const [conversation, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([])
  const [selectedRating, setSelectedRating] = useState('all')

  useState(() => {

    const savedConversations = JSON.parse(localStorage.getItem('conversation'))
    // console.log(savedConversations.chatHistory,"data")

    if (savedConversations && savedConversations.chatHistory) {
      const conversationWithTime = savedConversations.chatHistory.map((chat) => ({
        ...chat,
        timestamp: new Date(),
        rating: savedConversations.rating
      }))

      setConversations(conversationWithTime)
      setFilteredConversations(conversationWithTime)
    }

  }, [])


  const handleRatingChange = (e) => {
    const selectedValue = e.target.value;

    setSelectedRating(selectedValue)
    if (selectedValue === "all") {
      setFilteredConversations(conversation)
    }
    else {
      const filtered = conversation.filter((chat) => chat.rating === parseInt(selectedValue))
      setFilteredConversations(filtered)
    }
  }

  return (
    <>
      <Box sx={{ marginTop: "50px", marginLeft: "20px" }}>
        <FormControl sx={{ marginBottom: "20px", minWidth: 120 }}>
          <InputLabel id="rating-select-label">Rating</InputLabel>
          <Select>
            <MenuItem value="all"> All Ratings </MenuItem>
            <MenuItem value={1}> 1 Star </MenuItem>
            <MenuItem value={2}> 2 Star </MenuItem>
            <MenuItem value={3}> 3 Star </MenuItem>
            <MenuItem value={4}> 4 Star </MenuItem>
            <MenuItem value={5}> 5 Star </MenuItem>

          </Select>
        </FormControl>

        {
          filteredConversations.map((chat, index)=>(
            <Box>
              
              </Box>
          ))
        }
      </Box>
    </>
  )
}

export default Conversation