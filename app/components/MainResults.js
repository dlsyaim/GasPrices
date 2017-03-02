import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	View,
} from 'react-native'
import GasStationInfo from '../components/GasStationInfo' 


class MainResults extends Component {
	constructor(props){
		super(props);
		this.mapGasStations.bind(this);
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
			<View>
				{this.mapGasStations().map((result) => {
					distance = this.displayDistance(this.props.latitude, result.geo.lat, this.props.longitude, result.geo.lon) 
						return (
							distance
							&& <View key={result.key}>
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
			</View>
		)
	}				
}

function mapStateToProps(state){
    return {
        gasPrices: state.gasPrices,
        settingsFilters: state.settingsFilters
    }
}

export default connect(mapStateToProps)(MainResults);