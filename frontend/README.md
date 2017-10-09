# My Readable Blog Project

This `frontend` directory contains a client side code. This client makes API call to the readable blog server. Long range data such as blogs are saved in the api server.

The readable blog client shows a list of blogs at a root path. Each entry has a few buttons: up/down vote, edit (delete button in a modal window), show comments and category.

At a root or category path, a new blog can be created.
Also, at a root or category path, narrowing down to one category works. Sorting posts feature works at a root or category path as well.

At a detailed view of a single post, it has comments and its create/read/edit/delete/up vote/down vote features.


## Server configuration

The client needs its own server to run. The client-side server runs on port 3000, while api-side server runs on port 3001.

The configuration of api-side server is in `.env` file. Change the setting if the api-side server runs on another host and/or port.


## How to User App

To use the app:

### Start API server

```bash
cd ../api-server
npm install
npm start
```

### Start client-side server

- npm
  * install all project dependencies with `npm install`
  * start the development server with `npm start`

- yarn
  * install all project dependencies with `yarn install`
  * start the development server with `yarn start`

## Reference

- [Example: Reddit API](http://redux.js.org/docs/advanced/ExampleRedditAPI.html)
