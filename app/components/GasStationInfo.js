import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	Switch,
	StyleSheet,
	Picker,
	Slider
} from 'react-native'

class GasStationInfo extends Component {
	constructor(props){
		super(props);
		this.result = this.props.result
		this.diesel = this.props.diesel
		this.bensin95 = this.props.bensin95
	}

	render() {
		return(
			<View style={styles.row}>
				<Text style={styles.gasStationTitle}>{this.result.company} {this.result.name}</Text>
				{ this.props.settingsFilters.fuelType == 'diesel'
					&& <Text style={styles.gasStationText}>Verð: {this.diesel}</Text> }
				{ this.props.settingsFilters.fuelType == 'bensin95'
					&& <Text style={styles.gasStationText}>Verð: {this.bensin95}</Text> }
				
		   	</View>
		)
	}
}

const styles = StyleSheet.create({
	  gasStationTitle: {
	  	fontWeight: 'bold',
	  },
	  gasStationText: {
	  }
});

function mapStateToProps(state){
    return {
        settingsFilters: state.settingsFilters,
    }
}

export default connect(mapStateToProps)(GasStationInfo);