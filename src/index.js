import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App/App'
import * as serviceWorker from './serviceWorker'
import {ConnectedRouter} from "connected-react-router"
import configureStore, {history} from './appRedux/store'
import {Route, Switch} from "react-router-dom"

import 'antd/dist/antd.css'
import './styles/index.css'

const store = configureStore()

const connectedApp = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} history={history} />
            </Switch>
        </ConnectedRouter>
    </Provider>
)

ReactDOM.render(connectedApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
