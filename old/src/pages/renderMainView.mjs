import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import io from 'socket.io-client';


export default function MainView() {
  const [markers, setMarkers] = useState({});
  const [delayedTrains, setDelayedTrains] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize the map
    const mapInstance = L.map('map').setView([62.173276, 14.942265], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);
    setMap(mapInstance);

    // Connect to the socket.io server
    const socket = io('http://localhost:1337');
      
    // Add your socket.io event listeners here
    socket.on('message', (data) => {
        if (markers.hasOwnProperty(data.trainnumber)) {
        let marker = markers[data.trainnumber];
        marker.setLatLng(data.position);
        } else {
        let customIcon = L.icon({
            iconUrl: './leaflet/images/marker-icon.png',
            iconSize: [32, 32], // Adjust the size as needed
        });
    
        let marker = L.marker(data.position, { icon: customIcon }).bindPopup(data.trainnumber).addTo(map);
        markers[data.trainnumber] = marker;
        }
    });
      
    fetch('http://localhost:1337/delayed')
        .then((response) => response.json())
        .then((result) => {
        setDelayedTrains(result.data);
        });
    
    return () => {
        socket.disconnect(); // Cleanup, e.g., remove socket.io listeners
    };
    }, []);
      

  return (
    <div className="delayed">
    <h1>Försenade tåg</h1>
    <div id="delayed-trains" className="delayed-trains">
        {delayedTrains.map((train, index) => (
        <div key={index} className="train">
            <div className="train-number">{train.OperationalTrainNumber}</div>
            <div className="current-station">
            <div>{train.LocationSignature}</div>
            <div>
                {train.FromLocation ? train.FromLocation[0].LocationName + " -> " : ""}
                {train.ToLocation ? train.ToLocation[0].LocationName : ""}
            </div>
            </div>
            <div className="delay">{outputDelay(train)}</div>
        </div>
        ))}
    </div>
    </div>
  )

}

// export default MainView;
