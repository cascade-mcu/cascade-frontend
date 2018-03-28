import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Device from './Device';
import Signup from './Signup';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/devices/:deviceId' exact component={Device} />
        <Route path='/' exact component={Signup} />
      </div>
    );
  }
}

export default App;
