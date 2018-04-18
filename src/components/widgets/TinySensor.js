import React from 'react';
import _ from 'lodash';

import colors from '../../theme/colors';
import step from '../../theme/step';

export default (props) => {
  const {
    sensor: {
      sensorType: {
        name,
      },
      logs,
    },
  } = props;

  const lastLog = _.last(logs);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {name}
      </div>
      <div style={styles.value}>
        {_.get(lastLog, 'value') || 'No logs yet'}
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: colors.white,
    textAlign: 'center',
    padding: step(),
  },
  header: {
    fontSize: '18px',
  },
};
