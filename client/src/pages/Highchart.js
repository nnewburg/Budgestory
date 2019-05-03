import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import { drillDownEvent } from "./DrillDownUp";
import { drillUpEvent } from "./DrillDownUp";
import '../App/styles/home.css';

class Highchart extends Component {
  constructor(props) {
    super(props);
    props.Highcharts.targetLevel = -1;
    this.state = {
      loading: true,
      options: {
        chart: {
          type: this.props.type,
          events: {
            drilldown: (e) => {
              let currentCategoryName = e.seriesOptions.name;
              console.log("drilldown: ", currentCategoryName);
              drillDownEvent(e);
              props.getCurrentCategory(currentCategoryName);
            },
            drillup: function (e) {
              let currentCategoryName = e.seriesOptions.name;
              console.log("drillup: ", currentCategoryName);
              drillUpEvent(e);
              props.getCurrentCategory(currentCategoryName);
            }
          }
        },
        title: {
          text: 'Balance'
        },
        // subtitle: {
        //     text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        // },
        // credits: {
        //   enabled: true
        // },
        // xAxis: {
        //   categories: ["Expenses", "Incomes"]
        // },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.name}: ${point.v:.1f}, {point.y:.1f}%, {point.d}'
            },
            cursor: 'pointer',
            // point: {
            //   events: {
            //     click: function (e) {
            //       alert('clicked! ' + this.state);
            //       console.log("plotOptions.point.events >>> ", this);
            //     }
            //   }
            // }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [
          {
            name: "Balance",
            id: "Balance",
            // colorByPoint: true,
            data: [
              { name: "Expenses", y: 60, v: 600, drilldown: 1},
              { name: "Incomes", y: 40, v: 400, drilldown: 2}
            ]
          }
        ],
        drilldown: {
          series: [
            {
              name: "Expenses",
              id: 1,
              data: [
                { name: "Clothes", y: 70, v: 700, drilldown: 3},
                { name: "Dining Out", y: 30, v: 300, drilldown: 4}
              ]
            },
            {
              name: "Incomes",
              id: 2,
              data: [
                { name: "Salary", y: 90, v: 9000, drilldown: null},
                { name: "Bonus", y: 10, v: 1000, drilldown: null}
              ]
            },
            {
              name: "Clothes",
              id: 3,
              data: [
                { name: "Clothes1", y: 10, v: 100, drilldown: null},
                { name: "Clothes2", y: 20, v: 200, drilldown: null},
                { name: "Clothes3", y: 30, v: 300, drilldown: null},
                { name: "Clothes4", y: 40, v: 400, drilldown: null}
              ]
            },
            {
              name: "Dining Out",
              id: 4,
              data: [
                { name: "Food1", y: 20, v: 200},
                { name: "Food2", y: 30, v: 300},
                { name: "Food3", y: 50, v: 500}
              ]
            }
          ]
        }
      }
    }
  }

  // initializeChartInfo(){
  //   axios('/api/HomeChart', {
  //     params: {
  //       start: this.props.date.start.toISOString().split('T')[0],
  //       end: this.props.date.end.toISOString().split('T')[0]
  //     }
  //   })
  //   .then(
  //     ({data}) => {
  //       this.setState({
  //         loading: false,
  //         options: {
  //           ...this.state.options,
  //           series: data.series,
  //           drilldown: data.drilldown
  //         }
  //       });
  //     }
  //   ).catch(function (error) {
  //     console.log(error);
  //   });
  // }

  // static getDerivedStateFromProps(props, state) {
  //   this.props.Highcharts.charts.forEach((chart) => {
  //     chart.setTitle({text: props.options.title});
  //   });
  //   if(props.options.series.length > 0) {
  //     return {
  //       options: {
  //         ...state.options,
  //         title: props.options.title,
  //         series: props.options.series,
  //         drilldown: props.options.drilldown
  //       }
  //     };
  //   } else{
  //     return {};
  //   }
  // }

  componentDidMount() {
    console.log("componentDidMount")
  }

  render() {
    let options = this.props.options;
    options.chart = this.state.options.chart;
    options.title = {text: options.title}
    options.plotOptions = this.state.options.plotOptions;
    options.tooltip = this.state.options.tooltip;
    return (
      <div id="MajorChart" className="Hightchart">
        <HighchartsReact highcharts={this.props.Highcharts} options={options} />
      </div>
    );
  }
}

export default Highchart;