import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
// check if HighchartsDrilldown has already been loaded
if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
    Drilldown(Highcharts);
}

let chartOptions = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Hao Jiang Balance:$100,000,000 January, 2020'
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
        format: '{point.name}: ${point.v:.1f}, {point.y:.1f}%'
      },
      cursor: 'pointer',
      point: {
        events: {
          click: function (e) {
              // alert('clicked! ' + this.state);
            // console.log(this);
          }
        }
      }
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
};

// var chart = Highcharts.chart('MajorChart', {
//   series: [{
//       type: 'column',
//       data: [{
//           y: 2,
//           drilldown: 'd1'
//       }]
//   }],

//   drilldown: {
//       series: [{
//           type: 'column',
//           data: [1,2,3,4],
//           id: 'd1'
//       }]
//   }
// });

class Highchart extends Component {
  constructor(props) {
    super(props);
    this.allowChartUpdate = true;
    this.state = {
      loading: true,
      options: null
    }
  }

  // updateGraphData = () => {
  //   this.setState({
  //     options: {
  //       data: [
  //         { name: "Food444", y: 50, v: 200},
  //         { name: "Food2", y: 7, v: 300},
  //         { name: "Food3", y: 700, v: 500}
  //       ]
  //     }
  //   })
  // }

  categoryClicked(e) {
    console.log('CLICKED = ', e);
    this.setState({
      options: {
        ...this.state.options,
        series: {
          data: [
            {
              name: "tttt",
              y: 10.74,
            },
            {
              name: "yyy",
              y: 62.57,
            }
          ]
        }
      }
    });
  }
  
  componentDidMount() {
    axios('/api/HomeChart')
    .then(
      ({data}) => {
        this.setState({
            options: {
                chart: {
                  type: "column"
                },
                series: [
                  {
                    events: {
                      click: e => {
                        this.categoryClicked(e);
                      }
                    },
                    data: [
                      {
                        name: "Chrome",
                        y: 62.74,
                      },
                      {
                        name: "Firefox",
                        y: 10.57,
                      }
                    ]
                  }
                ],
            }
        });
      }
    ).catch(function (error) { 
      console.log(error);
    });
  }

  render() {
    console.log("render this.state.options = ", this.state.options);
    return (
      <div id="MajorChart" className="Hightchart">
        {this.state.options && <HighchartsReact
          allowChartUpdate={this.allowChartUpdate}
          ref={"chartComponent"}
          highcharts={Highcharts}
          options={this.state.options}
          oneToOne={true}
        />} 
        {this.state.options ? <HighchartsReact
          allowChartUpdate={this.allowChartUpdate}
          ref={"chartComponent"}
          highcharts={Highcharts}
          options={this.state.options}
          oneToOne={true}
        /> : null} 
      </div>
    );
  }
}

export default Highchart;