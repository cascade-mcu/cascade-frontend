import React from 'react';

import SensorChart from './SensorChart';
import step from '../theme/step';
import colors from '../theme/colors';

export default ({
  sensor,
  sensor: {
    sensorType: {
      name,
    },
  },
}) => (
  <div style={styles.container}>
    <div style={styles.header.container}>
      <div style={styles.header.heading}>
        {name}
      </div>
      <div style={styles.header.exportButton}>
        Export
      </div>
    </div>

    <SensorChart sensor={sensor} />
  </div>
);

const styles = {
  container: {
    paddingBottom: step(3),
  },
  header: {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: step(),
    },
    heading: {
      padding: `0 0 ${step(0.5)} ${step(3.1)}`,
      fontSize: '24px',
      fontWeight: 500,
    },
    exportButton: {
      color: colors.white,
      backgroundColor: '#84C99E',
      padding: `${step(0.5)} ${step(0.7)}`,
      textDecoration: 'uppercase',
      fontSize: '12px',
      cursor: 'pointer',
    },
  },
};
