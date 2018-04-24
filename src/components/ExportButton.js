import React, { Component } from 'react';
import gql from 'graphql-tag';
import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import CSV from 'comma-separated-values';

import { client } from '../index';
import step from '../theme/step';
import colors from '../theme/colors';

const GET_LOGS = gql`
  query getLogs($skip: Int!, $sensorId: ID!) {
    logs(
      first: 500
      skip: $skip
      where: {
        sensor: {
          id: $sensorId
        }
      }
    ) {
      id
      value
      readingTime
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

  triggerCsvDownload(string, filename) {
    const anchor = $('<a></a>');
    $('body').append(anchor);

    anchor.attr({
      href: 'data:attachment/csv;charset=utf-8,' + encodeURI(string),
      target: '_self',
      download: filename + '.csv',
    });

    anchor[0].click();
    anchor.remove();
  }

  async getAll() {
    const batchResult = await this.getBatch();
    if (!_.get(batchResult, 'data.logs.length')) return Promise.resolve();

    this.setState((state) => ({
      logs: _.cloneDeep(state.logs).concat(batchResult.data.logs),
    }));

    return this.getAll();
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

    this.setState({
      loading: false,
      success: true,
    });
  }

  csvString() {
    const {
      logs,
    } = this.state;

    const HEADERS = [
      'id',
      'value',
      'readingTime',
    ];

    const result = _.map(logs, (log) => {
      return _.map(HEADERS, (header) => {
        return log[header];
      });
    });

    return new CSV(result, { header: HEADERS }).encode();
  }

  downloadCsv() {
    const {
      sensor: {
        sensorType: {
          name,
        },
      },
    } = this.props;

    this.triggerCsvDownload(this.csvString(), _.kebabCase(`cascade-${name}-${moment().format()}`));
  }

  handleClick() {
    if (this.state.success) return this.downloadCsv();

    return this.handleStart();
  }

  text() {
    const {
      loading,
      success,
      logs,
    } = this.state;

    if (success) return 'Export complete! Click to download.';
    if (loading) return `Exporting ${logs.length}/∞`;

    return 'Export';
  }

  render() {
    return (
      <div
        style={styles.container}
        onClick={() => this.handleClick()}
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
