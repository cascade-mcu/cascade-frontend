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
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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
                <div style={styles.container}>
                <div>
                  <h1 style={{textAlign:'center', marginTop: '50px'}}>
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
                            <AreaChart style={{alignItems:'center'}} width={1200} height={300} data={logs}
  margin={{ top: 10, right: 0, left: 200, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#008975" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey='createdAt' tickFormatter={(createdAt) => moment(createdAt).format()}/>
  <YAxis />
  
  <Tooltip />
  <Area type="monotone" dataKey='value' stroke="#8884d8" dot={false} fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey='value' stroke="#82ca9d" dot={false} fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
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
