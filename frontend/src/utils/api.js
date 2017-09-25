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
