// Core
import React, { Component } from 'react';

// Instruments
import { array } from 'prop-types';
import Styles from './styles.scss';

// Components
import Movie from '../Movie';
import ModalWindow from '../ModalWindow';
import WishList from '../WishList';

export default class Content extends Component {
    static propTypes = {
        moviesList: array.isRequired
    };

    constructor () {
        super();

        this.triggerModalWindow = ::this._triggerModalWindow;
        this.closeModalWindow = ::this._closeModalWindow;
        this.getMovieInfo = ::this._getMovieInfo;
        this.checkMovieInWishList = ::this._checkMovieInWishList;
    }

    state = {
        isModalWindowTriggered: false,
        movieInModalWindow:     {},
        imagePath:              '',
        wishListTrigger:        false,
        isMovieInWishList:      false,
        dataUpdate:             false,
        addMovie:               false
    }
    ;

    _triggerModalWindow () {
        this.checkMovieInWishList();
        this.setState(() => ({ isModalWindowTriggered: true }));
    }
    _closeModalWindow () {
        this.setState(() => ({ isModalWindowTriggered: false }));
    }

    async _getMovieInfo (movie, imagePath) {
        this.setState(() => ({
            movieInModalWindow: movie,
            imagePath
        }));
        await this.triggerModalWindow();
    }

    _checkMovieInWishList (inList) {
        this.setState(() => ({ isMovieInWishList: inList }));
    }
    render () {
        const {
            isModalWindowTriggered,
            movieInModalWindow,
            isMovieInWishList,
            imagePath
        } = this.state;

        const wishList = JSON.parse(localStorage.getItem('wishList'));

        const modalWindowToShow = isModalWindowTriggered
            ? (
                <ModalWindow
                    closeModalWindow = { this.closeModalWindow }
                    id = { movieInModalWindow.id }
                    imagePath = { imagePath }
                    isMovieInWishList = { isMovieInWishList }
                    overview = { movieInModalWindow.overview }
                    popularity = { movieInModalWindow.popularity }
                    movie = { movieInModalWindow }
                    release_date = { movieInModalWindow.release_date }
                    title = { movieInModalWindow.title }
                    vote_average = { movieInModalWindow.vote_average }
                    //addMovieToWishList = { this.addMovieToWishList }
                />
            )
            : null;

        const { moviesList } = this.props;

        const wishListTrigger = wishList
            ? <WishList
                // deleteMovieFromWishList = { this.deleteMovieFromWishList }
                wishList = { wishList }
            />
            : null;

        const moviesListToRender = moviesList.map(
            ({
                id,
                vote_average,
                title,
                popularity,
                poster_path,
                backdrop_path,
                overview,
                release_date
            }) => (
                <Movie
                    backdrop_path = { backdrop_path }
                    checkMovieInWishList = { this.checkMovieInWishList }
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
            ));

        return (
            <section className = { Styles.content } >
                { modalWindowToShow }
                <div className = { Styles.content_header_divider }>
                    <div className = { Styles.side_bar }>
                        { wishListTrigger }
                    </div>
                    <div className = { Styles.content }>
                        <div className = { Styles.content_list }>
                            { moviesListToRender }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
