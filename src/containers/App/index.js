// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

// Components
import SearchBar from '../../components/SearchBar';

const key = '3e9c711ebc7c13d5b3078979c12ee0ca';
export const options = {
    apiForSearch: `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
    apiForImage: 'http://image.tmdb.org/t/p/'
};

export default class App extends Component {
    static childContextTypes = {
        apiForSearch: PropTypes.string.isRequired,
        apiForImage: PropTypes.string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return (
            <section className = { Styles.app }>
                {/* catcher */}
                <SearchBar />
                {/* catcher */}
            </section>
        );
    }
}
