import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';

class Devices extends Component {
  render() {
    const {
      data: {
        allDevices,
      },
    } = this.props;

    return (
      <div style={styles.container}>
        Devices

        {_.map(allDevices, (device) => (
          <div key={device.id}>
            {device.id}: {device.createdAt}
          </div>
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}

export const DevicesQuery = gql`
  query DevicesQuery {
    allDevices {
      id
      createdAt
    }
}
`;

export default compose(
  graphql(DevicesQuery),
)(Devices);
