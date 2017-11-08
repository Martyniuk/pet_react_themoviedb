// Core
import React, { Component } from 'react';

//instruments
import Styles from './styles.scss';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

export default class Header extends Component {
    constructor () {
        super();
        this.handleHeaderOnEnter =::this._handleHeaderOnEnter;
    }
    _handleHeaderOnEnter (header) {
        fromTo(header, 3, { y: 400, opacity: 0 }, { y: 0, opacity: 3 });
    }

    render () {

        return (
            <Transition
                appear
                in
                timeout = { 3000 }
                onEnter = { this.handleHeaderOnEnter }>
                <div className = { Styles.header }>
                    <div className = { Styles.header_logo }>
                        <p>&#60;Movie&#47; &#92;to pick&#62;</p>
                    </div>
                </div>
            </Transition>

        );
    }
}
