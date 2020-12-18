import React from 'react';
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../private-route/PrivateRoute";
import DashboardComponent from '../mainPage/Layout/Dashboard';
import Dashboard from '../dashBoard';
import SearchComponent from '../mainPage/Layout/Search';
import Header from "./Header/Header";
import '../../App.css';


function Application() {
  return (
    <>
      <Header />
      <div className="app">
        <Switch>
          {/* <Route exact path="/" component={DashboardComponent} /> */}
          <Route exact path="/mainPage" component={DashboardComponent} />
          {/* <Route exact path="/dashboard" component={DashboardComponent} /> */}
          <PrivateRoute exact path="/mainPage" component={DashboardComponent} />
           {/* <PrivateRoute exact path="/dashboard" component={DashboardComponent} /> */}
           <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route path="/mainPage/search/:token" strict sensitive 
            render={({ match }) => <SearchComponent match={match} />}
          />
        </Switch>
      </div>
    </>
  );
}

export default Application;