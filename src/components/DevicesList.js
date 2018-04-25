import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import Loader from './Loader';
import DeviceWidget from './widgets/DeviceWidget';

const GET_DEVICES = gql`
  {
    devices {
      id
      name
      createdAt

      wifiLogs(last: 1) {
        ssid
        address
        createdAt
        gateway
        hostname
        mac
        netmask
        rssi
      }

      sensors {
        sensorType {
          name
        }

        logs(last: 1) {
          value
        }
      }
    }
  }
`;

export default (props) => (
  <Query query={GET_DEVICES} fetchPolicy='network-only'>
    {({ loading, error, data }) => {
      if (loading) return <Loader />;

      const {
        devices,
      } = data;

      return (
        <div style={styles.container}>
          {_.map(devices, (device) => (
            <DeviceWidget key={device.id} device={device} />
          ))}
        </div>
      );
    }}
  </Query>
);

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};
