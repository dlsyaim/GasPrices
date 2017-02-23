import * as types from '../actions/types'

export function gasPrices(state = {}, action) {
	switch(action.type){
		case types.REQUEST_GAS_PRICES:
			return Object.assign({
				isFetching: true,
			});
		case types.RECEIVE_GAS_PRICES:
			return Object.assign({
				data: action.data,
				isFetching: false
			});
		default:
			return state;
	}
}