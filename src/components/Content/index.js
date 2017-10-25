// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';

// Components
import Movie from '../Movie';


export default class Content extends Component {
    static propTypes = {
        latestMoviesList: PropTypes.array.isRequired,
        mostPopularMoviesList: PropTypes.array.isRequired,
        moviesListGetBySearch: PropTypes.array.isRequired
    };

    constructor () {
        super();

    }


    render () {
        const {
            moviesListGetBySearch,
            mostPopularMoviesList,
            latestMoviesList
        } = this.props;

        const moviesListGetBySearchToRender = moviesListGetBySearch.map(
            (movie) => {
                const {
                    id,
                    vote_average,
                    title,
                    popularity,
                    poster_path,
                    backdrop_path,
                    adult,
                    overview,
                    release_date
                } = movie;

                return (
                    /*CCSTransition*/
                    <Movie
                        key = { id }
                        adult = { adult }
                        id = { id }
                        vote_average = { vote_average }
                        title = { title }
                        popularity = { popularity }
                        poster_path = { poster_path }
                        backdrop_path = { backdrop_path }
                        overview = { overview }
                        release_date = { release_date }
                    />
                    /*CCSTransition*/
                );
            }
        );

        const popularMoviesListToRender = mostPopularMoviesList.map(
            (movie) => {
                const {
                    id,
                    vote_average,
                    title,
                    popularity,
                    poster_path,
                    backdrop_path,
                    adult,
                    overview,
                    release_date
                } = movie;

                return (
                    /*CCSTransition*/
                    <Movie
                        key = { id }
                        adult = { adult }
                        id = { id }
                        vote_average = { vote_average }
                        title = { title }
                        popularity = { popularity }
                        poster_path = { poster_path }
                        backdrop_path = { backdrop_path }
                        overview = { overview }
                        release_date = { release_date }
                    />
                    /*CCSTransition*/
                );
            }
        );
        const latestMoviesListToRender = latestMoviesList.map(
            (movie) => {
                const {
                    id,
                    vote_average,
                    title,
                    popularity,
                    poster_path,
                    backdrop_path,
                    adult,
                    overview,
                    release_date
                } = movie;

                return (
                    /*CCSTransition*/
                    <Movie
                        key = { id }
                        adult = { adult }
                        id = { id }
                        vote_average = { vote_average }
                        title = { title }
                        popularity = { popularity }
                        poster_path = { poster_path }
                        backdrop_path = { backdrop_path }
                        overview = { overview }
                        release_date = { release_date }
                    />
                    /*CCSTransition*/
                );
            }
        );
        return(
            <section>
                <h3>Content of Movies</h3>
                {/* Transition Group */}
                { moviesListGetBySearchToRender }
                {/*TransitionGroup*/}
                <h4>The most popular </h4>
                { popularMoviesListToRender }
                <h5>Latest Arrived</h5>
                { latestMoviesListToRender }
            </section>
        );
    }
}