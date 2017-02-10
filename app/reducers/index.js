import { combineReducers } from 'redux'
import * as gasReducer from './gas'

export default combineReducers(Object.assign(
  gasReducer,
));