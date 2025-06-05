import { FiChevronDown, FiPlus } from 'react-icons/fi';

const TopNav = () => {
  const models = ['GPT-3.5', 'GPT-4', 'Claude-3', 'Gemini-Pro'];
  const selectedModel = 'GPT-3.5'; 

  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-white">
      {/* Model Selection Dropdown*/}
      <div className="relative">
        <div className="flex items-center space-x-2 text-gray-700">
          <span className="font-medium">{selectedModel}</span>
          <FiChevronDown />
        </div>
      </div>
      
      {/*New Chat Button */}
      <div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg">
        <FiPlus /><div>Chat</div>
      </div>
    </div>
  );
};

export default TopNav;