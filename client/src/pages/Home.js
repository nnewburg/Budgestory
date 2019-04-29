import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts-drilldown';
drilldown(Highcharts);

class Home extends Component {
  // const onSubmit = evt => {

  // };
  
  render() {
    return (
    <div className="App">
      <h1>Project Home</h1>
      {/* <form onSubmit={newExpenses}>
        <button className="add-expenses-btn" type="submit">+ New Expenses</button>
      </form>
      <form onSubmit={newIncomes}>
        <button className="add-incomes-btn" type="submit">+ New Incomes</button>
      </form> */}
      <Highchart />
    </div>
    );
  }
}
export default Home;