import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';
import SensorChart from './SensorChart';

import step from '../theme/step';

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

        logs(last: 50) {
          id
          value
          readingTime
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
        <Container style={styles.container}>
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
                <div>
                  <div style={styles.heading}>
                    {name} ({id})
                  </div>

                  <div>
                    {_.map(sensors, (sensor) => {
                      const {
                        sensorType: {
                          name,
                        },
                        logs,
                      } = sensor;

                      return (
                        <SensorChart key={sensor.id} sensor={sensor} />
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

const styles = {
  container: {
    color: '#FFFFFF',
    padding: step(2),
  },
  heading: {
    padding: `0 0 ${step(3)} ${step(3)}`,
    fontSize: '28px',
    fontWeight: 500,
  },
};
