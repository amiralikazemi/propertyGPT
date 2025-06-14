// src/store/store.ts
import { create } from 'zustand';
import type { LatLngExpression } from 'leaflet';

// Define types
type Message = {
  text: string;
  sender: string;
};

type Chat = {
  id: number;
  title: string;
  date: string;
  messages: Message[];
};

type MapState = {
  location: LatLngExpression;
  zoom: number;
  highlightedArea?: LatLngExpression[]; // Array of coordinates forming a polygon
};

type AppState = {
  // Theme state
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Sidebar state
  expanded: boolean;
  toggleExpanded: () => void;
  
  // Mobile sidebar state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Chat state
  activeChat: number;
  setActiveChat: (id: number) => void;
  chatHistory: Chat[];
  addNewChat: () => void;
  deleteChat: (id: number) => void;
  renameChat: (id: number, newTitle: string) => void;
  addMessageToChat: (chatId: number, message: Message) => void;
  
  // Map state
  mapState: MapState;
  setMapLocation: (location: LatLngExpression) => void;
  setMapZoom: (zoom: number) => void;
  
  // Mobile panel state
  mobileImagePanelOpen: boolean;
  setMobileImagePanelOpen: (open: boolean) => void;
  
  // Model selection state
  selectedModel: string;
  setSelectedModel: (model: string) => void;

  setHighlightedArea: (area?: LatLngExpression[]) => void;
};

// Load persisted state from localStorage
const loadPersistedState = () => {
  try {
    const savedState = localStorage.getItem('propertyGPT-state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return {
        chatHistory: parsed.chatHistory || [],
        activeChat: parsed.activeChat || 1,
        selectedModel: parsed.selectedModel || 'GPT-4'
      };
    }
  } catch (error) {
    console.error('Error loading persisted state:', error);
  }
  return null;
};

// Sample initial chat data
const initialChats = [
  {
    id: 1,
    title: "New Conversation",
    date: new Date().toLocaleString(),
    messages: []
  }
];

// Get initial state
const persistedState = loadPersistedState();
const initialState = {
  chatHistory: persistedState?.chatHistory || initialChats,
  activeChat: persistedState?.activeChat || 1,
  selectedModel: persistedState?.selectedModel || 'GPT-4',
  darkMode: false
};

// Helper function to generate chat title from first message
const generateChatTitle = (message: string): string => {
  // Take first 30 characters of message and add ellipsis if longer
  return message.length > 30 ? `${message.slice(0, 30)}...` : message;
};

// Create store
export const useStore = create<AppState>((set, get) => ({
  // Initial state
  darkMode: initialState.darkMode,
  expanded: false,
  mobileMenuOpen: false,
  activeChat: initialState.activeChat,
  chatHistory: [...initialState.chatHistory],
  mobileImagePanelOpen: false,
  selectedModel: initialState.selectedModel,
  mapState: {
    location: [25.2048, 55.2708], // Dubai coordinates
    zoom: 13,
    highlightedArea: undefined
  },

  // Theme actions
  toggleDarkMode: () => {
    set((state) => ({ darkMode: !state.darkMode }));
    localStorage.setItem('propertyGPT-state', JSON.stringify({
      ...get(),
      expanded: undefined,
      mobileImagePanelOpen: undefined,
      mobileMenuOpen: undefined,
      mapState: undefined
    }));
  },

  // Actions
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setActiveChat: (id) => {
    set({ activeChat: id });
    localStorage.setItem('propertyGPT-state', JSON.stringify({
      ...get(),
      expanded: undefined,
      mobileImagePanelOpen: undefined,
      mobileMenuOpen: undefined,
      mapState: undefined
    }));
  },
  addNewChat: () => {
    const nextId = Math.max(...get().chatHistory.map(c => c.id), 0) + 1;
    const newChat = {
      id: nextId,
      title: "New Conversation",
      date: new Date().toLocaleString(),
      messages: []
    };
    const newState = {
      chatHistory: [newChat, ...get().chatHistory],
      activeChat: newChat.id
    };
    set(newState);
    localStorage.setItem('propertyGPT-state', JSON.stringify({
      ...get(),
      expanded: undefined,
      mobileImagePanelOpen: undefined,
      mobileMenuOpen: undefined,
      mapState: undefined
    }));
  },
  deleteChat: (id) => {
    const { chatHistory, activeChat } = get();
    const updatedChats = chatHistory.filter(chat => chat.id !== id);
    
    // If we're deleting the last chat or the active chat, create a new one
    if (updatedChats.length === 0 || id === activeChat) {
      const newChat = {
        id: Math.max(...chatHistory.map(c => c.id), 0) + 1,
        title: "New Conversation",
        date: new Date().toLocaleString(),
        messages: []
      };
      const newState = { 
        chatHistory: [newChat, ...updatedChats],
        activeChat: newChat.id
      };
      set(newState);
      localStorage.setItem('propertyGPT-state', JSON.stringify({
        ...get(),
        expanded: undefined,
        mobileImagePanelOpen: undefined,
        mobileMenuOpen: undefined,
        mapState: undefined
      }));
      return;
    }
    
    // If we deleted a different chat, just update the chat history
    set({ chatHistory: updatedChats });
    localStorage.setItem('propertyGPT-state', JSON.stringify({
      ...get(),
      expanded: undefined,
      mobileImagePanelOpen: undefined,
      mobileMenuOpen: undefined,
      mapState: undefined
    }));
  },
  renameChat: (id, newTitle) => {
    const { chatHistory } = get();
    const updatedChats = chatHistory.map(chat =>
      chat.id === id ? { ...chat, title: newTitle } : chat
    );
    set({ chatHistory: updatedChats });
    localStorage.setItem('propertyGPT-state', JSON.stringify({
      ...get(),
      expanded: undefined,
      mobileImagePanelOpen: undefined,
      mobileMenuOpen: undefined,
      mapState: undefined
    }));
  },
  addMessageToChat: (chatId: number, message: Message) => {
    const { chatHistory } = get();
    const updatedChats = chatHistory.map(chat => {
      if (chat.id === chatId) {
        const updatedMessages = [...chat.messages, message];
        // Update title if this is the first user message
        const shouldUpdateTitle = chat.messages.length === 0 && message.sender === 'user';
        return {
          ...chat,
          messages: updatedMessages,
          title: shouldUpdateTitle ? generateChatTitle(message.text) : chat.title
        };
      }
      return chat;
    });
    set({ chatHistory: updatedChats });
    localStorage.setItem('propertyGPT-state', JSON.stringify({
      ...get(),
      expanded: undefined,
      mobileImagePanelOpen: undefined,
      mobileMenuOpen: undefined,
      mapState: undefined
    }));
  },
  setMobileImagePanelOpen: (open) => set({ mobileImagePanelOpen: open }),
  setSelectedModel: (model) => {
    set({ selectedModel: model });
    localStorage.setItem('propertyGPT-state', JSON.stringify({
      ...get(),
      expanded: undefined,
      mobileImagePanelOpen: undefined,
      mobileMenuOpen: undefined,
      mapState: undefined
    }));
  },
  setMapLocation: (location) => set((state) => ({ 
    mapState: { ...state.mapState, location, zoom: 15 } // Also set zoom when changing location
  })),
  setHighlightedArea: (area?: LatLngExpression[]) => set((state) => ({
    mapState: { ...state.mapState, highlightedArea: area }
  })),
  setMapZoom: (zoom) => set((state) => ({ 
    mapState: { ...state.mapState, zoom } 
  }))
}));