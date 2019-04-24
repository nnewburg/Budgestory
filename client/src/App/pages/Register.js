import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault()

    let user = {
      name: this.name.value,
      password: this.password.value,
      email: this.email.value
    }

    axios.post('/api/regist', { user })
    .then(res => { window.location = "/list"
    })

  }

  render() {
    return (
    <div className="App">
      <h1>Login Page</h1>
      <form onSubmit={this.handleSubmit}>
      Username:
      <input ref={(name) => this.name = name} type="text"></input>
      Password:
      <input ref={(password) => this.password = password} name="password" type="password"></input>
      Email:
      <input ref={(email) => this.email = email} name="email" type="email"></input>
      <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
}
export default Register;