import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	ScrollView,
	View,
	TextInput,
	Image,
	Text,
	TouchableHighlight,
	StyleSheet
} from 'react-native'
import { fetchGasPrices } from '../actions/gas' 

class Home extends Component {
	constructor(props){
		super(props);
		this.state = { fetching: true }
	}

	componentDidMount() {
		const { dispatch } = this.props;
		this.fetchGas();
	}

	fetchGas(){
        this.props.dispatch(fetchGasPrices()).then(() => {
            this.setState({fetching: false});
        });
	}

	mapGasStations(){

	}

	render() {
		return(
			<View>
				<View>
					<Text>Title here</Text>
				</View>
				<View>
					{ !this.state.fetching && <Text>Finished fetching data!</Text>}
					{ this.state.fetching ? <Text>Fetching data...</Text> : null}
				</View>
			</View>
		)
	}
}

function mapStateToProps(state){
    return {
        data: state.data,
    }
}

export default connect(mapStateToProps)(Home);