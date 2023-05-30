import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../socket';

export const Chat = ({ id, message, histo }) => {
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null); // Reference to the chat div

  socket.on('message', (message) => {
    if (message.value !== undefined) {
      if (message.id !== id) {
        setMessages((prevMessages) => [...prevMessages, message.value]);
      }
      socket.off('message');
    }
  });

  useEffect(() => {
    if (message) {
      setMessages((prevMessages) => [...prevMessages, message]);
    } else {
      if (histo.length !== 0 || histo !== '') {
        setMessages([...messages, ...histo]);
      }
    }
  }, [message, histo]);

  useEffect(() => {
    // Scroll to the bottom of the chat div
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    // Scroll to the bottom of the chat div when the page loads
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, []);

//   if (histo === '') {
//     return <div>Chargement...</div>;
//   }

//   if (histo !== '') {
    return (
      <div className="chat" ref={chatRef}>
        <h1>Chat</h1>
        <div>
          {messages.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
// };
