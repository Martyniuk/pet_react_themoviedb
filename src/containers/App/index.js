// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

// Components
import Composer from '../../components/Composer';

export default class App extends Component {
    render () {
        return (
            <section className = { Styles.app }>
                <Composer />
            </section>
        );
    }
}
