// src/components/ImagePanel.tsx
import { FiX } from 'react-icons/fi';
import { useStore } from '../store/store';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import type { LatLngExpression } from 'leaflet';
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
  const { mobileImagePanelOpen, setMobileImagePanelOpen, mapState } = useStore();
  
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
        className="bg-white rounded-xl w-full max-w-md h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium text-lg">Property Location</h3>
          <button 
            onClick={() => setMobileImagePanelOpen(false)} 
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <FiX size={24} />
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
                <Popup>
                  Luxury Condo<br/>Dubai, UAE
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePanel;