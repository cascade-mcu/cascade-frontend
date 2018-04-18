import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faToggleOn from '@fortawesome/fontawesome-free-solid/faToggleOn';

export default (props) => (
  <FontAwesomeIcon style={styles.container} icon={faToggleOn} />
);

const styles = {
  container: {
    float: 'right',
    fontSize: '50px',
    opacity: '0.2',
    marginRight: '10px',
  },
};
