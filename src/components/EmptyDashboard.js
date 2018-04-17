import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

export default () => (
  <div>
    <Button style={styles.button} component={Link} to='/add-device' variant='raised' fullWidth>
      Add device
    </Button>
  </div>
);

const styles = {
  button: {
    width: '200px',
    height: '50px',
    backgroundColor: '#000000',
    color: '#008975',
    fontSize: '22px',
    letterSpacing: '2',
    borderRadius: '5px',
    border: '2px solid #008975',
  },
};
