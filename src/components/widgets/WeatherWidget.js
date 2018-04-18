import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCloud from '@fortawesome/fontawesome-free-solid/faCloud';

import Expand from './Expand';
import Toggle from './Toggle';

export default (props) => (
  <div style={styles.container}>
    <div style={styles.info}>
      <FontAwesomeIcon style={styles.faCloud} icon={faCloud} />

      <Toggle />
    </div>

    <Expand />
  </div>
);

const styles = {
  container: {
    width: '550px',
    height: '200px',
    backgroundColor: '#292f36',
    marginTop: '75px',
    display: 'inline-block',
  },
  info: {
    width: '550px',
    height: '50px',
    backgroundColor: '#0288d1',
    display: 'flex-wrap',
  },
  faCloud: {
    fontSize: '35px',
    opacity: '0.2',
    margin: '7px 0 0 10px',
  },
};
