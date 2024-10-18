import './App.css';
import { useState } from 'react';
import data from './sampleData.json'; // Assuming this is your request-response data

function App() {
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState([]); // User questions
  const [responseData, setResponseData] = useState([]); // Bot responses
  const [feedback, setFeedback] = useState(""); // Feedback textarea
  const [showFeedbackModal, setShowFeedbackModal] = useState(false); // To show/hide modal
  const [feedbackIdx, setFeedbackIdx] = useState(null); // Index to track feedback response
  const [ratingIdx, setRatingIdx] = useState(null); // Index for 5-star rating
  const [rating, setRating] = useState(0); // Star rating

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleResponse = () => {
    // Display user input
    setShowInput((prevData) => [...prevData, userInput]);

    // Find the bot response
    const response = data.find(
      (res) => res.question.toLowerCase() === userInput.toLowerCase()
    );

    if (response) {
      // Append the new response
      setResponseData((prev) => [...prev, response.response]);
    } else {
      // Default response if no match is found
      setResponseData((prev) => [...prev, "Sorry, I don't understand that."]);
    }

    // Reset input
    setUserInput("");
  };

  const handleSave = () => {
    const conversation = showInput.map((input, idx) => ({
      input,
      response: responseData[idx],
    }));

    // Save conversation to localStorage with the current date
    const savedConversations = JSON.parse(localStorage.getItem('conversations')) || [];
    const newConversation = {
      conversation,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem('conversations', JSON.stringify([...savedConversations, newConversation]));
    alert("Conversation saved!");
  };

  const handleThumbDown = (idx) => {
    setFeedbackIdx(idx); // Track which response to leave feedback for
    setShowFeedbackModal(true); // Show the feedback modal
  };

  const handleThumbUp = (idx) => {
    setRatingIdx(idx); // Track which response to leave a rating for
  };

  const handleSaveFeedback = () => {
    setShowFeedbackModal(false); // Hide the feedback modal
    setFeedback(""); // Reset feedback textarea
  };

  const handleRating = (rate) => {
    setRating(rate); // Set the selected rating
    setRatingIdx(null); // Hide the rating section after selection
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={userInput}
          onChange={handleInput}
          placeholder="Enter request"
        />
        <button onClick={handleResponse}>Ask</button>
        <button onClick={handleSave}>Save Conversation</button>

        <h3>Chat Conversation</h3>

        <div>
          {showInput.map((input, idx) => (
            <div key={idx}>
              <p><strong>User:</strong> {input}</p>
              <p
                onMouseEnter={() => setRatingIdx(null)} // To hide stars on other responses
              >
                <strong>Bot:</strong> {responseData[idx]}
                <span
                  onMouseEnter={() => setRatingIdx(idx)} // Show thumbs on hover
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                >
                  👍 👎
                </span>
              </p>

              {/* Show thumbs down feedback modal */}
              {ratingIdx === idx && (
                <div style={{ marginTop: '5px' }}>
                  <button onClick={() => handleThumbUp(idx)}>Thumbs Up</button>
                  <button onClick={() => handleThumbDown(idx)}>Thumbs Down</button>
                </div>
              )}

              {/* Show feedback modal */}
              {showFeedbackModal && feedbackIdx === idx && (
                <div className="modal">
                  <textarea
                    placeholder="Leave your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <button onClick={handleSaveFeedback}>Save Feedback</button>
                </div>
              )}

              {/* Show 5-star rating */}
              {ratingIdx === idx && (
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(star)}
                      style={{
                        cursor: 'pointer',
                        color: star <= rating ? 'gold' : 'gray',
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
