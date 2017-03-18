import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import {
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	Button,
	StyleSheet,
} from 'react-native'
import { fetchGasPrices } from '../actions/gas' 
import MainResults from '../components/MainResults' 
import { 
  AdMobBanner, 
  AdMobInterstitial, 
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'

class Home extends Component {
	constructor(props){
		super(props);
		this.state = { 
			fetching: true, 
			latitude: null, 
			longitude: null, 
		};
		this.fetchGas();
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
			(error) => alert(JSON.stringify(error.message)),
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

	render() {
		return(
			<View style={styles.scene}>
				<View style={styles.settingsMenu}>
					<View style={styles.settingsTextBar}>
						<Text style={styles.settingsText}>{this.props.settingsFilters.fuelType == 'bensin95' ? "Bensín 95" : "Dísel"} í {this.props.settingsFilters.distance.toFixed(1)} km fjarlægð</Text>
					</View>
					<Button
						style={styles.button}
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
 	                 	: <MainResults latitude={this.state.latitude} longitude={this.state.longitude} navigation={this.props.navigation} />
 	                 }
 	            </ScrollView>
 	            <AdMobBanner
				  bannerSize="fullBanner"
				  adUnitID="insert_adunitID_here"
				  testDeviceID="EMULATOR"
				  didFailToReceiveAdWithError={this.bannerError} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  scrollSection: {
    flex: 0.8
  },
  settingsMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
	alignItems: 'center',
	padding: 10,
	backgroundColor: '#FFFFFF'
  },
  settingsText: {
  	color: 'black',
  	fontWeight: 'bold',
  	margin: 5,
  	fontSize: 15
  },
  settingsTextBar: {
  	left: 0,
  	right: 0
  },
});

function mapStateToProps(state){
    return {
        gasPrices: state.gasPrices,
        settingsFilters: state.settingsFilters
    }
}

export default connect(mapStateToProps)(Home);