import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import '../App/styles/compare.css'
import Categories from './select_categories.js'
import Date from './datepicker.js'
import Highchart from './Highchart'

class Compare extends Component {

  componentDidMount() {

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
        <Highchart type={"pie"}/>
        <Highchart type={"column"}/>

      </div>
    );
  }
}

export default Compare;