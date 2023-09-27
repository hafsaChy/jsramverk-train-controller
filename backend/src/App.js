import React  from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import StationPage from "./pages/StationPage";
import TrainMessagePage from "./pages/TrainMessagePage";
import TrainPage from "./pages/TrainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/train/:trainIdent/:searchDate?">
            <TrainPage />
          </Route>
          <Route exact path="/station/:locationId/:limit?">
            <StationPage />
          </Route>
          <Route exact path="/arrivals/:locationId/:limit?">
            <StationPage type="arrivals" />
          </Route>
          <Route exact path="/departures/:locationId/:limit?">
            <StationPage type="departures" />
          </Route>
          <Route exact path="/msg/:locationId?">
            <TrainMessagePage />
          </Route>
          <Route exact path="/map/:trainIdent/:searchDate?">
            <MapPage />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
