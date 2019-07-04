import {
    SET_FAVOURITE_AIRLINES,
    SET_AIRLINES_FILTER,
} from '../../constants/actionTypes'
import {config} from "../../config/config";

const sessionStorageValue = sessionStorage.getItem(config.session.favouriteAirlines)

const initState = {
    favouriteAirlines: sessionStorageValue ? sessionStorageValue.split(',') || [] : [],
    airlinesFilter: {
        name: '',
        onlyFavourite: false
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_FAVOURITE_AIRLINES: {
            const newValue = typeof action.payload !== "undefined" ? action.payload : initState.favouriteAirlines
            sessionStorage.setItem(config.session.favouriteAirlines, newValue.join(','))
            return {
                ...state,
                favouriteAirlines: newValue,
            }
        }
        case SET_AIRLINES_FILTER: {
            return {
                ...state,
                airlinesFilter: typeof action.payload !== "undefined" ? action.payload : initState.airlinesFilter,
            }
        }
        default:
            return state
    }
}