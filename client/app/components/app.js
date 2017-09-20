import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import '../style/app.scss';
import Header from './header';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import Dashboard from './Dashboard';
import RequireAuth from './requireAuth';

const App = ({ match }) => (
  <div>
    <Header matchProp={match} />
    <div className="container">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path={`${match.url}signin`} component={LoginForm} />
        <Route path={`${match.url}signup`} component={SignUpForm} />
        <Route path={`${match.url}dashboard`} component={RequireAuth(Dashboard)} />
        {/* <Route path={`${match.url}protected`} component={RequireAuth(Protected)} /> */}
      </Switch>
    </div>
  </div>
);
export default App;
