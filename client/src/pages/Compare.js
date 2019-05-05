import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Highcharts from 'highcharts';
import DateRange from './DateRange.js'
import PieChartController from './PieChartController.js'
import ColumnChart from './ColumnChart.js';
// import Highchart from './Highchart'
import '../App/styles/compare.css'
import Drilldown from 'highcharts/modules/drilldown';
import Navbar from './Navbar.js'
// check if HighchartsDrilldown has already been loaded
if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
  Drilldown(Highcharts);
}

const options = [
  { value: 1, label: 'Month' },
  { value: 2, label: 'Week' }//,
  // { value: 3, label: 'Day' },
  // { value: 4, label: 'Year' }
];

class Compare extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: 1, label: 'Month' },
      currentCategory: {
        id: 0,
        name: "Balance"
      },
      date: {
        state: 4,  // 0: Init from Home; 1. Update from DateRange; 2. Generate via new record; 4. Init from Compare
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
  }

  getStartDate() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate()-60)
    return startDate;
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

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
    if(startDate){
      startDateString = startDate.toISOString().split('T')[0];
    }
    if(endDate){
      endDateString = endDate.toISOString().split('T')[0];
    }
    console.log("Compare >>> refreshDate start = " + startDateString + ", end = " + endDateString);
    // axios('/api/CompareChart', {
    //   params: {
    //     start: startDateString,
    //     end: endDateString
    //   }
    // })
    // .then(
    //   ({data}) => {

    //     if(state === 1) {
    //       startCalender.setDate(startCalender.getDate() + 1);
    //       endCalender.setDate(endCalender.getDate() + 1);
    //       console.log("after axio >>> state = "  + state + ", start = " + startCalender.toISOString().split('T')[0] + "， end = " , endCalender.toISOString().split('T')[0]);
    //     }
    //     console.log("data.series[0].data = ", data.series[0].data);
    //     let balanceValue = (data.series[0].data[1].v - data.series[0].data[0].v).toFixed(2);

    //     this.setState({
    //       // ...this.state,
    //       date: {
    //         state: state,
    //         startDate: startCalender,
    //         endDate: endCalender
    //       },
    //       options: {
    //         title: "Balance: $" + balanceValue,
    //         series: data.series,
    //         drilldown: data.drilldown
    //       }
    //     });
    //   }
    // ).catch(function (error) {
    //   console.log(error);
    // });
  }

  componentDidMount() {

  }

  render() {

    const { selectedOption } = this.state;

    return (
      <div className="CompareHome">
        <div className='heading'>
          <Navbar />
        </div>
        <div className="compare-control-area">
          <div className='date update_area'>
            <DateRange date={this.state.date} refreshDate={this.refreshDate.bind(this)}/>
            Divide By:
            <div className="compare-by">
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <hr/>
        <div className="charts-area">
          <ColumnChart Highcharts={Highcharts} options={this.state.options} currentCategory={this.state.currentCategory}/>
          <PieChartController Highcharts={Highcharts} options={this.state.options} getCurrentCategory={this.getCurrentCategory}/>
        </div>
        {/* <Highchart type={"pie"} options={this.state.options}/>
        <Highchart type={"column"} options={this.state.options}/> */}

      </div>
    );
  }
}

export default Compare;