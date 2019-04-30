import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

    getList = () => {
      fetch('/api/getRecords')
      .then(res => res.json())
      .then(
        ({data}) =>
        this.setState({
          options: {
            series: this.retrieveValues(data)
          }
        })
      );
    }

    componentDidMount() {
      this.getList();
    }

  render() {
    return (
            <div className='pie'>
              <HighchartsReact highcharts={Highcharts} options={this.state.options} />

            </div>
    );
  }
}

export default ColumnChart






















