import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import Register from './pages/Register';
import Login from './pages/Login';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



class App extends Component {

    constructor(props){
    super(props);
    this.state = {
      list: [],
      options: {
        chart: {
          type: 'pie'
        },
          credits: {
            enabled: false
        },

        title: {
          text: 'My chart'
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
  console.log("outputArray = ", outputArray);
  return outputArray;
}


componentDidMount() {
    this.getList();

  }

 getList = () => {
    fetch('/api/getList')
    .then(res => res.json()).then(
      ({data}) =>
      this.setState({
        options: {
          series: this.retrieveValues(data)
        }
      })
    );

  }


  render() {
    console.log("options Nick = ", this.state.options)
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
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
    options={this.state.options}
     />
      </div>
    );
  }
}

export default App;
