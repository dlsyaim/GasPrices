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

class Settings extends Component {
	render() {
		return(
			<View style={styles.scene}>
				<View style={styles.setting}>
					<Text style={styles.settingTitle}>Eldsneyti</Text>
				      <Picker selectedValue = "bensin" onValueChange = { () => console.log("Changing value") }>
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
						<Text>Dælan</Text>
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
        gasPrices: state.gasPrices,
    }
}

export default connect(mapStateToProps)(Settings);