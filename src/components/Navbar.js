import React, { Component } from 'react';
import _ from 'lodash';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { client } from '../index';

const ME = gql`
  query me {
    me {
      id
      email
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
              <AppBar position="static" color="default">
                <Toolbar>
                  <Typography variant="title" color="inherit" style={styles.title}>
                    Cascade
                  </Typography>
                  {user && <Button component={Link} to='/dashboard'>
                    Dashboard ({user.email})
                  </Button>}
                  {user && <Button onClick={() => this.logout()}>
                    Logout
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
    // paddingBottom: '50px',
  },
  title: {
    flex: 1,
  },
}

export default Navbar;
