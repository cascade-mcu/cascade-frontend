import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Devices from './Devices';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={Devices} />
      </div>
    );
  }
}

export default App;
