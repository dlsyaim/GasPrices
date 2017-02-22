import * as types from './types'

export function setFuelType(input) {
	return {
		type: types.SET_FUEL_TYPE,
		fuelType: input
	}
}

export function setDistanceLength(input){
	return {
		type: types.SET_DISTANCE,
		distance: input
	}
}

export function setDiscountKey(input){
	return {
		type: types.SET_DISCOUNT,
		discountName: input
	}
}