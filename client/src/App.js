import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Compare from './pages/Compare';
import Categories from './pages/Categories';

class App extends Component {

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/categories' component={Categories}/>
          <Route path='/compare' component={Compare}/>
        </Switch>
      </div>
    )
    return (
      <div>
        <App/>
      </div>
    );
  }
}

export default App;