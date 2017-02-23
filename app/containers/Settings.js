import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	ScrollView,
	View,
	Text,
	Switch,
	StyleSheet,
	Picker,
	TextInput
} from 'react-native'

import { setFuelType, setDistanceLength, setDiscountKey } from '../actions/settings' 

class Settings extends Component {
	constructor(props){
		super(props);
	}

	setFuel(input){
        this.props.dispatch(setFuelType(input));
	}
	setDistance(input){
        this.props.dispatch(setDistanceLength(input));
	}
	setDiscount(input, value){
        this.props.dispatch(setDiscountKey(input, value));
    }

	render() {
		return(
			<View style={styles.scene}>
				<View style={styles.setting}>
					<Text style={styles.settingTitle}>Eldsneyti</Text>
				      <Picker selectedValue={this.props.fuelType} onValueChange = {(value) => this.setFuel(value) }>
				         <Picker.Item label="Bensín" value="bensin" />
				         <Picker.Item label="Dísel" value="diesel" />
				      </Picker>
		        </View>
		        <View style={styles.setting}>
					<Text style={styles.settingTitle}>Fjarlægð</Text>
					<View style={styles.row}>
						<TextInput 
							keyboardType='numeric'
							style={styles.textInput}
							maxLength={3} 
							onChangeText={ (value) => this.setDistance(value) } />
						<Text style={styles.label}>km</Text>
					</View>
				</View>

				<View style={styles.setting}>
					<Text style={styles.settingTitle}>Afsláttarlyklar</Text>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => this.setDiscount('orkanKey', !this.props.settingsFilters.orkanKey) }
			          		value={ this.props.settingsFilters.orkanKey } />
						<Text>Orkan</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => this.setDiscount('atlantsoliaKey', !this.props.settingsFilters.atlantsoliaKey) }
			          		value={ this.props.settingsFilters.atlantsoliaKey } />
						<Text>Atlantsolía</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => this.setDiscount('obKey', !this.props.settingsFilters.obKey) }
			          		value={ this.props.settingsFilters.obKey } />
						<Text>ÓB</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => this.setDiscount('n1Key', !this.props.settingsFilters.n1Key) }
			          		value={ this.props.settingsFilters.n1Key } />
						<Text>N1</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => this.setDiscount('olisKey', !this.props.settingsFilters.olisKey) }
			          		value={ this.props.settingsFilters.olisKey } />
						<Text>Olís</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => this.setDiscount('skeljungurKey', !this.valueprops.settingsFilters.skeljungurKey) }
			          		value={ this.props.settingsFilters.skeljungurKey } />
						<Text>Skeljungur</Text>
		          	</View>
	          	</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  settingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  }, 
  row: {
  	flexDirection: 'row',
  },
  setting: {
  	marginBottom: 25,
  },
  textInput: {
  	padding: 5,
  	width: 30
  },
  label: {
  	textAlign: 'center'
  }
});
function mapStateToProps(state){
    return {
        settingsFilters: state.settingsFilters,
    }
}

export default connect(mapStateToProps)(Settings);