import { Box, FormControl, InputLabel, MenuItem, Rating, Select, Typography } from '@mui/material';
import React, { useState } from 'react'



const Conversation = () => {

  const [conversation, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([])
  const [selectedRating, setSelectedRating] = useState('all')

  useState(() => {

    const savedConversations = JSON.parse(localStorage.getItem('conversation'))

    console.log(savedConversations,"data")
    if (savedConversations && savedConversations.chatHistory) {
      const conversationWithTime = savedConversations.chatHistory.map((chat) => ({
        ...chat,
        time: savedConversations.currTime,
        rating: savedConversations.rating,
        feedback: savedConversations.feedback
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
          <Select
          
          
          value={selectedRating}
          onChange={handleRatingChange}
          >
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
            <Box key={index} sx={{marginBottom:"15px"}} >
                <Typography component={"p"}>
                  {chat.sender==="user"? "User: ":"Bot: "} {chat.message}
                </Typography>
                <Typography component={"p"} variant='caption' sx={{color:"#888"}}>
              Time: {new Date(chat.time).toLocaleString() }
                </Typography> 
                <Typography component={"p"} variant='caption' sx={{color:"#888"}}>
              Feedback: {chat.feedback}
                </Typography>

                <Typography component={"p"} variant='caption' sx={{color:"#888"}}>
              Rating:
                </Typography>
                <Rating value={chat.rating}/>
              </Box>
          ))
        }

        {
          filteredConversations.length ===0 && (
            <Typography>
              No Selected Rating
            </Typography>
          )
        }
      </Box>
    </>
  )
}

export default Conversation