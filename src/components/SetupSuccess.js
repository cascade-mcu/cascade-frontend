import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

const GET_DEVICE = gql`
  query device($deviceId: ID!) {
    device(where: {
      id: $deviceId
   }) {
      id
    }
  }
`;

class SetupSuccess extends Component {
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
          <Query query={GET_DEVICE} variables={{ deviceId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              if (error) return `Error! ${error.message}`;

              const {
                device: {
                  id,
                },
              } = data;

              return (
                <div>
                  Success!
                  <div>
                    You now own this device {id}
                  </div>
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
)(SetupSuccess);
