// src/components/ChatArea.tsx
import { FiPaperclip, FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { useStore } from '../store/store';
import logoImage from '../assets/primary-bg-transparent.webp';

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const { activeChat, chatHistory, setMobileImagePanelOpen, addMessageToChat } = useStore();
  
  const currentChat = chatHistory.find(chat => chat.id === activeChat);
  const messages = currentChat?.messages || [];

  const promptSuggestions = [
    { title: "What are the advantages", subtitle: "of living in Dubai?" },
    { title: "Write code to", subtitle: "show top developers in Dubai" },
    { title: "Help me write an essay", subtitle: "about future plans for Dubai" },
    { title: "What is the weather", subtitle: "in Dubai?" }
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    addMessageToChat(activeChat, { text: message, sender: 'user' });
    
    // Simulate bot response
    setTimeout(() => {
      addMessageToChat(activeChat, {
        text: "This is a simulated response from PropertyGPT. In a real application, this would come from an AI API.",
        sender: "bot"
      });
    }, 500);

    setMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-y-hidden">
        <div className="p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[40vh]">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 self-start">Hello there!</h2>
              <p className="text-lg text-gray-500 mb-8 self-start">How can I help you today?</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-lg flex-shrink-0 mr-2">
                    <img 
                      src={logoImage}
                      alt="PropertyGPT"
                      className="w-full h-full object-contain mt-3"
                    />
                  </div>
                )}
                <div className={`rounded-2xl p-4 max-w-[70%] ${
                  msg.sender === 'user'
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}>
                  <p className="">{msg.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Prompt Suggestions at Bottom */}
      {messages.length === 0 && (
        <div className="w-full flex justify-center py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full m-4 mb-0">
            {promptSuggestions.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setMessage(`${prompt.title} ${prompt.subtitle}`)}
                className="flex flex-col items-start bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-medium text-gray-800 text-sm">{prompt.title}</span>
                <span className="text-xs text-gray-500">{prompt.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className=" md:h-40">
        <div className="p-4 h-full">
          {/* Mobile layout is normal flex, desktop is relative positioning with h-full */}
          <div className="flex items-center md:block bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 md:py-3 md:h-full md:relative focus-within:outline focus-within:outline-2 focus-within:outline-black">
            {/* On mobile: normal layout. On desktop: positioned at top */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Send a message..."
              className="flex-1 mx-2 py-1 focus:outline-none bg-gray-100 md:w-full md:mb-10"
            />
            
            {/* Mobile: normal layout. Desktop: absolute positioned at bottom */}
            <div className="flex md:absolute md:bottom-2 md:left-0 md:w-full md:px-3 md:justify-between">
              <button className="p-1 text-gray-500 hover:text-gray-700 hidden md:block">
                <FiPaperclip size={20} />
              </button>
              
              {/* Only visible on mobile */}
              <button className="p-1 text-gray-500 hover:text-gray-700 md:hidden">
                <FiPaperclip size={20} />
              </button>

              <button
                disabled={!message.trim()}
                onClick={handleSend}
                className={`p-2 rounded-full ${
                  message.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-400'
                }`}
              >
                <FiSend size={20} />
              </button>
            </div>
          </div>

          {/* Mobile-only toggle button */}
          <button
            onClick={() => setMobileImagePanelOpen(true)}
            className="md:hidden mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700"
          >
            View Property Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;