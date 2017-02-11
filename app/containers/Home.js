import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	TouchableHighlight
} from 'react-native'
import { fetchGasPrices } from '../actions/gas' 

class Home extends Component {
	constructor(props){
		super(props);
		this.state = { fetching: true }
		this.fetchGas();
	}

	fetchGas(){
        this.props.dispatch(fetchGasPrices()).then(() => {
            this.setState({fetching: false});
        });
	}

	mapGasStations(){
		return Object.keys(this.props.gasPrices.data).map(key => this.props.gasPrices.data[key])
	}

	render() {
		return(
			<View>
				<View>
					<Text>Bensínstöðvar</Text>
				</View>
				<View>
					{ this.state.fetching ? 
						<ActivityIndicator		
	                   		style={[{height: 80}]}		
	                    	size="large"		
 	                 	/>
 	                 	: null
					}
					{ !this.state.fetching && this.mapGasStations().map((result) => {
						return <Text key={result.id} > {result.name}</Text>
					})}				
				</View>
			</View>
		)
	}
}

function mapStateToProps(state){
    return {
        gasPrices: state.gasPrices,
    }
}

export default connect(mapStateToProps)(Home);