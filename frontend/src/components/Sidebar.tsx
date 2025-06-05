// src/components/Sidebar.tsx
import {
  FiPlus, FiChevronRight, FiChevronLeft, FiSearch,
  FiBell, FiBookOpen, FiSliders
} from 'react-icons/fi';
import { useStore } from '../store/store';
import logoImage from '../assets/primary-bg-transparent.webp';

const Sidebar = () => {
  const { expanded, toggleExpanded } = useStore();

  return (
    <div className={`flex flex-col items-center justify-between h-screen bg-gray shadow-lg ${
        expanded ? "w-60" : "w-12"
      } py-6 transition-all duration-500 ease-in-out`}>
      
      {/* Top Logo */}
      <div className="flex flex-col items-center w-full px-2">
        {expanded ? (
          <div className="flex items-center justify-start w-full px-4 mb-10">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img 
                src={logoImage}
                alt="PropertyGPT Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span
              className={`ml-3 text-xl font-bold text-gray-800 transition-all duration-500 ease-in-out
                  ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
              `}
            >
              PropertyGPT
            </span>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-10">
            <img 
              src={logoImage}
              alt="PropertyGPT Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Icons Section */}
        <div className="space-y-1 flex flex-col w-full">
          {/* Static New Chat Button */}
          <button
            className={`flex items-center ${expanded ? "justify-start px-4" : "justify-center"}
              w-full py-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 group`}
          >
            <span className="flex items-center justify-center">
              <FiPlus size={24} />
            </span>
            {expanded && (
              <span className="ml-4 text-sm font-medium group-hover:text-blue-600">
                New Chat
              </span>
            )}
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={toggleExpanded}
            className={`flex items-center ${expanded ? "justify-start px-4" : "justify-center"}
              w-full py-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 group`}
          >
            <span className="flex items-center justify-center">
              {expanded ? (
                <FiChevronLeft className="text-gray-500" size={24} />
              ) : (
                <FiChevronRight className="text-gray-500" size={24} />
              )}
            </span>
            {expanded && (
              <span className="ml-4 text-sm font-medium group-hover:text-blue-600">
                Collapse sidebar
              </span>
            )}
          </button>

          {/* Static Action Buttons */}
          {[
            { icon: <FiSearch size={24} />, label: "Search" },
            { icon: <FiBell size={24} />, label: "Notifications" },
            { icon: <FiBookOpen size={24} />, label: "Documents" },
            { icon: <FiSliders size={24} />, label: "Settings" },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex items-center ${expanded ? "justify-start px-4" : "justify-center"}
                w-full py-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 group`}
            >
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
              {expanded && (
                <span className="ml-4 text-sm font-medium group-hover:text-blue-600">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom User Section */}
      <div className="flex flex-col items-center w-full px-2">
        {expanded ? (
          <div className="flex items-center w-full justify-left ml-10">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 w-10 h-10 rounded-full"></div>
            <div className="text-gray-700 text-base font-medium tracking-wider ml-3">
              Guest
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-gray-700 text-base font-medium tracking-wider mb-8 [writing-mode:vertical-lr] rotate-180">
              PropertyGPT
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 w-8 h-8 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;