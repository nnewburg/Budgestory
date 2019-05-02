import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import '../App/styles/compare.css'
import isAfter from 'date-fns/isAfter'

class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.date.start,
      endDate: this.props.date.end
    };
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;
    if (isAfter(startDate, endDate)) {
      endDate = startDate
    }
    this.setState({ startDate, endDate });
    // console.log(this.state.startDate.toISOString());
    this.props.refreshDate(this.state.startDate.toISOString(), this.state.endDate.toISOString());
  };

  handleChangeStart = startDate => this.handleChange({ startDate });

  handleChangeEnd = endDate => this.handleChange({ endDate });

  render() {
    // console.log("DataRange = ", this.state);
    return (
      <div className = 'row'>
        <pre className = 'column example__code'>
          <code className = 'jsx'>
          </code>
        </pre>
        <div className = 'column'>
          <DatePicker
            // dateFormat="yyyy-MM-dd"
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
          />
          <DatePicker
            // dateFormat="yyyy-MM-dd"
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
        </div>
      </div>
    );
  }
}

export default DateRange