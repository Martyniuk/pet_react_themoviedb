// Core
import React, { Component } from 'react';

// Instruments
import { func } from 'prop-types';
import Styles from './styles.scss';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

export default class SearchBar extends Component {
    static propTypes = {
        getMoviesBySearch: func.isRequired
    };
    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.handleTextInputChange = ::this._handleTextInputChange;
        this.handleFormToAppear = ::this._handleFormToAppear;
    }

    state = {
        textInputValue: ''
    };
    _handleTextInputChange (event) {
        const textInputValue = event.target.value;

        this.setState(() => ({ textInputValue }));
    }
    _handleSubmit (event) {
        event.preventDefault();
        const { textInputValue } = this.state;

        this.props.getMoviesBySearch(textInputValue);
    }
    _handleFormToAppear (form) {
        fromTo(form, 3, { x: 400, opacity: 0 }, { x: 0, opacity: 3 });
    }
    render () {
        const placeholderValue = 'Search...';

        const { textInputValue } = this.state;

        return (
            <section className = { Styles.searchBar }>
                <Transition
                    appear
                    in
                    timeout = { 3000 }
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
            </section>
        );
    }
}
