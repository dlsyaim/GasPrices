import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions'
import { bindActionCreators } from 'redux'

// Import scenes
import Home from './Home'
import Settings from './Settings'

import { 
	Animated,
	StyleSheet,
	View,
	Button
} from 'react-native'

// Import tab navigator
import { StackNavigator } from 'react-navigation';

const Tabs = StackNavigator({
	Home: {
		screen: Home,
	},
	Stillingar: {
		screen: Settings,
	},
});

class AppContainer extends Component {
    render(){
    	return (
			<Tabs />
    	)
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  		// Nothing here yet
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)