// Core
import React, { Component } from 'react';

// instruments
import { func } from 'prop-types';
import Styles from './styles.scss';

export default class ButtonList extends Component {
    static propTypes = {
        getNewestMovies:  func.isRequired,
        getPopularMovies: func.isRequired
    };
    constructor () {
        super();
        this.handleNewestAppear = ::this._handleNewestAppear;
        this.handlePopularAppear = ::this._handlePopularAppear;
    }
    _handleNewestAppear () {
        this.props.getNewestMovies();
    }
    _handlePopularAppear () {
        this.props.getPopularMovies();
    }
    render () {
        return (
            <ul className = { Styles.button_list }>
                <li className = { Styles.button_list_item } onClick = { this.handlePopularAppear }>Popular</li>
                <li className = { Styles.button_list_item } onClick = { this.handleNewestAppear }>Newest</li>
            </ul>
        );
    }
}
