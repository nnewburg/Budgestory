import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button, Form } from 'react-bootstrap';

class CreateNew extends React.Component{
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
        console.log("event target = ", event.target);
        console.log("event amount = ", event.target.amount.value);
        console.log("event date = ", event.target.date.value);
        console.log("event category = ", event.target.category.value);
        console.log("event notes = ", event.target.notes.value);
        const newRec = {
            notes: event.target.notes.value,
            category_id: this.props.parentCategory,
            value: event.target.amount.value*100
        };
        // axios.post('/newRecord', {newRec}).then((response) => {
        //     this.props.update();
        //     this.handleClose();
        // })
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
          <Button variant="success" onClick={this.handleShow}>New Record</Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="record" onSubmit={this.createRecord}>
              <Form.Group controlId="recordAmount">
                <Form.Label>Amount:</Form.Label>
                <Form.Control type="number" step='0.01' name='amount' />
              </Form.Group>
              <Form.Group controlId="recordDate">
                <Form.Label>Date:</Form.Label>
                <Form.Control type="text" name='date' />
              </Form.Group>
              <Form.Group controlId="recordCategory">
                <Form.Label>Category: {this.props.category}</Form.Label>
                {/* <Form.Control as="select" name='category'>
                  <option>Shopping</option>
                  <option>Game</option>
                  <option>Car</option>
                </Form.Control> */}
              </Form.Group>
              <Form.Group controlId="recordNotes">
                <Form.Label>Notes:</Form.Label>
                <Form.Control type="text" placeholder="Where did I spent this money?" name='notes' />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" form="record">Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
    }
}
export default CreateNew;