// src/components/ImagePanel.tsx
import { FiX } from 'react-icons/fi';
import { useStore } from '../store/store';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

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

const ImagePanel = () => {
  const { mobileImagePanelOpen, setMobileImagePanelOpen, mapState, darkMode } = useStore();
  
  useEffect(() => {
    // Force a resize event when the panel opens to ensure the map renders correctly
    if (mobileImagePanelOpen) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [mobileImagePanelOpen]);

  if (!mobileImagePanelOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 md:hidden"
      onClick={() => setMobileImagePanelOpen(false)}
    >
      <div 
        className={`rounded-xl w-full max-w-md h-[80vh] flex flex-col ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex justify-between items-center p-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className={`font-medium text-lg ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>Property Location</h3>
          <button 
            onClick={() => setMobileImagePanelOpen(false)} 
            className={`p-1 rounded-full ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <FiX size={24} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="w-full h-full rounded-lg overflow-hidden">
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
                <Popup className={darkMode ? 'dark-mode-popup' : ''}>
                  <div className={darkMode ? 'text-gray-200 bg-gray-800' : ''}>
                    Luxury Condo<br/>Dubai, UAE
                  </div>
                </Popup>
              </Marker>
              {mapState.highlightedArea && (
                <Polygon
                  positions={mapState.highlightedArea}
                  pathOptions={{
                    color: '#3B82F6',
                    fillColor: '#3B82F6',
                    fillOpacity: 0.2,
                    weight: 2
                  }}
                />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePanel;