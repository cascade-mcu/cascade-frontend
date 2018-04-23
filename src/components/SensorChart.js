import React from 'react';
import {
  AreaChart,
  CartesianGrid,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import _ from 'lodash';

import step from '../theme/step';
import colors from '../theme/colors';

const tooltipFormatter = (value, name, props) => {
  if (name != 'readingTime') return value;

  return moment(value).format('YYYY-MM-DD HH:mm:ss');
};

const labelFormatter = () => {
  return 'dude'
  // return name;
  // if (name != 'readingTime') return value;
  //
  // return moment(value).format('YYYY-MM-DD HH:MM:ss');
};

const transform = (logs) => {
  return _.map(logs, (log) => ({
    ...log,
    readingTime: +moment(log.readingTime),
  }));
};

const SensorTooltip = (props) => (
  <div>
    "ima tooltip
  </div>
);

const tickFormatter = (readingTime) => moment(readingTime).format('YYYY-MM-DD HH:mm:ss');

export default ({
  sensor: {
    sensorType: {
      name,
    },
    logs,
  },
}) => (
  <div>
    <h3 style={styles.heading}>
      {name}
    </h3>
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={transform(logs)}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#82ca9d" stopOpacity={1}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <XAxis
          dataKey='readingTime'
          tickFormatter={tickFormatter}
          scale='time'
          type='number'
          domain={['auto', 'auto']}
          minTickGap={100}
          padding={{ right: 50 }}
          tick={{
            fill: colors.white,
            fontSize: '12px',
          }}
          stroke='#82ca9d'
        />
        <YAxis
          dataKey='value'
          tick={{
            fill: colors.white,
            fontSize: '12px',
          }}
          stroke='#82ca9d'
        />

        <Tooltip
          formatter={tooltipFormatter}
        />
        <Area type="monotone" dataKey='value' stroke="#82ca9d" dot={false} fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey='readingTime' stroke="#8884d8" dot={false} fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const styles = {
  heading: {
    paddingLeft: step(3),
  },
  tick: {
    color: colors.white,
  },
};
