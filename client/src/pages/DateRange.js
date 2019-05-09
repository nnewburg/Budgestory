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
      startDate: this.getCalenderDate(this.props.date.startDate),
      endDate: this.getCalenderDate(this.props.date.endDate)
    };
  }

  // Adjust real date passed down from Home or Compare page into DatePicker element
  getCalenderDate(inputDate) {
    let outputDate = inputDate.setDate(inputDate.getDate() + 1);
    return outputDate;
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

  static getDerivedStateFromProps(props, state) {
    // console.log("DR >>> props.date.state = ", props.date.state);
    // if(props.date.state === 4) {
    //   return {
    //     startDate: state.startDate,
    //     endDate: state.endDate,
    //   };
    // }
    // console.log("DR >>> getDerivedStateFromProps: props, start: " + props.date.startDate.toISOString().split('T')[0] + ", end: " + props.date.endDate.toISOString().split('T')[0]);
    // console.log("DR >>> getDerivedStateFromProps: state, start: " + state.startDate.toISOString().split('T')[0] + ", end: " + state.endDate.toISOString().split('T')[0]);
    if(props.date.state === 1) {
      return {
        startDate: state.startDate,
        endDate: state.endDate,
      };
    } else {
      let startDate = props.date.startDate;
      let endDate = props.date.endDate;
      if(props.date.state === 2) {
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 1);
      }
      return {
        startDate: startDate,
        endDate: endDate,
      };
    }
  }

  passDateToParent = (start, end) => {
    // console.log("DR >>> passDateToParent: start = ", start);
    // console.log("DR >>> passDateToParent: end = ", end);
    // let startDate = this.getRealDate(start.toISOString());
    // let endDate = this.getRealDate(end.toISOString());
    let startDate = new Date(start.toISOString());
    let endDate = new Date(end.toISOString());

    console.log("DR >>> passDateToParent: startDate = ", startDate);
    console.log("DR >>> passDateToParent: endDate = ", endDate);
    this.props.refreshDate(1, start, end);
  }

  componentDidMount() {
    // this.passDateToParent(this.state.startDate, this.state.endDate);
    this.props.refreshDate(1, this.state.startDate, this.state.endDate);   // HJ Calender Adjust
  }

  render() {

    const updateChart = evt => {
      evt.preventDefault();
      // this.passDateToParent(this.state.startDate, this.state.endDate);
      this.props.refreshDate(1, this.state.startDate, this.state.endDate);   // HJ Calender Adjust
    };

    return (
      <div className = 'row'>
        <pre className = 'column example__code'>
          <code className = 'jsx'>
          </code>
        </pre>
        <div className = 'column calender-area'>
          &ensp;Start:&ensp;
          <DatePicker
            // dateFormat="yyyy-MM-dd"
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}

          />&ensp;End:&ensp;

          <DatePicker
            // dateFormat="yyyy-MM-dd"
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />&ensp;
        </div>
        <form onSubmit={updateChart}>
          <button className="update-btn" id="update" type="submit"></button>
        </form>
      </div>
    );
  }
}

export default DateRange