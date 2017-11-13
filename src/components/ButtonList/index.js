// Core
import React, { Component } from 'react';

// instruments
import { func } from 'prop-types';
import Styles from './styles.scss';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

export default class ButtonList extends Component {
    static propTypes = {
        getNewestMovies:  func.isRequired,
        getPopularMovies: func.isRequired
    };
    constructor () {
        super();
        this.handleNewestAppear = ::this._handleNewestAppear;
        this.handlePopularAppear = ::this._handlePopularAppear;
        this.handleButtonsAppear = ::this._handleButtonsAppear;
    }
    _handleNewestAppear () {
        this.props.getNewestMovies();
    }
    _handlePopularAppear () {
        this.props.getPopularMovies();
    }
    _handleButtonsAppear (buttons) {
        fromTo(buttons, 3, { x: -400, opacity: 0 }, { x: 0, opacity: 3 });
    }
    render () {
        return (
            <Transition
                appear
                in
                timeout = { 3000 }
                onEnter = { this.handleButtonsAppear }>
                <ul className = { Styles.button_list }>
                    <li className = { Styles.button_list_item } onClick = { this.handlePopularAppear }>Popular</li>
                    <li className = { Styles.button_list_item } onClick = { this.handleNewestAppear }>Newest</li>
                </ul>
            </Transition>
        );
    }
}
