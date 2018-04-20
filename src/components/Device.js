import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

import {
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

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
                <div style={styles.container}>
                <div>
                  <h1 style={{textAlign:'center'}}>
                    Device
                  </h1>

                  <div style={{textAlign:'center'}}>
                    {name} ({id})
                  </div>

                  <div>
                    <h2 style={{textAlign:'center'}}>
                      Sensors:
                    </h2>

                    <div>
                      {_.map(sensors, (sensor) => {
                        const {
                          sensorType: {
                            name,
                          },
                          logs,
                        } = sensor;

                        return (
                          <div key={id}>
                            <h3 style={{textAlign:'center'}}>
                              {name}
                            </h3>
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
    backgroundColor: '#292f36',
    minHeight: '600px',
    color: '#FFFFFF',
    letterSpacing: '1.5px',
  },
};
