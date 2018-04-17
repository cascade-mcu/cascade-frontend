import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';
import EmptyDashboard from './EmptyDashboard';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faToggleOn from '@fortawesome/fontawesome-free-solid/faToggleOn';
import faLightbulb from '@fortawesome/fontawesome-free-solid/faLightbulb';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf';
import faCloud from '@fortawesome/fontawesome-free-solid/faCloud';


import colors from '../theme/colors';
import step from '../theme/step';

const GET_DEVICES = gql`
  {
    me {
      id
      devices {
        id
        name
        createdAt
      }
    }
  }
`;

export default (props) => (
  <div>
    <Navbar {...props} />

    <Container style={styles.container}>
      <Query query={GET_DEVICES} fetchPolicy='network-only'>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;

          const {
            me: {
              devices,
            },
          } = data;

          return (
            <div style={styles.container}>
              <div style={styles.centeredContainer}>
                {_.isEmpty(devices) && <EmptyDashboard />}

                {_.map(devices, (device) => {
                  return (
                    <Button style={styles.button} component={Link} to={`/devices/${device.id}`} key={device.id} variant='raised' fullWidth>
                      {device.name}
                    </Button>
                  );
                })}

            <div style={styles.powerWidget}>
            <div style={styles.powerInfo}> <FontAwesomeIcon style={styles.faLightbulb} icon={faLightbulb} />
            <FontAwesomeIcon style={styles.faToggleOn} icon={faToggleOn} />
            </div>
            <img style = {styles.lightBulb} src={'/img/lightbulb.png'} />
            </div>

            <div style={styles.weatherWidget}>
            <div style={styles.weatherInfo}><FontAwesomeIcon style={styles.faCloud} icon={faCloud} />
            <FontAwesomeIcon style={styles.faToggleOn} icon={faToggleOn} /></div>
          
            </div>
            </div>

            <div style={styles.mainWidget}>
            <div style={styles.mainInfo}><FontAwesomeIcon style={styles.faLeaf} icon={faLeaf} />
            <FontAwesomeIcon style={styles.faToggleOn} icon={faToggleOn} />
             </div>

              <div style={styles.boxContainer}>

              <div style={styles.box}><img style = {styles.icons} src={'/img/sm-temp.png'} /> <Typography style={styles.text}>Temperature</Typography> </div>
              <div style={styles.box2}><img style = {styles.icons} src={'/img/sm-light.png'} /> <Typography style={styles.text}>Light</Typography> </div>
              <div style={styles.box2}><img style = {styles.icons} src={'/img/sm-humidity.png'} /><Typography style={styles.text}>Humidity</Typography> </div>
              <div style={styles.box}><img style = {styles.icons} src={'/img/sm-pressure.png'} /><Typography style={styles.text}>Pressure</Typography> </div>

              </div>

              <img style = {styles.mainLayer} src={'/img/widget.png'} /> 
              <div style={styles.wrapper}> </div>
              </div>
              </div>
          );
        }}
      </Query>
    </Container>
  </div>
);

const styles = {
container: {
  minHeight: '600px',
  margin: 'auto',
  width: '90%',
  padding: step(),
  display: 'flex',
  flexWrap: 'no-wrap',
},
centeredContainer: {
  // textAlign: 'center',
},
button: {
  // ADD DEVICE BUTTON
  width: '200px',
  height: '50px',
  borderRadius: '5px',
  border: '1px solid #008975',
  margin: 'auto',
  marginTop: '20px',
},

// ----------- ICONS ---------

faLeaf: {
  fontSize: '35px',
  opacity: '0.2',
  margin: '7px 0 0 10px',
},
faLightbulb: {
  fontSize: '35px',
  opacity: '0.2',
  margin: '7px 0 0 10px',
},
faToggleOn: {
  float: 'right',
  fontSize: '50px',
  opacity: '0.2',
  marginRight: '10px',
},
faCloud: {
  fontSize: '35px',
  opacity: '0.2',
  margin: '7px 0 0 10px',
},

// ----------- POWER WIDGET ---------- 

powerWidget: {
  marginTop: '130px',
  marginLeft: '20px',
  width: '550px',
  height: '200px',
  backgroundColor: '#292f36',
  position: 'relative',
  // display: 'inline-block',
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
powerWrapper: {
  height: '150px',
  width: '150px',
  backgroundColor: '#39414b',
  marginLeft: '350px',
},
powerButton: {
  margin: 'auto',
},

// ----------- WEATHER WIDGET ---------- 

weatherWidget: {
  width: '550px',
  height: '200px',
  backgroundColor: '#292f36',
  marginTop: '75px',
},
weatherInfo: {
  width: '550px',
  height: '50px',
  backgroundColor: '#0288d1',
  display: 'flex-wrap',
},
icon: {
  float: 'left',
  marginLeft: '14px',
  marginTop: '8px',
},
h2: {
  textTransform: 'uppercase',
  // marginTop: '50px',
  color: '#FFFFFF',
  letterSpacing: '0.5',
  float: 'right',
  fontSize: '26px',
  marginTop: '15px',
  lineHeight: '20px',
},
weather: {
  borderRight: '0.1em solid #434c57',
  height: '150px',
  marginLeft: '25px',
},

// ----------- MAIN WIDGET ---------- 

mainWidget: {
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
/*circleAnimated: {
 position: 'absolute',
  zIndex: '1',
  left: '925px',
  top: '235px',
}, 
circleLoad: {
  height: '125px',
}, */
wrapper: {
  height: '125px',
  width: '125px',
  // backgroundColor: '#39414b',
  marginLeft: '300px',
},
text: {
textAlign: 'center',
marginLeft: '20px',
marginTop: '20px',
color: '#FFFFFF',
fontSize: '16px',
display: 'inline-block',
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
}
