/**
 * React Native App
 * Description here
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import AppContainer from './containers/AppContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import promiseMiddleware from 'redux-promise'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const store = createStore(reducer, compose(applyMiddleware(thunkMiddleware, loggerMiddleware, promiseMiddleware)));

export default class GasPrices extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer  />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GasPrices', () => GasPrices);
