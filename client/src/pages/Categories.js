import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Category from './Category';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button, Form } from 'react-bootstrap';

class ModalCreateRecord extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

   createRecord = (event) => {
    event.preventDefault();

       const newRec = {
         notes: event.target.notes.value,
         category_id: this.props.parentCategory,
         value: event.target.value.value*100
       }

      axios.post('/newRecord', {newRec}).then((response) => {
    console.log('record Posted')
      this.props.update()
      this.handleClose();
  })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div style={{flexDirection: 'row-reverse', padding: '0.4em'}}>
        <Button variant="success" onClick={this.handleShow}>
          Create Record
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Record</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form id="record" onSubmit={this.createRecord}>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Notes about record:</Form.Label>
              <Form.Control type="text" placeholder="Notes..." name='notes' />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
              <Form.Label>Amount spent:</Form.Label>
              <Form.Control type="number" step='0.01' name='value' />
              </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" form="record">
                Create Record
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
  );

}
}


class ModalCreateCategory extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  createCategory = (event) => {
    event.preventDefault();

       const newCat = {
        name: event.target.name.value,
        parent_id: this.props.parentCategory
       }

      axios.post('/newCategory', {newCat}).then((response) => {
      this.props.update()
      this.handleClose();
      })
   }



  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div style={{marginLeft: 'auto', padding: '0.4em'}}>
        <Button variant="success" onClick={this.handleShow}>
          Create Category
        </Button>
         <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Category</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form id="record" onSubmit={this.createCategory}>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Category Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter new category" name='name' />
              </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" form="record">
                Create Category
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
  );

}

}

class EditCategory extends React.Component {
    constructor(props) {
      super(props);

    }

    editCategory = (event) => {
      event.preventDefault();

      console.log(event.target.name.value);

      const editCat = {
        id: this.props.currentCategory,
        name: event.target.name.value
      }

      axios.post('/api/editCategory', {editCat}).then((response) => {
      this.props.update()
      this.props.closeCategoryWindow()
      })

    }


    deleteCategory = (event) => {

       const delCat = {
        id: this.props.currentCategory
       }

       axios.post('/api/deleteCategory', {delCat}).then((response) => {
        console.log('delete Category route works', response)
        this.props.update()
        this.props.closeCategoryWindow()
      })

    }

    render() {
    return (
      <div className='NewCategory' style={{borderBottom:'1px red solid'}}>
        <div className='NewCategory_inner' style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{ flexDirection: 'row', padding: '0.4em'}}>
          <Button style ={{marginLeft: '0%'}} variant="danger" onClick={this.deleteCategory}> Delete Category </Button>
          </div>
          <div style={{alignItems: 'baseline', flexDirection: 'rowReverse'}}>
          <span>{this.props.text}</span>
          <form onSubmit={this.editCategory}>
            <input type='text' name='name'/>
            <input type='submit' value='submit'  />
          </form>
          </div>
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
          showCategoryOptions: false,
          categories: [],
          records: [],
          parentId: 0,
          currentCategory: null,
          currentCatName: null
        }
    }

  toggleCategory = (x,y) => {
    console.log(x)

    this.setState({
      currentCategory: x,
      currentCatName: `Change name of ${y}`,
      showCategoryOptions: !this.state.showCategoryOptions
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

    onItemClick(event) {
      const newGen = event.currentTarget.id
        this.updateCurrentGen(newGen);
    }

    refreshAsync(){
      this.getCategory();
      this.getRecords();
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
          categories: data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
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
         const categoryList = filteredList.map((category, index) => (
              <Helper onClick={this.onItemClick} updateCurrentGen={this.updateCurrentGen} id={category.parent_id} name={category.name}  />
        // const filteredList = this.state.categories.filter(category => category.id == this.props.state.currentGen)
        ))

    return (
    <div className="App" style={{}}>
      <h1>Categories Page</h1>

      <div style={{margin: '0 auto', border: '2px red solid', width: '80%'}}>
      {this.state.showCategoryOptions ?
          <EditCategory
            text={this.state.currentCatName}
            update={this.refreshAsync.bind(this)}
            closeCategoryWindow={this.toggleCategory.bind(this)}
            parentCategory = {this.state.parentId}
            currentCategory = {this.state.currentCategory}
          />
          : null
        }
        <div style={{display: 'flex', flexWrap: 'wrap', borderBottom: '2px black solid'}}>
                {categoryList}
                  <ModalCreateCategory parentCategory={this.state.parentId} update={this.refreshAsync.bind(this)} style={{marginLeft: 'auto'}} />
                  <ModalCreateRecord parentCategory={this.state.parentId} update={this.refreshAsync.bind(this)} style={{marginLeft: 'auto'}} />

        </div>
      <Category editShow={this.state.showCategoryOptions} toggleCategory={this.toggleCategory.bind(this)} updateCurrentGen={this.updateCurrentGen} state={this.state} update={this.refreshAsync.bind(this)} />
      </div>

    </div>
    );
  }
}

export default Categories;