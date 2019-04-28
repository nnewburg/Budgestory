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

return (
          <div id={this.props.id} onClick={this.onItemClick} style={{ border: '3px solid green', width: '20%', flexDirection: 'row', margin: '0.5em' }}>
            <span ref='gen'>{this.props.name}</span>
          </div>

      )
  }
}



class Category extends Component {


  render() {

    const filteredList = this.props.state.categories.filter(category => category.parent_id == this.props.state.parentId)
    const categoryList = filteredList.map((category, index) => (
              <Helper onClick={this.onItemClick} updateCurrentGen={this.props.updateCurrentGen} id={category.id} name={category.name} refs={category.id} />


          ))

    return (

    <div className="App" style={{display: 'flex', flexWrap: 'wrap'}}>
      {categoryList}
    </div>

    )
  }
}

export default Category;