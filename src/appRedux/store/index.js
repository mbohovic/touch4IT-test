import {createBrowserHistory} from 'history'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import createRootReducer from '../reducers'

export const history = createBrowserHistory({basename: process.env.PUBLIC_URL})

const loggerMiddleware = store => next => action => {
    let result = next(action)
    if (process.env.NODE_ENV !== "production") {
        console.group(action.type)
        console.log('prev state', store.getState())
        console.info('dispatching', action)
        console.log('next state', store.getState())
        console.groupEnd()
    }
    return result
}

const routerScrollMiddleware = store => next => action => {
    let prevState = store.getState()
    let result = next(action)
    let nextState = store.getState()
    if (prevState.router.location.pathname !== nextState.router.location.pathname) {
        window.scrollTo(0, 0)
    }
    return result
}

export default function configureStore(initState) {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        createRootReducer(history),
        initState,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),
                routerScrollMiddleware,
                loggerMiddleware
            ),
        ),
    )

    return store
}