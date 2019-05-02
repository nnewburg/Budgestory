import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import '../App/styles/compare.css'
import isAfter from 'date-fns/isAfter'
import '../App/styles/home.css'
class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.getStartDate(),
      endDate: new Date()
    };
  }

  getStartDate() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate()-30)
    return startDate;
  }

  handleChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;
    if (isAfter(startDate, endDate)) {
      endDate = startDate
    }
    this.setState({ startDate, endDate });
  };

  handleChangeStart = startDate => this.handleChange({ startDate });

  handleChangeEnd = endDate => this.handleChange({ endDate });

  componentDidMount() {
    this.props.refreshDate(this.state.startDate, this.state.endDate);
  }

  render() {


    const updateChart = evt => {
      evt.preventDefault();
      this.props.refreshDate(this.state.startDate, this.state.endDate);
    };

    return (
      <div className = 'row'>
        <pre className = 'column example__code'>
          <code className = 'jsx'>
          </code>
        </pre>
        <div className = 'column calender-area'>
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
        <form onSubmit={updateChart}>
          <button className="update-btn" type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default DateRange