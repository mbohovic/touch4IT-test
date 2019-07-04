import {
    SET_AIRLINES_FILTER,
    SET_FAVOURITE_AIRLINES,
} from '../../constants/actionTypes'

export const setFavouriteAirlines = (data) => ({
    type: SET_FAVOURITE_AIRLINES,
    payload: data
})

export const setAirlinesFilter = (data) => ({
    type: SET_AIRLINES_FILTER,
    payload: data
})
