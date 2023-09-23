import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import StationPage from "./pages/StationPage";
import TrainMessagePage from "./pages/TrainMessagePage";
import TrainPage from "./pages/TrainPage";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
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
        </Switch>
      </Router>
    </div>
  );
}
