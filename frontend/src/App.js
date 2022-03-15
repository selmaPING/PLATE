import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddRadnik from "./components/add-radnik.component";
import Radnik from "./components/radnik.component";
import RadniciList from "./components/radnik-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/radnici"} className="navbar-brand">
            Plate
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/radnici"} className="nav-link">
                Radnici
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add-radnik"} className="nav-link">
                Dodaj radnika
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/radnici"]} component={RadniciList} />
            <Route exact path="/add-radnik" component={AddRadnik} />
            <Route path="/radnici/:id" component={Radnik} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
