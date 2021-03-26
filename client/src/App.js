import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import HelloWorld from "./components/HelloWorld";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HelloWorld />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
