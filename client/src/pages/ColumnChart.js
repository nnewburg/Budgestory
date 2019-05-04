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
          yAxis: {
            min: 0,
            title: {
              text: 'Total Amount of Balance'
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr']
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
              pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
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
          series: [ 
            {
              name: 'Expenses',
              data: [29.9, 71.5, 106.4, 129.2]
            }, 
            {
              name: 'Incomes',
              data: [290.9, 171.5, 56.4, 49.2]
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
      // let options = this.state.options;//this.props.options;
      // options.chart = this.state.options.chart;
      // options.title = {text: this.props.options.title}
      // options.plotOptions = this.state.options.plotOptions;
      // options.tooltip = this.state.options.tooltip;
      return (
        <div id="ColunmChart" className="Hightchart">
          <HighchartsReact highcharts={this.props.Highcharts} options={this.state.options} />
        </div>
      );
    }
  }
  
  export default ColumnChart;