import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '../imports/ui/redux/store/store';
import App from '/imports/ui/App'
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>, document.getElementById('react-target'));
});
