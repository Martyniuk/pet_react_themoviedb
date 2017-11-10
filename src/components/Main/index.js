// Core
import React, { Component } from 'react';

// instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

// components
import SearchBar from '../SearchBar';
import Header from '../Header';
import Content from "../Content";
import ButtonList from "../ButtonList";
import Spinner from '../Spinner';

export default class Main extends Component {
    static contextTypes = {
        apiToGetMostPopularMovies: PropTypes.string.isRequired,
        apiToGetTheNewestMovies:   PropTypes.string.isRequired,
        apiToGetMoviesBySearch:    PropTypes.string.isRequired
    };
    constructor () {
        super();
        this.getMostPopularMovies =::this._getMostPopularMovies;
        this.getNewestMovies = ::this._getNewestMovies;
        this.getMoviesBySearch = ::this._getMoviesBySearch;
        this.stopDataFetching = ::this._stopDataFetching;
        this.startDataFetching = ::this._startDataFetching;
    }

    state = {
        moviesList:   [],
        dataFetching: false
    };

    async _getMostPopularMovies () {
        try {
            const url = `${this.context.apiToGetMostPopularMovies}`;

            this.startDataFetching();
            const response = await fetch(url, { method: 'GET' });

            if (response.status !== 200) {
                this.stopDataFetching();
                throw new Error(`Status of request for getting The most popular Movies is  --> ${response.status}`);
            }
            const { results } = await response.json();

            //console.log(`results from _getMostPopularMovies --> ${results}`);
            this.setState(() => ({
                moviesList:   results,
                dataFetching: false
            }));
        } catch ({ message }) {
            console.log(`Getting List of Most Popular movies processed with an Error --> ${message}`);
        }
    }
    async _getNewestMovies () {
        try {
            const url = `${this.state.moviesListGotByPopularity}`;

            this.startDataFetching();
            const response = await fetch(url, { method: 'GET' });

            if (response.status !== 200) {
                this.stopDataFetching();
                throw new Error(`Status of request for getting The most popular Movies is  --> ${response.status}`);
            }
            const { results } = await response.json();

            this.setState(() => ({
                moviesList:   results,
                dataFetching: false
            }));
        } catch ({ message }) {
            console.log(`Getting List of Newest Movies processed with an Error --> ${message}`);
        }
    }
    async _getMoviesBySearch (textInputValue) {
        if (!textInputValue.trim()) {
            console.error(`----> _getMoviesBySearch, ${textInputValue} is empty.`);
        }
        try {
            const url = `${this.context.apiToGetMoviesBySearch}&query=${textInputValue}`;

            this.startDataFetching();
            const response = await fetch(url, {method: 'GET'});

            if (response.status !== 200) {
                this.stopDataFetching();
                throw new Error(`Status of request for getting Movies by ${textInputValue} is ${response.status}`);
            }
            const { results } = await response.json();

            this.setState(() => ({
                moviesList: results,
                dataFetching: false
            }));
        } catch ({ message }) {
            console.log(`Getting List of Movies by search pocessed with an Error --> ${message}`);
        }
    }
    _startDataFetching () {
        this.setState(() => ({
            dataFetching: true
        }));
    }
    _stopDataFetching () {
        this.setState(() => ({
            dataFetching: false
        }));
    }

    render () {
        const { 
            moviesList,
            dataFetching
         } = this.state;
        const buttonList = <ButtonList getNewestMovies = { this.getNewestMovies } getPopularMovies = { this.getMostPopularMovies } />
        const spinner = dataFetching ? <Spinner /> : null;
        
        return(
            <div className = { Styles.main }>
                <Header />
                { spinner }
                <div className = { Styles.search_bar_wrap }>
                    { buttonList }
                    <SearchBar getMoviesBySearch = { this.getMoviesBySearch } />
                </div>
                <Content className = { Styles.content } moviesList = { moviesList } />
                <div className = { Styles.footer }>
                    <p>Designed By _へ__(‾◡◝ )&#62;</p>
                </div>
            </div>
        );




        /* return (
            <div className = { Styles.main }>
                <div>
                    <Header />
                    <div className = { Styles.search_bar_wrap }>
                        { buttonList }
                        <SearchBar />
                    </div>
                    <div className = { Styles.content }>
                        // <Content
                        //   latestMoviesList = {}
                        //    mostPopularMoviesList = {}
                        // />
                    </div>
                    <div className = { Styles.footer }>
                        <p>Designed By _へ__(‾◡◝ )&#62;</p>
                    </div>
                </div>
            </div>
        ); 
       */
    }
}
