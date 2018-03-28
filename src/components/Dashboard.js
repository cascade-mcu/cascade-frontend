import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

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

        <Grid container style={styles.container}>
          <Grid item xs={12} md={6}>
            {_.map(devices, (device) => {
              return (
                <Button component={Link} to={`/devices/${device.id}`} key={device.id} variant='raised' fullWidth>
                  {device.name}
                </Button>
              );
            })}
          </Grid>
        </Grid>
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
