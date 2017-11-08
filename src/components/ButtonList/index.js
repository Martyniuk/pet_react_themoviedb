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
        this.handleNewest = ::this._handleNewest;
        this.handlePopular = ::this._handlePopular;
    }
    _handleNewest () {
        this.props.getNewestMovies();
    }
    _handlePopular () {
        this.props.getPopularMovies();
    }
    render () {
        return (
            <ul className = { Styles.button_list }>
                <li onClick = { this.handlePopular }>Popular</li>
                <li onClick = { this.handlePopular }>Newest</li>
            </ul>
        );
    }
}
