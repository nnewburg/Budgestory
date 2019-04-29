import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Category from './Category';
import axios from 'axios';

class NewCategory extends React.Component {


        constructor(props) {
    super();
    this.createCategory = this.createCategory.bind(this);

  }

   createCategory(event) {
    event.preventDefault();

       const newCat = {
    name: event.target.name.value,
    parent_id: this.props.parentCategory
   }

      axios.post('/newCategory', {newCat
  }).then(function (response) {
            if (response.data.redirect == '/categories') {
                window.location = "/categories"
            } else if (response.data.redirect == '/login'){
                window.location = "/login"
            }
  })
  }

  render() {
    console.log(this.props)
    return (
      <div className='NewCategory' style={{borderTop:'1px red solid'}}>
        <div className='NewCategory_inner'>
          <span>{this.props.text}</span>
          <form onSubmit={this.createCategory}>
            Name:
            <input type='text' name='name'/>
            <input type='submit' value='submit'  />
          </form>
        <button onClick={this.props.closeNewCategory}>close me</button>
        </div>
      </div>
    );
  }
}

class NewRecord extends React.Component {

      constructor(props) {
        super();
        this.createRecord = this.createRecord.bind(this);
        this.state = {
          parentId: props.parentCategory
        }

  }

   createRecord(event) {
    event.preventDefault();

       const newRec = {
    notes: event.target.notes.value,
    category_id: this.props.parentCategory,
    value: event.target.value.value
   }
       console.log('asdjkad')

      axios.post('/newRecord', {newRec
  }).then(function (response) {
            if (response.data.redirect == '/categories') {
                window.location = "/categories"
            } else if (response.data.redirect == '/login'){
                window.location = "/login"
            }
  })
  }

  render() {
    return (
      <div className='NewRecord' style={{display: 'flex',borderTop:'1px red solid'}}>
        <div className='NewRecord_inner'>
          <span>{this.props.text}</span>
           <form onSubmit={this.createRecord}>
            Notes:
            <input type='text' name='notes'/>
            Value:
            <input type='number' name='value'/>
            <input type='submit' value='submit'  />
          </form>
        <button onClick={this.props.closeNewRecord}>close me</button>
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
          showNewRecord: false,
          showNewCategory: false,
          categories: [],
          records: [],
          parentId: 0
        }
    }

    toggleNewCategory() {
      if(!this.state.showNewRecord){
    this.setState({
      showNewCategory: !this.state.showNewCategory
    });
    }
  }

   toggleNewRecord() {
    if(!this.state.showNewCategory){
    this.setState({
      showNewRecord: !this.state.showNewRecord
    });
    }
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
      this.getCategory();
      this.getRecords();
    }

    getCategory = () => {
      fetch('/api/getCategories')
      .then(res => res.json())
      .then(
        ({data}) =>
        this.setState({
          categories: data
        })
      );
    }

    getRecords = () => {
      fetch('/api/getRecords')
      .then(res => res.json())
      .then(
        ({data}) =>
        this.setState({
          records: data
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

                  <button onClick={this.toggleNewRecord.bind(this)} style={{marginLeft: 'auto'}}>new record</button>
                  <button onClick={this.toggleNewCategory.bind(this)} style={{marginLeft: 'auto'}}>new category</button>

        </div>
      <Category updateCurrentGen={this.updateCurrentGen} state={this.state} />
      {this.state.showNewCategory ?
          <NewCategory
            text='Add a Category'
            closeNewCategory={this.toggleNewCategory.bind(this)}
            parentCategory = {this.state.parentId}
          />
          : null
        }
        {this.state.showNewRecord ?
          <NewRecord
            text='Add a Record'
            closeNewRecord={this.toggleNewRecord.bind(this)}
            parentCategory = {this.state.parentId}
          />
          : null
        }
      </div>

    </div>
    );
  }
}

export default Categories;