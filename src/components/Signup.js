import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";

import _ from 'lodash';
import { reduxForm, Field } from 'redux-form'

import Navbar from './Navbar';
import Container from './Container';

import step from '../theme/step';
import colors from '../theme/colors';

import { client } from '../index';

const SIGNUP = gql`
  mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
    }
  }
`;

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div style={styles.form.field}>
    <input {...input} placeholder={placeholder} style={styles.form.input} type={type} />
    {touched && error && <div style={styles.form.error}>
      {error}
    </div>}
  </div>
)

class Signup extends Component {
  token(data) {
    return _.get(data, 'signup.token');
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  handleSuccess(token) {
    this.saveToken(token);
    client.resetStore();
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

          <Mutation mutation={SIGNUP}>
            {(signup, { data, error }) => {
              this.token(data) && this.handleSuccess(this.token(data));

              return (
                <div style={styles.main}>
                  <div style={styles.container}>
                  <div style={styles.header.container}>
                  Sign up
                  </div>

                <form onSubmit={handleSubmit((variables) => signup({ variables }))}>
                <Field name='firstName' style={styles.field} component={renderField} type='text' placeholder='First Name' />
                  <Field name='lastName' style={styles.field} component={renderField} type='text' placeholder='Last Name' />
                  <Field name='email' style={styles.field} component={renderField} type='text' placeholder='Email' />
                  <Field name='password' style={styles.field} component={renderField} type='password' placeholder='Password' />
                  <div>
                    {error && _.get(error, 'graphQLErrors[0].message')}
                  </div>
                  <div style={styles.form.button.container}>
                      <button type='submit' style={styles.button}>
                        Sign up
                      </button>
                      </div>
                </form>
                </div>
                </div>
              );
            }}
          </Mutation>
        </Container>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '350px',
    backgroundColor: '#292f36',
    margin: 'auto',
  },
  header: {
    container: {
      backgroundColor: colors.darkGrey,
      color: colors.white,
      padding: step(),
      textAlign: 'right',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontSize: '24px',
      fontWeight: 600,
    },
  },
  button: {
    backgroundColor: '#3a8564',
    color: 'white',
    cursor: 'pointer',
    border: 0,
    padding: `${step(0.6)} ${step(2)}`,
    marginTop: step(0.5),
    marginBottom: step(0.75),
  },
  form: {
    container: {
      padding: step(),
    },
    button: {
      container: {
        width: '100%',
        textAlign: 'center',
      },
    },
    input: {
      width: `calc(100% - ${step(3)})`,
      marginTop: step(1),
      marginLeft: step(1),
      backgroundColor: '#3f4854',
      padding: step(0.5),
      outline: 0,
      color: colors.white,
    },
    field: {
      marginBottom: step(),
    },
    error: {
      marginTop: step(0.5),
      marginLeft: step(1),
      color: colors.lightRed,
    },
  },
};

export default compose(
  reduxForm({
    form: 'signup',
    validate,
  }),
)(Signup);
