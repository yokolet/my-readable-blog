import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { setVisibilityCategory, setVisibilityNewPostModal } from '../actions'

class Header extends Component {
  render() {
    const { categories, setCategory, setModalOpen } = this.props
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
              <NavItem onClick={e => {
                        e.preventDefault()
                        setModalOpen(true)
                      }}>New Post</NavItem>
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <MenuItem key="all"
                          onClick={e => {
                            e.preventDefault()
                            setCategory("all")
                          }}>all</MenuItem>
                <MenuItem divider />
                {categories && categories.map((category) => (
                  <MenuItem key={category.name}
                            onClick={e => {
                              e.preventDefault()
                              setCategory(category.name)
                            }}>
                    {category.name}
                  </MenuItem>
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

Header.propTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setCategory: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
}

function mapStateToProps({allCategories, visibilityCategory, visibilityNewPostModal}) {
  return {
    categories: allCategories.categories,
    category: visibilityCategory.category,
    isOpen: visibilityNewPostModal.open,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategory: category => dispatch(setVisibilityCategory(category)),
    setModalOpen: open => dispatch(setVisibilityNewPostModal(open))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
