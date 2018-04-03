import React from 'react';

import Dashboard from './Dashboard';
import ChooseDeviceModel from './ChooseDeviceModel';
import InstallDevice from './InstallDevice';
import ChooseDevice from './ChooseDevice';
import SetupSuccess from './SetupSuccess';
import Device from './Device';
import Signup from './Signup';
import Login from './Login';
import Locations from './Locations';
import Places from './Places';
import AuthedRoute from './AuthedRoute';
import UnauthedRoute from './UnauthedRoute';

export default () => (
  <div>
    <UnauthedRoute path='/signup' exact component={Signup} />
    <UnauthedRoute path='/login' exact component={Login} />
    <AuthedRoute path='/dashboard' exact component={Dashboard} />
    <AuthedRoute path='/locations' exact component={Locations} />
    <AuthedRoute path='/locations/:locationId' exact component={Places} />
    <AuthedRoute path='/add-device' exact component={ChooseDeviceModel} />
    <AuthedRoute path='/install-device/:deviceModelId' exact component={InstallDevice} />
    <AuthedRoute path='/choose-device/:deviceModelId' exact component={ChooseDevice} />
    <AuthedRoute path='/setup-success/:deviceId' exact component={SetupSuccess} />
    <AuthedRoute path='/devices/:deviceId' exact component={Device} />
  </div>
);
