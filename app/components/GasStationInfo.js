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
import GLOBALS from '../globals'

class GasStationInfo extends Component {
	constructor(props){
		super(props);
		this.with_key = "með afslætti"
		this.without_key = "án afsláttar"
		this.imageUrl = '../images/' + this.props.result.company + '.png';
		console.log("ImageUrl: " + this.imageUrl);
	}

	render() {
		return(
			<View style={styles.gasStationBox}>
				<Image style={styles.icons} source={{uri: this.imageUrl}} />
				<View>
					<View style={styles.row}>
						<Text style={styles.gasStationTitle}>{this.props.result.company} {this.props.result.name}</Text>
						<Text style={styles.gasStationText}>{this.props.distance + ' km'}</Text>
					</View>
					{ this.props.main_price < this.props.sub_price 
						&& [<Text>{this.props.main_price} ISK {this.props.key_exists && this.with_key}</Text>,
						[this.props.key_exists && <Text style={styles.gasStationSubtext}>{this.props.sub_price} {['ISK ' + this.with_key]}</Text>]]
					}
					{
						this.props.main_price > this.props.sub_price
						&& [<Text>{this.props.main_price} ISK {this.props.key_exists && this.without_key}</Text>,
						[this.props.key_exists && <Text style={styles.gasStationSubtext}>{this.props.sub_price} {['ISK ' + this.with_key]}</Text>]]
					}
				</View>
				<Image style={styles.map} source={{uri: this.imageUrl}} />
		   	</View>
		)
	}
}

const styles = StyleSheet.create({
	  gasStationBox: {
	      marginBottom: 10,
	      marginLeft: 5,
	      marginRight: 5,
	      marginTop: 5,
	      flex: 1,
	      flexDirection: 'row',
	      justifyContent: 'space-between',
	      backgroundColor: '#e0ffff',
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
	  	width: 50,
	  	height: 50,
	  	backgroundColor: 'red',
	  },
	  map: {
	  	width: 50,
	  	height: 50,
	  	backgroundColor: 'red',
	  }
});

function mapStateToProps(state){
    return {
        settingsFilters: state.settingsFilters,
    }
}

export default connect(mapStateToProps)(GasStationInfo);