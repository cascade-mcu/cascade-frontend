import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';
import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Navbar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Cascade
            </Typography>
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
}

export default Navbar;
