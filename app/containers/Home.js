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
import GasStationInfo from '../components/GasStationInfo' 


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
		this.state = { fetching: true, latitude: null, longitude: null };
		this.fetchGas();
		this.mapGasStations.bind(this);
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: position.coords.latitude,
          			longitude: position.coords.longitude,
				});
			},
			(error) => alert(JSON.stringify(error)),
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		);
		this.watchID = navigator.geolocation.watchPosition((position) => {
			var lastPosition = JSON.stringify(position);
			this.setState({
				latitude: position.coords.latitude,
          		longitude: position.coords.longitude,
			});
		});
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	fetchGas(){
        this.props.dispatch(fetchGasPrices()).then(() => {
            this.setState({fetching: false});
        });
	}

	// Returns gas stations in order
	// Todo: cleanup
	mapGasStations(){
		keys = this.props.settingsFilters.keys;
		if(this.props.settingsFilters.fuelType === 'diesel'){ // If diesel is selected
			return Object.keys(this.props.gasPrices.data).map(key => this.props.gasPrices.data[key]).sort(function(a, b){ // Sort the list
				if(keys[a.company]){
					if(keys[b.company]){
						return parseFloat(a.diesel_discount) - parseFloat(b.diesel_discount); // If both companies a and b are discounted
					}
					return parseFloat(a.diesel_discount) - parseFloat(b.diesel); // If company a is discounted
				}
				else if(keys[b.company]){
					return parseFloat(a.diesel) - parseFloat(b.diesel_discount); // If company b is discounted
				}
				return parseFloat(a.diesel) - parseFloat(b.diesel);	// If neither company is discounted
			}
		)}
		else if(this.props.settingsFilters.fuelType === 'bensin95'){ // If bensin95 is selected
			return Object.keys(this.props.gasPrices.data).map(key => this.props.gasPrices.data[key]).sort(function(a, b){ // Sort the list
				if(keys[a.company]){
					if(keys[b.company]){
						return parseFloat(a.bensin95_discount) - parseFloat(b.bensin95_discount); // If both companies a and b are discounted
					}
					return parseFloat(a.bensin95_discount) - parseFloat(b.bensin95); // If company a is discounted
				}
				else if(keys[b.company]){
					return parseFloat(a.bensin95) - parseFloat(b.bensin95_discount); // If company b is discounted
				}
				return parseFloat(a.bensin95) - parseFloat(b.bensin95);	// If neither company is discounted
			}	
		)}
	}


	// Function from: http://www.movable-type.co.uk/scripts/latlong.html
	isWithinRange(lat1, lat2, lon1, lon2) {
	  	var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
	  	var dLon = this.deg2rad(lon2-lon1); 
	  	var a = 
	    	Math.sin(dLat/2) * Math.sin(dLat/2) +
	    	Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
	    	Math.sin(dLon/2) * Math.sin(dLon/2); 
	  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  	var d = R * c; // Distance in km
		if (d < this.props.settingsFilters.distance){
			return true;
		}
		return false
	}

	// Function from: http://www.movable-type.co.uk/scripts/latlong.html
	deg2rad(deg) {
		return deg * (Math.PI/180)
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
							return (
								this.isWithinRange(this.state.latitude, result.geo.lat, this.state.longitude, result.geo.lon) 
								&& <View style={styles.gasStationBox} key={result.key} >
									{ this.props.settingsFilters.keys[result.company] // Send discounted prices to GasStationInfo if discount key is active
										&& (<GasStationInfo result={result} bensin95={result.bensin95_discount + " ISK (með afslætti)"} diesel={result.diesel_discount + " ISK (með afslætti)"} />)}	
									{!this.props.settingsFilters.keys[result.company] // Send regular prices to GasStationInfo if discount key is not active
										&& (<GasStationInfo result={result} bensin95={result.bensin95 + " ISK"} diesel={result.diesel + " ISK"} />)}	
								</View>
							)
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