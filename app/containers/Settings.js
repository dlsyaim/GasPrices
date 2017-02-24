import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	ScrollView,
	View,
	Text,
	Switch,
	StyleSheet,
	Picker,
	Slider
} from 'react-native'

import { setFuelType, setDistanceLength } from '../actions/settings' 

import DiscountSwitch from '../components/DiscountSwitch' 

class Settings extends Component {
	static navigationOptions = {
		title: 'Stillingar',
		header: {
			style: {
				backgroundColor: '#548b54',
			},
			titleStyle: {
				color: '#FFFFFF'
			}
		}
	};

	constructor(props){
		super(props);
	}

	setFuel(input){
        this.props.dispatch(setFuelType(input));
	}
	setDistance(input){
        this.props.dispatch(setDistanceLength(input));
	}

	render() {
		return(
			<View style={styles.scene}>
				<View style={styles.setting}>
					<Text style={styles.settingTitle}>Eldsneyti</Text>
				      <Picker selectedValue={this.props.settingsFilters.fuelType} onValueChange = {(value) => this.setFuel(value) }>
				         <Picker.Item label="Bensín 95" value="bensin95" />
				         <Picker.Item label="Dísel" value="diesel" />
				      </Picker>
		        </View>
		        <View style={styles.setting}>
					<Text style={styles.settingTitle}>Fjarlægð</Text>
					<View style={styles.row}>
						<Slider 
							value={this.props.settingsFilters.distance}
							minimumValue={0.2}
							maximumValue={10}
							step={0.1}
							onSlidingComplete={ (value) => this.setDistance(value) } 
							style={styles.slider} />
						<Text style={{width: 100}}>{this.props.settingsFilters.distance.toFixed(1)} km</Text>
					</View>
				</View>

				<View style={styles.setting}>
					<Text style={styles.settingTitle}>Afsláttarlyklar</Text>
					<DiscountSwitch stationName="Orkan" />
					<DiscountSwitch stationName="Atlantsolía" />
					<DiscountSwitch stationName="ÓB" />
					<DiscountSwitch stationName="N1" />
					<DiscountSwitch stationName="Olís" />
					<DiscountSwitch stationName="Skeljungur" />
	          	</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  scene: {
  	margin: 5,
  },
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
  slider: {
  	flex: 0.6
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