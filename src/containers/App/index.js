// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { getCurrentTime } from '../../helpers';

export default class App extends Component {
    timer = setInterval(() => this.forceUpdate(), 1000);
    render () {
        const currentTime = getCurrentTime();

        return (
            <section className = { Styles.app }>
                <h1>Welcome!</h1>
                <p>
                    It is {currentTime}.
                </p>
            </section>
        );
    }
}
