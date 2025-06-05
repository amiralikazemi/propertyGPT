// src/App.tsx
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import ChatArea from './components/ChatArea';
import ImagePanel from './components/ImagePanel';
import { useStore } from './store/store';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import type { LatLngExpression } from 'leaflet';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function App() {
  const { mapState, darkMode } = useStore();

  return (
    <div className={`flex min-h-screen overflow-hidden ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Expandable Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Top Navigation Bar */}
        <TopNav />
        
        {/* Chat + Image Panel Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Area (Left) */}
          <div className={`flex-1 flex flex-col border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <ChatArea />
          </div>
          
          {/* Image Panel (Right) - Hidden on mobile */}
          <div className={`hidden md:block w-1/2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <MapContainer 
              center={mapState.location}
              zoom={mapState.zoom}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={mapState.location} icon={defaultIcon}>
                <Popup>
                  Luxury Condo<br/>Dubai, UAE
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      
      {/* Mobile Image Panel Overlay */}
      <ImagePanel />
    </div>
  );
}

export default App;