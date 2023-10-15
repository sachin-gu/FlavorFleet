import React, { Component } from 'react';
import axios from 'axios';

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userInput: '',
    };
    this.apiKey = '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'; // Replace with your API key
  }

  handleUserInput = (e) => {
    this.setState({ userInput: e.target.value });
  };

  handleSendMessage = async () => {
    const { userInput, messages } = this.state;

    // Add the user's message to the chat
    this.setState({
      messages: [...messages, { text: userInput, type: 'user' }],
      userInput: '',
    });

    // Call the AI service (GPT-4)
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions', // Replace with the correct GPT-4 endpoint
        {
          prompt: userInput,
          max_tokens: 50, // Adjust the number of tokens as needed
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      // Extract the bot's response
      const botMessage = response.data.choices[0].text;

      // Add the bot's message to the chat
      this.setState({
        messages: [...messages, { text: botMessage, type: 'bot' }],
      });
    } catch (error) {
      console.error('Error calling the AI service:', error);
    }
  };

  render() {
    const { messages, userInput } = this.state;

    return (
      <div className="chatbot-container">
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.type === 'bot' ? 'bot' : 'user'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={userInput}
            onChange={this.handleUserInput}
            placeholder="Type your message..."
          />
          <button onClick={this.handleSendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chatbot;
