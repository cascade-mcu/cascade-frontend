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

const GET_DEVICE_MODELS = gql`
  {
    deviceModels {
      id
      available
      name
    }
  }
`;

export default () => (
  <div>
    <Navbar />
    <Container>
      <Query query={GET_DEVICE_MODELS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;

          const {
            deviceModels,
          } = data;

          return (
            <div>
              {_.map(deviceModels, (deviceModel) => {
                const {
                  id,
                  name,
                  available,
                } = deviceModel;

                return (
                  <Button component={Link} to={`/install-device/${id}`} key={id} variant='raised' fullWidth disabled={!available}>
                    {name} {!available && '(Coming Soon)'}
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
