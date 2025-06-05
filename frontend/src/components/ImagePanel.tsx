// src/components/ImagePanel.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';


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
  // Static location data (Dubai coordinates)
  const location: [number, number] = [25.2048, 55.2708];
  const zoom = 13;

  return (
    <div className="bg-white rounded-xl w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-medium text-lg">Property Location</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <MapContainer 
            center={location}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={location} icon={defaultIcon}>
              <Popup>
                Luxury Condo<br/>Dubai, UAE
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ImagePanel;