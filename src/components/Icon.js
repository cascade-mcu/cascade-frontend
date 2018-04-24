import React, { Component } from 'react';
import { compose } from 'redux';
import Radium from 'radium';

import step from '../theme/step';

import { ReactComponent as humidity } from '../assets/humidity.svg';
import { ReactComponent as pressure } from '../assets/pressure.svg';
import { ReactComponent as ambientLight } from '../assets/ambient-light.svg';
import { ReactComponent as temperature } from '../assets/temperature.svg';

const TYPES = {
  humidity,
  pressure,
  ambientLight,
  temperature,
};

class Icon extends Component {
  render() {
    const {
      style,
      type,
    } = this.props;

    const TagName = Radium(TYPES[type]);

    return (
      <TagName style={[styles.container, style]} />
    );
  }
};

const styles = {
  container: {
    width: step(),
    height: step(),
    fill: '#fff',
  },
};

export default compose(
  Radium,
)(Icon);
