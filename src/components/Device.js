import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';

class Device extends Component {
  render() {
    const {
      data: {
        loading,
      },
    } = this.props;

    if (loading) return <div/>;

    const {
      data: {
        device: {
          id,
        },
      },
    } = this.props;

    return (
      <div style={styles.container}>
        Device {id}
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}

export const DeviceQuery = gql`
  query DeviceQuery($deviceId: ID!) {
    device(where: {
      id: $deviceId
   }) {
      id
      createdAt

      sensors {
        id
        name

        readings {
          id
          value
          createdAt
        }
      }
    }
  }
`;

export default compose(
  graphql(DeviceQuery, {
    options: ({
      match: {
        params: {
          deviceId,
        },
      },
    }) => ({
      variables: {
        deviceId,
      },
    }),
  }),
)(Device);
