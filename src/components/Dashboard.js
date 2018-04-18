import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';
import EmptyDashboard from './EmptyDashboard';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import PowerWidget from './widgets/PowerWidget';
import WeatherWidget from './widgets/WeatherWidget';
import DeviceWidget from './widgets/DeviceWidget';

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

export default (props) => (
  <div>
    <Navbar {...props} />

    <Container style={styles.container}>
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
              <PowerWidget />
              <WeatherWidget />
              <DeviceWidget />
            </div>
          );
        }}
      </Query>
    </Container>
  </div>
);

const styles = {
  container: {
    minHeight: '600px',
    margin: 'auto',
    width: '90%',
    padding: step(),
    display: 'flex',
    flexWrap: 'wrap',
  },
};
