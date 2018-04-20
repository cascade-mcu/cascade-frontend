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
                  <div style={styles.section}>
                  <h2 style={styles.h2}>SIGN UP</h2>
                  </div>
                <form onSubmit={handleSubmit((variables) => signup({ variables }))}>
                <h3 style={styles.title}> First Name </h3>
                  <Field name='firstName' style={styles.field} component={TextField} />
                  <h3 style={styles.title}> Last Name </h3>
                  <Field name='lastName' style={styles.field}  component={TextField} />
                  <h3 style={styles.title}> Email </h3>
                  <Field name='email' style={styles.field} component={TextField} />
                  <h3 style={styles.title}> Password </h3>
                  <Field name='password' style={styles.field} type='password' component={TextField} />
                  <Button type='submit' style={styles.button}>
                     Signup
                   </Button>
                   <h4 style={styles.h4}> PROUDLY CREATED BY “MIND IS” CORP.</h4>
                   <div style={styles.footer}> 
                   <div style={styles.box}> <FontAwesomeIcon style={styles.faPlus} icon={faPlus} /> </div> 
                   <Link style={styles.logLink} to="/Login">Already have an account?</Link>       
                   </div>
                  <div>
                    {error && _.get(error, 'graphQLErrors[0].message')}
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
  main: {
    width: '50%',
    margin: 'auto',
    marginBottom: '50px',
},
container: {
    width: '500px',
    height: '700px',
    fontSize: '50px',
    backgroundColor: '#292f36',
    fontSize: '50px',
    margin: 'auto',
    
},
section: {
  width: '500px',
  height: '80px',
  backgroundColor: '#1b1f24',
},
title: {
  color: 'white',
  fontSize: '20px',
  fontWeight: '400',
  lineHeight: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.25px',
  marginLeft: '75px',
  marginTop: '35px',
  },
icon: {
  marginLeft: '114px',
  marginTop: '42px',
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
h3: {
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '400',
  textTransform: 'uppercase',
  letterSpacing: '0.13px',
  marginLeft: '75px',
  marginTop: '20px',
},
h4: {
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '400',
  textTransform: 'uppercase',
  letterSpacing: '0.13px',
  marginLeft: '75px',
},
field: {
  width: '350px',
  height: '30px',
  backgroundColor: '#3f4854',
  marginLeft: '75px',
},
footer: {
  width: '500px',
  height: '50px',
  backgroundColor: '#fa8e03',
},
logLink: {
color: '#ffffff',
fontSize: '28px',
letterSpacing: '0.5px',
textDecoration: 'none',
textTransform: 'uppercase',
},
box: {
  width: '75px',
  height: '50px',
  backgroundColor: '#e67500',
  display: 'inline-block',
},
faPlus: {
  justifyContent: 'center',
  fontSize: '50px',
  color: '#fa8e03',
  marginLeft: '15px',
  marginBottom: '2px',
},
}

export default compose(
  reduxForm({
    form: 'signup',
    validate, 
  }),
)(Signup);