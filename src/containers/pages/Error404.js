import React, {Component} from 'react'
import {customRowLayout0} from "../../services/layout"
import {Col, Row} from "antd";
import {Link} from "react-router-dom"
import {config} from "../../config/config"

class Error404 extends Component {
    render() {
        return (
            <Row {...customRowLayout0}>
                <Col span={24}>
                    <h1>This page does not exist</h1>
                    <div className="text-center">
                        Go to <Link to={config.initURL}>start page</Link>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Error404