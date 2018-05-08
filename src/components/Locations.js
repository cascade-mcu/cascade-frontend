import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

import step from '../theme/step';

const GET_LOCATIONS = gql`
  {
    me {
      id

      locations {
        id
        name
      }
    }
  }
`;

export default (props) => (
  <div>
    <Navbar {...props} />

    <Container>
      <Query query={GET_LOCATIONS} fetchPolicy='network-only'>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;

          const {
            me: {
              locations,
            },
          } = data;

          return (
            <div style={styles.container}>
              <div style={styles.centeredContainer}>
                <div style={styles.text}>
                  Locations
                </div>

                {_.map(locations, (location) => {
                  return (
                    <Button style={styles.button} component={Link} to={`/locations/${location.id}`} key={location.id} variant='raised' fullWidth>
                      {location.name}
                    </Button>
                  );
                })}
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
    padding: step(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: '16px',
    letterSpacing: '1px',
    marginBottom: '20px'
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
