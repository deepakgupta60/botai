import { Box, Button, Grid2, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { SearchContext } from '../SearchProvider'
import StarIcon from "@mui/icons-material/Star";
import data from ".././sampleData.json";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt"



const ShowResult = () => {
  const { searchInputText } = useContext(SearchContext) // fetching from context
  const [localInput, setLocalInput] = useState(() => searchInputText || '') // local input question
  const [chatHistory, setChatHistory] = useState([]); // for storing chat history
  const [rating, setRating] = useState(0) // for storing rating 
  const [showRating, setShowRating] = useState(false) // for show rating when click thumb up
  const [openModel, setOpneModel] = useState(false) // open a feedback model when click on thumb down
  const [feedback, setFeedback] = useState(''); // storing feedback


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

    const conversation = {
      chatHistory,
      rating,
      feedback
    }
    localStorage.setItem('conversation', JSON.stringify(conversation))
    alert("Successfully Saved");
  }




  const handleThumbUp = () => {
    setShowRating(true)
    setOpneModel(false)

  }


  const handleThumbDown = () => {

    setOpneModel(true)
    setShowRating(false)

  }

  const handleRating = (ratingValue) => {
    setRating(ratingValue)
  }


  const handleSubmitFeedback = () => {
    setOpneModel(false)
  }

  return (
    <Box sx={{ padding: '20px', marginTop: '50px' }}>

      {/* Chat showing section */}
      <Box

        sx={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '10px',
          height: '300px',
          overflowY: 'scroll',
          marginBottom: '20px',
        }}
      >
        {chatHistory.length > 0 && chatHistory.map((data, idx) => (
          <Box key={idx}>
            <Typography variant="body1" sx={{ fontWeight: data.sender === 'user' ? 'bold' : 'normal' }}>
              {data.message}
            </Typography>


            {
              data.sender === "bot" && (

                <Box


                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '10px',
                    cursor: 'pointer',
                  }}

                >
                  <IconButton onClick={handleThumbUp}>
                    <ThumbUpAltIcon color="primary" Rating />
                  </IconButton>
                  <IconButton onClick={handleThumbDown}>
                    <ThumbDownAltIcon color='error' />
                  </IconButton>
                </Box>
              )
            }

            {showRating && data.sender === "bot" && (
              <Box sx={{ display: 'flex', marginTop: "10px" }}>
                {

                  <Box sx={{ display: "flex", marginTop: "10px" }}>

                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconButton key={star} onClick={() => handleRating(star)}>
                        <StarIcon color={rating >= star ? 'primary' : 'disabled'} />
                      </IconButton>
                    ))}

                  </Box>

                }
              </Box>
            )}

            {feedback && data.sender === "bot" && (
              <Box sx={{ marginTop: "10px", color: "green" }}>
                <Typography variant='body2'>
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
              <Button onClick={handleSearch}

                variant='contained'
                sx={{ width: "50%", marginLeft: "15px", marginRight: "15px" }}
              >
                Ask
              </Button>
              <Button onClick={handleSave}

                variant='contained'
                sx={{ width: "50%", marginLeft: "15px", marginRight: "15px" }}
              >
                Save
              </Button>
            </Box>
          </Grid2>


        </Grid2>



        <Modal open={openModel} onClose={() => setOpneModel(false)}>
          <Box
          
          
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
        }}

          >
            <Typography variant='h6' gutterBottom>
              Provide Feedback
            </Typography>

            <TextField 
            value={feedback}
            label="Your Feedback"
            variant='outlined'
            fullWidth
            multiline
            rows={4}
            onChange={(e) => setFeedback(e.target.value)}
             />

            <Box 
            
            sx={{marginTop:"20px", textAlign:"right"}}
            >

              <Button onClick={handleSubmitFeedback} variant='contained' color="primary">

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