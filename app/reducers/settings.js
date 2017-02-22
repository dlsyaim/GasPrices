import * as types from '../actions/types'

export function settingsFilters(state = {}, action) {
	switch(action.type){
		case types.SET_FUEL_TYPE:
			return Object.assign({
				fuelType: action.fuelType
			});
		case types.SET_DISTANCE:
			return Object.assign({
				distance: action.distance
			});
		/*case types.SET_DISCOUNT:
			return Object.assign({
				action.discountName: true
			});*/
		default:
			return state;
	}
}