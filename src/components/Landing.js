import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';

class Landing extends Component {
  render() {
    return (
      <div style={styles.container}>
        This is landing route
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}

export default compose(
  Radium,
)(Landing);
