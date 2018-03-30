import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import ChooseDeviceModel from './ChooseDeviceModel';
import InstallDevice from './InstallDevice';
import ChooseDevice from './ChooseDevice';
import SetupSuccess from './SetupSuccess';
import Device from './Device';
import Signup from './Signup';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/add-device' exact component={ChooseDeviceModel} />
        <Route path='/install-device/:deviceModelId' exact component={InstallDevice} />
        <Route path='/choose-device/:deviceModelId' exact component={ChooseDevice} />
        <Route path='/setup-success/:deviceId' exact component={SetupSuccess} />
        <Route path='/devices/:deviceId' exact component={Device} />
        <Route path='/' exact component={Signup} />
        <Route path='/login' exact component={Login} />
      </div>
    );
  }
}

export default App;
