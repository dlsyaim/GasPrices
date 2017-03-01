import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'

import Navigator from './Navigator'

class AppContainer extends Component {
    render(){
    	return (
			<Navigator />
    	)
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapDispatchToProps)(AppContainer)