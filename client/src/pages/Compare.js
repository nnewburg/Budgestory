import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import '../App/styles/compare.css'
import Categories from './select_categories.js'
import DateRange from './DateRange.js'
import Highchart from './Highchart'

class Compare extends Component {

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
    return (
      <div className="container">
        <div className='heading'>
          <h1>Compare Page</h1>
        </div>
        <div className='Categories'>
          <Categories />
        </div>
        <div className='date'>
          <DateRange refreshDate={this.refreshDate.bind(this)}/>
        </div>

        <Highchart type={"pie"} options={this.state.options}/>
        <Highchart type={"column"} options={this.state.options}/>


      </div>
    );
  }
}

export default Compare;