import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Device from './Device';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={Dashboard} />
        <Route path='/devices/:deviceId' exact component={Device} />
      </div>
    );
  }
}

export default App;
