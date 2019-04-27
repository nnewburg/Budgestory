import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

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
console.log('bologona', this.props)
// data-id={this.props.data-id}
return (
          <div id={this.props.id} onClick={this.onItemClick} style={{ border: '3px solid green', width: '20%', flexDirection: 'row' }}>
            <span ref='gen'>{this.props.name}</span>
          </div>

      )
  }
}



class Category extends Component {


  render() {

    const filteredList = this.props.state.categories.filter(category => category.parent_id == this.props.state.currentGen)
    const categoryList = filteredList.map((category, index) => (
              <Helper onClick={this.onItemClick} updateCurrentGen={this.props.updateCurrentGen} id={category.id} name={category.name} refs={category.id} />


          ))

    return (

    <div className="App" style={{display: 'flex'}}>
      {categoryList}
    </div>

    )
  }
}

export default Category;