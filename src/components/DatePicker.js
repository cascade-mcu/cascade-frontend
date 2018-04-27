import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


export default class DatePicker extends React.Component {
  state = {
    focused: false,
    date: moment(),
  }
  render() {
    return (
      <SingleDatePicker
        numberOfMonths={1}
        onDateChange={date => this.setState({date})}
        onFocusChange={({ focused }) => this.setState({ focused })}
        focused={this.state.focused}
        date={this.state.date}
        isOutsideRange={() => false}  
      />
    )
  }
}
