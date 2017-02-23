import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	TouchableHighlight,
	StyleSheet,
	Button
} from 'react-native'
import { fetchGasPrices } from '../actions/gas' 

class Home extends Component {
	static navigationOptions = {
		title: 'Gasvaktin',
	};

	constructor(props){
		super(props);
		this.state = { fetching: true };
		this.fetchGas();
	}

	fetchGas(){
        this.props.dispatch(fetchGasPrices()).then(() => {
            this.setState({fetching: false});
        });
	}

	// Returns first 10 gas stations in array to display
	// Todo: add filter
	mapGasStations(){
		return Object.keys(this.props.gasPrices.data).map(key => this.props.gasPrices.data[key]).slice(0,5)
	}

	render() {
		return(
			<View style={styles.scene}>
				<Button
					onPress={() => this.props.navigation.navigate('Stillingar')}
					title="Stillingar"
				/>
				<ScrollView style={styles.scrollSection}>
					{ this.state.fetching ? 
						<ActivityIndicator		
	                   		style={[{height: 80}]}		
	                    	size="large"		
 	                 	/>
 	                 	: null
					}	
					{ !this.state.fetching && this.mapGasStations().map((result) => {
						return <View style={styles.gasStationBox} key={result.key} >
							<Text style={styles.gasStationTitle}>{result.company} {result.name}</Text>
							<Text style={styles.gasStationText}>Diesel: {result.diesel}</Text>
							<Text style={styles.gasStationText}>Bensín: {result.bensin95}</Text>					
						</View>
					})}				
				</ScrollView>

			</View>
		)
	}
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  topBar: {
    height: 60,
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
  },
  scrollSection: {
    flex: 0.8
  },
  gasStationBox: {
      marginBottom: 20,
      marginLeft: 5,
      marginTop: 5
  },
  gasStationTitle: {
  	fontWeight: 'bold',
  },
  gasStationText: {

  }
});

function mapStateToProps(state){
    return {
        gasPrices: state.gasPrices,
        settings: state.settingsFilters
    }
}

export default connect(mapStateToProps)(Home);