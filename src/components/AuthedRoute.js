import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import _ from 'lodash';

import Loader from './Loader';

const ME = gql`
  {
    me {
      id
      email
    }
  }
`;

export default ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    <Query query={ME} fetchPolicy='network-only'>
      {({ loading, error, data }) => {
        if (loading) return <Loader />;

        const user = _.get(data, 'me');

        return user ? <Component {...props} /> : <Redirect to='/login' />
      }}
    </Query>
  )} />
);
