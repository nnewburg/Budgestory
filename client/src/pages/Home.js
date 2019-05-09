import React, { Component } from 'react';
import axios from 'axios';
// import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import Highcharts from 'highcharts';
import NewRecord from './NewRecord'
import DateRange from './DateRange.js'
import '../App/styles/home.css'
import Drilldown from 'highcharts/modules/drilldown';
import Navbar from './Navbar.js';
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
        state: 0,  // 0: Init from Home; 1. Update from DateRange; 2. Generate via new record
        startDate: new Date("2019-04-01"),  // HJ Calender Adjust
        endDate: new Date("2019-04-30")
      },
      options: {
        series: [],
        drilldown: {
          series: []
        }
      },
    }
    this.getCurrentCategory.bind(this);
  }

  // getRealDate(inputDate) {
  //   let outputDate = inputDate.setDate(inputDate.getDate() - 1);
  //   return outputDate;
  // }

  // getStartDate() {
  //   let startDate = new Date();
  //   startDate.setDate(startDate.getDate()-30)
  //   return startDate;
  // }

  getCurrentCategory = (id, name) => {
    this.setState({
      currentCategory: {
        id: id,
        name: name
      }
    });
  }

  refreshDate = (state, startDate, endDate) => {
    let startDateString = "2019-01-01";
    let endDateString = "2019-05-09";
    let startCalender = startDate;
    let endCalender = endDate;

    if(startDate){
      startDate.setDate(startDate.getDate()-1);  // HJ Calender Adjust
      startDateString = startDate.toISOString().split('T')[0]
    }
    if(endDate){
      endDate.setDate(endDate.getDate()-1);  // HJ Calender Adjust
      endDateString = endDate.toISOString().split('T')[0]
    }

    console.log("Home >>> refreshDate: startDateString = ", startDateString);
    console.log("Home >>> refreshDate: endDateString = ", endDateString);

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

        if(state === 1) {  // HJ Calender Adjust
          startCalender.setDate(startCalender.getDate() + 1);
          endCalender.setDate(endCalender.getDate() + 1);
        }
        console.log("Home >>> after axios: start = " + startCalender.toISOString().split('T')[0] + ", end = " + endCalender.toISOString().split('T')[0]);
        let balanceValue = (data.series[0].data[1].v - data.series[0].data[0].v).toFixed(2);

        this.setState({
          // ...this.state,
          date: {
            state: state,
            startDate: startCalender,
            endDate: endCalender
          },
          options: {
            title: "Balance: $" + balanceValue,
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
      <div className="App" id="homeApp">
        <Navbar />
        <div className="homePage">
          <div className="container">
              <NewRecord category={this.state.currentCategory} update={this.refreshDate.bind(this)}/>
            <div className="add_new_btns">
              <div className='date update_area' id= "newRecord">
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