import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Form, Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import axios from 'axios';
import dollarSign from '../assets/dollarSign.png'
import trashCan from '../assets/trashcan.png'
import pencil from '../assets/edit.png'

class ModalEditRecord extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

    editRecord = (event) => {
      event.preventDefault();

      const editRec = {
        id: this.props.id,
        name: event.target.name.value,
        value: event.target.value.value*100
      }

      axios.post('/api/editRecord', {editRec}).then((response) => {
      this.props.update()
      this.handleClose()
      })

    }


   handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render(){

    return(
    <div style={{marginLeft: 'auto', padding: '0.4em'}}>
    <img onClick={this.handleShow} style={{position: 'absolute', bottom: '0', left: '30%', padding: '0.2em', backgroundColor: 'gray', borderRadius: '20px'}}width='10%' src={pencil} />
  <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit a Record</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form id="record" onSubmit={this.editCategory}>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Record notes:</Form.Label>
              <Form.Control type="text" placeholder="Enter new notes" name='name' />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Record value:</Form.Label>
              <Form.Control type="number" placeholder="Enter new value" name='value' />
              </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" form="record">
                Edit
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class ModalEditCategory extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

    editCategory = (event) => {
      event.preventDefault();

      console.log('Banana', this.props.id);

      const editCat = {
        id: this.props.id,
        name: event.target.name.value
      }

      axios.post('/api/editCategory', {editCat}).then((response) => {
      this.props.update()
      this.handleClose()
      })

    }


   handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render(){

    return(
    <div style={{marginLeft: 'auto', padding: '0.4em'}}>
    <img onClick={this.handleShow} style={{position: 'absolute', bottom: '0', left: '10%', padding: '0.2em', backgroundColor: 'gray', borderRadius: '20px'}}width='10%' src={pencil} />
  <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit a Category</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form id="record" onSubmit={this.editCategory}>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Category Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter new category" name='name' />
              </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" form="record">
                Edit
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


class ModalDeleteCategory extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

 deleteCategory = (event) => {

       const delCat = {
        id: this.props.id
       }

       axios.post('/api/deleteCategory', {delCat}).then((response) => {
        console.log('delete Category route works', response)
        this.props.update()

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
        <img onClick={this.handleShow} style={{position: 'absolute', bottom: '0', left: '0', padding: '0.2em', backgroundColor: 'red', borderRadius: '20px'}}width='10%' src={trashCan} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning:</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            If you delete a category it will delete ALL records and categories nested within that category
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.deleteCategory}>
                Delete {this.props.name}
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
  );


}
}


class ModalDeleteRecord extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

   deleteRecord = (event) => {


       const delRec = {
         id: this.props.id
       }

      axios.post('/api/deleteRecord', {delRec}).then((response) => {
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
        <img onClick={this.handleShow} style={{position: 'absolute', bottom: '0', left: '0', padding: '0.2em', backgroundColor: 'red', borderRadius: '20px'}}width='15%' src={trashCan} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete This Record</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            Are you sure you want to delete this record?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.deleteRecord}>
                Delete Record
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
  );

}
}

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
          <div id={this.props.id} onClick={this.onItemClick} style={{ position: 'relative', backgroundColor: '#65A688', borderRadius: '10px', position:'relative', border: '3px solid #D99789', width: '20%', margin: '0.5em' }}>
          <ModalDeleteRecord id={this.props.id} update={this.props.update} />
          <ModalEditCategory id={this.props.id} update={this.props.update} />

            <div>
            <p style={{position: 'absolute', left: '0', top: '0', padding: '0.1em'}}>{this.props.name}</p>
            <br></br>
            <span>Value: ${this.props.price/100}</span>
            </div>
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
    // this.sngleItemClick = this.sngleItemClick.bind(this);
  }

  dblClick(event) {
     //console.log(event.currentTarget)
    const newGen = event.currentTarget.id
    this.props.updateCurrentGen(newGen);
    if(this.props.editMenuShow){
    this.props.toggle();
  }
}

  // sngleItemClick(event) {
  //  // console.log(event)
  //  if(this.props.parentId !== 0){
  //   const currentCategory = event.currentTarget
  //   this.props.toggle(this.props.id, this.props.name);
  //   }
  // }

  handleClicks(event){
    console.log('any Click',event.currentTarget)
    this.clickCount++;
  if (this.clickCount === 1) {
    this.singleClickTimer = setTimeout(function() {
      this.clickCount = 0;
      // this.sngleItemClick(event);
    }.bind(this), 300);
      } else if (this.clickCount === 2) {
    clearTimeout(this.singleClickTimer);
    this.clickCount = 0;
    this.dblClick(event);
  }
}


  render() {
    console.log(this.props.parentId)
    if (this.props.parentId){
    return (

          <div id={this.props.id} onClick={this.handleClicks} style={{ position:'relative', minWidth: '20%', flex: '0.3', backgroundColor: '#65A688', borderRadius: '10px', border: '3px solid #D99789', justifyContent: 'space-around', margin: '0.5em', padding: '3%' }}>
            <ModalDeleteCategory id={this.props.id} name={this.props.name} update={this.props.update} />
            <ModalEditCategory id={this.props.id} name={this.props.name} update={this.props.update} />
            <span className='align-middle'style={{verticalAlign: 'middle'}}>{this.props.name}</span>
          </div>

           )
    } else {
      return (
       <div id={this.props.id} onClick={this.handleClicks} style={{ position:'relative', minWidth: '20%', flex: '0.3', backgroundColor: '#65A688', borderRadius: '10px', border: '3px solid #D99789', justifyContent: 'space-around', margin: '0.5em', padding: '3%' }}>
           <span className='align-middle'style={{verticalAlign: 'middle'}}>{this.props.name}</span>
        </div>
        )
    }
  }
}



class Category extends Component {

  render() {

    const filteredRecords = this.props.state.records.filter(record => record.category_id == this.props.state.parentId)
    const filteredList = this.props.state.categories.filter(category => category.parent_id == this.props.state.parentId)

    const categoryList = filteredList.map((category, index) => (
             <CategoryRender update={this.props.update} toggle={this.props.toggleCategory} updateCurrentGen={this.props.updateCurrentGen} id={category.id} name={category.name} parentId={category.parent_id} />
          ))


    const recordsList = filteredRecords.map((record, index) => (
        <RecordRender name={record.notes} price={record.value} id={record.id} update={this.props.update} />
      ))

    return (
    <div className="App" style={{backgroundColor: 'white', display: 'flex', flexWrap: 'wrap'}}>
      {categoryList}
      {recordsList}
    </div>
    )
  }
}

export default Category;