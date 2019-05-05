import React, { Component } from 'react';
import '../App/styles/navbar.css'

class Navbar extends Component {
  constructor(props) {
    super()
  }


  ComponentDidMount() {

  }

  render() {
    return (
      <nav className="navbar">
        <div id="logo">
          <a href="/" className="navbar-brand">BudgeStory</a>
        </div>
        <div className="contents">
          <div id="compareBox">
            <div id="comparePage">
              <a href="/compare">Compare</a>
            </div>
          </div>
          <div id="categoryBox">
            <div id="categoryPage">
              <a href="/categories">Category</a>
            </div>
          </div>
          <div id="userBox">
            <div id="userInfo">
              Blah
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default Navbar
