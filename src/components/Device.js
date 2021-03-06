import React, { Component } from 'react';
import { compose } from 'redux';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Query } from 'react-apollo';
import moment from 'moment';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';
import SensorInfo from './SensorInfo';

import step from '../theme/step';
import 'react-dates/initialize';
import DatePicker from './DatePicker';
import 'react-dates/lib/css/_datepicker.css';

const GET_DEVICE = gql`
  query device($deviceId: ID!, $startDate: DateTime, $endDate: DateTime) {
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

        logs(last: 50, where: {
          readingTime_gte: $startDate,
          readingTime_lte: $endDate,
        }) {
          id
          value
          readingTime
        }
      }
    }
  }
`;

class Device extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment().subtract(1, 'month'),
      endDate: moment()
    }
  }
  render() {
    const {
      match: {
        params: {
          deviceId,
        },
      },
    } = this.props;

    const {
      startDate,
      endDate,
    } = this.state;

    return (
      <div>
        <Navbar {...this.props} />
        <Container style={styles.container}>
          <Query query={GET_DEVICE} variables={{ deviceId, startDate, endDate }}>
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
                  <div style={styles.meta.container}>
                    <div style={styles.meta.heading}>
                      {name}
                    </div>
                    <div style={styles.meta.id}>
                      ({id})
                    </div>
                    <div>
                    <DatePicker
                      startDate={startDate}
                      startDateId='startDateId'
                      endDate={endDate}
                      endDateId='endDateId'
                      onDatesChange={({ startDate, endDate }) => this.setState({
                       startDate,
                       endDate,
                      })}
                    />
                  </div>
                  </div>
                  </div>

                  <div>
                    {_.map(sensors, (sensor) => (
                      <SensorInfo key={sensor.id} sensor={sensor} startDate={startDate} endDate={endDate} />
                    ))}
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
  meta: {
    container: {
      padding: `0 0 ${step(3)} ${step(3)}`,
    },
    heading: {
      fontSize: '28px',
      fontWeight: 500,
    },
    id: {
      fontSize: '14px',
      marginBottom: '20px',
    },
  },
};
