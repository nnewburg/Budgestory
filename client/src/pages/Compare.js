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

let columnData = [];
let columnDataBK = [];
let columnXCategories = [];

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
        state: 0,  // 0: Init from Home; 1. Update from DateRange; 2. Generate via new record; 4. Init from Compare
        startDate: this.getStartDate(),
        endDate: new Date()
      },
      options: {
        series: [],
        drilldown: {
          series: []
        }
      },
      columnOptions: {
        xAxis: {
          categories: ['Feb', 'Mar', 'Apr']
        },
        series: [
          {
            name: 'Category1',
            data: [100, 200, 300]
          },
          {
            name: 'Category2',
            data: [312, 231, 123]
          }
        ]
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
    // console.log("Compare >>> handleChangeOption: divided type = ", selectedOption);
  }

  getCurrentCategory = (id, name) => {
    let columnOptions = this.currentColumnOptions(id);
    this.setState({
      ...this.state,
      currentCategory: {
        id: id,
        name: name
      },
      columnOptions: columnOptions
    });
  }

  getMonthCategory (id) {
    let monthName = "Mon";
    switch(id) {
      case 1: monthName = "Jan"; break;
      case 2: monthName = "Feb"; break;
      case 3: monthName = "Mar"; break;
      case 4: monthName = "Apr"; break;
      case 5: monthName = "May"; break;
      case 6: monthName = "Jun"; break;
      case 7: monthName = "Jul"; break;
      case 8: monthName = "Aug"; break;
      case 9: monthName = "Sep"; break;
      case 10: monthName = "Oct"; break;
      case 11: monthName = "Nov"; break;
      case 12: monthName = "Dec"; break;
      default : monthName = "Mon"; break;
    }
    return monthName;
  }

  getMonthString (id) {
    let monthID = "00";
    switch(id) {
      case 1: monthID = "01"; break;
      case 2: monthID = "02"; break;
      case 3: monthID = "03"; break;
      case 4: monthID = "04"; break;
      case 5: monthID = "05"; break;
      case 6: monthID = "06"; break;
      case 7: monthID = "07"; break;
      case 8: monthID = "08"; break;
      case 9: monthID = "09"; break;
      case 10: monthID = "10"; break;
      case 11: monthID = "11"; break;
      case 12: monthID = "12"; break;
      default : monthID = "00"; break;
    }
    return monthID;
  }

  getMonthEndDate (monthID) {
    let endDate = "31";
    switch(monthID) {
      case 1: endDate = "31"; break;
      case 2: endDate = "28"; break;
      case 3: endDate = "31"; break;
      case 4: endDate = "30"; break;
      case 5: endDate = "31"; break;
      case 6: endDate = "30"; break;
      case 7: endDate = "31"; break;
      case 8: endDate = "31"; break;
      case 9: endDate = "30"; break;
      case 10: endDate = "31"; break;
      case 1: endDate = "30"; break;
      case 12: endDate = "31"; break;
      default : endDate = "31"; break;
    }
    return endDate;
  }

  divideByMonth (start, end) {
    let year = start.stringISO.split('-')[0];
    let startList = [];
    let endList = [];

    let startMonth = parseInt(start.stringISO.split('-')[1], 10);
    let endMonth = parseInt(end.stringISO.split('-')[1], 10);

    startList.push(start.stringISO);
    endList.push(year + "-" + start.stringISO.split('-')[1] + "-" + this.getMonthEndDate(startMonth));
    columnXCategories.push(this.getMonthCategory(startMonth));
    let monthNum = endMonth - startMonth + 1;
    // console.log("divideByMonth >>> monthNum : " + monthNum + ", startMonth: " + startMonth + ", endMonth : " + endMonth);
    // console.log("divideByMonth >>> startMonth : ", startMonth);
    // console.log("divideByMonth >>> endMonth : ", endMonth);
    if(monthNum >= 2) {
      for(let i = startMonth + 1; i < endMonth; i ++) {
        startList.push(year + "-" + this.getMonthString(i) + "-01");
        endList.push(year + "-" + this.getMonthString(i) + "-" + this.getMonthEndDate(i));
        columnXCategories.push(this.getMonthCategory(i));
      }
      startList.push(year + "-" + end.stringISO.split('-')[1] + "-01");
      endList.push(end.stringISO);
      columnXCategories.push(this.getMonthCategory(endMonth));
    }
    // console.log("divideByMonth >>> startList : ", startList);
    // console.log("divideByMonth >>> endList : ", endList);
    // console.log("divideByMonth >>> columnXCategories : ", columnXCategories);

    return {startList: startList, endList: endList};
  }

  currentColumnOptions (categoryID) {

    columnData = JSON.parse(JSON.stringify(columnDataBK));

    if(categoryID === "Balance") {
      categoryID = 0;
    }
    let optionsObj = {
      xAxis: {},
      series: []
    };
    let seriesObj = {};
    if(columnData.length > 0) {
      for(let i = 0; i < columnData.length; i ++) {
        if(columnData[i].pid === categoryID) {
          seriesObj = {};
          seriesObj.name = columnData[i].name;
          seriesObj.data = columnData[i].data;
          optionsObj.series.push(seriesObj);
        }
      }
      optionsObj.xAxis.categories = columnXCategories;
    } else {
      optionsObj = {
        xAxis: {
          categories: ['Mar', 'Apr', 'May']
        },
        series: [
          {
            name: 'Expenses',
            data: [100, 200, 300]
          },
          {
            name: 'Incomes',
            data: [312, 231, 123]
          }
        ]
      };
    }
    console.log("Compare >>> currentColumnOptions: columnData = ", columnData[1].data);
    console.log("Compare >>> currentColumnOptions: columnDataBK = ", columnDataBK[1].data);
    // console.log("Compare >>> currentColumnOptions: optionsObj = ", optionsObj);
    return optionsObj;
  }

  refreshDate = (state, startDate, endDate) => {

    // console.log("Compare >>> refreshDate state = ", state);

    let startCalender = startDate;
    let endCalender = endDate;

    let start = {
      stringISO: "2019-01-01",
      day: "Mon"
    };
    let end = {
      stringISO: "2019-05-31",
      day: "Sun"
    };

    if(startDate){
      start.stringISO = startDate.toISOString().split('T')[0];
      start.day = startDate.toString().split(' ')[0];
    }
    if(endDate){
      end.stringISO = endDate.toISOString().split('T')[0];
      end.day = endDate.toString().split(' ')[0];
    }

    // console.log("Compare >>> refreshDate start = " + start.day);
    // console.log("Compare >>> refreshDate end = " + end.day);

    // Init data for column chart
    // columnData = [];
    columnXCategories = [];

    let dateRange = this.divideByMonth(start, end);

    // Drill Up back to balance level everytime update the chart
    Highcharts.targetLevel = -1;
    Highcharts.charts.forEach((chart) => {
      const drillUpLevel = chart.drilled;
      for(let level = 0; level <= drillUpLevel; level ++) {
        chart.drillUp();
      }
      chart.drilled = 0;
    });

    axios('/api/CompareChart', {
      params: {
        dateRange
      }
    })
    .then(
      ({data}) => {

        let pie = data.pie;

        columnData = JSON.parse(JSON.stringify(data.column));//data.column.slice(0);
        columnDataBK = JSON.parse(JSON.stringify(data.column));

        if(state === 1) {
          // startCalender.setDate(startCalender.getDate() + 1);
          // endCalender.setDate(endCalender.getDate() + 1);
          // console.log("after axio >>> state = "  + state + ", start = " + startCalender.toISOString().split('T')[0] + "， end = " , endCalender.toISOString().split('T')[0]);
        }
        let balanceValue = (pie.series[0].data[1].v - pie.series[0].data[0].v).toFixed(2);
        let columnOptions = this.currentColumnOptions(0);
        this.setState({
          ...this.state,
          date: {
            state: state,
            startDate: startCalender,
            endDate: endCalender
          },
          options: {
            title: "Balance: $" + balanceValue,
            series: pie.series,
            drilldown: pie.drilldown
          },
          columnOptions: columnOptions
        });
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {

  }

  render() {

    const { selectedOption } = this.state;

    return (
      <div className="CompareHome">
          <Navbar />
        <div className="compare-control-area">
          <div className='date update_area'>
            <DateRange date={this.state.date} refreshDate={this.refreshDate.bind(this)}/>
            &ensp;&ensp;&ensp;<a>View:</a>&ensp;
            <div className="compare-by">
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </div>
          </div>
        </div>
        <div className="background-container">
          <br/>
          <br/>
          <hr/>
          <div className="charts-area">
            <ColumnChart Highcharts={Highcharts} options={this.state.columnOptions} /*currentCategory={this.state.currentCategory}*//>
            <PieChartController Highcharts={Highcharts} options={this.state.options} getCurrentCategory={this.getCurrentCategory}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Compare;