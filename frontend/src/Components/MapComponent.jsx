import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaTruck, FaRecycle } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';
import { useAppContext } from '../Context/context';

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom marker icons
const createIcon = (color, IconComponent) => {
  const iconHtml = renderToStaticMarkup(
    <div className={`relative`}>
      <div className={`w-8 h-8 bg-${color}-500 text-white rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2`}>
        <IconComponent className="text-sm" />
      </div>
      <div className={`absolute bottom-0 left-1/2 w-2 h-2 bg-${color}-500 rounded-full transform -translate-x-1/2 animate-ping`}></div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

// Component to handle map view changes
const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const MapComponent = ({ height = '400px', showControls = true, markers = [], center = [23.8103, 90.4125] }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [collectors, setCollectors] = useState([]);
  const [recyclers, setRecyclers] = useState([]);
  const { location } = useAppContext();

  // Default markers for demo
  useEffect(() => {
    // Simulate nearby collectors
    setCollectors([
      { id: 1, position: [23.8153, 90.4225], name: 'করিম মিয়া', rating: 4.8, status: 'active' },
      { id: 2, position: [23.8203, 90.4025], name: 'রহিমা বেগম', rating: 4.9, status: 'active' },
      { id: 3, position: [23.8053, 90.4325], name: 'শাহিদুল', rating: 4.7, status: 'busy' },
    ]);

    setRecyclers([
      { id: 1, position: [23.8253, 90.4425], name: 'মিরপুর রিসাইক্লিং', capacity: '৫০০০ কেজি/দিন' },
      { id: 2, position: [23.7953, 90.3825], name: 'গুলশান গ্রিন', capacity: '৩০০০ কেজি/দিন' },
    ]);
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ height }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={showControls}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* User Location Marker */}
        {(location || userLocation) && (
          <Marker
            position={location || userLocation}
            icon={createIcon('primary', FaMapMarkerAlt)}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold">আপনার অবস্থান</p>
                <p className="text-sm text-gray-600">আপনি এখানে আছেন</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Collector Markers */}
        {collectors.map((collector) => (
          <Marker
            key={collector.id}
            position={collector.position}
            icon={createIcon(collector.status === 'active' ? 'green' : 'orange', FaTruck)}
          >
            <Popup>
              <div className="text-center min-w-[200px]">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${collector.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
                  <p className="font-semibold">{collector.name}</p>
                </div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    // eslint-disable-next-line react/jsx-no-undef
                    <FaStar key={i} className={`text-xs ${i < Math.floor(collector.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm ml-1">{collector.rating}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {collector.status === 'active' ? 'বর্তমানে সক্রিয়' : 'ব্যস্ত'}
                </p>
                <button className="mt-2 w-full bg-primary-500 text-white text-sm py-1 rounded hover:bg-primary-600 transition-colors">
                  বিস্তারিত দেখুন
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Recycler Markers */}
        {recyclers.map((recycler) => (
          <Marker
            key={recycler.id}
            position={recycler.position}
            icon={createIcon('secondary', FaRecycle)}
          >
            <Popup>
              <div className="text-center min-w-[200px]">
                <p className="font-semibold mb-1">{recycler.name}</p>
                <p className="text-sm text-gray-600 mb-2">{recycler.capacity}</p>
                <button className="w-full bg-secondary-500 text-white text-sm py-1 rounded hover:bg-secondary-600 transition-colors">
                  যোগাযোগ করুন
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Service Area Circles */}
        <Circle
          center={center}
          radius={5000}
          pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.1 }}
        />

        <MapController center={location || center} />
      </MapContainer>

      {/* Map Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 z-10 space-y-2">
          <button
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    setUserLocation([pos.coords.latitude, pos.coords.longitude]);
                  }
                );
              }
            }}
            className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          >
            <FaMapMarkerAlt className="text-primary-500" />
          </button>
        </div>
      )}

      {/* Legend */}
      {showControls && (
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <div className="text-sm space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-gray-600">আপনার অবস্থান</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">সক্রিয় কালেক্টর</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600">ব্যস্ত কালেক্টর</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
              <span className="text-gray-600">রিসাইক্লিং সেন্টার</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-primary-500 rounded-full"></div>
              <span className="text-gray-600">সেবা এলাকা (৫ কিমি)</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Activity Indicator */}
      {showControls && (
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">১২ জন কালেক্টর সক্রিয়</span>
        </div>
      )}
    </div>
  );
};

export default MapComponent;