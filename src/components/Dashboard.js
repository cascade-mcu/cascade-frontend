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

export const DashboardQuery = gql`
  query DashboardQuery {
    devices {
      id
      name
      createdAt
    }
  }
`;

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <Container>
          <Query query={DashboardQuery}>
            {({ loading, error, data }) => {
              const {
                devices,
              } = data;

              return (
                <div>
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
