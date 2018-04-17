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
import Typography from 'material-ui/Typography';

import Navbar from './Navbar';
import Container from './Container';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';


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
                <div style={styles.main}>
                  <div style={styles.container}>
                  <div style={styles.section}>
                  <Typography style={styles.h2}>SIGN IN</Typography>
                  </div>
                       <form onSubmit={handleSubmit((variables) => login({ variables }))}>
                       <Typography style={styles.title}> Email </Typography>
                    <Field name='email' style={styles.field} component={TextField} />
                    <Typography style={styles.title}> Password </Typography>
                    <Field type='password' style={styles.field} component={TextField} />
                    <Button type='submit' style={styles.button}>
                     Login
                   </Button>
                   <div style={styles.reminder}>
                   <input type='checkbox' style={styles.checkbox}/> Keep me signed in
                   </div>
                   <Typography style={styles.h3}> Forgot your password?</Typography>
                   <Typography style={styles.h4}> PROUDLY CREATED BY “MIND IS” CORP.</Typography>
                   <div style={styles.footer}> 
                   <div style={styles.box}> <FontAwesomeIcon style={styles.faPlus} icon={faPlus} />    
                   </div>
                   <Link style={styles.regLink} to="/Signup"> Join us </Link>  
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
  },
  container: {
    width: '500px',
    height: '500px',
    fontSize: '50px',
    backgroundColor: '#292f36',
    fontSize: '50px',
    margin: 'auto',
    marginTop: '100px',
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
    //':hover': {
    // transform: 'scale(0.*5)',
    // }
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
    marginTop: '15px',
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
  field: {
    width: '350px',
    height: '30px',
    backgroundColor: '#3f4854',
    marginLeft: '75px',
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
    marginTop: '35px',
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
}
export default compose(
  reduxForm({
    form: 'login',
    validate,
  }),
)(Login);
