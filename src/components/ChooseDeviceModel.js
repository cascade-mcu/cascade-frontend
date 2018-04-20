import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

const GET_DEVICE_MODELS = gql`
  {
    deviceModels {
      id
      available
      name
    }
  }
`;

export default () => (
  <div>
    <Navbar {...this.props} />
    <Container style={styles.container}>
      <Query query={GET_DEVICE_MODELS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return `Error! ${error.message}`;

          const {
            deviceModels,
          } = data;

          return (
            <div>
              <div style={{textAlign: 'center', color: '#FFFFFF', fontSize: '16px', letterSpacing: '1px', marginBottom: '20px'}}>
                Choose your device model
                </div>
              {_.map(deviceModels, (deviceModel) => {
                const {
                  id,
                  name,
                  available,
                } = deviceModel;

                return (
                  <Button style={styles.button} component={Link} to={`/install-device/${id}`} key={id} variant='raised' fullWidth disabled={!available}>
                    {name} {!available && '(Coming Soon)'}
                  </Button>
                );
              })}
            </div>
          );
        }}
      </Query>
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
