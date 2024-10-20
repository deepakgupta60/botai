import { Box, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Conversation = () => {
  const [conversations, setConversations] = useState([]); // Store all conversations
  const [filteredConversations, setFilteredConversations] = useState([]); // Store filtered conversations
  const [selectedRating, setSelectedRating] = useState('all'); // Rating filter

  // Load conversations from local storage on component mount
  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem('conversation'));
    if (savedConversations && savedConversations.chatHistory) {
      const conversationsWithTime = savedConversations.chatHistory.map((chat) => ({
        ...chat,
        timestamp: new Date(), // Add a timestamp to each conversation (for demo purposes)
        rating: savedConversations.rating, // Assume rating is part of the saved conversation
      }));
      setConversations(conversationsWithTime);
      setFilteredConversations(conversationsWithTime); // Initially display all conversations
    }
  }, []);

  // Handle filtering conversations by rating
  const handleRatingChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRating(selectedValue);

    if (selectedValue === 'all') {
      setFilteredConversations(conversations); // Show all conversations if "all" is selected
    } else {
      const filtered = conversations.filter((chat) => chat.rating === parseInt(selectedValue));
      setFilteredConversations(filtered);
    }
  };

  return (
    <Box sx={{ marginTop: '50px', marginLeft: '20px' }}>
      {/* Dropdown to select rating */}
      <FormControl sx={{ marginBottom: '20px', minWidth: 120 }}>
        <InputLabel id="rating-select-label">Rating</InputLabel>
        <Select
          labelId="rating-select-label"
          id="rating-select"
          value={selectedRating}
          label="Rating"
          onChange={handleRatingChange}
        >
          <MenuItem value="all">All Ratings</MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={5}>5 Stars</MenuItem>
        </Select>
      </FormControl>

      {/* Display all conversations */}
      {filteredConversations.map((chat, index) => (
        <Box key={index} sx={{ marginBottom: '15px' }}>
          <Typography variant="body1" sx={{ fontWeight: chat.sender === 'user' ? 'bold' : 'normal' }}>
            {chat.sender === 'user' ? 'User: ' : 'Bot: '} {chat.message}
          </Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>
            Time: {chat.timestamp.toLocaleString()} {/* Display the timestamp */}
          </Typography>
        </Box>
      ))}

      {/* Display message if no conversations match the filter */}
      {filteredConversations.length === 0 && (
        <Typography variant="body2" color="error">
          No conversations match the selected rating.
        </Typography>
      )}
    </Box>
  );
};

export default Conversation;
