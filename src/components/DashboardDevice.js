import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

class DashboardDevice extends Component {
  render() {
    return (
      <div>
        Device
      </div>
    );
  }
}

export default compose(
)(DashboardDevice);

const styles = {
  container: {
    backgroundColor: '#292f36',
    minHeight: '600px',
    color: '#FFFFFF',
    letterSpacing: '1.5px',
  },
};
