import React, { Component } from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { client } from '../index';
import Radium from 'radium';

import NavbarLink from './NavbarLink';

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
                <NavbarLink to='/dashboard'>
                  <img alt='To Dashboard' style={{height: '50px'}} src={'/img/icon.png'} />
                </NavbarLink>
                {user && <NavbarLink to='/dashboard'>
                  Dashboard
                </NavbarLink>}
              </div>
              <div style={styles.rightContainer}>
                {user && <NavbarLink component='div' onClick={() => this.logout()}>
                  Logout
                </NavbarLink>}
                {!user && <NavbarLink to='/login'>
                  Login
                </NavbarLink>}
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
