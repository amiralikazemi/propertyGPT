import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiPlus } from 'react-icons/fi';
import { useStore } from '../store/store';

const TopNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addNewChat, selectedModel, setSelectedModel } = useStore();

  const models = ['GPT-3.5', 'GPT-4', 'Claude-3', 'Gemini-Pro'];

  // Manual click outside handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-white">
      {/* Model Selection Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          <span className="font-medium">{selectedModel}</span>
          <FiChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {models.map(model => (
              <button
                key={model}
                onClick={() => {
                  setSelectedModel(model);
                  setIsDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  selectedModel === model ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* New Chat Button */}
      <button 
        onClick={addNewChat}
        className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:bg-blue-50"
      >
        <FiPlus /><div>Chat</div>
      </button>
    </div>
  );
};

export default TopNav;