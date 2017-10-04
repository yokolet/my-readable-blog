const APP_BACKEND = process.env.REACT_APP_BACKEND

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-10)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json',
}

export const fetchCategories = () =>
    fetch(
      `${APP_BACKEND}/categories`, { headers })
      .then((res) => res.json())
      .then((data) => data.categories)

export const fetchPosts = () =>
    fetch(`${APP_BACKEND}/posts`, { headers })
      .then((res) => res.json())

export const fetchSinglePost = (postId) =>
    fetch(`${APP_BACKEND}/posts/${postId}`, { headers })
      .then((res) => res.json())

export const fetchComments = (postId) =>
    fetch(
      `${APP_BACKEND}/posts/${postId}/comments`, { headers })
      .then((res) => res.json())

export const createPost = (post) =>
    fetch(`${APP_BACKEND}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(post)})
      .then(res => res.json())

export const editPost = (postId, post) =>
    fetch(`${APP_BACKEND}/posts/${postId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(post)})
      .then(res => res.json())

export const deletePost = (postId) =>
    fetch(`${APP_BACKEND}/posts/${postId}`, {
        method: 'DELETE',
        headers,
       })
      .then(res => res.json())

export const votePost = (postId, option) =>
    fetch(`${APP_BACKEND}/posts/${postId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(option)})
      .then(res => res.json())

export const newComment = (comment) =>
    fetch(`${APP_BACKEND}/comments`, {
      method: 'POST',
      headers,
      body: JSON.stringify(comment)})
      .then(res => res.json())

export const editComment = (commentId, comment) =>
    fetch(`${APP_BACKEND}/comments/${commentId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(comment)})
      .then(res => res.json())

export const deleteComment = (commentId) =>
    fetch(`${APP_BACKEND}/comments/${commentId}`, {
        method: 'DELETE',
        headers,
       })
      .then(res => res.json())

export const voteComment = (commentId, option) =>
    fetch(`${APP_BACKEND}/comments/${commentId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(option)})
      .then(res => res.json())
