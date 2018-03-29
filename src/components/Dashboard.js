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

class Dashboard extends Component {
  render() {
    return (
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
                <div>
                  Dash
                  {_.map(devices, (device) => {
                    return (
                      <Button component={Link} to={`/devices/${device.id}`} key={device.id} variant='raised' fullWidth>
                        {device.name}
                      </Button>
                    );
                  })}
                </div>
              );
            }}
          </Query>
        </Container>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '20px',
  },
}

export default compose(
)(Dashboard);
