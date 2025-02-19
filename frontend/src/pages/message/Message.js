import { useEffect, useState, useRef } from "react";
import "./message.css";

const Message = ({ socket, user_id }) => {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(""); // Input for new message
  const [recipient, setRecipient] = useState(""); // "To" field
  const messagesEndRef = useRef(null); // Ref for auto-scroll

  // Register user on connection
  useEffect(() => {
    if (!socket) return;
    socket.emit("register", user_id); // Register user on backend
  }, [socket, user_id]);

  // Listen for incoming messages from the server
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (message) => {
      console.log("New message received:", message);

      if (!message || typeof message !== "object") {
        console.error("Invalid message format:", message);
        return;
      }

      setMessages((prev) => [...prev, message]); // ✅ Append new message properly
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  // Send a message to the server
  const sendMessage = () => {
    if (!newMessage.trim() || !recipient) return;

    const messageData = {
      sender: user_id, // Sender ID
      recipient, // Receiver ID (admin or user)
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", messageData); // Send message to server
    setMessages((prev) => [...prev, messageData]); // Show message in UI
    setNewMessage(""); // Clear input field
  };

  return (
    <>
      <div className="chat-container">
        <h4 className="greeter">Chat with Admin 😊</h4>
        <hr className="horizental" />

        {/* Chat Messages */}
        <div className="chat-box">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === user_id ? "user" : "admin"}`}
            >
              <p>{msg.content}</p>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Enter recipient ID"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="input_field"
          />
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="input_field"
          />
          <button className="btn_send" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Message;
