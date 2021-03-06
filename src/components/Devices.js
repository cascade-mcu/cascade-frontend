import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

import step from '../theme/step';

const GET_DEVICES = gql`
  {
    devices {
      id
      name

      deviceModel {
        name
      }

      sensors {
        id

        sensorType {
          name
        }

        logs(last: 100) {
          id
          value
          readingTime
          createdAt
        }
      }
    }
  }
`;

export default (props) => (
  <div>
    <Navbar {...props} />

    <Container>
      <Query query={GET_DEVICES} fetchPolicy='network-only'>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;

          const {
            devices,
          } = data;
          console.log(data);

          return (
            <div style={styles.container}>
              <div>
                <div>
                  Devices
                </div>

                {_.map(devices, (device) => {
                  const {
                    id,
                    name,
                    deviceModel: {
                      name: deviceModelName,
                    },
                    sensors,
                  } = device;
                  console.log(device.sensors);

                  return (
                    <div key={id}>
                      <h2 style={{textAlign:'center', marginTop: '25px'}}>
                        {name} (deviceId: {id}, model: {deviceModelName})
                      </h2>

                      <h3 style={{textAlign:'center'}}>
                        Sensors
                      </h3>

                      <div>
                        {_.map(sensors, (sensor) => {
                          const {
                            id,
                            sensorType: {
                              name,
                            },
                            logs,
                          } = sensor;

                          return (
                            <div key={id}>
                              <h4 style={{textAlign:'center'}}>
                                {name} (sensorId: {id})
                              </h4>
                              <ResponsiveContainer width="90%" height={300}>
                              <AreaChart data={logs}
                                margin={{ top: 10, right: 0, left: 75, bottom: 0 }}>
                                <defs>
                                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#82ca9d" stopOpacity={1}/>
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
                                  </linearGradient>
                                </defs>
                                <XAxis dataKey='readingTime' tickFormatter={(readingTime) => moment(readingTime).format()}/>
                                <YAxis />

                                <Tooltip />
                                <Area type="monotone" dataKey='value' stroke="#82ca9d" dot={false} fillOpacity={1} fill="url(#colorUv)" />
                                <Area type="monotone" dataKey='readingTime' stroke="#8884d8" dot={false} fillOpacity={1} fill="url(#colorUv)" />
                              </AreaChart>
                            </ResponsiveContainer>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
    backgroundColor: '#292f36',
    minHeight: '600px',
    padding: step(),
    color: '#FFFFFF',
    letterSpacing: '1.5px',
  },
  centeredContainer: {
    textAlign: 'center',
  },
};
