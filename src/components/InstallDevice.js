import React from 'react';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Container from './Container';

export default (props) => (
  <div>
    <Navbar {...props} />
    <Container style={styles.container}>
      <div style={{textAlign: 'center', color: '#FFFFFF', fontSize: '16px', letterSpacing: '1px', marginBottom: '20px'}}>
        1. Plug your device into the socket
      </div>
      <div>
        <Button style={styles.button}
          component={Link}
          to={`/choose-device/${props.match.params.deviceModelId}`}
          variant='raised'
          fullWidth
        >
          Next
        </Button>
      </div>
    </Container>
  </div>
);

const styles = {
  container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    centeredContainer: {
      textAlign: 'center',
    },
  button: {
    width: '100%',
    height: '50px',
    backgroundColor: '#000000',
    color: '#008975',
    fontSize: '22px',
    letterSpacing: '2px',
    borderRadius: '5px',
    border: '2px solid #008975',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

