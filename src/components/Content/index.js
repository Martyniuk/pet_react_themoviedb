// Core
import React, { Component } from 'react';

// Instruments
import { array } from 'prop-types';
import Styles from './styles.scss';

// Components
import Movie from '../Movie';
import ModalWindow from '../ModalWindow';


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

    constructor () {
        super();

        this.triggerModalWindow = ::this._triggerModalWindow;
        this.closeModalWindow = ::this._closeModalWindow;
        this.getMovieInfo = ::this._getMovieInfo;
        this.modalWindowBuilder = ::this._modalWindowBuilder;
    }

    state = {
        isModalWindowTriggered: false
    };

    _triggerModalWindow () {
        this.setState(() => ({ isModalWindowTriggered: true }));
    }

    _closeModalWindow () {
        this.setState(() => ({ isModalWindowTriggered: false }));
    }

    _getMovieInfo ( movieComponent, imagePath) {
        //console.log(`from Content method ${movieComponent.popularity}`);
        this.modalWindowBuilder( movieComponent);
       // ==================== OMG Below ====================

        /* return {
            id,
            overview,
            popularity,
            release_date,
            title,
            vote_average,
            imagePath
        };*/
    }

    _modalWindowBuilder (movieInfo) {
        return (
            <ModalWindow
                closeModalWindow = { this.closeModalWindow }
                id = { movieInfo.id }
                imagePath = { movieInfo.imagePath }
                overview = { movieInfo.overview }
                popularity = { movieInfo.popularity }
                release_date = { movieInfo.release_date }
                title = { movieInfo.title }
                vote_average = { movieInfo.vote_average }
            />
        );
    }

    render () {
        const { isModalWindowTriggered } = this.state;

        const modalWindowToShow = isModalWindowTriggered
            ? <ModalWindow
                closeModalWindow = { modal.closeModalWindow }
                id = { modal.id }
                imagePath = { modal.imagePath }
                key = { modal.id }
                overview = { modal.overview }
                popularity = { modal.popularity }
                release_date = { modal.release_date }
                title = { modal.title }
                vote_average = { modal.vote_average }
            />
            : null;
        const {
            moviesListGotBySearch,
            mostPopularMoviesList,
            latestMoviesList
        } = this.props;

        const moviesListGotBySearchToRender = moviesListGotBySearch.map(
            ({
                id,
                vote_average,
                title,
                popularity,
                poster_path,
                backdrop_path,
                adult,
                overview,
                release_date
            }) => (
                <Movie
                    adult = { adult }
                    backdrop_path = { backdrop_path }
                    getMovieInfo = { this.getMovieInfo }
                    id = { id }
                    key = { id }
                    overview = { overview }
                    popularity = { popularity }
                    poster_path = { poster_path }
                    release_date = { release_date }
                    title = { title }
                    vote_average = { vote_average }
                />
            )
        );

        const advert = moviesListGotBySearch.length === 0
            ? <h3 className = { Styles.title } >Oi, Your Advert can be Here!!</h3>
            : <div className = { Styles.content }>
                <h3 className = { Styles.title }>Content of Movies</h3>
                <span className = { Styles.content_list }>{ moviesListGotBySearchToRender }</span>
            </div>;

        //console.log(`render in Content -- > movies got by search --> ${moviesListGotBySearch}`);

        const popularMoviesListToRender = mostPopularMoviesList.map(
            ({
                id,
                vote_average,
                title,
                popularity,
                poster_path,
                backdrop_path,
                adult,
                overview,
                release_date
            }) => (

                /*CCSTransition*/
                <Movie
                    adult = { adult }
                    backdrop_path = { backdrop_path }
                    getMovieInfo = { this.getMovieInfo }
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
            ));

        const latestMoviesListToRender = latestMoviesList.map(
            ({
                id,
                vote_average,
                title,
                popularity,
                poster_path,
                backdrop_path,
                adult,
                overview,
                release_date
            }) => (

                /*CCSTransition*/
                <Movie
                    adult = { adult }
                    backdrop_path = { backdrop_path }
                    getMovieInfo = { this.getMovieInfo }
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
            ));

        return (
            <section className = { Styles.content } >
                { modalWindowToShow }
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
