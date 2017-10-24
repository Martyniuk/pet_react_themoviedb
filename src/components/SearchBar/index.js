// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import Content from "../Content/index";

// Components

export default class SearchBar extends Component {
    static contextTypes = {
        apiForSearch: PropTypes.string.isRequired,
        apiForImage: PropTypes.string.isRequired
    };
    constructor() {
        super();

        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleTextInputChange = this._handleTextInputChange.bind(this);
        this.getMovies = this._getMovies.bind(this);
    }

    state = {
        textInputValue: '',
        results: []
    };

    _getMovies () {
        const { textInputValue } = this.state;
        if (!textInputValue.trim()) {
            console.log(`----> _getMovies, ${ textInputValue } is empty.`);
        }
        const url = `${ this.context.apiForSearch }&query=${ textInputValue }`;
        fetch(url, { method: 'GET' })
            .then((response) => {
                if (response.status !== 200) throw new Error('ty wo zdurel?...status daleko ne 200!');

                return response.json();
            })
            .then(({ results }) => {
                this.setState(() => ({
                    results: results
                }));
                console.log(`result of fetch ---> ${ results.length  }`);
            })
            .catch((error) => console.error('dude, some shit is happening...call your Roof'));
    }

    _handleTextInputChange (event) {
        const textInputValue = event.target.value;
        this.setState(() => ({ textInputValue }));
    };

    _handleSubmit (event) {
        event.preventDefault();
        // console.log(`---> handle submit triggered `);
        const { textInputValue } = this.state;
        // console.log(this.state.textInputValue);
        if (!textInputValue.trim()) {
            // error pop up can be implemented with Transition
            alert('Please ensure you have mind to not leave Search Bar empty before Submitting...');
            return;
        }

        this.getMovies();
    }

    // try to implement SearchBar to appear //

    render () {
        const placeholderValue = 'what did you said about my mama?';
        const { textInputValue, results } = this.context;
        return (
            <section>
                <form onSubmit = { this.handleSubmit } >
                    <input
                        type = 'text'
                        value = { textInputValue }
                        placeholder = { placeholderValue }
                        onChange = { this.handleTextInputChange }
                    />
                    <input type = 'submit' value = 'Search' />
                </form>
                {/* Transition */}
                   <Content moviesList = { results } />
                {/* Transition */}
            </section>
        );
    }
}