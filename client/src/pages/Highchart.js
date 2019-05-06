import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import { drillDownEvent } from "./DrillDownUp";
import { drillUpEvent } from "./DrillDownUp";
import '../App/styles/home.css';

class Highchart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      options: {
        chart: {
          type: this.props.type,
          events: {
            drilldown: (e) => {
              let categoryID = e.seriesOptions.id;
              let categoryName = e.seriesOptions.name;
              drillDownEvent(e);
              props.getCurrentCategory(categoryID, categoryName);
            },
            drillup: function (e) {
              let categoryID = e.seriesOptions.id;
              let categoryName = e.seriesOptions.name;
              drillUpEvent(e);
              props.getCurrentCategory(categoryID, categoryName);
            }
          }
        },
        title: {
          text: 'Balance'
        },


        credits: {
          enabled: false
        },

        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.name}: ${point.v:.1f}, {point.y:.1f}%, {point.d}'
            },
            cursor: 'pointer',
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:12px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        series: [
          {
            name: "Balance",
            id: "Balance",
            data: [
              { name: "Expenses", y: 60, v: 600, drilldown: 1},
              { name: "Incomes", y: 40, v: 400, drilldown: 2}
            ]
          }
        ],
        drilldown: {
          drillUpButton: {
            position: {
              x: -100,
              y: 10
            }
          },
          series: []
        }
      }
    }
  }


  componentDidMount() {

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