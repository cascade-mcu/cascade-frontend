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

import step from '../theme/step';

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
                  <div style={styles.section}>
                    <h2 style={styles.h2}>
                      Login
                    </h2>
                  </div>
                  <form onSubmit={handleSubmit((variables) => login({ variables }))} style={styles.form.container}>
                    <label style={styles.label}>
                      Email
                    </label>
                    <Field name='email' style={styles.field} component={TextField} />
                    <label style={styles.label}>
                      Password
                    </label>
                    <Field type='password' style={styles.field} component={TextField} />
                    <Button type='submit' style={styles.button}>
                      Login
                    </Button>
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
    maxWidth: '400px',
    height: '400px',
    fontSize: '50px',
    backgroundColor: '#292f36',
    fontSize: '50px',
    margin: 'auto',
  },
  section: {
    // width: '500px',
    height: '80px',
    backgroundColor: '#1b1f24',
  },
  label: {
    color: 'white',
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.25px',
    marginTop: '35px',
  },
  button: {
    width: '150px',
    height: '40px',
    borderRadius: '5px',
    marginLeft: '75px',
    marginTop: '25px',
    backgroundColor: '#3a8564',
    color: 'white',
    cursor: 'pointer',
  },
  h2: {
    color: '#ffffff',
    fontSize: '30px',
    fontWeight: '400',
    marginTop: '22px',
    marginRight: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    float: 'right',
  },
  h4: {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0.13px',
    marginLeft: '75px',
    marginTop: '15px',
  },
  h5: {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0.13px',
    marginLeft: '75px',
    marginTop: '15px',
  },
  field: {
    width: '100%',
    height: '30px',
    backgroundColor: '#3f4854',
  },
  checkbox: {
    borderRadius: '5px',
    backgroundColor: '#3f4854',
    cursor: 'pointer',
  },
  reminder: {
    display: 'flex-wrap',
    color: '#FFFFFF',
    fontSize: '13px',
    margin: '10px 0 0 75px',
  },
  footer: {
    width: '500px',
    height: '50px',
    backgroundColor: '#fa8e03',
  },
  box: {
    width: '75px',
    height: '50px',
    backgroundColor: '#e67500',
    display: 'inline-block',
  },
  regLink: {
    color: '#ffffff',
    fontSize: '28px',
    letterSpacing: '0.5px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    marginTop: '15px',
  },
  faPlus: {
    fontSize: '50px',
    color: '#fa8e03',
    marginLeft: '15px',
    marginBottom: '2px',
  },
  form: {
    container: {
      padding: step(),
    },
  },
};

export default compose(
  reduxForm({
    form: 'login',
    validate,
  }),
)(Login);
