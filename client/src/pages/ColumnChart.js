import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';

class ColumnChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options: {
          chart: {
            type: 'column',
            events: {
            //   drilldown: (e) => {
            //       let categoryID = e.seriesOptions.id;
            //       let categoryName = e.seriesOptions.name;
            //       props.Highcharts.charts.forEach((chart) => {
            //           chart.setTitle({text: e.seriesOptions.name});
            //       });
            //       props.getCurrentCategory(categoryID, categoryName);
            //   },
            //   drillup: function (e) {
            //       let categoryID = e.seriesOptions.id;
            //       let categoryName = e.seriesOptions.name;
            //       props.Highcharts.charts.forEach((chart) => {
            //           chart.setTitle({text: e.seriesOptions.name});
            //       });
            //       props.getCurrentCategory(categoryID, categoryName);
            //   }
            }
          },
          title: {
            text: 'Balance'
          },
          credits: {
            enabled: false
          },
          legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
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
      console.log("ColumnChart >>> options = ", options);
      return (
        <div id="ColunmChart" className="Hightchart">
          <HighchartsReact highcharts={this.props.Highcharts} options={options} />
        </div>
      );
    }
  }
  
  export default ColumnChart;