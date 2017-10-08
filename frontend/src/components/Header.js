import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FaHome, FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/lib/fa'
import { getAllCategories, setVisibilityNewPostModal, setSortBy } from '../actions'

class Header extends Component {

  componentDidMount() {
    this.props.getAllCategories()
  }

  render() {
    const { categories, setModalOpen, changeSortBy, location } = this.props
    var headerContent
    if (location === 'home' || location === 'category') {
      headerContent =
        <div className="App-header">
          <div>Welcome to Readable Blog</div>
        </div>
    } else {
      headerContent =
        <div className="single-post-header">
          <div>Readable Blog</div>
        </div>
    }
    return (
      <div>
        <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Readable Blog <FaHome /></Link>
            </Navbar.Brand>
            { location === 'home' &&
              <Navbar.Toggle />
            }
          </Navbar.Header>
          { (location === 'home' || location === 'category') &&
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem onClick={e => {
                          e.preventDefault()
                          setModalOpen(true)
                        }}>New Post</NavItem>
                <NavDropdown title="Sort by" id="basic-nav-dropdown">
                  <MenuItem
                    onClick={e => {
                      e.preventDefault()
                      changeSortBy("timestamp", -1)
                  }}>
                    <FaAngleDoubleUp />
                  </MenuItem>
                  <MenuItem header>Date</MenuItem>
                  <MenuItem
                    onClick={e => {
                      e.preventDefault()
                      changeSortBy("timestamp", 1)
                  }}>
                    <FaAngleDoubleDown />
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem
                    value="score"
                    onClick={e => {
                      e.preventDefault()
                      changeSortBy("voteScore", -1)
                  }}>
                    <FaAngleDoubleUp />
                  </MenuItem>
                  <MenuItem header>Vote</MenuItem>
                  <MenuItem
                    value="score"
                    onClick={e => {
                      e.preventDefault()
                      changeSortBy("voteScore", 1)
                  }}>
                    <FaAngleDoubleDown />
                  </MenuItem>
                </NavDropdown>
                <NavDropdown title="Category" id="basic-nav-dropdown">
                  <MenuItem>
                    <Link to="/" className="menuitem-link">all</Link>
                  </MenuItem>
                  <MenuItem divider />
                  {categories && categories.map((category) => (
                    <MenuItem key={category.name}>
                      <Link to={'/' + category.name} className="menuitem-link">
                        {category.name}
                      </Link>
                    </MenuItem>
                  ))}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          }
        </Navbar>
        {headerContent}
      </div>
    )
  }
}

Header.propTypes = {
  categories: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  changeSortBy: PropTypes.func.isRequired,
}

function mapStateToProps({
  allCategories,
  visibilityNewPostModal,
  currentLocation}) {
  return {
    categories: allCategories.categories,
    isOpen: visibilityNewPostModal.open,
    location: currentLocation.location,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    setModalOpen: open => dispatch(setVisibilityNewPostModal(open)),
    changeSortBy: (key, weight) => dispatch(setSortBy(key, weight)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
