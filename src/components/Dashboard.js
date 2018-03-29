import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';
import EmptyDashboard from './EmptyDashboard';

import colors from '../theme/colors';
import step from '../theme/step';

const GET_DEVICES = gql`
  {
    me {
      id
      devices {
        id
        name
        createdAt
      }
    }
  }
`;

export default () => (
  <div>
    <Navbar />

    <Container>
      <Query query={GET_DEVICES} fetchPolicy='network-only'>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;

          const {
            me: {
              devices,
            },
          } = data;

          return (
            <div style={styles.container}>
              <div style={styles.centeredContainer}>
                <div>
                  Dashboard
                </div>

                {_.isEmpty(devices) && <EmptyDashboard />}
              </div>
            </div>
          );
        }}
      </Query>
    </Container>
  </div>
);

const styles = {
  container: {
    backgroundColor: colors.lightGrey,
    minHeight: '500px',
    padding: step(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    textAlign: 'center',
  },
};

                  // {_.map(devices, (device) => {
                  //   return (
                  //     <Button component={Link} to={`/devices/${device.id}`} key={device.id} variant='raised' fullWidth>
                  //       {device.name}
                  //     </Button>
                  //   );
                  // })}
