import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div style={styles.container}>
    <Link to='/'>
      <img style={styles.img} src={'/img/expand.png'} />
    </Link>
  </div>
);

const styles = {
  container: {
    height: '150px',
    width: '50px',
    backgroundColor: '#3f4854',
    float: 'right',
  },
  img: {
    height: '50px',
    width: '30px',
    marginTop: '50px',
    marginLeft: '10px',
  },
};
