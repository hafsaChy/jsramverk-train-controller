import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import io from 'socket.io-client';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Clock from "../components/Clock.mjs";

let DefaultIcon = L.icon({
iconUrl: icon,
shadowUrl: iconShadow,
});

export default function DelayedTrainPage() {
  const [markers] = useState({});
  const [delayedTrains, setDelayedTrains] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    var container = L.DomUtil.get("map");

    if (container != null) {
    container._leaflet_id = null;
    }
    // Initialize the map
    const mapInstance = L.map('map').setView([62.173276, 14.942265], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);
    setMap(mapInstance);
    L.Marker.prototype.options.icon = DefaultIcon;

    // Connect to the socket.io server
    const socket = io('http://localhost:1337');
      
    // Add your socket.io event listeners here
    socket.on('message', (data) => {
        if (markers.hasOwnProperty(data.trainnumber)) {
        let marker = markers[data.trainnumber];
        marker.setLatLng(data.position);
        } else {
        let customIcon = L.icon({
            iconUrl: 'leaflet/dist/images/marker-icon.png',
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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
      

  return (
    <><div className="content">
    <div className="delayed">
      <Clock />
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
            <div className="delay">{(train)}</div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <div className="map" id="map" style={{ height: "100vh", width: "60vw" }} />
    </div>
    </div>
    </>
  );

}
