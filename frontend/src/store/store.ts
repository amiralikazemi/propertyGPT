// src/store/store.ts
import { create } from 'zustand';
import type { LatLngExpression } from 'leaflet';

// Define the parts of state used by the sidebar, ImagePanel, and TopNav
interface MapState {
  location: LatLngExpression;
  zoom: number;
}

interface AppState {
  // Sidebar state
  expanded: boolean;
  toggleExpanded: () => void;

  // Map state for ImagePanel
  mapState: MapState;
  setMapLocation: (location: LatLngExpression) => void;
  setMapZoom: (zoom: number) => void;

  // Mobile ImagePanel state
  mobileImagePanelOpen: boolean;
  setMobileImagePanelOpen: (open: boolean) => void;

  // New Chat action (TopNav)
  addNewChat: () => void;

  // Model selection (TopNav)
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

// Create a minimal store
export const useStore = create<AppState>((set) => ({
  // Sidebar
  expanded: false,
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),

  // Map defaults to Dubai coordinates
  mapState: {
    location: [25.2048, 55.2708],
    zoom: 13,
  },
  setMapLocation: (location) => set((state) => ({ mapState: { ...state.mapState, location } })),
  setMapZoom: (zoom) => set((state) => ({ mapState: { ...state.mapState, zoom } })),

  // Mobile panel
  mobileImagePanelOpen: false,
  setMobileImagePanelOpen: (open) => set({ mobileImagePanelOpen: open }),

  // TopNav: New Chat (stub implementation)
  addNewChat: () => {
    // TODO: implement chat creation logic
    console.warn('addNewChat called, but chat state is not implemented.');
  },

  // TopNav: Model selection
  selectedModel: 'GPT-4',
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
