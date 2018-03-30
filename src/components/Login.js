import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";

import _ from 'lodash';
import { reduxForm, Field } from 'redux-form'
import {
  TextField,
} from 'redux-form-material-ui'
import Button from 'material-ui/Button';

import Navbar from './Navbar';
import Container from './Container';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  token(data) {
    return _.get(data, 'login.token');
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  handleSuccess(token) {
    this.saveToken(token);
    this.props.history.push('/dashboard');
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div>
        <Navbar />
        <Container>
          Login

          <Mutation mutation={LOGIN}>
            {(login, { data, error }) => {
              this.token(data) && this.handleSuccess(this.token(data));

              return (
                <form onSubmit={handleSubmit((variables) => login({ variables }))}>
                  <Field name='email' component={TextField} placeholder='Email' />
                  <Field name='password' type='password' component={TextField} placeholder='Password' />
                  <Button type='submit'>
                    Login
                  </Button>

                  <div>
                    {error && _.get(error, 'graphQLErrors[0].message')}
                  </div>
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
    form: 'login',
  }),
)(Login);
