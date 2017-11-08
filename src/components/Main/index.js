// Core
import React, { Component } from 'react';

// instruments
import Styles from './styles.scss';

// components
import SearchBar from '../SearchBar';
import Header from '../Header';

export default class Main extends Component {
    render () {
        return (
            <div className = { Styles.main }>
                <Header />
                <div>
                    <SearchBar />
                </div>
            </div>
        );
    }
}
