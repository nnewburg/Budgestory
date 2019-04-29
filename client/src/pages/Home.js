import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class Home extends Component {

      constructor(props) {
        super(props);
        this.state = {
          options: {
            chart: {
              type: 'pie'
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
      fetch('/api/getList')
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
    <div className="App">
      <h1>Project Home</h1>
      <HighchartsReact highcharts={Highcharts} options={this.state.options} />
    </div>
    );
  }
}
export default Home;