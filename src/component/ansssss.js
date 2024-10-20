import React, { useContext, useState } from 'react';
import { SearchContext } from '../SearchProvider';
import { Avatar, Box, Button, Grid, TextField, Typography, IconButton, Modal } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import StarIcon from '@mui/icons-material/Star';

import data from '.././sampleData.json';

const ShowResult = () => {
    const { searchInputText } = useContext(SearchContext);
    const [localInput, setLocalInput] = useState(() => searchInputText || '');
    const [chatHistory, setChatHistory] = useState([]); // For storing chat history
    const [rating, setRating] = useState(0); // For storing rating
    const [showRating, setShowRating] = useState(false); // Show rating when thumbs-up is clicked
    const [openModal, setOpenModal] = useState(false); // Modal control for feedback
    const [feedback, setFeedback] = useState(''); // For storing feedback

    // Handle search functionality
    const handleSearch = () => {
        const result = data.find(
            (item) => item.question.toLowerCase() === localInput.toLowerCase()
        );

        let chatEntry = {
            sender: 'user',
            message: localInput,
        };

        // Add user's message to chat
        setChatHistory((prevChat) => [...prevChat, chatEntry]);

        // Add bot's response after a small delay
        setTimeout(() => {
            const botResponse = {
                sender: 'bot',
                message: result
                    ? result.response
                    : "Sorry, I couldn't find the answer to that question.",
            };
            setChatHistory((prevChat) => [...prevChat, botResponse]);
        }, 500);

        // Clear the input field
        setLocalInput('');
    };

    // Save the chat to local storage
    const handleSave = () => {
        const conversation = {
            chatHistory,
            rating,
            feedback,
        };
        localStorage.setItem('conversation', JSON.stringify(conversation));
        alert('Chat, rating, and feedback saved to local storage!');
    };

    // Handle thumbs up click
    const handleThumbUp = () => {
        setShowRating(true);
        setOpenModal(false); // Close feedback modal if open
    };

    // Handle thumbs down click
    const handleThumbDown = () => {
        setOpenModal(true);
        setShowRating(false); // Hide rating if open
    };

    // Handle rating selection
    const handleRating = (ratingValue) => {
        setRating(ratingValue);
    };

    // Handle feedback submission
    const handleSubmitFeedback = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Box sx={{ padding: '20px', marginTop: '50px' }}>
                {/* Chat display section */}
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
                    {chatHistory.length > 0 &&
                        chatHistory.map((data, index) => (
                            <Box key={index}>
                                <Typography variant="body1" sx={{ fontWeight: data.sender === 'user' ? 'bold' : 'normal' }}>
                                    {data.message}
                                </Typography>
                                {data.sender === 'bot' && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginTop: '10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <IconButton onClick={handleThumbUp}>
                                            <ThumbUpAltIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={handleThumbDown}>
                                            <ThumbDownAltIcon color="error" />
                                        </IconButton>
                                    </Box>
                                )}

                                {/* Show rating after thumbs up */}
                                {showRating && data.sender === 'bot' && (
                                    <Box sx={{ display: 'flex', marginTop: '10px' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <IconButton key={star} onClick={() => handleRating(star)}>
                                                <StarIcon color={rating >= star ? 'primary' : 'disabled'} />
                                            </IconButton>
                                        ))}
                                    </Box>
                                )}

                                {/* Display feedback below rating */}
                                {feedback && data.sender === 'bot' && (
                                    <Box sx={{ marginTop: '10px', color: 'green' }}>
                                        <Typography variant="body2">Feedback: {feedback}</Typography>
                                    </Box>
                                )}
                            </Box>
                        ))}
                </Box>

                {/* Search input and buttons */}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} lg={8}>
                        <TextField
                            value={localInput}
                            onChange={(e) => setLocalInput(e.target.value)}
                            variant="outlined"
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button
                                onClick={handleSearch}
                                variant="contained"
                                sx={{ width: '50%', marginLeft: '15px', marginRight: '15px' }}
                            >
                                Ask
                            </Button>
                            <Button
                                onClick={handleSave}
                                variant="contained"
                                sx={{ width: '50%', marginLeft: '15px', marginRight: '15px' }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Feedback Modal */}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
                        <Typography variant="h6" gutterBottom>
                            Provide Feedback
                        </Typography>
                        <TextField
                            label="Your Feedback"
                            variant="outlined"
                            fullWidth
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            multiline
                            rows={4}
                        />
                        <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
                            <Button onClick={handleSubmitFeedback} variant="contained" color="primary">
                                Submit Feedback
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </>
    );
};

export default ShowResult;
