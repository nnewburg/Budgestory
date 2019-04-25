import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Register from './Register'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
      <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>
      <Switch>

      <Route path='/register' component={Register}/>
      </Switch>
    </div>
    );
  }
}
export default Home;