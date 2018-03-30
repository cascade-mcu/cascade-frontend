import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { reduxForm, Field } from 'redux-form'
import {
  TextField,
} from 'redux-form-material-ui'
import Button from 'material-ui/Button';

import Navbar from './Navbar';
import Container from './Container';

const SIGNUP = gql`
  mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
    }
  }
`;

class Signup extends Component {
  token(data) {
    return _.get(data, 'signup.token');
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
        <Navbar {...this.props} />
        <Container>
          Sign up

          <Mutation mutation={SIGNUP}>
            {(signup, { data, error }) => {
              this.token(data) && this.handleSuccess(this.token(data));

              return (
                <form onSubmit={handleSubmit((variables) => signup({ variables }))}>
                  <Field name='firstName' component={TextField} placeholder='First Name' />
                  <Field name='lastName' component={TextField} placeholder='Last Name' />
                  <Field name='email' component={TextField} placeholder='Email' />
                  <Field name='password' type='password' component={TextField} placeholder='Password' />
                  <Button type='submit'>
                    Signup
                  </Button>

                  <div>
                    {error && _.get(error, 'graphQLErrors[0].message')}
                  </div>
                </form>
              );
            }}
          </Mutation>

          Have an account? Login <Link to='/login'>here</Link>
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
