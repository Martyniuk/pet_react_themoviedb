// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Components
import Content from '../Content';
import Spinner from '../Spinner';

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
        this.startDataFetching = ::this._startDataFetching;
        this.stopDataFetching = ::this._stopDataFetching;
        this.handleFormToAppear = ::this._handleFormToAppear;
        this.handleContentToAppear = ::this._handleContentToAppear;
    }

    state = {
        textInputValue:             '',
        moviesGotBySearch:          [],
        moviesListGotByPopularity:  [],
        moviesListRecentlyReleased: [],
        dataFetching:               false
    };

    componentDidMount () {
        this.getMostPopularMovies();
        this.getNewestMovies();
    }

    _getMoviesBySearch () {
        const { textInputValue } = this.state;

        if (!textInputValue.trim()) {
            console.error(`----> _getMoviesBySearch, ${textInputValue} is empty.`);
        }

        const url = `${this.context.apiToGetMoviesBySearch}&query=${textInputValue}`;

        this.startDataFetching();

        fetch(url, { method: 'GET' })
            .then((response) => {
                if (response.status !== 200) {
                    this.stopDataFetching();
                    throw new Error(`Status of request for getting Movies by ${textInputValue} is ${response.status}`);
                }

                return response.json();
            })
            .then(({ results }) => {
                this.setState(() => ({
                    moviesGotBySearch: results,
                    dataFetching:      false
                }));
            })
            .catch(({ message }) => console.error(`dude, some shit is happening...call your Roof --> ${message}`));
    }

    _getMostPopularMovies () {

        const url = `${this.context.apiToGetMostPopularMovies}`;

        this.startDataFetching();

        fetch(url, { method: 'GET' })
            .then((response) => {
                if (response.status !== 200) {
                    this.stopDataFetching();
                    throw new Error(`Status of request for getting The most popular Movies is  --> ${response.status}`);
                }

                return response.json();
            })
            .then(({ results }) => {
                this.setState(() => ({
                    moviesListGotByPopularity: results,
                    dataFetching:              false
                }));
                console.log(`result of fetch most popular ---> ${this.state.moviesListGotByPopularity}`);
            })
            .catch(({ message }) => console.error(`Getting of Most Popular movies processed with an Error --> ${message}`));
    }

    _getNewestMovies () {

        const url = `${this.context.apiToGetTheNewestMovies}`;

        this.startDataFetching();

        fetch(url, { method: `GET` })
            .then((response) => {
                if (response.status !== 200) {
                    this.stopDataFetching();
                    throw new Error(`Status of request for getting Newest Movies is --> ${response.status}`);
                }

                return response.json();
            })
            .then(({ results }) => {
                this.setState(() => ({
                    moviesListRecentlyReleased: results,
                    dataFetching:               false
                }));
            })
            .catch(({ message }) => console.error(`Getting of Newest Movies processed with an Error --> ${message}`));
    }

    _handleTextInputChange (event) {

        const textInputValue = event.target.value;

        this.setState(() => ({ textInputValue }));
    }

    _handleSubmit (event) {
        event.preventDefault();

        this.getMoviesBySearch();
    }

    _startDataFetching () {
        this.setState(() => ({ dataFetching: true }));
    }

    _stopDataFetching () {
        this.setState(() => ({ dataFetching: false }));
    }

    _handleFormToAppear (form) {
        fromTo(form, 1, { y: -200, opacity: 0 }, { y: 0, opacity: 1 });
    }

    _handleContentToAppear (content) {
        fromTo(content, 1.5, { x: 300, opacity: 0 }, { x: 0, opacity: 1.5 });
    }

    render () {
        const placeholderValue = 'Search...';

        const {
            textInputValue,
            moviesGotBySearch,
            moviesListGotByPopularity,
            moviesListRecentlyReleased,
            dataFetching
        } = this.state;

        const spinner = dataFetching ? <Spinner /> : null;

        return (
            <section className = { Styles.searchBar }>
                {spinner}
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleFormToAppear }>
                    <form onSubmit = { this.handleSubmit } >
                        <input
                            placeholder = { placeholderValue }
                            type = 'text'
                            value = { textInputValue }
                            onChange = { this.handleTextInputChange }
                        />
                        <input type = 'submit' value = 'Search' />
                    </form>
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 1500 }
                    onEnter = { this.handleContentToAppear }>
                    <Content
                        latestMoviesList = { moviesListRecentlyReleased }
                        mostPopularMoviesList = { moviesListGotByPopularity }
                        moviesListGotBySearch = { moviesGotBySearch }
                    />
                </Transition>
            </section>
        );
    }
}
