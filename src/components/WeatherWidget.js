import React from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import Navbar from './Navbar';
import Container from './Container';
import Loader from './Loader';

import colors from '../theme/colors';
import step from '../theme/step';

const GET_WEATHER = gql`
{
    weather(location: "vilnius") {
      temperature
      humidity
      minTemperature
      maxTemperature
    }
    }
      
`;

class Greeting extends Component {
  render() {
    return (
      <div>

        <Container>
          <Query query={GET_WEATHER}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              console.log(data)

              const {
                weather: {
                  temperature,
                  humidity,
                  minTemperature,
                  maxTemperature,
                }
              } = data;

              return (
                <div>
                  <div>
                    Temperature
                  </div>
                  <div>
                    Humidity
                  </div>
                  <div>
                    Min.Temperature
                  </div>
                  <div>
                    Max.Temperature
                  </div>
                  <div>
                    {temperature}
                  </div>
                  <div>
                    {humidity}
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

const styles = {
  container: {
    padding: '20px',
  },
}

export default compose(
)(WeatherWidget);