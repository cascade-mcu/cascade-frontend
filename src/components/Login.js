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
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

// import TextField from './TextField';

import step from '../theme/step';
import colors from '../theme/colors';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
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
        <Navbar {...this.props} />

        <Container>

          <Mutation mutation={LOGIN}>
            {(login, { data, error }) => {
              this.token(data) && this.handleSuccess(this.token(data));

              return (
                <div style={styles.container}>
                  <div style={styles.header.container}>
                    Login
                  </div>

                  <form onSubmit={handleSubmit((variables) => login({ variables }))} style={styles.form.container}>
                    <Field name='email' style={styles.field} component={renderField} type='text' placeholder='Email' />
                    <Field name='password' style={styles.field} component={renderField} type='password' placeholder='Password' />
                    <div style={styles.form.button.container}>
                      <button type='submit' style={styles.button}>
                        Login
                      </button>
                    </div>
                    <div>
                      {error && _.get(error, 'graphQLErrors[0].message')}
                    </div>
                  </form>
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
      width: `calc(100% - ${step()})`,
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
      color: colors.lightRed,
    },
  },
};

export default compose(
  reduxForm({
    form: 'login',
    validate,
  }),
)(Login);
