// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Moment from 'moment';

// Components
import Main from '../../components/Main';

const key = '3e9c711ebc7c13d5b3078979c12ee0ca';

export const options = {
    apiToGetMoviesBySearch:    `https://api.themoviedb.org/3/search/movie?api_key=${key}`,
    apiToGetImageForMovie:     `http://image.tmdb.org/t/p/`,
    apiToGetMostPopularMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc`,
    apiToGetTheNewestMovies:   `https://api.themoviedb.org/3/discover/movie?api_key=${key}&primary_release_date.gte=2017-11-05&primary_release_date.lte=2017-11-12`
};

export default class App extends Component {
    static childContextTypes = {
        apiToGetMoviesBySearch:    string.isRequired,
        apiToGetImageForMovie:     string.isRequired,
        apiToGetMostPopularMovies: string.isRequired,
        apiToGetTheNewestMovies:   string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return <Main />;
    }
}
