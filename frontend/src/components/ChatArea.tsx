// src/components/ChatArea.tsx
import { FiPaperclip, FiSend } from 'react-icons/fi';
import logoImage from '../assets/primary-bg-transparent.webp';

const ChatArea = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-y-hidden">
        <div className="p-4 space-y-4">
          {/* empty state */}
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 self-start">Hello there!</h2>
            <p className="text-lg text-gray-500 mb-8 self-start">How can I help you today?</p>
          </div>
        </div>
      </div>
      
      {/* Prompt Suggestions */}
      <div className="w-full flex justify-center py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full m-4 mb-0">
          {[
            { title: "What are the advantages", subtitle: "of living in Dubai?" },
            { title: "Write code to", subtitle: "show top developers in Dubai" },
            { title: "Help me write an essay", subtitle: "about future plans for Dubai" },
            { title: "What is the weather", subtitle: "in Dubai?" }
          ].map((prompt, index) => (
            <div
              key={index}
              className="flex flex-col items-start bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-left"
            >
              <span className="font-medium text-gray-800 text-sm">{prompt.title}</span>
              <span className="text-xs text-gray-500">{prompt.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="md:h-40">
        <div className="p-4 h-full">
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 md:py-3 md:h-full">
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 mx-2 py-1 bg-gray-100 md:w-full md:mb-10"
              readOnly
            />
            
            <div className="flex">
              <button className="p-1 text-gray-500">
                <FiPaperclip size={20} />
              </button>

              <button className="p-2 text-gray-400">
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;