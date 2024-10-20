import { Box, Button, Grid2, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { SearchContext } from '../SearchProvider'
import StarIcon from "@mui/icons-material/Star";
import data from ".././sampleData.json";



const ShowResult = () => {
  const { searchInputText } = useContext(SearchContext) // fetching from context
  const [localInput, setLocalInput] = useState(() => searchInputText || '') // local input question
  const [chatHistory, setChatHistory] = useState([]); // for storing chat history
  const [rating, setRating] = useState(0) // for storing rating 
  const [showRating, setShowRating] = useState(false) // for show rating when click thumb up
  const [openModel, setOpneModel] = useState(false) // open a feedback model when click on thumb down
  const [feedback, setFeedback] = useState(''); // storing feedback





  const handleThumbUp = () => {

  }


  const handleThumbDown = () => {

  }

  const handleRating = (ratingValue) => {
    setRating(ratingValue)
  }



  const handleSearch = () => {

    const result = data.find((item) => item.question.toLowerCase() === localInput.toLowerCase());

    let chatEntry = {
      sender: 'user',
      message: localInput
    }

    setChatHistory((prevChat) => [...prevChat, chatEntry]);

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        message: result ? result.response : "Sorry, I couldn't find the answer to that question"
      }

      setChatHistory((prevChat) => [...prevChat, botResponse])
    }, 500)

    setLocalInput('');

  }

  const handleSave = () => {

  }


  const handleSubmitFeedback = () => {
    setOpneModel(false)
  }

  return (
    <Box sx={{ marginTop: "100px" }}>

      {/* Chat showing section */}
      <Box>
        {chatHistory.length > 0 && chatHistory.map((data, idx) => (
          <Box key={idx}>
            <Typography sx={{ fontWeight: data.sender === "user" ? 'bold' : 'nornal' }}>
              {data.message}
            </Typography>


            {
              data.sender === "bot" && (

                <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px", cursor: "pointer" }}>
                  <Button onClick={handleThumbUp}>
                    Rating
                  </Button>
                  <Button onClick={handleThumbDown}>
                    Feedbakc
                  </Button>
                </Box>
              )
            }

            {showRating && data.sender === "bot" && (
              <Box sx={{ display: 'flex', marginTop: "10px" }}>
                {
                  [1, 2, 3, 4, 5].map((star) => (
                    <IconButton key={star} onClick={() => handleRating(star)}>
                      <StarIcon color={rating >= star ? 'primary' : 'disabled'} />
                    </IconButton>
                  ))
                }
              </Box>
            )}

            {feedback && data.sender === "bot" && (
              <Box sx={{ marginTop: "10px", color: "green" }}>
                <Typography>
                  Feedback: {feedback}
                </Typography>
              </Box>
            )}
          </Box>
        ))}

      </Box>


      {/* search button */}

      <Box>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 8, lg: 8 }}>
            <TextField value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              variant='outlined'
              sx={{ width: "100%" }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button onClick={handleSearch}>
                Ask
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Grid2>


        </Grid2>



        <Modal open={openModel} onClose={() => setOpneModel(false)}>
          <Box>
            <Typography>
              Provide Feedback
            </Typography>
            <TextField value={feedback} />
            onChange={(e) => setFeedback(e.target.value)}

            <Box>

              <Button onClick={handleSubmitFeedback}>

                Submit Feedback

              </Button>

            </Box>
          </Box>
        </Modal>
      </Box>




    </Box>
  )
}

export default ShowResult