import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Category from './Category';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

class Helper extends Component {

  constructor(props) {
    super();
    this.onItemClick = this.onItemClick.bind(this);
  }

    onItemClick(event) {
      console.log('works', event.currentTarget)
      const newGen = event.currentTarget.id
        this.props.updateCurrentGen(newGen);
  }




  render() {

return (
         <div id={this.props.id} onClick={this.onItemClick} style={{flexDirection: 'row', border:'1px black solid', margin: '0.5em' }}>
                    {this.props.name}
                  </div>

      )
  }
}


class Categories extends Component {

   constructor(props) {
        super(props);
        this.updateCurrentGen = this.updateCurrentGen.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.findLineage = this.findLineage.bind(this);
        this.state = {
          showPopup: false,
          categories: [],
          parentId: 0
        }
    }

    togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

    updateCurrentGen(setGen){
      this.setState({
        parentId: setGen
      })
    }

    findLineage(currentGen){
      let lineage = []
      let check = currentGen;

      this.state.categories.forEach(category => {
        if(category.id== check){
          check = category.parent_id
          lineage.push(category)
          return
        }
      })
      return lineage.reverse()
    }

    addCategory(event){

    }

    onItemClick(event) {
      console.log('works', event.currentTarget)
      const newGen = event.currentTarget.id
        this.updateCurrentGen(newGen);
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

          const filteredList = this.findLineage(this.state.parentId)
          console.log(filteredList)
         const categoryList = filteredList.map((category, index) => (
              <Helper onClick={this.onItemClick} updateCurrentGen={this.updateCurrentGen} id={category.parent_id} name={category.name}  />
        // const filteredList = this.state.categories.filter(category => category.id == this.props.state.currentGen)
        ))

    return (
    <div className="App">
      <h1>Categories Page</h1>
      <div style={{margin: '0 auto', border: '2px red solid', width: '80%'}}>
        <div style={{display: 'flex', flexWrap: 'wrap', borderBottom: '2px black solid'}}>
                {categoryList}

                  <button onClick={this.togglePopup.bind(this)} style={{marginLeft: 'auto'}}>new record</button>
                  <button onClick={this.togglePopup.bind(this)} style={{marginLeft: 'auto'}}>new category</button>

        </div>
      <Category updateCurrentGen={this.updateCurrentGen} state={this.state} />
      </div>
      {this.state.showPopup ?
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
    </div>
    );
  }
}

export default Categories;