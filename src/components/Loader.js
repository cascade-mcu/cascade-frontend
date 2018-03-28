import React, { Component } from 'react';
import { CircularProgress } from 'material-ui/Progress';

import Container from './Container';

export default class Loader extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <CircularProgress />
      </Container>
    );
  }
}

const styles = {
  container: {
    textAlign: 'center',
  },
};
