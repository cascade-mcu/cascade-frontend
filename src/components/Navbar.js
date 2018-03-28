import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit" style={styles.title}>
              Cascade
            </Typography>
            <Button component={Link} to='/'>
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
      </div>
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
