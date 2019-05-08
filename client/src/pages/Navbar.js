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
        <div className="contents" id="logo">
          <a href="/" className="navbar-brand">BudgeStory</a>
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
        </div>
            <div className="slogan">
              <a>Write Your Own BudgeStory</a>
            </div>
          <div className="userInfo">
            <a>Brendan</a>
          </div>
      </nav>
    )
  }
}
export default Navbar
