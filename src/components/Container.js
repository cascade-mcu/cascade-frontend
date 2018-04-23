import React, { Component } from 'react';
import Radium from 'radium';

import step from '../theme/step';

class Container extends Component {
  render() {
    return (
      <div style={[styles.container, this.props.style]}>
        {this.props.children}
      </div>
    );
  }
}

export default Radium(Container);

const styles = {
  container: {
    padding: `${step()} ${step(0.5)}`,
  },
}
