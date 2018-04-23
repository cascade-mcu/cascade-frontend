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

export default ({
  sensor: {
    sensorType: {
      name,
    },
    logs,
  },
}) => (
  <div>
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
