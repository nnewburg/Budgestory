import React, { Component } from 'react';

class Categories extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {

    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
  }

  retrieveNames(categories) {
    let outputArray = [];
    let outputObject = {};
    outputObject.data = categories.map(x => x.value);
    outputArray.push(outputObject);

    return outputArray;
  }

  getCategoriesMenu = () => {
    fetch('api/getCategoriesMenu')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  componentDidMount() {
    this.getCategoriesMenu();

  }

  render() {
    return (
      <div>

        <button onClick={this.showMenu}>
          Selector
        </button>

        {
          this.state.showMenu
            ? (

              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <button> Categories </button>
                <button> Dates </button>

              </div>

            )
            : (
              null
            )
        }
      </div>

    );
  }
}

export default Categories;