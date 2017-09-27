import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    const { categories } = this.props
    return (
      <div>
        <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Readable Blog</a>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">New Post</NavItem>
              <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} key="all">all</MenuItem>
                <MenuItem divider />
                {categories && categories.map((category) => (
                  <MenuItem eventKey={3.2} key={category.name}>{category.name}</MenuItem>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="App-header">
          <div>Welcome to Readable Blog</div>
        </div>
      </div>
    )
  }
}

export default Header
