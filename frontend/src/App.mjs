import React  from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage.mjs";
import MapPage from "./pages/MapPage.mjs";
import StationPage from "./pages/StationPage.mjs";
import TrainMessagePage from "./pages/TrainMessagePage.mjs";
import TrainPage from "./pages/TrainPage.mjs";
// import reportWebVitals from './reportWebVitals.mjs';
import DelayedTrainPage from "./pages/DelayedTrainPage.mjs";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DelayedTrainPage />}>
          </Route>
          <Route path="/train/:trainIdent/:searchDate?" element={<TrainPage />}>
          </Route>
          <Route path="/station/:locationId/:limit?" element={<StationPage />}>
          </Route>
          <Route path="/arrivals/:locationId/:limit?" element={<StationPage type="arrivals" />}>
          </Route>
          <Route path="/departures/:locationId/:limit?" element={<StationPage type="departures" />}>
          </Route>
          <Route path="/msg/:locationId?" element={<TrainMessagePage />}>
          </Route>
          <Route path="/map/:trainIdent/:searchDate?" element={<MapPage />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
