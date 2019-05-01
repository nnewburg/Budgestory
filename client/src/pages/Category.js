import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import dollarSign from '../assets/dollarSign.png'


class RecordRender extends Component {

  constructor(props) {
    super();
    this.clickCount = 0;
    this.singleClickTimer = '';
  }

  render(){

    return (
      <OverlayTrigger
      key={'bottom'}
      placement={'bottom'}
      overlay={
        <Tooltip id={`tooltip-bottom`}>
        <p>Notes: {this.props.name} </p>
        <p>Price: ${this.props.price/100} </p>
        </Tooltip>
      }
    >
          <div id={this.props.id} onClick={this.onItemClick} style={{backgroundColor: 'white', borderRadius: '10%', border: '3px solid green', width: '20%', flexDirection: 'row', margin: '0.5em' }}>
            <img style={{padding: '0.2em'}}width='40%' src={dollarSign} />
          </div>
      </OverlayTrigger>
           )
  }

}


class CategoryRender extends Component {

  constructor(props) {
    super(props);
    this.clickCount = 0;
    this.singleClickTimer = '';
    this.handleClicks = this.handleClicks.bind(this)
    this.dblClick = this.dblClick.bind(this);
    this.sngleItemClick = this.sngleItemClick.bind(this);
  }

  dblClick(event) {
     //console.log(event.currentTarget)
    const newGen = event.currentTarget.id
    this.props.updateCurrentGen(newGen);
}

  sngleItemClick(event) {
   // console.log(event)
    const currentCategory = event.currentTarget
    this.props.toggle(this.props.id, this.props.name);
  }

  handleClicks(event){
    console.log('any Click',event.currentTarget)
    this.clickCount++;
  if (this.clickCount === 1) {
    this.singleClickTimer = setTimeout(function() {
      this.clickCount = 0;
      this.sngleItemClick(event);
    }.bind(this), 300);
      } else if (this.clickCount === 2) {
    clearTimeout(this.singleClickTimer);
    this.clickCount = 0;
    this.dblClick(event);
  }
}

  render() {
    return (
          <div id={this.props.id} onClick={this.handleClicks} style={{backgroundColor: 'white', borderRadius: '10%', border: '3px solid blue', width: '20%', flexDirection: 'row', margin: '0.5em' }}>
            <span className='align-middle'style={{verticalAlign: 'middle'}}>{this.props.name}</span>
          </div>
           )
  }
}



class Category extends Component {

  render() {

    const filteredRecords = this.props.state.records.filter(record => record.category_id == this.props.state.parentId)
    const filteredList = this.props.state.categories.filter(category => category.parent_id == this.props.state.parentId)

    const categoryList = filteredList.map((category, index) => (
             <CategoryRender toggle={this.props.toggleCategory} updateCurrentGen={this.props.updateCurrentGen} id={category.id} name={category.name} />
          ))


    const recordsList = filteredRecords.map((record, index) => (
        <RecordRender name={record.notes} price={record.value} />
      ))

    return (
    <div className="App" style={{backgroundColor: '#c19045', display: 'flex', flexWrap: 'wrap'}}>
      {categoryList}
      {recordsList}
    </div>
    )
  }
}

export default Category;