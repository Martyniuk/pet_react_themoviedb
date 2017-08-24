import React, { Component } from 'react';
import { getCurrentTime } from '../../helpers';
import Styles from './styles.scss';

export default class App extends Component {
    render () {
        return (
            <section className = { Styles.app }>
                <h1>Welcome!</h1>
                <p>
                    It is {getCurrentTime()}.
                </p>
            </section>
        );
    }
}
