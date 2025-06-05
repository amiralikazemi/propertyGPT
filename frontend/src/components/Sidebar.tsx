// src/components/Sidebar.tsx
import {
    FiPlus, FiChevronRight, FiChevronLeft, FiSearch,
    FiBell, FiBookOpen, FiSliders, FiMessageSquare,
    FiEdit2, FiTrash2, FiCheck, FiX
} from 'react-icons/fi';
import { useStore } from '../store/store';
import logoImage from '../assets/primary-bg-transparent.webp';
import { useState } from 'react';

interface EditingState {
    id: number;
    title: string;
}

const Sidebar = () => {
    const {
        expanded,
        toggleExpanded,
        activeChat,
        setActiveChat,
        chatHistory,
        addNewChat,
        deleteChat,
        renameChat,
        darkMode
    } = useStore();

    const [editing, setEditing] = useState<EditingState | null>(null);

    const handleRename = (chatId: number, newTitle: string) => {
        if (newTitle.trim()) {
            renameChat(chatId, newTitle.trim());
        }
        setEditing(null);
    };

    const handleDelete = (chatId: number, event: React.MouseEvent) => {
        event.stopPropagation();
        if (window.confirm('Are you sure you want to delete this chat?')) {
            deleteChat(chatId);
        }
    };

    return (
        <div className={`flex flex-col items-center justify-between h-screen shadow-lg ${
            expanded ? "w-60" : "w-12"
        } py-6 transition-all duration-500 ease-in-out ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
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
                            className={`ml-3 text-xl font-bold transition-all duration-500 ease-in-out
                                ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                                ${darkMode ? 'text-gray-200' : 'text-gray-800'}
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

                {/* Icons - Plus icon first */}
                <div className="space-y-1 flex flex-col w-full">
                    {/* New Chat Button */}
                    <button
                        onClick={addNewChat}
                        className={`flex items-center ${expanded ? "justify-start px-4" : "justify-center"}
                            w-full py-2 rounded-lg group ${
                                darkMode 
                                    ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                    >
                        <span className="flex items-center justify-center">
                            <FiPlus size={24} />
                        </span>
                        {expanded && (
                            <span className={`ml-4 text-sm font-medium ${
                                darkMode ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                            }`}>
                                New Chat
                            </span>
                        )}
                    </button>

                    {/* Expand/Collapse Button with text */}
                    <button
                        onClick={toggleExpanded}
                        className={`flex items-center ${expanded ? "justify-start px-4" : "justify-center"}
                            w-full py-2 rounded-lg group ${
                                darkMode 
                                    ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                    >
                        <span className="flex items-center justify-center">
                            {expanded ? (
                                <FiChevronLeft className={darkMode ? "text-gray-400" : "text-gray-500"} size={24} />
                            ) : (
                                <FiChevronRight className={darkMode ? "text-gray-400" : "text-gray-500"} size={24} />
                            )}
                        </span>
                        {expanded && (
                            <span className={`ml-4 text-sm font-medium ${
                                darkMode ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                            }`}>
                                Collapse sidebar
                            </span>
                        )}
                    </button>

                    {/* Other Icons */}
                    {[
                        { icon: <FiSearch size={24} />, label: "Search" },
                        { icon: <FiBell size={24} />, label: "Notifications" },
                        { icon: <FiBookOpen size={24} />, label: "Documents" },
                        { icon: <FiSliders size={24} />, label: "Settings" },
                    ].map((item, index) => (
                        <button
                            key={index}
                            className={`flex items-center ${expanded ? "justify-start px-4" : "justify-center"}
                                w-full py-2 rounded-lg group ${
                                    darkMode 
                                        ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                                        : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            <span className="flex items-center justify-center">
                                {item.icon}
                            </span>
                            {expanded && (
                                <span className={`ml-4 text-sm font-medium ${
                                    darkMode ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'
                                }`}>
                                    {item.label}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat History Section */}
            {expanded && (
                <div className="w-full px-2 mt-4">
                    <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-xs font-medium uppercase tracking-wider px-4 mb-3 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            Chat History
                        </h3>

                        <div className="space-y-1 overflow-y-auto max-h-[20vh]">
                            {chatHistory.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => !editing && setActiveChat(chat.id)}
                                    className={`flex items-center justify-between w-full py-2 px-4 rounded-lg ${
                                        activeChat === chat.id
                                            ? darkMode 
                                                ? "bg-gray-700 text-blue-400"
                                                : "bg-blue-50 text-blue-600"
                                            : darkMode
                                                ? "text-gray-300 hover:bg-gray-700"
                                                : "text-gray-700 hover:bg-gray-100"
                                    } group`}
                                >
                                    <div className="flex items-center flex-1 min-w-0">
                                        <FiMessageSquare
                                            size={16}
                                            className={activeChat === chat.id 
                                                ? darkMode ? "text-blue-400" : "text-blue-600"
                                                : darkMode ? "text-gray-400" : "text-gray-500"
                                            }
                                        />
                                        {editing?.id === chat.id ? (
                                            <div className="flex items-center ml-3 flex-1">
                                                <input
                                                    type="text"
                                                    value={editing.title}
                                                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                                                    className={`w-[120px] max-w-[120px] px-2 py-1 text-sm border rounded ${
                                                        darkMode 
                                                            ? 'bg-gray-700 border-gray-600 text-gray-200' 
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    }`}
                                                    autoFocus
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleRename(chat.id, editing.title);
                                                        } else if (e.key === 'Escape') {
                                                            setEditing(null);
                                                        }
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleRename(chat.id, editing.title)}
                                                    className="p-1 ml-1 text-green-600 hover:text-green-700"
                                                >
                                                    <FiCheck size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setEditing(null)}
                                                    className="p-1 text-red-600 hover:text-red-700"
                                                >
                                                    <FiX size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="ml-3 flex-1 min-w-0">
                                                <div className={`text-sm font-medium truncate ${
                                                    darkMode ? 'text-gray-200' : 'text-gray-900'
                                                }`}>{chat.title}</div>
                                                <div className={`text-xs ${
                                                    darkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>{chat.date}</div>
                                            </div>
                                        )}
                                    </div>
                                    {!editing && expanded && (
                                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditing({ id: chat.id, title: chat.title });
                                                }}
                                                className={`p-1 ${
                                                    darkMode 
                                                        ? 'text-gray-400 hover:text-blue-400' 
                                                        : 'text-gray-500 hover:text-blue-600'
                                                }`}
                                            >
                                                <FiEdit2 size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(chat.id, e)}
                                                className={`p-1 ${
                                                    darkMode 
                                                        ? 'text-gray-400 hover:text-red-400' 
                                                        : 'text-gray-500 hover:text-red-600'
                                                }`}
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Section */}
            <div className="flex flex-col items-center w-full px-2">
                {expanded ? (
                    // Horizontal layout when expanded
                    <div className="flex items-center w-full justify-left ml-10">
                        <div className="bg-gradient-to-br from-blue-400 to-indigo-600 w-10 h-10 rounded-full"></div>
                        <div className={`text-base font-medium tracking-wider ml-3 ${
                            darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                            Guest
                        </div>
                    </div>
                ) : (
                    // Vertical layout when collapsed
                    <div className="flex flex-col items-center">
                        <div className={`text-base font-medium tracking-wider mb-8 [writing-mode:vertical-lr] rotate-180 ${
                            darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
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