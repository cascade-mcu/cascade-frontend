import React, { Component } from 'react';
import _ from 'lodash';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link as RouterLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { client } from '../index';
import Radium from 'radium';
import color from 'color';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

import NavbarLink from './NavbarLink';

const Link = Radium(RouterLink)

const ME = gql`
  query me {
    me {
      id
      email
      firstName
    }
  }
`;


class Navbar extends Component {
  logout() {
    localStorage.removeItem('token');
    client.resetStore();

    this.props.history.push('/login');
  }

  render() {
    return (
      <Query query={ME}>
        {({ loading, error, data }) => {
          const user = _.get(data, 'me');
          return (
            <div style={styles.container}>
              <div style={styles.leftContainer}>
                <NavbarLink to='/'>
                  <img style={styles.icon} src={'/img/icon.png'} />
                </NavbarLink>
                {user && <NavbarLink to='/add-device'>
                  + Add Device
                </NavbarLink>}
                {user && <NavbarLink to='/places'>
                  Rooms
                </NavbarLink>}
                {user && <NavbarLink to='/locations'>
                  Locations
                </NavbarLink>}
                {user && <NavbarLink to='/dashboard'>
                  Dashboard
                </NavbarLink>}
              </div>
              <div style={styles.rightContainer}>
                {user && <Link style= {styles.market} to='/'>
                  Market
                </Link>}
                {user && <Button onClick={() => this.logout()}>
                  {user.firstName}
                  <FontAwesomeIcon style={styles.faBars} icon={faBars} />
                </Button>}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const styles = {
  container: {
    marginBottom: '100px',
    padding: '10px 20px',
    backgroundColor: '#000000',
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    height: '50px',
  },
  title: {
    fontSize: '16px',
    //lineHeight: '1.98',
    letterSpacing: '0.2px',
    textAlign: 'left',
    textDecoration: 'none',
    marginLeft: '15px',
    color: '#FFFFFF',
  },
  logout: {
    marginLeft: '50px',
    fontSize: '16px',
    letterSpacing: '1px',
    textDecoration: 'none',
    color: '#FFFFFF',
  },
  market: {
    width: '120px',
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #008975',
    backgroundColor: '#000000',
    color: '#008975',
    fontSize: '16px',
    letterSpacing: '1px',
    textAlign: 'center',
    textDecoration: 'none',
    marginLeft: '475px',
  },
  faBars: {
    fontSize: '16px',
    color: '#fff',
  },
}

export default Radium(Navbar);
