// Core
import React, { Component } from 'react';

// instruments
import Styles from './styles.scss';
import PropTypes from 'prop-types';

// components
import SearchBar from '../SearchBar';
import Header from '../Header';
import Content from "../Content/index";

export default class Main extends Component {
    render () {
        return (
            <div className = { Styles.main }>
                <div className = { Styles.wrapper }>
                    <Header />
                    <div>
                        <SearchBar />
                    </div>
                    <div className = { Styles.content }>
                        {/*<Content
                            latestMoviesList = {}
                            mostPopularMoviesList = {}
                        />*/}
                    </div>
                    <div className = { Styles.footer }>
                        <p>Designed By _へ__(‾◡◝ )&#62; </p>
                    </div>
                </div>
            </div>
        );
    }
}
