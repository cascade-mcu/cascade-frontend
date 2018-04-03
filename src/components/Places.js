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

import colors from '../theme/colors';
import step from '../theme/step';

const GET_PLACES = gql`
  query getPlaces($locationId: ID!) {
    location(where: {
      id: $locationId,
    }) {
      places {
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
      <Query
        query={GET_PLACES}
        variables={{
          locationId: props.match.params.locationId,
        }}
        fetchPolicy='network-only'>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;

          const {
            location: {
              places,
            },
          } = data;

          return (
            <div style={styles.container}>
              <div style={styles.centeredContainer}>
                <div>
                  PLACES
                </div>

                {_.map(places, (place) => {
                  return (
                    <Button component={Link} to={`/places/${place.id}`} key={place.id} variant='raised' fullWidth>
                      {place.name}
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
    backgroundColor: colors.lightGrey,
    minHeight: '500px',
    padding: step(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    textAlign: 'center',
  },
};
