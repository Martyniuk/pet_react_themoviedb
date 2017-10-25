// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

// Components
import Body from '../../components/Body';

const key = '3e9c711ebc7c13d5b3078979c12ee0ca';
export const options = {
    apiToGetMoviesBySearch: `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
    apiToGetImageForMovie: `http://image.tmdb.org/t/p/`,
    apiToGetMostPopularMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc`,
    apiToGetTheNewestMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&primary_release_date.gte=2017-10-24&primary_release_date.lte=2017-11-05`
};

export default class App extends Component {
    static childContextTypes = {
        apiToGetMoviesBySearch: PropTypes.string.isRequired,
        apiToGetImageForMovie: PropTypes.string.isRequired,
        apiToGetMostPopularMovies: PropTypes.string.isRequired,
        apiToGetTheNewestMovies: PropTypes.string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return (
            <section className = { Styles.app }>
                {/* catcher */}
                <Body />
                {/* catcher */}
            </section>
        );
    }
}
