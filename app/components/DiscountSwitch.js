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

import { setDiscountKey } from '../actions/settings' 


class DiscountSwitch extends Component {
	constructor(props){
		super(props);
		this.stationName = this.props.stationName;
	}

	setDiscount(input, value){
        this.props.dispatch(setDiscountKey(input, value));
    }

	render() {
		return(
			<View style={styles.row}>
				<Switch
		       		onValueChange={ () => this.setDiscount(this.stationName, !this.props.settingsFilters.keys[this.stationName]) }
		         	value={ this.props.settingsFilters.keys[this.stationName] } />
		         <Text>{this.stationName}</Text>
		   	</View>
		)
	}
}

const styles = StyleSheet.create({
  row: {
  	flexDirection: 'row',
  },
});

function mapStateToProps(state){
    return {
        settingsFilters: state.settingsFilters,
    }
}

export default connect(mapStateToProps)(DiscountSwitch);