import React, {Component} from 'react'
import {customRowLayout0} from "../../services/layout"
import {config} from "../../config/config"
import {goToExternalPage} from "../../services/utils/utils"
import {connect} from "react-redux"
import {setFavouriteAirlines} from "../../appRedux/actions/session"
import {Button, Checkbox, Col, Row} from "antd"
import {Link} from "react-router-dom"

class AirlinesDetail extends Component {

    state = {
        itemData: null
    }

    componentDidMount() {
        const itemData = this.props.data || null
        this.setState({
            itemData: itemData
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data && this.props.data && prevProps.data.favourite !== this.props.data.favourite)
            this.setState({
                itemData: this.props.data
            })
    }

    render() {
        const {itemData} = this.state
        if (itemData === null) {
            return (
                <div className="airlines-detail">
                    This airline not exists.
                </div>
            )
        }
        const {data} = itemData
        return (
            <div className="airlines-detail">
                <h1>{data.name}</h1>
                <Row {...customRowLayout0}>
                    <Col span={24} sm={8}>
                        <img src={config.airlineURL + data.logoURL} alt={data.name}/>
                    </Col>
                    <Col span={24} sm={16}>
                        <p>phone: {data.phone}</p>
                        <p>web: {data.site}</p>
                        <p><Button type="primary" className="link" onClick={() => goToExternalPage(data.site, true)}>Airline
                            web page</Button>
                        </p>
                        <p>
                            <Checkbox checked={itemData.favourite}
                                      onChange={() => this.props.toggleFavourite(data.code)}>Mark as
                                favourite</Checkbox>
                        </p>
                        <p>
                            <Button type="default"><Link to="/">Back</Link></Button>
                        </p>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(
    state => ({
        session: state.session,
    }), {
        setFavouriteAirlines,
    }
)(AirlinesDetail)

