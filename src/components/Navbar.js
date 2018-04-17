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


class NavbarLink2 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false
    }
  }

  handleMouseEnter() {
    this.setState({
      hover: true,
    })
  }

  handleMouseLeave() {
    this.setState({
      hover: false,
    })
  }

  render() {
    return (
      <Link {...this.props} style={{ textDecoration: 'none', margin:'20px 10px 0 0'}} onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()}>
        <Typography style={{ color: '#FFFFFF', fontSize: '16px', letterSpacing: '0.2px', textAlign: 'left', textDecoration: 'none', marginLeft: '15px'}}>{this.props.children}</Typography>
        <Typography style={{ borderBottom: this.state.hover ? '1px solid #f38411' : '1px solid #171a1f' }}>{this.props.children}</Typography>
      </Link>
    )
  }
}

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
              <AppBar style={styles.appbar}>
                <Toolbar>
                <img style = {styles.icon} src={'/img/icon.png'} />
                {user && <NavbarLink2 to='/add-device'>
                  + Add device 
                  </NavbarLink2>}
                  {user && <NavbarLink2 to='/places'>
                  Rooms
                  </NavbarLink2>}
                  {user && <NavbarLink2 to='/locations'>
                    Locations
                  </NavbarLink2>}
                  {user && <NavbarLink2 to='/dashboard'>
                    Dashboard
                  </NavbarLink2>}
                  {user && <Link style= {styles.market} to='/'>
                  Market
                  </Link>}
                  {user && <Button onClick={() => this.logout()} style={styles.title}>
                  <Typography style={styles.logout}> {user.firstName} </Typography>
                   <FontAwesomeIcon style={styles.faBars} icon={faBars} />
                  </Button>}
                </Toolbar>
              </AppBar>
            </div>
          );
        }}
      </Query>
    );
  }
}

const styles = {
  container: {
  },
  appbar: {
    width: '100%',
    height: '90px',
    backgroundColor: '#000000',
    textTransform: 'uppercase',
    display: 'inline-block',
    textDecoration: 'none',
  },
  icon: {
    marginTop: '7.5px',
    width: '60px',
    height: '75px',
    marginRight: '15px',
    marginLeft: '50px',
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
  Typography: {
    fontSize: '16px',
    //lineHeight: '1.98',
    letterSpacing: '0.2px',
    textAlign: 'left',
    textDecoration: 'none',
    marginLeft: '15px',
  },
  NavbarLink: {
    fontSize: '16px',
    //lineHeight: '1.98',
    letterSpacing: '0.2px',
    textAlign: 'left',
    textDecoration: 'none',
    marginLeft: '15px',
    
  },
  NavbarLink2: {
    fontSize: '16px',
    //lineHeight: '1.98',
    letterSpacing: '0.2px',
    textAlign: 'left',
    textDecoration: 'none',
    marginLeft: '15px',
    color: '#FFFFFF',
  },
  logout: {
    fontSize: '16px',
    //lineHeight: '1.98',
    letterSpacing: '0.2px',
    marginLeft: '575px', 
    color: '#ffffff',
    textDecoration: 'none',
  },
  market: {
    width: '120px',
    padding: '10px',
    borderRadius: '5px',
    border: '2px solid #008975',
    backgroundColor: '#000000',
    color: '#008975',
    fontSize: '16px',
    textAlign: 'center',
    textDecoration: 'none',
  },
  faBars: {
    marginLeft: '5px',
    fontSize: '16px',
  },
}

export default Radium(Navbar);
