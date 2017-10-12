import { SET_LOCATION } from '../constants/actions'

export function setLocation(location) {
  return {
    type: SET_LOCATION,
    location,
  }
}
