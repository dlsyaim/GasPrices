import * as types from '../actions/types'

const initialState = {
	fuelType: 'bensin95',
	distance: 2.5,
	keys: {'Orkan': false, 'Atlantsolía': false, 'ÓB': false, 'N1': false, 'Olís': false, 'Skeljungur': false},
}

function settings(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  return state
}


// Todo: stop sending complete state every refresh, update function
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
			state.keys[action.discountName] = action.value;
			return Object.assign({}, state, {
				...state,
			});
		default:
			return state;
	}
}