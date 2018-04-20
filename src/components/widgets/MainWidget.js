import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf';

import Expand from './Expand';
import Toggle from './Toggle';

export default (props) => (
  <div style={styles.container}>
    <div style={{width: '550px', height: '50px', backgroundColor: '#008975', display: 'flex-wrap', position: 'relative'}}>
      <FontAwesomeIcon style={styles.faLeaf} icon={faLeaf} />
      <Toggle />
    </div>

    <Expand />

    <div style={styles.boxContainer}>
      <div style={styles.box}>
        <img style = {{marginTop: '5px'}} src={'/img/sm-temp.png'} />
        <h3 style={{color: '#FFFFFF', fontSize: '12px'}}>
          Temperature
        </h3>
      </div>
      <div style={{backgroundColor: '#39414b', width: '50%'}}>
        <img style={{marginTop: '5px'}} src={'/img/sm-light.png'} />
        <h3 style={{color: '#FFFFFF', fontSize: '12px'}}>
          Light
        </h3>
      </div>
      <div style={styles.box2}>
        <img style={{marginTop: '5px'}} src={'/img/sm-humidity.png'} />
        <h3 style={{color: '#FFFFFF', fontSize: '12px'}}>
          Humidity
        </h3>
      </div>
      <div style={styles.box}>
        <img style={{marginTop: '5px'}} src={'/img/sm-pressure.png'} />
        <h3 style={{color: '#FFFFFF', fontSize: '12px'}}>
          Pressure
        </h3>
      </div>
    </div>
  </div>
);

const styles = {
  container: {
    marginTop: '130px',
    marginLeft: '20px',
    width: '550px',
    height: '270px',
    backgroundColor: '#292f36',
  },
  boxContainer: {
    height: '220px',
    width: '200px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    marginLeft: '300px',
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#333a43',
    width: '50%',
    display: 'inline-block',
  },
  faLeaf: {
    fontSize: '35px',
    opacity: '0.2',
    margin: '7px 0 0 10px',
  },
};
