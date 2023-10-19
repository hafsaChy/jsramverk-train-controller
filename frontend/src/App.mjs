import React  from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage.mjs";
// import MapPage from "./pages/MapPage.mjs";
// import StationPage from "./pages/StationPage.mjs";
// import TrainMessagePage from "./pages/TrainMessagePage.mjs";
// import TrainPage from "./pages/TrainPage.mjs";
// import reportWebVitals from './reportWebVitals.mjs';
import DelayedTrainPage from "./pages/DelayedTrainPage.mjs";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DelayedTrainPage />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
