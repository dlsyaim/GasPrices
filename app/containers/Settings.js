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
	setDiscount(input){
        this.props.dispatch(setDiscountKey(input));
    }

	render() {
		return(
			<View style={styles.scene}>
				<View style={styles.setting}>
					<Text style={styles.settingTitle}>Eldsneyti</Text>
				      <Picker selectedValue="bensin" onValueChange = {(value) => this.setFuel(value) }>
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
							maxLength={3} />
						<Text style={styles.label}>km</Text>
					</View>
				</View>

				<View style={styles.setting}>
					<Text style={styles.settingTitle}>Afsláttarlyklar</Text>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => false }
			          		value={ false } />
						<Text>Orkan</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => false }
			          		value={ false } />
						<Text>Atlantsolía</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => false }
			          		value={ false } />
						<Text>ÓB</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => false }
			          		value={ false } />
						<Text>N1</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => false }
			          		value={ false } />
						<Text>Olís</Text>
		          	</View>
					<View style={styles.row}>
						<Switch
			        		onValueChange={ () => false }
			          		value={ false } />
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
  	backgroundColor: '#00FF00'
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
        fuelType: state.fuelType,
        distance: state.distance,
    }
}

export default connect(mapStateToProps)(Settings);