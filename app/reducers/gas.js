import * as types from '../actions/types'

export function gasPrices(state = {}, action) {
	switch(action.type){
		case types.SET_GAS_PRICES:
			return Object.assign({
				data: action.results
			});
		case types.GET_GAS_PRICES:
			return Object.assign({
				data: action.results
			});
		default:
			return state;
	}
}