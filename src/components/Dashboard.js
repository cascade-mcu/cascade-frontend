import React from 'react';

import Navbar from './Navbar';
import Container from './Container';

import DevicesList from './DevicesList';

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
