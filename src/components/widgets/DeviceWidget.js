import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf';
import _ from 'lodash';

import Expand from './Expand';
import Toggle from './Toggle';
import TinySensor from './TinySensor';

import step from '../../theme/step';
import colors from '../../theme/colors';

export default (props) => {
  const {
    device: {
      id,
      name,

      sensors,
    },
  } = props;

  return (
    <div style={styles.container}>
      <div style={styles.header.container}>
        <FontAwesomeIcon style={styles.header.icon} icon={faLeaf} />
        <div style={styles.header.text}>
          {name}
        </div>
      </div>

      <div style={styles.content.container}>
        <div style={styles.sensors.container}>
          {_.map(sensors, (sensor) => (
            <TinySensor key={sensor.id} sensor={sensor} />
          ))}
        </div>
        <Expand to={`/devices/${id}`} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '550px',
    backgroundColor: '#292f36',
    marginBottom: step(2),
  },
  header: {
    container: {
      height: '50px',
      backgroundColor: colors.green,
      display: 'flex',
      color: colors.white,
      alignItems: 'center',
      padding: `${step(0.2)} ${step()}`,
    },
    text: {
      paddingLeft: step(),
    },
    icon: {
      fontSize: '35px',
      opacity: '0.2',
    },
  },
  content: {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      minHeight: '200px',
    },
  },
  sensors: {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
};
