import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Home from './Home'

class AppContainer extends Component {
    render() {
    	return <Home {...this.props} />
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  	// Navigation stuff goes here
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)