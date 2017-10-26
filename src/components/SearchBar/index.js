// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';

// Components
import Content from '../Content';

export default class SearchBar extends Component {
    static contextTypes = {
        apiToGetMoviesBySearch:    string.isRequired,
        apiToGetMostPopularMovies: string.isRequired,
        apiToGetTheNewestMovies:   string.isRequired
    };
    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.handleTextInputChange = ::this._handleTextInputChange;
        this.getMoviesBySearch = ::this._getMoviesBySearch;
        this.getMostPopularMovies = ::this._getMostPopularMovies;
        this.getNewestMovies = ::this._getNewestMovies;
    }

    state = {
        textInputValue:             '',
        moviesGotBySearch:          [],
        moviesListGotByPopularity:  [],
        moviesListRecentlyReleased: []
    };

    componentDidMount () {
        this.getMostPopularMovies();
        this.getNewestMovies();
    }

    // try to move below to helpers folder
    _getMoviesBySearch () {
        const { textInputValue } = this.state;

        if (!textInputValue.trim()) {
            throw new Error(`----> _getMoviesBySearch, ${textInputValue} is empty.`);
        }

        const url = `${this.context.apiToGetMoviesBySearch}&query=${textInputValue}`;

        fetch(url, { method: 'GET' })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('ty wo zdurel?...status daleko ne 200!');
                }

                return response.json();
            })
            .then(({ results }) => {
                this.setState(() => ({
                    moviesGotBySearch: results
                }));
                console.log(`results of fetch by search ---> ${results.length}`);
            })
            .catch(({ message }) => console.error(`dude, some shit is happening...call your Roof --> ${message}`));
    }

    _getMostPopularMovies () {

        const url = `${this.context.apiToGetMostPopularMovies}`;

        fetch(url, { method: 'GET' })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`Status of request for getting The most popular Movies is  --> ${response.status}`);
                }

                return response.json();
            })
            .then(({ results }) => {
                this.setState(() => ({ moviesListGotByPopularity: results }));
                console.log(`result of fetch most popular ---> ${this.state.moviesListGotByPopularity}`);
            })
            .catch(({ message }) => console.error(`Getting of Most Popular movies processed with an Error --> ${message}`));
    }

    _getNewestMovies () {

        const url = `${this.context.apiToGetTheNewestMovies}`;

        fetch(url, { method: `GET` })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`Status of request for getting Newest Movies is --> ${response.status}`);
                }

                return response.json();
            })
            .then(({ results }) => {
                this.setState(() => ({ moviesListRecentlyReleased: results }));
                console.log(`result of fetch newest movies ---> ${this.state.moviesListRecentlyReleased}`); //not empty --> 20
            })
            .catch(({ message }) => console.error(`Getting of Newest Movies processed with an Error --> ${message}`));
    }

    _handleTextInputChange (event) {

        const textInputValue = event.target.value;

        this.setState(() => ({ textInputValue }));
    }

    _handleSubmit (event) {
        event.preventDefault();

        const { textInputValue } = this.state;

        if (!textInputValue.trim()) {
            // error pop up can be implemented with Transition
            return;
        }

        this.getMoviesBySearch();
    }

    // try to implement SearchBar to appear

    render () {
        const placeholderValue = 'Search...';

        const {
            textInputValue,
            moviesGotBySearch,
            moviesListGotByPopularity,
            moviesListRecentlyReleased
        } = this.state;

        console.log(`render in SearchBar -- > movies got by search --> ${moviesGotBySearch}`);

        return (
            <section className = { Styles.searchBar }>
                <form onSubmit = { this.handleSubmit } >
                    <input
                        placeholder = { placeholderValue }
                        type = 'text'
                        value = { textInputValue }
                        onChange = { this.handleTextInputChange }
                    />
                    <input type = 'submit' value = 'Search' />
                </form>
                {/* Transition */}
                <Content
                    latestMoviesList = { moviesListRecentlyReleased }
                    mostPopularMoviesList = { moviesListGotByPopularity }
                    moviesListGotBySearch = { moviesGotBySearch }
                />
                {/* Transition */}
            </section>
        );
    }
}