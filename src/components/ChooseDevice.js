import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';
import { Query } from 'react-apollo';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

const GET_DEVICES = gql`
  query getDevices($deviceModelId: ID!) {
    devices(where: {
      deviceModel: {
        id: $deviceModelId
      }
    }) {
      id
    }
  }
`;

export default ({
  match: {
    params: {
      deviceModelId,
    },
  },
}) => (
  <div>
    <Navbar />
    <Container>
      <Query query={GET_DEVICES} variables={{ deviceModelId }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;

          const {
            devices,
          } = data;

          return (
            <div>
              {_.map(devices, (device) => {
                const {
                  id,
                } = device;

                return (
                  <Button component={Link} to={`/todo`} key={id} variant='raised' fullWidth>
                    {id}
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
