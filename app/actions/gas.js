import * as types from './types'

export function fetchGasPrices() {
	return dispatch => {
		dispatch(requestGasPrices())
		return fetch('http://apis.is/petrol')
			.then((response) => response.json())
			.then(json => dispatch(receiveGasPrices(json)))
	}
}

function requestGasPrices(){
	return {
		type: types.REQUEST_GAS_PRICES
	}
}

function receiveGasPrices(json){
	//console.log("Json: " + json.results);
	return {
		type: types.RECEIVE_GAS_PRICES,
		data: json.results
	}
}