import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Devices from './Devices';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={Dashboard} />
        <Route path='/devices' exact component={Devices} />
      </div>
    );
  }
}

export default App;
