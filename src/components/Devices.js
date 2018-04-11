import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import moment from 'moment';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';
import EmptyDashboard from './EmptyDashboard';

import colors from '../theme/colors';
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
                      <h2>
                        {name} (deviceId: {id}, model: {deviceModelName})
                      </h2>

                      <h3>
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
                              <h4>
                                {name} (sensorId: {id})
                              </h4>

                              <LineChart width={1000} height={400} data={logs}>
                                <XAxis dataKey='createdAt' tickFormatter={(createdAt) => moment(createdAt).format()}/>
                                <YAxis/>

                                <Line type='monotone' dataKey='value' stroke='#82ca9d' dot={false} />
                                <Tooltip/>
                              </LineChart>

                              Logs

                              <div>
                                {_.map(logs, (log) => {
                                  const {
                                    id,
                                    value,
                                    readingTime,
                                    createdAt,
                                  } = log;

                                  return (
                                    <div key={id}>
                                      {readingTime} (createdAt: {createdAt}): {value}
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
  },
  centeredContainer: {
    textAlign: 'center',
  },
};
