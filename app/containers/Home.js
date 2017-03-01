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
	constructor(props){
		super(props);
		this.state = { 
			fetching: true, 
			latitude: null, 
			longitude: null, 
		};
		this.fetchGas();
		this.mapGasStations.bind(this);
	}

	componentDidMount() {
		// Get Geolocation information
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: position.coords.latitude,
          			longitude: position.coords.longitude,
				});
			},
			(error) => alert(JSON.stringify("Error getting GPS coordinates.")),
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
	mapGasStations(){
		keys = this.props.settingsFilters.keys;
		fuelType = this.props.settingsFilters.fuelType;
		data = this.props.gasPrices.data;

		if(fuelType === 'diesel'){ // If diesel is selected
			return Object.keys(data).map(key => data[key]).sort(function(a, b){ // Sort the list
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
		else if(fuelType === 'bensin95'){ // If bensin95 is selected
			return Object.keys(data).map(key => data[key]).sort(function(a, b){ // Sort the list
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
	displayDistance(lat1, lat2, lon1, lon2) {
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
			return d;
		}
		return undefined
	}

	// Function from: http://www.movable-type.co.uk/scripts/latlong.html
	deg2rad(deg) {
		return deg * (Math.PI/180)
	}

	render() {
		return(
			<View style={styles.scene}>
				<View style={styles.settingsMenu}>
					<View style={styles.row}>
						<Text style={styles.settingsText}>{this.props.settingsFilters.fuelType == 'bensin95' ? "Bensín 95" : "Dísel"} í {this.props.settingsFilters.distance.toFixed(1)} km fjarlægð</Text>
					</View>
					<Button
						onPress={() => this.props.navigation.navigate('Stillingar')}
						title="Breyta"
					/>
				</View>

				<ScrollView style={styles.scrollSection}>
					{ this.state.fetching ? 
						<ActivityIndicator		
	                   		style={[{height: 80}]}		
	                    	size="large"		
 	                 	/>
 	                 	: this.mapGasStations().map((result) => {
							distance = this.displayDistance(this.state.latitude, result.geo.lat, this.state.longitude, result.geo.lon) 
							return (
								distance
								&& <View style={styles.gasStationBox} key={result.key}>
									{ this.props.settingsFilters.fuelType == 'bensin95' ?
										<GasStationInfo result={result}
											main_price={this.props.settingsFilters.keys[result.company] ? result.bensin95_discount : result.bensin95}
											sub_price={!this.props.settingsFilters.keys[result.company] ? result.bensin95_discount : result.bensin95}
											key_exists={this.props.settingsFilters.keys[result.company] != undefined ? true : false} 
											distance={distance.toFixed(1)} />
										:
										<GasStationInfo result={result}
											main_price={this.props.settingsFilters.keys[result.company] ? result.diesel_discount : result.diesel}
											sub_price={!this.props.settingsFilters.keys[result.company] ? result.diesel_discount : result.diesel}
											key_exists={this.props.settingsFilters.keys[result.company] != undefined ? true : false}
											distance={distance.toFixed(1)} />
									}
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
  settingsMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2d4b2d'
  },
  settingsText: {
  	color: 'white',
  	margin: 5
  },
  row: {
  	flexDirection: 'row',
  	justifyContent: 'space-between'
  },
});

function mapStateToProps(state){
    return {
        gasPrices: state.gasPrices,
        settingsFilters: state.settingsFilters
    }
}

export default connect(mapStateToProps)(Home);