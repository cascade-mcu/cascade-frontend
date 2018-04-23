import React, { Component } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';

import { client } from '../index';
import step from '../theme/step';
import colors from '../theme/colors';

const GET_LOGS = gql`
  query getLogs($skip: Int!, $sensorId: ID!) {
    logs(
      first: 100
      skip: $skip
      where: {
        sensor: {
          id: $sensorId
        }
      }
    ) {
      id
    }
  }
`;

export default class ExportButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      success: false,
      logs: [],
    };
  }

  async getAll() {
    const batchResult = await this.getBatch();
    if (_.isEmpty(batchResult.data, 'logs')) return;

    this.setState((state) => ({
      logs: _.cloneDeep(state.logs).concat(batchResult.data.logs),
    }));

    return await this.getAll();
  }

  async getBatch() {
    return await client.query({
      query: GET_LOGS,
      variables: {
        skip: this.state.logs.length,
        sensorId: this.props.sensor.id,
      },
    });
  }

  async handleStart() {
    this.setState({
      loading: true,
      success: false,
      logs: [],
    });

    await this.getAll();

    console.log('awaited');
    console.log(this.state.logs)
    this.setState({
      loading: false,
      success: true,
    });
  }

  text() {
    const {
      loading,
      success,
    } = this.state;

    if (success) return 'Export complete! Click to download.';
    if (loading) return 'Exporting';

    return 'Export';
  }

  render() {
    return (
      <div
        style={styles.container}
        onClick={() => this.handleStart()}
      >
        {this.text()}
      </div>
    );
  }
}

const styles = {
  container: {
    color: colors.white,
    backgroundColor: '#84C99E',
    padding: `${step(0.5)} ${step(0.7)}`,
    textDecoration: 'uppercase',
    fontSize: '12px',
    cursor: 'pointer',
  },
};
