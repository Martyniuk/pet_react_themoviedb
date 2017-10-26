// Core
import React, { Component } from 'react';

// Instruments
import PropTypes from 'prop-types';
import Styles from './styles.scss';

// Components
import Movie from '../Movie';


export default class Content extends Component {
    static propTypes = {
        latestMoviesList:      PropTypes.array,
        mostPopularMoviesList: PropTypes.array,
        moviesListGotBySearch: PropTypes.array
    };
    static defaultProps = {
        moviesListGotBySearch: [],
        mostPopularMoviesList: [],
        latestMoviesList:      []
    };

    render () {
        const {
            moviesListGotBySearch,
            mostPopularMoviesList,
            latestMoviesList
        } = this.props;

        const moviesListGotBySearchToRender = moviesListGotBySearch.map(
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
                        adult = { adult }
                        backdrop_path = { backdrop_path }
                        id = { id }
                        key = { id }
                        overview = { overview }
                        popularity = { popularity }
                        poster_path = { poster_path }
                        release_date = { release_date }
                        title = { title }
                        vote_average = { vote_average }
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
                        adult = { adult }
                        backdrop_path = { backdrop_path }
                        id = { id }
                        key = { id }
                        overview = { overview }
                        popularity = { popularity }
                        poster_path = { poster_path }
                        release_date = { release_date }
                        title = { title }
                        vote_average = { vote_average }
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
                        adult = { adult }
                        backdrop_path = { backdrop_path }
                        id = { id }
                        key = { id }
                        overview = { overview }
                        popularity = { popularity }
                        poster_path = { poster_path }
                        release_date = { release_date }
                        title = { title }
                        vote_average = { vote_average }
                    />

                    /*CCSTransition*/
                );
            }
        );

        return (
            <section className = { Styles.content }>
                <h3 className = { Styles.title }>Content of Movies</h3>
                <div className = { Styles.content_list }>
                    { moviesListGotBySearchToRender }
                </div>
                <h4 className = { Styles.title }>The most popular </h4>
                <div className = { Styles.content_list }>
                    { popularMoviesListToRender }
                </div>
                <h5 className = { Styles.title }>Latest Arrived</h5>
                <div className = { Styles.content_list }>
                    { latestMoviesListToRender }
                </div>
            </section>
        );
    }
}