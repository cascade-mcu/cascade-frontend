import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Radium from 'radium';
import _ from 'lodash';

class Devices extends Component {
  render() {
    const {
      data: {
        devices,
      },
    } = this.props;

    return (
      <div style={styles.container}>
        Devices

        {_.map(devices, (device) => {
          const {
            id,
            createdAt,
            sensors,
          } = device;

          return (
            <div key={id}>
              Device
              {id}: {createdAt}

              <div>
                Sensors:
                {_.map(sensors, (sensor) => {
                  return (
                    <div key={sensor.id}>
                      Sensor: {sensor.name}

                      {_.map(sensor.readings, (reading) => {
                        return (
                          <div key={reading.id}>
                            {reading.createdAt}: {reading.value}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 auto',
  },
}

export const DevicesQuery = gql`
  query DevicesQuery {
    devices {
      id
      createdAt

      sensors {
        id
        name

        readings {
          id
          value
          createdAt
        }
      }
    }
  }
`;

export default compose(
  graphql(DevicesQuery),
)(Devices);
