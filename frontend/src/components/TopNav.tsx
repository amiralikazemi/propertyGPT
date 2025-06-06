import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiPlus, FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { useStore } from '../store/store';

const TopNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addNewChat, selectedModel, setSelectedModel, darkMode, toggleDarkMode, mobileMenuOpen, setMobileMenuOpen } = useStore();

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
    <div className={`flex items-center justify-between p-2 border-b border-gray-200 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <div className="flex items-center space-x-4">
        {/* Model Selection Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} focus:outline-none`}
          >
            <span className="font-medium">{selectedModel}</span>
            <FiChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className={`absolute top-full left-0 mt-2 w-40 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg z-10`}>
              {models.map(model => (
                <button
                  key={model}
                  onClick={() => {
                    setSelectedModel(model);
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    darkMode 
                      ? `${selectedModel === model ? 'text-blue-400 font-medium' : 'text-gray-300'} hover:bg-gray-700` 
                      : `${selectedModel === model ? 'text-blue-600 font-medium' : 'text-gray-700'} hover:bg-gray-50`
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${
            darkMode 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
      
      {/* New Chat Button */}
      <button 
        onClick={addNewChat}
        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          darkMode 
            ? 'hover:bg-gray-700 text-gray-300' 
            : 'hover:bg-blue-50 text-gray-700'
        } hidden md:flex`} // <-- hide on mobile, show on md+
      >
        <FiPlus /><div>Chat</div>
      </button>
      {/* Hamburger Button - only visible on mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`ml-2 p-2 rounded-lg transition-colors md:hidden ${
          darkMode
            ? 'text-gray-300 hover:bg-gray-700'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Open menu"
      >
        <FiMenu size={22} />
      </button>
    </div>
  );
};

export default TopNav;