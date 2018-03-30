import React, { Component } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';
import Button from 'material-ui/Button';
import { Mutation } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

const GET_DEVICES = gql`
  query getDevices($deviceModelId: ID!) {
    devices(where: {
      deviceModel: {
        id: $deviceModelId
      }
    }) {
      id
    }

    me {
      id
    }
  }
`;

const ADD_DEVICE_TO_USER = gql`
  mutation addDeviceToUser($deviceId: ID!, $userId: ID!) {
    updateDevice(
      where: {
        id: $deviceId
      }
      data: {
        user: {
          connect: {
            id: $userId
          }
        }
      }
    ) {
      id
    }
  }
`;

export default class ChooseDevice extends Component {
  handleSuccess(data) {
    if (!data) return;

    const {
      updateDevice: {
        id,
      },
    } = data;

    this.props.history.push(`/setup-success/${id}`);
  }

  render() {
    const {
      match: {
        params: {
          deviceModelId,
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar {...this.props} />
        <Container>
          <Query query={GET_DEVICES} variables={{ deviceModelId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              if (error) return `Error! ${error.message}`;

              const {
                devices,
                me: {
                  id: userId,
                },
              } = data;

              return (
                <div>
                  {_.map(devices, (device) => {
                    const {
                      id: deviceId,
                    } = device;

                    const variables = {
                      userId,
                      deviceId,
                    };

                    return (
                      <Mutation key={deviceId} mutation={ADD_DEVICE_TO_USER}>
                        {(addDeviceToUser, { data, error }) => {
                          this.handleSuccess(data);

                          return (
                            <Button onClick={() => addDeviceToUser({ variables })} variant='raised' fullWidth>
                              cascade-{deviceId}
                            </Button>
                          );
                        }}
                      </Mutation>
                    );
                  })}
                </div>
              );
            }}
          </Query>
        </Container>
      </div>
    )
  }
}
