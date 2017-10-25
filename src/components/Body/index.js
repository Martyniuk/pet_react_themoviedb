// Core
import React, { Component } from 'react';

// instruments
import { string } from 'prop-types';
// components
import SearchBar from '../SearchBar';
import Content from '../Content';

export default class Body extends Component {
    static contextTypes = {
        apiToGetMostPopularMovies: string.isRequired,
        apiToGetTheNewestMovies: string.isRequired
    };

    constructor () {
        super();

        this.getMostPopularMovies = ::this._getMostPopularMovies;
        this.getNewestMovies = ::this._getNewestMovies;
    }

    state = {
        moviesListGotByPopularity: [],
        moviesListRecentlyReleased: []
    };

    /*componentWillMount () {
        this.getMostPopularMovies();
        this.getNewestMovies();
    }*/

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
                console.log(`result of fetch most popular ---> ${this.state.moviesListGotByPopularity}`);  //not empty --> 20
            })
            .catch((error) => console.error(`Getting of Most Popular movies processed with an Error --> ${error.message}`));
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
            .catch((error) => console.error(`Getting of Newest Movies processed with an Error --> ${error.message}`));
    }

    render () {

        this.getMostPopularMovies();
        this.getNewestMovies();

        const {
            moviesListGotByPopularity,
            moviesListRecentlyReleased
        } = this.state;

        console.log(`moviesListGotByPopularity in Body --> ${moviesListGotByPopularity} `);
        console.log(`moviesListRecentlyReleased in Body --> ${moviesListRecentlyReleased} `);

        return (
            <section>


                <div>
                    <SearchBar />
                </div>
                <div>
                    <Content
                        mostPopularMoviesList = { moviesListGotByPopularity }
                        latestMoviesList = { moviesListRecentlyReleased }
                    />
                </div>
                {/*<div>
                    <h2>Recently Arrived</h2>
                     TransitionGroup
                    { latestMoviesList }
                     TransitionGroup
                </div>
                <div>
                    <h3>Most Popular</h3>
                     TransitionGroup
                    { mostPopularMoviesList }
                     TransitionGroup
                </div>*/}
            </section>
        );
    }
}
