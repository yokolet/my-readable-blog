import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FaFlickr } from 'react-icons/lib/fa'
import { setLocation } from '../actions'

class Footer extends Component {

  componentDidMount() {
    this.props.setLocation('home')
  }

  photoCredit = (location) => {
    let content
    if (location === 'post') {
      content =
        <a href="https://flic.kr/p/AH2LYn"><FaFlickr /></a>
    } else {
      content =
        <a href="https://flic.kr/p/dmKCkY"><FaFlickr /></a>
    }
    return content
  }

  render() {
    const { location } = this.props
    return (
      <footer className="footer">
        <div className="footer-container">
          Photo Credit: {this.photoCredit(location)}
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
}

function mapStateToProps({currentLocation}) {
  return {
    location: currentLocation.location,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setLocation: location => dispatch(setLocation(location)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
