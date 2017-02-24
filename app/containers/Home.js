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
		this.state = { fetching: true };
		this.fetchGas();
		this.mapGasStations.bind(this);
	}

	fetchGas(){
        this.props.dispatch(fetchGasPrices()).then(() => {
            this.setState({fetching: false});
        });
	}

	// Returns gas stations in order
	mapGasStations(){
		if(1 === 0){
			
		}
		else { // Order diesel/bensin95 results
			if(this.props.settingsFilters.fuelType === 'diesel'){
				return Object.keys(this.props.gasPrices.data).map(key => this.props.gasPrices.data[key]).sort(function(a, b){
					return parseFloat(a.diesel) - parseFloat(b.diesel);	
				}
			)}
			else if(this.props.settingsFilters.fuelType === 'bensin95'){
				return Object.keys(this.props.gasPrices.data).map(key => this.props.gasPrices.data[key]).sort(function(a, b){
					return parseFloat(a.bensin95) - parseFloat(b.bensin95);	
				}	
			)}
		}
	}

	render() {
		return(
			<View style={styles.scene}>
				<Button
					onPress={() => this.props.navigation.navigate('Stillingar')}
					title="Stillingar"
				/>
				<View><Text>Valið eldsneyti: {this.props.settingsFilters.fuelType}</Text></View>
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
							{this.props.settingsFilters.fuelType === 'diesel' && 
								<Text style={styles.gasStationText}>Verð: {result.diesel} ISK</Text>
							}
							{this.props.settingsFilters.fuelType === 'bensin95' &&
								<Text style={styles.gasStationText}>Verð: {result.bensin95} ISK</Text>
							}				
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
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
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
        settingsFilters: state.settingsFilters
    }
}

export default connect(mapStateToProps)(Home);