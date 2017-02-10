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
		type: types.GET_GAS_PRICES
	}
}

function receiveGasPrices(json){
	return {
		type: types.RECEIVE_GAS_PRICES,
		data: json.results
	}
}

function setGas(data) {
	return {
		type: types.SET_GAS_PRICES
	}
}