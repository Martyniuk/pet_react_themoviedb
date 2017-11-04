// Core
import React, { Component } from 'react';

// instruments
import Styles from './styles.scss';

// components
import SearchBar from '../SearchBar';

export default class Main extends Component {
    render () {
        return (
            <section className = { Styles.main }>
                <div>
                    <SearchBar />
                </div>
            </section>
        );
    }
}
