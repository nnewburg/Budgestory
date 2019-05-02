import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import axios from 'axios';
import dollarSign from '../assets/dollarSign.png'
import trashCan from '../assets/trashcan.png'

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
          <div id={this.props.id} onClick={this.onItemClick} style={{backgroundColor: '#65A688', borderRadius: '10px', position:'relative', border: '3px solid green', width: '20%', margin: '0.5em' }}>
          <ModalDeleteRecord id={this.props.id} update={this.props.update} />
            <div>

            </div>
            <div>
            <img style={{padding: '0.2em'}}width='40%' src={dollarSign} />
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
    this.sngleItemClick = this.sngleItemClick.bind(this);
  }

  dblClick(event) {
     //console.log(event.currentTarget)
    const newGen = event.currentTarget.id
    this.props.updateCurrentGen(newGen);
    if(this.props.editMenuShow){
    this.props.toggle();
  }
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
          <div id={this.props.id} onClick={this.handleClicks} style={{backgroundColor: '#65A688', borderRadius: '10px', border: '3px solid #D99789', justifyContent: 'space-around', margin: '0.5em', padding: '3%' }}>
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
             <CategoryRender editMenuShow={this.props.editShow} toggle={this.props.toggleCategory} updateCurrentGen={this.props.updateCurrentGen} id={category.id} name={category.name} />
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