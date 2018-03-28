import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Mutation } from "react-apollo";

import Radium from 'radium';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form'
import {
  TextField,
} from 'redux-form-material-ui'
import Button from 'material-ui/Button';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;

class Signup extends Component {
  saveToken(token) {
    localStorage.setItem('token', token);
  }

  handleSuccess(data) {
    const token = _.get(data, 'signup.token');
    if (!token) return;

    this.saveToken(token);
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div>
        <Navbar />
        <Container>
          <Mutation mutation={SIGNUP}>
            {(signup, { data }) => {
              this.handleSuccess(data);
              return (
                <form onSubmit={handleSubmit((variables) => signup({ variables }))}>
                  <Field name='email' component={TextField} placeholder='Email' />
                  <Field name='password' component={TextField} placeholder='Password' />
                  <Button type='submit'>
                    Signup
                  </Button>
                </form>
              );
            }}
          </Mutation>
        </Container>
      </div>
    );
  }
}

export default compose(
  reduxForm({
    form: 'signup',
  }),
)(Signup);
