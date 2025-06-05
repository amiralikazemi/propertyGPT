// src/components/ChatArea.tsx
import { FiPaperclip, FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { useStore } from '../store/store';
import logoImage from '../assets/primary-bg-transparent.webp';

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const { activeChat, chatHistory, setMobileImagePanelOpen, addMessageToChat, darkMode } = useStore();
  
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
              <h2 className={`text-2xl font-bold mb-2 self-start ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>Hello there!</h2>
              <p className={`text-lg mb-8 self-start ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>How can I help you today?</p>
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
                    ? 'bg-blue-600 text-white'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-white text-gray-900'
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
                className={`flex flex-col items-start rounded-xl px-4 py-3 shadow-sm transition-colors text-left ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className={`font-medium text-sm ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>{prompt.title}</span>
                <span className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{prompt.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="md:h-40">
        <div className="p-4 h-full">
          {/* Mobile layout is normal flex, desktop is relative positioning with h-full */}
          <div className={`flex items-center md:block rounded-lg px-3 py-2 md:py-3 md:h-full md:relative focus-within:outline focus-within:outline-2 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 focus-within:outline-gray-600' 
              : 'bg-gray-100 border border-gray-300 focus-within:outline-black'
          }`}>
            {/* On mobile: normal layout. On desktop: positioned at top */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Send a message..."
              className={`flex-1 mx-2 py-1 focus:outline-none md:w-full md:mb-10 ${
                darkMode 
                  ? 'bg-gray-800 text-gray-200 placeholder-gray-500' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              }`}
            />
            
            {/* Mobile: normal layout. Desktop: absolute positioned at bottom */}
            <div className="flex md:absolute md:bottom-2 md:left-0 md:w-full md:px-3 md:justify-between">
              <button className={`p-1 hover:text-gray-700 hidden md:block ${
                darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500'
              }`}>
                <FiPaperclip size={20} />
              </button>
              
              {/* Only visible on mobile */}
              <button className={`p-1 hover:text-gray-700 md:hidden ${
                darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500'
              }`}>
                <FiPaperclip size={20} />
              </button>

              <button
                disabled={!message.trim()}
                onClick={handleSend}
                className={`p-2 rounded-full ${
                  message.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : darkMode ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                <FiSend size={20} />
              </button>
            </div>
          </div>

          {/* Mobile-only toggle button */}
          <button
            onClick={() => setMobileImagePanelOpen(true)}
            className={`md:hidden mt-3 w-full py-2 rounded-lg text-sm font-medium ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            View Property Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;