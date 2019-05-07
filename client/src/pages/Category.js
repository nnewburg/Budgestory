import React, { Component } from 'react';
import { /*Card,*/ Form, Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import axios from 'axios';
import trashCan from '../assets/trashcan.png'
import pencil from '../assets/edit.png'
import '../App/styles/categoriesPage.css'

class ModalEditRecord extends React.Component{
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
    this.currentDate = new Date();
  }

    editRecord = (event) => {
      event.preventDefault();

      console.log(this.props.id)
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
    let currentDateString = this.currentDate.toISOString().split('T')[0]
    return(
      <div>
        <img className='editRecordPencil' onClick={this.handleShow} width='8%' src={pencil} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Record</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form id="record" onSubmit={this.editRecord}>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Record value:</Form.Label>
              <Form.Control type="number" placeholder="Enter new value" name='value' />
              </Form.Group>
              <Form.Group controlId="recordDate">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="text" placeholder={currentDateString} name='date' />
            </Form.Group>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Record notes:</Form.Label>
              <Form.Control type="text" placeholder="Enter new notes" name='name' />
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
        name: event.target.name.value,
        notes: event.target.notes.value
      }

      axios.post('/api/editCategory', {editCat}).then((response) => {
      this.props.update()
      this.handleClose()
      })

    }


   handleClose() {
    this.props.modalClicked()
    this.setState({ show: false });
  }

  handleShow() {
    this.props.modalClicked()
    this.setState({ show: true });
  }

  render(){

    return(
      <div>
      <img className='editCategoryPencil' onClick={this.handleShow} alt="" style={{position: 'absolute', bottom: '0', right: '10%', padding: '0.2em', backgroundColor: 'gray', borderRadius: '20px'}}width='10%' src={pencil} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit category: {this.props.name}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form id="record" onSubmit={this.editCategory}>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Category name:</Form.Label>
              <Form.Control type="text" placeholder="Enter new category" name='name' />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
              <Form.Label>Category notes:</Form.Label>
              <Form.Control type="text" placeholder="Enter new category notes" name='notes' />
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
        this.handleClose();
      })

    }

  handleClose() {
    this.props.modalClicked()
    this.setState({ show: false });
  }

  handleShow() {
    this.props.modalClicked()
    this.setState({ show: true });
  }

  render() {
    return (
      <div >
        <img className='delCategoryCan' onClick={this.handleShow} width='10%' src={trashCan} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Warning:</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            All the categories and records in {this.props.name} will be removed
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.deleteCategory}>
                Confirm
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
      <div >
        <img className='delRecordCan' onClick={this.handleShow} width='8%' src={trashCan} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Warning:</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            Are you sure you want to delete this record?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.deleteRecord}>
                Confirm
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
  );

}
}

class RecordRender extends Component {

  render(){
    return (

          <div className='recordContainer' id={this.props.id} onClick={this.onItemClick}>
          <ModalDeleteRecord id={this.props.id} update={this.props.update} />
          <ModalEditRecord id={this.props.id} update={this.props.update} />
            <div id="textBox">

            <p className='recordPrice'> ${this.props.price/100}</p>
            <p className="dateInput"> {this.props.date.slice(0,-14)}</p>
            <p className='recordNotes'>{this.props.name}</p>
            </div>
          </div>

           )
  }

}

const MyToolTip = props => (

  <div></div>

  )


class CategoryRender extends Component {

  constructor(props) {
    super(props);
    this.clickCount = 0;
    this.singleClickTimer = '';
    this.handleClicks = this.handleClicks.bind(this)
    this.dblClick = this.dblClick.bind(this);
    this.modalClicked = this.modalClicked.bind(this);
    this.state = {
      editModal: false
    }
  }

  modalClicked = () => {
    this.setState({
      editModal: !this.state.editModal
    })
  }

  dblClick(event) {
     console.log(event.currentTarget)
    const newGen = event.currentTarget.id
    const newName = this.props.name
    this.props.updateCurrentGen(newGen, newName);
    if(this.props.editMenuShow){
    this.props.toggle();
  }
}


  handleClicks(event){

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

    if (this.props.parentId){
    return (
          <div className='categoryContainer' id={this.props.id} onClick={this.handleClicks}>
            <ModalDeleteCategory id={this.props.id} name={this.props.name} update={this.props.update} modalClicked={this.modalClicked} />
            <ModalEditCategory id={this.props.id} name={this.props.name} update={this.props.update} modalClicked={this.modalClicked} />
            <p className='categoryName' >{this.props.name}</p>
            <p className='categoryNote' >{this.props.notes}</p>
          </div>
           )
    } else {
      return (

       <div className='categoryContainer' id={this.props.id} onClick={this.handleClicks} >
           <p className='categoryName' >{this.props.name}</p>
           <p className='categoryNote' >{this.props.notes}</p>
        </div>

        )
    }
  }
}



class Category extends Component {

  render() {

    const filteredRecords = this.props.state.records.filter(record => record.category_id === parseInt(this.props.state.parentId, 10))
    const filteredList = this.props.state.categories.filter(category => category.parent_id === parseInt(this.props.state.parentId, 10))

    const categoryList = filteredList.map((category, index) => (
      <CategoryRender update={this.props.update} toggle={this.props.toggleCategory} updateCurrentGen={this.props.updateCurrentGen} notes={category.notes} id={category.id} key={category.id} name={category.name} parentId={category.parent_id} />
    ))


    const recordsList = filteredRecords.map((record, index) => (
        <RecordRender name={record.notes} toggle={this.props.toggleCategory} updateCurrentGen={this.props.updateCurrentGen} price={record.value} id={record.id} update={this.props.update} date={record.date} />
      ))

    return (
    <div className="bottomDiv" >
      {categoryList}
      {recordsList}
    </div>
    )
  }
}

export default Category;