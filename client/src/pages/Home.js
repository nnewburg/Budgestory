import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import DateRange from './datepicker.js'
import '../App/styles/home.css'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        series: [],
        drilldown: {
          series: []
        }
      }
    }
  }

  refreshDate = (startDate, endDate) => {
    let startDateString = "2019-01-01";
    let endDateString = "2019-05-09";
    if(startDate){
      startDateString = startDate.toISOString().split('T')[0]
    }
    if(endDate){
      endDateString = endDate.toISOString().split('T')[0]
    }
    axios('/api/HomeChart', {
      params: {
        start: startDateString,
        end: endDateString
      }
    })
    .then(
      ({data}) => {
        this.setState({
          options: {
            series: data.series,
            drilldown: data.drilldown
          }
        });
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
  }

  render() {

    const newExpenses = evt => {
      evt.preventDefault();
      alert("New Expenses!");
    };
    const newIncomes = evt => {
      evt.preventDefault();
      alert("New Incomes!")
    };
    
    return (
      <div className="App">
        <div id="logo">
          <h1>Budgestory</h1>
        </div>
        <div className="container">
          <div className="add_new_btns">
            <form onSubmit={newExpenses}>
              <button className="add-expenses-btn" type="submit">+ New Expenses</button>
            </form>
            <form onSubmit={newIncomes}>
              <button className="add-incomes-btn" type="submit">+ New Incomes</button>
            </form>
            <div className='date update_area'>
              <DateRange refreshDate={this.refreshDate.bind(this)}/>
              
            </div>
          </div>
        </div>
        <Highchart type={"pie"} options={this.state.options}/>
      </div>
    );
  }
}
export default Home;