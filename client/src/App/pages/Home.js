import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Register from './Register'


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
      <switch>
      <div id="barchart"></div>
      <Route path='/register' component={Register}/>
      </switch>
    </div>
    );
  }
}
export default Home;