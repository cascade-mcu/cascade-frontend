import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Container from './Container';
import EmptyDashboard from './EmptyDashboard';
import PropTypes from 'prop-types';

import PowerWidget from './widgets/PowerWidget';
import WeatherWidget from './widgets/WeatherWidget';
import DeviceWidget from './widgets/DeviceWidget';
import DevicesList from './DevicesList';

import colors from '../theme/colors';
import step from '../theme/step';

export default (props) => (
  <div>
    <Navbar {...props} />

    <Container style={styles.container}>
      <DevicesList />
    </Container>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
};
