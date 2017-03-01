import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	Image,
	Switch,
	StyleSheet,
	Picker,
	Slider
} from 'react-native'

class GasStationInfo extends Component {
	constructor(props){
		super(props);
		this.with_key = "með 🔑💳"
		this.without_key = ""
		this.images = {
			'Atlantsolía': require('../images/Atlantsolía.png'),
			'Dælan': require('../images/Dælan.png'),
			'N1': require('../images/N1.png'),
			'ÓB': require('../images/ÓB.png'),
			'Olís': require('../images/Olís.png'),
			'Orkan X': require('../images/Orkan X.png'),
			'Orkan': require('../images/Orkan.png'),
			'Skeljungur': require('../images/Skeljungur.png'),
		}
		console.log("ImageUrl: " + this.imageUrl);
	}

	render() {
		return(
			<View style={styles.gasStationBox}>
				<View style={styles.row}>
					<Image style={styles.icons} source={this.images[this.props.result.company]} />
					<View>
						<Text style={styles.gasStationTitle}>{this.props.result.company} {this.props.result.name}</Text>
						<View>
							{ this.props.main_price < this.props.sub_price 
								&& [<Text>{this.props.main_price} ISK {this.props.key_exists && this.with_key}</Text>,
								[this.props.key_exists && <Text style={styles.gasStationSubtext}>{this.props.sub_price} {['ISK ' + this.without_key]}</Text>]]
							}
							{
								this.props.main_price > this.props.sub_price
								&& [<Text>{this.props.main_price} ISK {this.props.key_exists && this.without_key}</Text>,
								[this.props.key_exists && <Text style={styles.gasStationSubtext}>{this.props.sub_price} {['ISK ' + this.with_key]}</Text>]]
							}
						</View>
					</View>
				</View>
				<View>
					<Image style={styles.map} source={require('../images/mapIcon.png')} />
					<Text style={styles.gasStationText}>{this.props.distance + ' km'}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	  gasStationBox: {
	      marginBottom: 10,
	      marginLeft: 10,
	      marginRight: 10,
	      marginTop: 5,
	      flex: 1,
	      flexDirection: 'row',
	      justifyContent: 'space-between',
	      backgroundColor: 'white',
	      alignItems: 'center'
	  },
	  row: {
	  	flexDirection: 'row',
	  	justifyContent: 'space-between'
	  },
	  gasStationTitle: {
	  	fontWeight: 'bold',
	  },
	  gasStationText: {
	  	marginLeft: 5,
	  },
	  gasStationSubtext: {
	  	fontSize: 12,
	  	fontStyle: 'italic'
	  },
	  icons: {
	  	width: 70,
	  	height: 70,
	  	margin: 5
	  },
	  map: {
	  	width: 50,
	  	height: 50,
	  	backgroundColor: 'red',
	  	margin: 5,
	  }
});

function mapStateToProps(state){
    return {
        settingsFilters: state.settingsFilters,
    }
}

export default connect(mapStateToProps)(GasStationInfo);