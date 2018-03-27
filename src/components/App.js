import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Landing from './Landing';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={Landing} />
      </div>
    );
  }
}

export default App;
