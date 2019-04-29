import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../App/styles/compare.css'
import Pie from './PieChart.js'
import Categories from './select_categories.js'
import Date from './datepicker.js'
class Compare extends Component {
    constructor(props) {
        super(props);
        this.state = {
          options: {
            chart: {
              type: 'bar'
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
      <div className="container">
        <div className='heading'>
          <h1>Compare Page</h1>
        </div>
        <div className='Categories'>
          <Categories />
        </div>
        <div className='date'>
          <Date />
        </div>
        <div className='pie'>
          <Pie />
        </div>
        <div className='bar'>
          <HighchartsReact highcharts={Highcharts} options={this.state.options} />

        </div>
      </div>
    );
  }

}


export default Compare;