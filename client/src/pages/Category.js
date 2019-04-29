import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

class RecordRender extends Component {

  render(){

    console.log(this.props)
    return (
          <div id={this.props.id} onClick={this.onItemClick} style={{ border: '3px solid blue', width: '20%', flexDirection: 'row', margin: '0.5em' }}>
            <span ref='gen'>{this.props.name}</span>
          </div>
           )
  }

}


class CategoryRender extends Component {

  constructor(props) {
    super();
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(event) {
    const newGen = event.currentTarget.id
    this.props.updateCurrentGen(newGen);
  }

  render() {
    return (
          <div id={this.props.id} onClick={this.onItemClick} style={{ border: '3px solid green', width: '20%', flexDirection: 'row', margin: '0.5em' }}>
            <span ref='gen'>{this.props.name}</span>
          </div>
           )
  }
}



class Category extends Component {

  render() {

    const filteredRecords = this.props.state.records.filter(record => record.category_id == this.props.state.parentId)
    const filteredList = this.props.state.categories.filter(category => category.parent_id == this.props.state.parentId)

    const categoryList = filteredList.map((category, index) => (
             <CategoryRender onClick={this.onItemClick} updateCurrentGen={this.props.updateCurrentGen} id={category.id} name={category.name} refs={category.id} />
          ))

    const recordsList = filteredRecords.map((record, index) => (
        <RecordRender name={record.notes} />
      ))

    return (
    <div className="App" style={{display: 'flex', flexWrap: 'wrap'}}>
      {categoryList}
      {recordsList}
    </div>
    )
  }
}

export default Category;