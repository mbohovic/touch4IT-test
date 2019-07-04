import {config} from "../../config/config"

// CORS fix
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const AIRLINES_URL = `${config.airlineURL}/h/mobileapis/directory/airlines`

const setParamsForGet = (obj) => {
	let result = {}
	if(typeof obj !== "undefined") {
		result = Object.assign({}, result, obj)
		return "?" + encodeParams(result)
	}
	return ""
}

const objectKeyToParam = (obj, key) => {
	if(typeof obj[key] === "object")
		return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(obj[key]))}`
	else
		return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
};

const encodeParams = (obj) => {
	return Object.keys(obj).map(key => objectKeyToParam(obj, key)).join('&')
};

const getFetchError = (error) => {
	error = error.toString();
	if(error === "TypeError: Failed to fetch") {
		error = "Failed to establish connection with server."
	}
	alert(error)
}

export const get = (url, conditions) => {
	url += conditions;
	return fetch(proxyUrl + url, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
	}).then(response => {
		return response.json()
	}).catch(error => getFetchError(error))
};

export const getAirlines = (obj) => get(AIRLINES_URL, setParamsForGet(obj))
