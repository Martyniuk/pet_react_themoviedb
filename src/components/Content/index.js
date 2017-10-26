// Core
import React, { Component } from 'react';

// Instruments
import { array } from 'prop-types';
import Styles from './styles.scss';

// Components
import Movie from '../Movie';


export default class Content extends Component {
    static propTypes = {
        latestMoviesList:      array.isRequired,
        mostPopularMoviesList: array.isRequired,
        moviesListGotBySearch: array
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

        const advert = moviesListGotBySearch.length === 0
            ? <h3 className = { Styles.title } >Oi, Your Advert can be Here!!</h3>
            : <div className = { Styles.content }>
                <h3 className = { Styles.title }>Content of Movies</h3>
                <span className = { Styles.content_list }>{ moviesListGotBySearchToRender }</span>
            </div>;

        //console.log(`render in Content -- > movies got by search --> ${moviesListGotBySearch}`);

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
                { advert }
                <h4 className = { Styles.title }>The Most Popular</h4>
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
