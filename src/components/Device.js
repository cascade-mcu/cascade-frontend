import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';

const DeviceQuery = gql`
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

class Device extends Component {
  render() {
    const {
      match: {
        params: {
          deviceId,
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar />
        <Container>
          <Query query={DeviceQuery} variables={{ deviceId }}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              const {
                device: {
                  id,
                },
              } = data;

              return (
                <div>
                  Device {id}
                </div>
              );
            }}
          </Query>
        </Container>
      </div>
    );
  }
}

export default compose(
)(Device);
