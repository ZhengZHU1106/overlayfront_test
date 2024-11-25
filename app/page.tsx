"use client";

import TopHeader from "@/components/TopHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import React from "react";
import remarkBreaks from 'remark-breaks';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import Image from "next/image";

export default function Home() {

  //DEFAULT MESSAGES - PLACEHOLDERS
  const firstMessages = [
    {
      id: 1,
      username: "overlay",
      text: "Hello! How can I assist you today?"
    },
  ];

  const [messages, setMessages] = useState(firstMessages);
  const [inputValue, setInputValue] = useState(""); // New state to track input value
  const lastMessageRef = useRef(null);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function handleSubmit(event) {
    event.preventDefault();
    const userMessage = inputValue;
    
    console.log('User message:', userMessage);
    
    // Add user message to the message state
    const newMessage = {
      id: messages.length + 1,
      username: 'julen',
      text: userMessage,
    };
    
    // Update messages state with the new message
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
  
    // Clear input field
    setInputValue("");

    setLoading(true); // Start loading
  
    try {
      // Prepare the message format required by the API
      // const formattedMessages = updatedMessages.map(message => ({
      //   role: message.username === 'julen' ? 'user' : 'assistant',
      //   content: message.text
      // }));
  
      // Make request to OpenAI API with the entire conversation history
      const response = await axios.post('/api/chat', {
        message: userMessage,
      });
  
      const reply = response.data.reply;

      // Add backend's response to the messages
      const replyMessage = {
        id: messages.length + 2,
        username: 'overlay',
        text: reply
      };
  
      // Add API response to the messages
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    } catch (error) {
      console.error('Axios error:', error);
      console.error('Error response:', error.response);
    } finally {
      setLoading(false); // End loading
    }
  }
  

  return (
    <main className="h-full w-full flex flex-col bg-gray-50 rounded-3xl">
     
      {/* TOP HEADER - OVERLAY */}
      <TopHeader /> 

      {/* CHAT BOX - MESSAGE AREA */}
      <ScrollArea className="flex-1 w-full">
        <div className="flex-1 space-y-3 pt-2 px-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`w-full flex flex-col text-10pt ${message.username === "julen" ? "items-end" : "items-start"}`}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <div className={`px-3 py-2 ${message.username === "julen" ? "font-semibold " : "font-medium"}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}  // Enable breaks
                  rehypePlugins={[rehypeSanitize]}
                  // rehypeRaw
                >
                  {message.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="w-full flex justify-start px-3 py-2 font-medium">
              <div className="dot-loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* FLOATING BUTTONS */}
    
      <div className="flex justify-center items-center mt-4 space-x-5 h-10 px-5 font-medium">
        <div className="flex bg-white text-10pt text-center py-2 px-4 rounded-2xl shadow-md shadow-gray-200 hover:-translate-y-1 hover:font-semibold hover:cursor-pointer hover:shadow-gray-300 transition duration-300">
          <p>📄  Create new project</p>
        </div>
        <div className="flex bg-white text-10pt text-center py-2 px-4 rounded-2xl shadow-md shadow-gray-200 hover:-translate-y-1 hover:font-semibold hover:cursor-pointer hover:shadow-gray-300 transition duration-300">
          <p>⏰  Change duration</p>
        </div>
      </div>
    
      
      {/* TEXT BOX - USER IMPUT */}
      <form onSubmit={handleSubmit} className="space-x-3 h-20 flex justify-center items-center px-5">
        <input
          name="text"
          type="text"
          value={inputValue} // Bind input value to state
          onChange={(e) => setInputValue(e.target.value)} // Update input value on typing
          placeholder="Start typing..." // Placeholder text
          className="flex-1 px-4 py-3 text-10pt font-medium rounded-2xl border border-slate-200 focus:border-gray-400 shadow-lg shadow-gray-200 focus:outline-none"
        /> 

        <button type="submit" className="group">
          <Image src="images/Send.svg" alt="Send" width={35} height={35} />
        </button> 
      </form>
    </main>
  );
}
