import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import Highcharts from 'highcharts';
import CreateNew from './CreateNew'
import DateRange from './datepicker.js'
import '../App/styles/home.css'
import Drilldown from 'highcharts/modules/drilldown';
// check if HighchartsDrilldown has already been loaded
if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
    Drilldown(Highcharts);
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "Balance",
      options: {
        title: "Balance",
        series: [],
        drilldown: {
          series: []
        }
      }
    }
    this.getCurrentCategory.bind(this);
  }

  getCurrentCategory = (category) => {
    this.setState({
      currentCategory: category
    });
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

    

    // Drill Up back to balance level everytime update the chart
    Highcharts.targetLevel = -1;
    Highcharts.charts.forEach((chart) => {
      const drillUpLevel = chart.drilled;
      for(let level = 0; level <= drillUpLevel; level ++) {
        chart.drillUp();
      }
      chart.drilled = 0;
    });

    axios('/api/HomeChart', {
      params: {
        start: startDateString,
        end: endDateString
      }
    })
    .then(
      ({data}) => {

        Highcharts.charts.forEach((chart) => {
          chart.setTitle({text: data.title});
        });
        
        this.setState({
          // ...this.state,
          options: {
            // ...this.state.options,
            title: data.title,
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
            <CreateNew category={this.state.currentCategory}/>
            {/* <form onSubmit={newExpenses}>
              <button className="add-expenses-btn" id="expense" type="submit">+ New Expenses</button>
            </form>
            <form onSubmit={newIncomes}>
              <button className="add-incomes-btn" id="income" type="submit">+ New Incomes</button>
            </form> */}
            <div className='date update_area'>
              <DateRange refreshDate={this.refreshDate.bind(this)}/>
            </div>
          </div>
        <Highchart Highcharts={Highcharts} type={"pie"} options={this.state.options} getCurrentCategory={this.getCurrentCategory}/>
        </div>
      </div>
    );
  }
}
export default Home;