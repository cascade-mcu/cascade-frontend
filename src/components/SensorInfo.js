import React from 'react';

import SensorChart from './SensorChart';
import ExportButton from './ExportButton';
import step from '../theme/step';
import colors from '../theme/colors';

export default (props) => {
  const {
    sensor,
    sensor: {
      sensorType: {
        name,
      },
    },
  } = props;

  return (
    <div style={styles.container}>
      <div style={styles.header.container}>
        <div style={styles.header.heading}>
          {name}
        </div>
        <ExportButton {...props} />
      </div>

      <SensorChart sensor={sensor} />
    </div>
  );
};

const styles = {
  container: {
    paddingBottom: step(5),
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
  },
};
