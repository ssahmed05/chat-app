import React, { useEffect, useState } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';

function App() {

  type Message = {
    sender: string
    text: string
  }

  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<object[]>([]);
  const [currentMessage, setCurrentMessage] = useState<Message>();
  const [name, setName] = useState('');

  const send = (message: string | object) => {
    socket?.emit('message', message);
    setCurrentMessage({
      sender: name,
      text: ''
    });
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage({
      sender: name,
      text: event.target.value
    });
  };

  const handleSendMessage = () => {
    if (currentMessage) {
      setMessages([...messages, currentMessage]);
      send(currentMessage);
    }
  };

  useEffect(() => {

    if (!name) {
      const userName = prompt('Enter your name: ');
      if (userName) {
        setName(userName)
      }
    }
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);
    newSocket.on('message', (message: object) => {
      setMessages([...messages, message]);
    });
  }, [messages, name]);

  return (
    <div className="App">
      <h1>Chat Frontend</h1>

      <div className="chat-container">
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message.sender}: {message.text}
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={currentMessage?.text}
            onChange={handleMessageChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
