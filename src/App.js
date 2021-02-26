import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OrganizerDashboard from "organizer/Dashboard";
import ClientDashboard from "client/Dashboard";
import "simplebar/dist/simplebar.min.css";

const App = () => {
  return (
    <Router>
      <Route path="/" component={OrganizerDashboard}></Route>
      <Route path="/organizer" component={OrganizerDashboard}></Route>
      <Route path="/client" component={ClientDashboard}></Route>
    </Router>
  );
};

export default App;
