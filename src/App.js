import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OrganizerDashboard from "components/organizer/Dashboard";
import ClientDashboard from "components/client/Dashboard";
import "simplebar/dist/simplebar.min.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={OrganizerDashboard}></Route>
        <Route exact path="/organizer" component={OrganizerDashboard}></Route>
        <Route exact path="/client" component={ClientDashboard}></Route>
      </Router>
    </ThemeProvider>
  );
};

export default App;
