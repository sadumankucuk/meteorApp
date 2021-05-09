import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import WelcomePage from './WelcomePage';


const App = () => {

  const app = Meteor.user() ? <>
    <Switch>
      <Route path="/" exact component={WelcomePage} />
      <Route path="/login" exact component={LoginPage} />
    </Switch>
  </> :
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />
    </Switch>
  return app;
}

export default App

