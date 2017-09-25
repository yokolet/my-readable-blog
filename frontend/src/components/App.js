import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchCategories } from '../utils/api'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    }
  }

  componentDidMount() {
    fetchCategories()
      .then((categories) => {
        this.setState(() => ({
          categories
      }))
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          Talking to the backend yields these categories: <br/>
          <ul>
            {this.state.categories && this.state.categories.map((data) => (
              <li key={data.name}>
                {data.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
