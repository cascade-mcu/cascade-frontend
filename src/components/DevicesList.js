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
        <div>
          {_.map(devices, (device) => (
            <DeviceWidget key={device.id} device={device} />
          ))}
        </div>
      );
    }}
  </Query>
);
