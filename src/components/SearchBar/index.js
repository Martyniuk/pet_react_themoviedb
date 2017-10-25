// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';

// Components
import Content from "../Content";

export default class SearchBar extends Component {

    static contextTypes = {
        apiToGetMoviesBySearch: PropTypes.string.isRequired
    };
    constructor () {
        super();

        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleTextInputChange = this._handleTextInputChange.bind(this);
        this.getMoviesBySearch = this._getMoviesBySearch.bind(this);
    }

    state = {
        textInputValue: '',
        results: []
    };

    // try to move below to helpers folder
    _getMoviesBySearch () {
        const { textInputValue } = this.state;

        if (!textInputValue.trim()) {
            console.log(`----> _getMovies, ${textInputValue} is empty.`);
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
                    results
                }));
                console.log(`results of fetch by search ---> ${results.length}`);
            })
            .catch((error) => console.error('dude, some shit is happening...call your Roof'));
    }

    _handleTextInputChange (event) {

        const textInputValue = event.target.value;

        this.setState(() => ({ textInputValue }));
    }

    _handleSubmit (event) {
        event.preventDefault();
        // console.log(`---> handle submit triggered `);

        const { textInputValue } = this.state;

        // console.log(this.state.textInputValue);
        if (!textInputValue.trim()) {
            // error pop up can be implemented with Transition
            return;
        }

        this.getMoviesBySearch();
    }

    // try to implement SearchBar to appear

    render () {
        const placeholderValue = 'Search...';

        const { textInputValue, results } = this.state;

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
                <Content moviesListGetBySearch = { results } />
                {/* Transition */}
            </section>
        );
    }
}