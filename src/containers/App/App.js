import React, {Component} from 'react'
import {Spin} from "antd"
import {getAirlines} from "../../services/api/api"
import Airlines from "../Airlines/Airlines"

class App extends Component {
    state = {
        inProcessing: true,
        sourceData: []
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        getAirlines().then(response => {
            this.setState({
                sourceData: response,
                inProcessing: false,
            })
        })
    }

    render() {
        return (
            <div className="app-container">
                <Spin spinning={this.state.inProcessing}>
                    {this.state.inProcessing
                        ? <div className="loading"/>
                        : <Airlines data={this.state.sourceData}/>
                    }
                </Spin>
            </div>
        )
    }
}

export default App
