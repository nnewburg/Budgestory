import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';

class ColumnChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options: {
          chart: {
            marginTop: 70,
            type: 'column',
            events: {
            }
          },
          title: {
            text: 'Balance'
          },
          credits: {
            enabled: false
          },
          legend: {
            layout: 'horizontal',
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: -10,
            floating: true,
            backgroundColor: (props.Highcharts.theme && props.Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
          },
          tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: ${point.y}<br/>Total: ${point.stackTotal}'
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: true,
                color: (props.Highcharts.theme && props.Highcharts.theme.dataLabelsColor) || 'white'
              }
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Total Amount ($ CAD)'
            },
            stackLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: (props.Highcharts.theme && props.Highcharts.theme.textColor) || 'gray'
              }
            }
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar']
          },
          series: [
            {
              name: 'Expenses',
              data: [299.9, 71.5, 106.4]
            },
            {
              name: 'Incomes',
              data: [290.9, 171.5, 56.4]
            }
          ]
        }
      }
    }


    componentDidMount() {

    }

    render() {
      let options = this.props.options;
      options.chart = this.state.options.chart;
      options.title = {text: this.props.options.title};
      options.credit = this.state.options.credit;
      options.legend = this.state.options.legend;
      options.tooltip = this.state.options.tooltip;
      options.plotOptions = this.state.options.plotOptions;
      options.yAxis = this.state.options.yAxis;
      // options.xAxis = this.props.options.xAxis;
      // options.series = this.props.options.series;
      // console.log("ColumnChart >>> options = ", options);
      return (
        <div id="ColunmChart" className="Hightchart">
          <HighchartsReact highcharts={this.props.Highcharts} options={options} />
        </div>
      );
    }
  }

  export default ColumnChart;