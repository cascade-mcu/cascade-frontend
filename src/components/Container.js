import React, { Component } from 'react';
import step from '../theme/step';

export default class Container extends Component {
  render() {
    return (
      <div style={styles.container}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  container: {
    padding: step(),
  },
}
