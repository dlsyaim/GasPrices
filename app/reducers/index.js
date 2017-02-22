import { combineReducers } from 'redux'
import * as gasReducer from './gas'
import * as settingsReducer from './settings'

export default combineReducers(Object.assign(
  gasReducer,
  settingsReducer,
));