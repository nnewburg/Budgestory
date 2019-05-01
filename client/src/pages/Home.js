import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import drilldown from 'highcharts-drilldown';
// drilldown(Highcharts);

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
    const newExpenses = evt => {
      evt.preventDefault();
      alert("New Expenses!");
    };
    const newIncomes = evt => {
      evt.preventDefault();
      alert("New Incomes!")
    };
    return (
      <div className="App">
        <h1>Project Home</h1>
        <div className="add_new_btns">
          <form onSubmit={newExpenses}>
            <button className="add-expenses-btn" type="submit">+ New Expenses</button>
          </form>
          <form onSubmit={newIncomes}>
            <button className="add-incomes-btn" type="submit">+ New Incomes</button>
          </form>
        </div>
        <Highchart />
      </div>
    );
  }
}
export default Home;