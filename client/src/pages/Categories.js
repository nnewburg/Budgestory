import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Category from './Category';

class Categories extends Component {

   constructor(props) {
        super(props);
        this.updateCurrentGen = this.updateCurrentGen.bind(this);
        this.state = {
          categories: [],
          currentGen: 0
        }
    }

    updateCurrentGen(setGen){
      this.setState({
        currentGen: setGen
      })
    }


    componentDidMount() {
      this.getList();
    }

    getList = () => {
      fetch('/api/getList')
      .then(res => res.json())
      .then(
        ({data}) =>
        this.setState({
          categories: data
        })
      );
    }

  render() {
    return (
    <div className="App">
      <h1>Categories Page</h1>
      <div style={{margin: '0 auto', border: '2px red solid', width: '80%'}}>
        <div style={{display: 'flex', borderBottom: '2px black solid'}}>
                <div style={{flexDirection: 'row', border:'1px black solid', margin: '0.5em' }}>
                  1st generation
                  </div>

                <div style={{flexDirection: 'row', border:'1px black solid', margin: '0.5em' }}>
                  2nd generation
                  </div>

                <div style={{flexDirection: 'row', border:'1px black solid', margin: '0.5em' }}>
                  3rd generation
                  </div>

                  <button style={{marginLeft: 'auto'}}>new record</button>
                  <button style={{marginLeft: 'auto'}}>new category</button>
        </div>
      <Category updateCurrentGen={this.updateCurrentGen} state={this.state} />
      </div>
    </div>
    );
  }
}

export default Categories;