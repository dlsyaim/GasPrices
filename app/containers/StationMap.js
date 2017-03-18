import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	Button,
	StyleSheet,
} from 'react-native'
import { fetchGasPrices } from '../actions/gas' 
import MainResults from '../components/MainResults'

class StationMap extends Component {
	constructor(props){
		super(props);
	}

	render() {
		console.log(this.props.navigation.state.params.result.geo)
		return(
			<View><Text>Map goes here</Text></View>
		)
	}
}

const styles = StyleSheet.create({
});

function mapStateToProps(state){
    return {
        gasPrices: state.gasPrices,
        settingsFilters: state.settingsFilters
    }
}

export default connect(mapStateToProps)(StationMap);