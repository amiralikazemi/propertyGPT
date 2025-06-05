// src/components/Sidebar.tsx
import { FiPlus, FiSearch, FiBell, FiBookOpen, FiSliders } from 'react-icons/fi';
import logoImage from '../assets/primary-bg-transparent.webp';

const Sidebar = () => {
    return (
        <div className="flex flex-col items-center justify-between h-screen bg-gray shadow-lg w-12 py-6">
            {/* Top Logo */}
            <div className="flex flex-col items-center w-full px-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-10">
                    <img 
                        src={logoImage}
                        alt="PropertyGPT Logo" 
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Icons */}
                <div className="space-y-1 flex flex-col w-full">
                    {/* New Chat Button */}
                    <button className="flex items-center justify-center w-full py-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                        <FiPlus size={24} />
                    </button>

                    {/* Other Icons */}
                    {[
                        <FiSearch size={24} key="search" />,
                        <FiBell size={24} key="bell" />,
                        <FiBookOpen size={24} key="book" />,
                        <FiSliders size={24} key="sliders" />,
                    ].map((icon) => (
                        <button
                            key={icon.key}
                            className="flex items-center justify-center w-full py-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-center w-full px-2">
                <div className="flex flex-col items-center">
                    <div className="text-gray-700 text-base font-medium tracking-wider mb-8 [writing-mode:vertical-lr] rotate-180">
                        PropertyGPT
                    </div>
                    <div className="bg-gradient-to-br from-blue-400 to-indigo-600 w-8 h-8 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;