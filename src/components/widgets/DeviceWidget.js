import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf';
import _ from 'lodash';
import Radium from 'radium';
import { Link as RouterLink } from 'react-router-dom';

import Expand from './Expand';
import Toggle from './Toggle';
import TinySensor from './TinySensor';

import step from '../../theme/step';
import colors from '../../theme/colors';

const Link = Radium(RouterLink);

export default class DeviceWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      debug: false,
    };
  }

  handleToggle() {
    this.setState((state) => ({
      debug: !state.debug,
    }));
  }

  render() {
    const {
      device: {
        id,
        name,

        sensors,
      },
    } = this.props;

    const {
      debug,
    } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.header.container}>
          <div style={styles.header.left}>
            <FontAwesomeIcon style={styles.header.icon} icon={faLeaf} />
            <div style={styles.header.text}>
              {name}
            </div>
          </div>
          <div>
            <div onClick={() => this.handleToggle()} style={styles.header.button}>
              {debug ? 'Sensors' : 'Debug'}
            </div>
            <Link to={`/devices/${id}`} style={styles.header.button}>
              Charts
            </Link>
          </div>
        </div>

        <div style={styles.content.container}>
          {debug && <div style={styles.debug.container}>
            <div>
              Wifi: ...
            </div>
          </div>}
          {!debug && <div style={styles.sensors.container}>
            {_.map(sensors, (sensor) => (
              <TinySensor key={sensor.id} sensor={sensor} />
            ))}
          </div>}
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    width: `calc(100vw - ${step(2)})`,
    maxWidth: step(5 * 4 + 2 * 4),
    backgroundColor: '#292f36',
    margin: step(),
  },
  header: {
    container: {
      height: '50px',
      backgroundColor: colors.green,
      display: 'flex',
      color: colors.white,
      alignItems: 'center',
      padding: `${step(0.2)} ${step(0.5)}`,
      justifyContent: 'space-between',
    },
    button: {
      color: colors.white,
      textDecoration: 'none',
      backgroundColor: colors.veryLightGrey,
      textTransform: 'uppercase',
      padding: `${step(0.5)} ${step()}`,
      fontSize: '12px',
      marginLeft: step(0.5),
      display: 'inline-block',
      cursor: 'pointer',

      ':hover': {
        backgroundColor: colors.hoverVeryLightGrey,
      },
    },
    text: {
      paddingLeft: step(0.5),
    },
    icon: {
      fontSize: '20px',
      opacity: '0.15',
    },
    left: {
      display: 'flex',
      alignItems: 'center',
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
  debug: {
    container: {
      padding: step(),
      color: colors.white,
    },
  },
};
