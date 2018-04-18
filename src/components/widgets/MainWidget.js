import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf';
import Typography from 'material-ui/Typography';

import Expand from './Expand';
import Toggle from './Toggle';

export default (props) => (
  <div style={styles.container}>
    <div style={styles.mainInfo}>
      <FontAwesomeIcon style={styles.faLeaf} icon={faLeaf} />
      <Toggle />
    </div>

    <Expand />

    <div style={styles.boxContainer}>
      <div style={styles.box}>
        <img style = {styles.icons} src={'/img/sm-temp.png'} />
        <Typography style={styles.text}>
          Temperature
        </Typography>
      </div>
      <div style={styles.box2}>
        <img style={styles.icons} src={'/img/sm-light.png'} />
        <Typography style={styles.text}>
          Light
        </Typography>
      </div>
      <div style={styles.box2}>
        <img style={styles.icons} src={'/img/sm-humidity.png'} />
        <Typography style={styles.text}>
          Humidity
        </Typography>
      </div>
      <div style={styles.box}>
        <img style={styles.icons} src={'/img/sm-pressure.png'} />
        <Typography style={styles.text}>
          Pressure
        </Typography>
      </div>
    </div>
  </div>
);
//<img style = {styles.mainLayer} src={'/img/widget.png'} />

const styles = {
  container: {
    marginTop: '130px',
    marginLeft: '20px',
    width: '550px',
    height: '270px',
    backgroundColor: '#292f36',
  },
  mainInfo: {
    width: '550px',
    height: '50px',
    backgroundColor: '#008975',
    display: 'flex-wrap',
    position: 'relative',
  },
  mainLayer: {
    position: 'absolute',
    height: '225px',
    width: '275px',
    zIndex: '1',
    left: '750px',
    top: '225px',
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
  box2: {
    backgroundColor: '#39414b',
    width: '50%',
  },
  icons: {
    marginTop: '5px',
  },
  text: {
    color: '#FFFFFF',
    fontSize: '12px',
  },
  faLeaf: {
    fontSize: '35px',
    opacity: '0.2',
    margin: '7px 0 0 10px',
  },
};
