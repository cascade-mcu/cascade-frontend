import React from 'react';
import { DateRangePicker } from 'react-dates';

export default class DatePicker extends React.Component {
  state = {
    focusedInput: null,
  }

  render() {
    return (
      <DateRangePicker
        {...this.props}
        numberOfMonths={1}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
        focusedInput={this.state.focusedInput}
        isOutsideRange={() => false}
        showDefaultInputIcon
        inputIconPosition="after"
        firstDayOfWeek={1}
        autoFocus
         />
    )
  }
}
