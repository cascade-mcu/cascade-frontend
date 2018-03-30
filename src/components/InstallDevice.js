import React from 'react';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Container from './Container';

export default (props) => (
  <div>
    <Navbar {...props} />
    <Container>
      <div>
        1. Plug your device into the socket
      </div>
      <div>
        <Button
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
