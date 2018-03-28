import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

export default class Container extends Component {
  render() {
    return (
      <Grid container style={styles.container}>
        <Grid item xs={12}>
          {this.props.children}
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  container: {
    padding: '20px',
  },
}
