import React, { useEffect, useRef } from 'react';
import { useChat } from "../hooks/useChat";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();


  const { chat, loading, cameraZoomed, setCameraZoomed, message, messageHistory } = useChat();

  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom whenever messageHistory changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageHistory]);

  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      chat(text);
      input.current.value = "";
    }
  };
  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-5 p-4 rounded-lg">
          <h1 className="font-black text-xl">Alice</h1>
          <p>Your personal finance companion</p>
        </div>
    <div className="chat-container" ref={chatContainerRef}>
      {messageHistory && messageHistory.length > 0 ? (
        messageHistory.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === 'bot' ? 'bot' : 'user'}`}
          >
            {msg.text}
          </div>
        ))
      ) : (
        <div>No messages yet</div>
      )}
    </div>
        <div className="w-full flex flex-col items-end justify-center gap-4">
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
