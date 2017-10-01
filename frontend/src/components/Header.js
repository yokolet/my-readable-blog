import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { getAllCategories, setVisibilityCategory, setVisibilityNewPostModal } from '../actions'

class Header extends Component {

  componentDidMount() {
    this.props.getAllCategories()
  }

  render() {
    const { categories, setCategory, setModalOpen, location } = this.props
    return (
      <div>
        <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Readable Blog</Link>
            </Navbar.Brand>
            { location === 'home' &&
              <Navbar.Toggle />
            }
          </Navbar.Header>
          { location === 'home' &&
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
          }
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
  location: PropTypes.string.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
}

function mapStateToProps({
  allCategories,
  visibilityCategory,
  visibilityNewPostModal,
  currentLocation}) {
  return {
    categories: allCategories.categories,
    category: visibilityCategory.category,
    isOpen: visibilityNewPostModal.open,
    location: currentLocation.location,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    setCategory: category => dispatch(setVisibilityCategory(category)),
    setModalOpen: open => dispatch(setVisibilityNewPostModal(open))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
