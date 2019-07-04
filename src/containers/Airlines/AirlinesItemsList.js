import React, {Component} from 'react'
import {Card, Col, Row, Icon, Button, Checkbox, Input} from "antd"
import {customRowLayout, customRowLayout0} from "../../services/layout"
import {Link} from "react-router-dom"
import {config} from "../../config/config"
import LazyLoad from 'react-lazyload'

const {Search} = Input

const defaultLimit = 50

class AirlinesItemsList extends Component {

    state = {
        visible: defaultLimit
    }

    filterByName = (value) => {
        this.setState({
            visible: defaultLimit
        })
        this.props.filterByName(value)
    }

    filterOnlyFavourite = () => {
        this.setState({
            visible: defaultLimit
        })
        this.props.filterOnlyFavourite()
    }

    handleLoadMore = () => {
        this.setState((prev) => {
            return {
                visible: prev.visible + defaultLimit
            }
        })
    }

    renderLoadMore = () => {
        return (
            <div className="load-more">
                <Button type="primary" onClick={() => this.handleLoadMore()}>Load more</Button>
            </div>
        )
    }

    render() {
        const {data, filter} = this.props
        const {visible} = this.state

        return (
            <div className="airlines-container">
                <h1>Airlines list</h1>
                <Card title="Filter" className="airlines-filter">
                    <div>
                        <Row {...customRowLayout}>
                            <Col span={24} sm={8}>
                                <div>
                                    <Search
                                        defaultValue={filter.name}
                                        placeholder="search airline name"
                                        onSearch={value => this.filterByName(value)}
                                    />
                                </div>
                            </Col>
                            <Col span={24} sm={8}>
                                <div>
                                    <Checkbox checked={filter.onlyFavourite}
                                              onChange={() => this.filterOnlyFavourite()}>Only favourite
                                        items </Checkbox>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card> {data.length > 0 ? (
                <div className="airlines-items">
                    <Row {...customRowLayout0}>
                        {data.slice(0, visible).map((item, i) => (
                            <Col span={12} sm={8} lg={4} key={i}>
                                <Card className="item"
                                      cover={
                                          <LazyLoad height={100}>
                                              <img src={config.airlineURL + item.logoURL} alt={item.name}/>
                                          </LazyLoad>
                                      }>
                                    <div>
                                        <Icon type="star" onClick={() => this.props.toggleFavourite(item.code)}
                                              theme={this.props.isItemFavourite(item.code) ? "filled" : ""}/>
                                        <Link to={"/detail/" + encodeURIComponent(item.code)}>{item.name}</Link>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {visible < data.length ? this.renderLoadMore() : ""}
                </div>
            ) : (
                <div className="text-center">Not found.</div>
            )}
            </div>
        )
    }
}

export default AirlinesItemsList
