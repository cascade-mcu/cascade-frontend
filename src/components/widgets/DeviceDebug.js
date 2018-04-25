import React from 'react';
import _ from 'lodash';

import step from '../../theme/step';
import colors from '../../theme/colors';

export default ({
  device: {
    id,
    wifiLogs
  },
}) => {
  const lastLog = _.last(wifiLogs);
  console.log(wifiLogs);

  return (
    <div style={styles.container}>
      <div>
        Device Id: {id}
      </div>

      <div>
        Last connection at: {_.get(lastLog, 'createdAt')}
      </div>
      <div>
        Ssid: {_.get(lastLog, 'ssid')}
      </div>
      <div>
        Signal Strength: {_.get(lastLog, 'rssi')}
      </div>
      <div>
        Address: {_.get(lastLog, 'address')}
      </div>
      <div>
        Gateway: {_.get(lastLog, 'gateway')}
      </div>
      <div>
        Hostname: {_.get(lastLog, 'hostname')}
      </div>
      <div>
        Mac Address: {_.get(lastLog, 'mac')}
      </div>
      <div>
        Netmask: {_.get(lastLog, 'netmask')}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: step(),
    color: colors.white,
  },
};
