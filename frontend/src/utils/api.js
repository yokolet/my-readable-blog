const APP_BACKEND = process.env.REACT_APP_BACKEND

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-10)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchCategories = () =>
  fetch(
    `${APP_BACKEND}/categories`, { headers })
    .then((res) => res.json())
    .then((data) => data.categories)

export const fetchPosts = () =>
    fetch(
      `${APP_BACKEND}/posts`, { headers })
      .then((res) => res.json())

export const fetchComments = (postId) =>
  fetch(
    `${APP_BACKEND}/posts/${postId}/comments`, { headers })
    .then((res) => res.json())
