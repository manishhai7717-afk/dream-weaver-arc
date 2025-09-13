import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MapModal = ({ isOpen, onClose }: MapModalProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (isOpen && mapRef.current && !mapInstanceRef.current) {
      const universityCoords: [number, number] = [17.5506, 78.5012];

      mapInstanceRef.current = L.map(mapRef.current).setView(universityCoords, 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      const universityMarker = L.marker(universityCoords).addTo(mapInstanceRef.current);
      universityMarker.bindPopup("<b>Malla Reddy University</b><br>Main Campus").openPopup();

      const campusLocations = [
        {
          coords: [17.5510, 78.5005] as [number, number],
          title: "Main Library",
          type: "academic",
          popup: "<b>University Library</b><br>Open 8AM-10PM"
        },
        {
          coords: [17.5500, 78.5015] as [number, number],
          title: "Student Center",
          type: "facility",
          popup: "<b>Student Center</b><br>Cafeteria, Lounge, Meeting Rooms"
        },
        {
          coords: [17.5520, 78.5000] as [number, number],
          title: "Engineering Building",
          type: "academic",
          popup: "<b>Engineering Department</b><br>Classes and Labs"
        },
        {
          coords: [17.5495, 78.5020] as [number, number],
          title: "Sports Complex",
          type: "sports",
          popup: "<b>Sports Complex</b><br>Gym, Pool, and Courts"
        },
        {
          coords: [17.5502, 78.4998] as [number, number],
          title: "Administration Building",
          type: "admin",
          popup: "<b>Administration</b><br>Offices and Services"
        }
      ];

      const iconColors = {
        academic: '#1a73e8',
        admin: '#6c5ce7',
        sports: '#00b894',
        facility: '#fdcb6e'
      };

      campusLocations.forEach(location => {
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${iconColors[location.type]}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px ${iconColors[location.type]}"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker(location.coords, { icon }).addTo(mapInstanceRef.current!);
        marker.bindPopup(location.popup);
      });

      L.circle(universityCoords, {
        color: '#6c5ce7',
        fillColor: '#6c5ce7',
        fillOpacity: 0.1,
        radius: 300
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  const legendItems = [
    { color: '#1a73e8', label: 'Academic Buildings' },
    { color: '#6c5ce7', label: 'Administration' },
    { color: '#00b894', label: 'Recreation & Sports' },
    { color: '#fdcb6e', label: 'Student Facilities' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Campus Map - Malla Reddy University</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div 
            ref={mapRef} 
            className="h-96 w-full rounded-xl border"
            style={{ minHeight: '400px' }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;