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
      <div>
        1. Plug your device into the socket
      </div>
      <div>
        <Button component={Link} to={`/choose-device/${deviceModelId}`} variant='raised' fullWidth>
          Next
        </Button>
      </div>
    </Container>
  </div>
);
