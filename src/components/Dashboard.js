import React from 'react';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Container from './Container';
import EmptyDashboard from './EmptyDashboard';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import PowerWidget from './widgets/PowerWidget';
import WeatherWidget from './widgets/WeatherWidget';
import DeviceWidget from './widgets/DeviceWidget';
import DevicesList from './DevicesList';

import colors from '../theme/colors';
import step from '../theme/step';

export default (props) => (
  <div>
    <Navbar {...props} />

    <Container>
      <DevicesList />
    </Container>
  </div>
);

const styles = {
};
