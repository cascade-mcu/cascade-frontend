import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

export default () => (
  <div>
    <div>
      (here we show example dashboard widgets in the background)
    </div>
    <Button component={Link} to='/add-device' variant='raised' fullWidth>
      Add device
    </Button>
  </div>
);
