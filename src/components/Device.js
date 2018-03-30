import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';

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
      createdAt

      sensors {
        id

        sensorType {
          name
        }

        logs {
          id
          value
          createdAt
        }
      }
    }
  }
`;

class Device extends Component {
  render() {
    const {
      match: {
        params: {
          deviceId,
        },
      },
    } = this.props;

    return (
      <div>
        <Navbar {...this.props} />
        <Container>
          <Query query={GET_DEVICE} variables={{ deviceId }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              if (error) return `Error! ${error.message}`;

              const {
                device: {
                  id,
                  name,

                  sensors,
                },
              } = data;

              return (
                <div>
                  <h1>
                    Device
                  </h1>

                  <div>
                    {name} ({id})
                  </div>

                  <div>
                    <h2>
                      Sensors:
                    </h2>

                    <div>
                      {_.map(sensors, (sensor) => {
                        const {
                          sensorType: {
                            name,
                          },
                        } = sensor;

                        return (
                          <div key={id}>
                            <h3>
                              {name}
                            </h3>
                          </div>
                        );
                      })}
                    </div>
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
)(Device);
