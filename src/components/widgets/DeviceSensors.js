import React from 'react';
import _ from 'lodash';

import TinySensor from './TinySensor';

export default ({ sensors }) => (
  <div style={styles.container}>
    {_.map(sensors, (sensor) => (
      <TinySensor key={sensor.id} sensor={sensor} />
    ))}
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};
