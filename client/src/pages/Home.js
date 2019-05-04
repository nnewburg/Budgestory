import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import Highcharts from 'highcharts';
import NewRecord from './NewRecord'
import DateRange from './DateRange.js'
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
      currentCategory: {
        id: 0,
        name: "Balance"
      },
      date: {
        init: true,
        startDate: this.getStartDate(),
        endDate: new Date()
      },
      options: {
        series: [],
        drilldown: {
          series: []
        }
      }
    }
    this.getCurrentCategory.bind(this);
  }

  getStartDate() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate()-30)
    return startDate;
  }

  getCurrentCategory = (id, name) => {
    this.setState({
      currentCategory: {
        id: id,
        name: name
      }
    });
  }

  refreshDate = (init, startDate, endDate) => {
    let startDateString = "2019-01-01";
    let endDateString = "2019-05-09";
    let startCalender = startDate;
    let endCalender = endDate;

    if(startDate){
      // startDate.setDate(startDate.getDate() - 1);
      startDateString = startDate.toISOString().split('T')[0]
    }
    if(endDate){
      // endDate.setDate(endDate.getDate() - 1);
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
    console.log("refreshDate >>> init = "  + init + ", startDate = " + startDateString + "， endDate = " , endDateString);
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

        if(!init) {
          startCalender.setDate(startCalender.getDate() + 1);
          endCalender.setDate(endCalender.getDate() + 1);
          console.log("after axio >>> init = "  + init + ", start = " + startCalender.toISOString().split('T')[0] + "， end = " , endCalender.toISOString().split('T')[0]);
        }

        this.setState({
          // ...this.state,
          date: {
            init: init,
            startDate: startCalender,
            endDate: endCalender
          },
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
      <nav className="navbar">
        <div id="logo">
          <a href="/"><img src={require("../App/picture/logo.png")}/></a>
          <a href="/" className="navbar-brand">BudgeStory</a>
        </div>
      </nav>
      <div className="homePage">
        <div className="container">
          <div className="add_new_btns">
            <NewRecord category={this.state.currentCategory} update={this.refreshDate.bind(this)}/>
            {/* <form onSubmit={newExpenses}>
              <button className="add-expenses-btn" id="expense" type="submit">+ New Expenses</button>
            </form>
            <form onSubmit={newIncomes}>
              <button className="add-incomes-btn" id="income" type="submit">+ New Incomes</button>
            </form> */}
            <div className='date update_area'>
              <DateRange date={this.state.date} refreshDate={this.refreshDate.bind(this)}/>
            </div>
          </div>
        <Highchart Highcharts={Highcharts} type={"pie"} options={this.state.options} getCurrentCategory={this.getCurrentCategory}/>
        </div>
      </div>
      </div>
    );
  }
}
export default Home;