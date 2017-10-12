import { SET_LOCATION } from '../constants/actions'

const initialState = {
  location: 'home',
}

export default function currentLocation(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        location: action.location,
      }

    default:
      return state
  }
}
