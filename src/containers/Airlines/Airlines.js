import React, {Component} from 'react'
import {connect} from "react-redux"
import {setFavouriteAirlines, setAirlinesFilter} from "../../appRedux/actions/session"
import AirlinesDetail from "./AirlinesDetail"
import Error404 from "../pages/Error404"
import {Switch, Route} from "react-router-dom"
import AirlinesItemsList from "./AirlinesItemsList";

class Airlines extends Component {
    state = {
        filteredItems: [],
        filter: {
            onlyFavourite: false,
            name: '',
        },
        favouriteItems: [],
    }

    componentDidMount() {
        const {session, data} = this.props
        this.setState({
            filteredItems: data,
            filter: session.airlinesFilter,
            favouriteItems: session.favouriteAirlines
        })
    }

    toggleFavourite = (itemCode) => {
        const {favouriteItems} = this.state

        const index = favouriteItems.length > 0 ? favouriteItems.findIndex(i => i === itemCode) : -1
        const newData = [...favouriteItems]
        if (index !== -1) {
            newData.splice(index, 1)
        } else {
            newData.push(itemCode)
        }

        this.setState({
            favouriteItems: newData,
        }, () => {
            this.props.setFavouriteAirlines(newData)
            this.setFilteredItems()
        })
    }

    isItemFavourite = (itemCode) => {
        const {favouriteItems} = this.state
        return favouriteItems.length > 0 && favouriteItems.findIndex(i => i === itemCode) !== -1
    }

    setFilteredItems = () => {
        const {favouriteItems, filter} = this.state
        let newFilteredItems = [...this.props.data]
        if (filter.onlyFavourite)
            newFilteredItems = newFilteredItems.filter(item => favouriteItems.findIndex(i => i === item.code) !== -1)
        if (filter.name !== "") {
            newFilteredItems = newFilteredItems.filter(item => item.name.match(new RegExp(filter.name, 'i')))
        }
        this.setState({
            filteredItems: newFilteredItems,
        })
    }

    filterOnlyFavourite = (e) => {
        let filter = this.state.filter
        filter.onlyFavourite = !this.state.filter.onlyFavourite
        this.setState({
            filter: filter
        }, () => {
            this.setFilteredItems()
            this.props.setAirlinesFilter(this.state.filter)
        })
    }

    filterByName = (value) => {
        let filter = this.state.filter
        filter.name = value
        this.setState({
            filter: filter
        }, () => {
            this.setFilteredItems()
            this.props.setAirlinesFilter(this.state.filter)
        })
    }

    itemData = (item) => {
        const {data} = this.props
        const index = data.findIndex(i => i.code === item)
        if (index !== -1) {
            return {data: data[index], favourite: this.isItemFavourite(data[index].code)}
        } else
            return null
    }

    render() {
        const {data} = this.props
        if (data && data.length > 0)
            return (
                <Switch>
                    <Route exact path="/" render={props => <AirlinesItemsList {...props} data={this.state.filteredItems}
                                                                              filter={this.state.filter}
                                                                              toggleFavourite={this.toggleFavourite}
                                                                              isItemFavourite={this.isItemFavourite}
                                                                              filterByName={this.filterByName}
                                                                              filterOnlyFavourite={this.filterOnlyFavourite}/>}/>
                    <Route path="/detail/:id"
                           render={props => <AirlinesDetail {...props}
                                                            data={this.itemData(props.match.params.id)}
                                                            toggleFavourite={this.toggleFavourite}/>}/>
                    <Route path="/:id" component={Error404}/>
                </Switch>
            )
        else {
            return (
                <div>Data could not be loaded.</div>
            )
        }
    }
}

export default connect(
    state => ({
        session: state.session,
    }), {
        setFavouriteAirlines,
        setAirlinesFilter,
    }
)(Airlines)
