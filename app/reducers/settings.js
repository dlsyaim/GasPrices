import * as types from '../actions/types'

const initialState = {
	fuelType: 'bensin',
	distance: 5,
	orkanKey: false,
	atlantsoliaKey: false,
	obKey: false,
	n1Key: false,
	olisKey: false,
	skeljungurKey: false
}

function settings(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  return state
}

export function settingsFilters(state = initialState, action) {
	switch(action.type){
		case types.SET_FUEL_TYPE:
			return Object.assign({
				...state,
				fuelType: action.fuelType,
			});
		case types.SET_DISTANCE:
			return Object.assign({
				...state,
				distance: action.distance
			});
		case types.SET_DISCOUNT:
			switch(action.discountName){
				case 'orkanKey':
					return Object.assign({
						...state,
						orkanKey: action.value,
					});
				case 'atlantsoliaKey':
					return Object.assign({
						...state,
						atlantsoliaKey: action.value,
					});
				case 'obKey':
					return Object.assign({
						...state,
						obKey: action.value
					});
				case 'n1Key':
					return Object.assign({
						...state,
						n1Key: action.value,
					});
				case 'olisKey':
					return Object.assign({
						...state,
						olisKey: action.value,
					});
				case 'skeljungurKey':
					return Object.assign({
						...state,
						skeljungurKey: action.value,
					});
			}
		default:
			return state;
	}
}