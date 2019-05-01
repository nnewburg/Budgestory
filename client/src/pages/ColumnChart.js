import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highchart from './Highchart'
import axios from 'axios';


// import drilldown from 'highcharts-drilldown';
// drilldown(Highcharts);

class ColumnChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          options: {
            chart: {
              type: 'column'
            },
            credits: {
              enabled: false
            },
            title: {
              text: 'My Expenses'
            },
            series: [
              { data: [1, 2, 3] }
            ]
          }

        }
      }

    retrieveValues(records){
      let outputArray = [];
      let outputObject = {};
      outputObject.data = records.map(x => x.value);
      outputArray.push(outputObject);
      return outputArray;
    }

    // getList = () => {
    //   fetch('/api/getRecords')
    //   .then(res => res.json())
    //   .then(
    //     ({data}) =>
    //     this.setState({
    //       options: {
    //         series: this.retrieveValues(data)
    //       }
    //     })
    //   );
    // }

    componentDidMount() {
      axios('/api/getRecords', {
        params: {
          start: "2019-01-01",
          end: "2019-03-25"
        }
      })
      .then(
        ({ data }) => {
          this.setState ({
            loading: false,
            options: {
              ...this.state.options,
              series: data.series,
              drilldown: data.drilldown
            }
          });
        }
      ).catch(function (error) {
        console.log(error);
      });
      // this.getList();
    }

  render() {
    return (
            <div className='ColumnChart'>
              <HighchartsReact highcharts={Highcharts} options={this.state.options} />

            </div>
    );
  }
}

export default ColumnChart






















