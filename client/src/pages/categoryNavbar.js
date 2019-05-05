import React, { Component } from 'react';
import '../App/styles/categoryNavbar.css'

class categoryNavbar extends Component {
  constructor(props) {
    super()
  }


  ComponentDidMount() {

  }

  render() {
    return (
      <nav className="Category_navbar">
        <div id="Category_logo">
          <a href="/" className="Category_navbar-brand">BudgeStory</a>
        </div>
        <div className="Category_contents">
          <div id="Category_compareBox">
            <div id="Category_comparePage">
              <a href="/compare">Compare</a>
            </div>
          </div>
          <div id="Category_categoryBox">
            <div id="Category_categoryPage">
              <a href="/categories">Category</a>
            </div>
          </div>
          <div id="Category_userBox">
            <div id="Category_userInfo">
              Blah
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default categoryNavbar