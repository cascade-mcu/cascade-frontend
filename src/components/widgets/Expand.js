import React from 'react';
import { Link } from 'react-router-dom';

import step from '../../theme/step';

export default (props) => (
  <div style={styles.container}>
    <Link to={props.to}>
      <img alt='Expand' style={styles.img} src={'/img/expand.png'} />
    </Link>
  </div>
);

const styles = {
  container: {
    backgroundColor: '#3f4854',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: step(0.5),
  },
  img: {
    height: '50px',
    width: '30px',
  },
};
