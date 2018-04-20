import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';
import { Mutation } from "react-apollo";
import { reduxForm, Field } from 'redux-form'
import {
  TextField,
} from 'redux-form-material-ui'
import Button from 'material-ui/Button';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

const GET_DEVICE = gql`
  query device($deviceId: ID!) {
    device(where: {
      id: $deviceId
   }) {
      id
      name
    }
  }
`;

const RENAME_DEVICE = gql`
  mutation renameDevice($deviceId: ID!, $name: String!) {
    updateDevice(
      where: {
        id: $deviceId
      }
      data: {
        name: $name
      }
    ) {
      id
      name
    }
  }
`;

class SetupSuccess extends Component {
  handleSuccess(data) {
    if (!data) return;

    this.props.history.push('/dashboard');
  }

  render() {
    const {
      match: {
        params: {
          deviceId,
        },
      },
      handleSubmit,
    } = this.props;

    return (
      <div>
        <Navbar {...this.props} />
        <Container style={styles.container}>
          <Query query={GET_DEVICE} variables={{ deviceId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              if (error) return `Error! ${error.message}`;

              const {
                device: {
                  id,
                },
              } = data;

              return (
                <div style={styles.text}>
                  Success!
                  <div style={styles.text}>
                    You now own this device {id}
                  </div>

                  <div style={styles.text}>
                    Give the name to the device:

                    <Mutation mutation={RENAME_DEVICE}>
                      {(renameDevice, { data, error }) => {
                        this.handleSuccess(data);

                        return (
                          <form onSubmit={handleSubmit(({ name }) => renameDevice({
                            variables: {
                              name,
                              deviceId: id,
                            }
                          }))}>
                            <Field name='name' component={TextField} placeholder='Name' />
                            <Button style={styles.button} type='submit'>
                              Next
                            </Button>

                            <div>
                              {error && _.get(error, 'graphQLErrors[0].message')}
                            </div>
                          </form>
                        );
                      }}
                    </Mutation>
                  </div>
                </div>
              );
            }}
          </Query>
        </Container>
      </div>
    );
  }
}

const styles = {
  container: {
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

export default compose(
  reduxForm({
    form: 'renameDevice',
  }),
)(SetupSuccess);
