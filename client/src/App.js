import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import HomePage from './Layout/Pages/Homepage'
import AppComponent from './components/Application'
import Dashboard from './components/dashBoard';
import Dashboard2 from './components/dashBoard/Dashboard2';
import PropertyDetails2 from './components/Calulators/PropertyDetails2'
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
// import Dashboard from "./components/dashboard/";
// var __html = require('../src/components/mainPage/properties');
// var html = { __html: __html };

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {


    return (
      <Provider store={store}>
        <Router>
          <div className="App">
           
            {/* <Header /> */}
            <Route path='/' exact component={HomePage} />
            {/* <Route exact path="/sign-up" component={Landing} /> */}
            <Route exact path="/sign-up" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/mainPage" component={AppComponent} />
              <PrivateRoute path="/mainPage/search" component={AppComponent} />
              <PrivateRoute exact path="/dashboard" component={AppComponent} />
              <PrivateRoute exact path="/dashboard2" component={Dashboard2} />
              <PrivateRoute exact path="/propertyDetails2/:id" component={PropertyDetails2}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;