import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';
import Grid from 'material-ui/Grid';

import Navbar from './Navbar';

class Dashboard extends Component {
  render() {
    const {
      data: {
        devices,
      },
    } = this.props;

    return (
      <div>
        <Navbar />

        <div style={styles.container}>
          Dashboard

          {_.map(devices, (device) => {
            return (
              <div key={device.id}>
                {device.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '20px',
  },
}

export const DashboardQuery = gql`
  query DashboardQuery {
    devices {
      id
      name
      createdAt
    }
  }
`;

export default compose(
  graphql(DashboardQuery),
)(Dashboard);
