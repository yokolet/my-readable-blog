import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BasicNavbar from './BasicNavbar';
import * as API from '../utils/api'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      posts: null,
    }
  }

  componentDidMount() {
    API.fetchCategories()
      .then((categories) => {
        this.setState(() => ({
          categories
      }))
    })
    API.fetchPosts()
      .then((posts) => {
        this.setState(() => ({
          posts
        }))
      })
  }

  render() {
    return (
      <div className="App">
        <BasicNavbar />
        <div className="App-header">
          <div>Welcome to Readable Blog</div>
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
          <div>
            POSTS:<br/>
            <ul>
              {this.state.posts && this.state.posts.map((data) => (
                <li key={data.id}>
                  id: {data.id}<br/>
                  title: {data.title}<br/>
                  body: {data.body}<br/>
                  author: {data.author}<br/>
                  category: {data.category}<br/>
                  timestamp: {data.timestamp}<br/>
                  votes: {data.voteScore}<br/>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
