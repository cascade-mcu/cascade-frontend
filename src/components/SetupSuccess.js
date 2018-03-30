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
        <Navbar />
        <Container>
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
                <div>
                  Success!
                  <div>
                    You now own this device {id}
                  </div>

                  <div>
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
                            <Button type='submit'>
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

export default compose(
  reduxForm({
    form: 'renameDevice',
  }),
)(SetupSuccess);
