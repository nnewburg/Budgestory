import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highchart from './Highchart'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts-drilldown';
drilldown(Highcharts);

class Home extends Component {
  
  render() {

    const newExpenses = evt => {

    };
    const newIncomes = evt => {

    };

    return (
    <div className="App">
      <h1>Project Home</h1>
      <div className="add_new_record_area">
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