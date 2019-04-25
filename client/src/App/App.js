import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Register from './pages/Register'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
  chart: {
    type: 'pie'
  },

  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}



class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/register' component={Register}/>

        </Switch>
      </div>
    )
    return (
      <div>
      <Switch>
        <App/>
      </Switch>
        <HighchartsReact
    highcharts={Highcharts}
    options={options}
     />
      </div>
    );
  }
}

export default App;
