import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import DateRange from './datepicker.js'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDateRange: {
        start: new Date("2018-01-02"),
        end: new Date("2019-05-02")
      }
    }
  }

  refreshDate = (start, end) => {
    this.setState({
      currentDateRange: {
        start: start,
        end: end
      }
    });
  }

  componentDidMount() {

  }

  render() {

    // console.log("Home Date = ", this.state.currentDateRange);

    const newExpenses = evt => {
      evt.preventDefault();
      alert("New Expenses!");
    };
    const newIncomes = evt => {
      evt.preventDefault();
      alert("New Incomes!")
    };
    const updateChart = evt => {
      evt.preventDefault();
      alert("Update based on date selected!")
    };
    return (
      <div className="App">
        <h1>Budgestory</h1>
        <div className="add_new_btns">
          <form onSubmit={newExpenses}>
            <button className="add-expenses-btn" type="submit">+ New Expenses</button>
          </form>
          <form onSubmit={newIncomes}>
            <button className="add-incomes-btn" type="submit">+ New Incomes</button>
          </form>
          <div className='date update_area'>
            <DateRange date={ this.state.currentDateRange } refreshDate={this.refreshDate.bind(this)}/>
            <form onSubmit={updateChart}>
              <button className="update-btn" type="submit">Update</button>
            </form>
          </div>
        </div>
        <Highchart type={"pie"} date={ this.state.currentDateRange }/>
      </div>
    );
  }
}
export default Home;