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
        this.modalWindowBuilder = ::this._modalWindowBuilder;
    }

    state = {
        isModalWindowTriggered: false,
        modal:                  {}
    };

    _triggerModalWindow (e) {
        const element = e.target;

        if (element.classList.contains('movie')) {
            const modal = this.modalWindowBuilder(element);
            //console.log(`trigger element on click ${element}`);
            this.setState(() => ({
                isModalWindowTriggered: true,
                modal
            }));
        }
    }
    _closeModalWindow () {
        this.setState(() => ({ isModalWindowTriggered: false }));
    }
    _modalWindowBuilder (e) {
        return {
            closeModalWindow: this.closeModalWindow,
            id:               e.idOfMovie,
            imagePath:        e.imagePathOfMovie,
            overview:         e.overviewOfMovie,
            popularity:       e.popularityOfMovie,
            release_date:     e.release_dateOfMovie,
            title:            e.titleOfMovie,
            vote_average:     e.vote_averageOfMovie

        };
    }

    render () {
        const { isModalWindowTriggered, modal } = this.state;
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
            <section className = { Styles.content } onClick = { this.triggerModalWindow }>
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
