import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLightbulb from '@fortawesome/fontawesome-free-solid/faLightbulb';

import Expand from './Expand';
import Toggle from './Toggle';

export default (props) => (
  <div style={styles.container}>
    <div style={styles.powerInfo}>
      <FontAwesomeIcon style={styles.faLightbulb} icon={faLightbulb} />
      <Toggle />
    </div>
    <Expand />
    <img style={styles.lightBulb} src={'/img/lightbulb.png'} />
  </div>
);

const styles = {
  container: {
    marginTop: '130px',
    marginLeft: '20px',
    width: '550px',
    height: '200px',
    backgroundColor: '#292f36',
    position: 'relative',
  },
  powerInfo: {
    width: '550px',
    height: '50px',
    backgroundColor: '#f38411',
    display: 'inline-block',
  },
  lightBulb: {
    height: '150px',
    width: '100px',
    position: 'absolute',
    zIndex: '1',
    left: '165px',
    top: '50px',
  },
  faLightbulb: {
    fontSize: '35px',
    opacity: '0.2',
    margin: '7px 0 0 10px',
  },
};
