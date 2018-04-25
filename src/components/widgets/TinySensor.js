import React from 'react';
import _ from 'lodash';

import Icon from '../Icon';

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
      <div style={styles.icon}>
        <Icon type={_.camelCase(name)} style={styles.icon} />
      </div>
      <div style={styles.header}>
        {name}
      </div>
      <div style={styles.value}>
        {_.get(lastLog, 'value') || '-'}
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: colors.white,
    textAlign: 'center',
    padding: step(),
    width: step(5),
    height: step(5),
  },
  header: {
    fontSize: '14px',
    // paddingBottom: step(0.2),
    height: step(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fill: colors.lightGrey,
  },
  value: {
    fontSize: '18px',
    fontWeight: 600,
  },
};
