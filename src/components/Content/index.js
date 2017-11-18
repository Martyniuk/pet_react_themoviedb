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
        this.showModal = ::this._showModal;
        this.hideModal = ::this._hideModal;
        this.getMovieInfo = ::this._getMovieInfo;
        this.isMovieInWishList = ::this._isMovieInWishList;
        this.updateContentComponent = ::this._updateContentComponent;
    }
    state = {
        modalToShow:        false,
        movieInModalWindow: {},
        imagePath:          '',
        wishListTrigger:    false,
        isMovieInWishList:  false
    };
    _showModal () {
        this.setState(() => ({ modalToShow: true }));
    }
    _hideModal () {
        this.setState(() => ({ modalToShow: false }));
    }
    async _getMovieInfo (movie, imagePath) {
        this.isMovieInWishList(movie);
        this.setState(() => ({
            movieInModalWindow: movie,
            imagePath
        }));

        await this.showModal();
    }
    _isMovieInWishList (movie) {
        if (!localStorage.getItem('wishList')) {
            localStorage.setItem('wishList', JSON.stringify([]));
        }
        const interimList = JSON.parse(localStorage.getItem('wishList'));
        const ifMovieIsInWishList = interimList.find((item) => item.id === movie.id);

        if (ifMovieIsInWishList) {
            this.setState(() => ({ isMovieInWishList: true }));
        } else {
            this.setState(() => ({ isMovieInWishList: false }));
        }
    }
    _updateContentComponent () {
        this.forceUpdate();
    }
    render () {
        const {
            modalToShow,
            movieInModalWindow,
            isMovieInWishList,
            imagePath
        } = this.state;

        const wishList = JSON.parse(localStorage.getItem('wishList'));

        const modalWindowToShow = modalToShow
            ? (
                <ModalWindow
                    closeModalWindow = { this.hideModal }
                    id = { movieInModalWindow.id }
                    imagePath = { imagePath }
                    isMovieInWishList = { isMovieInWishList }
                    overview = { movieInModalWindow.overview }
                    popularity = { movieInModalWindow.popularity }
                    release_date = { movieInModalWindow.release_date }
                    title = { movieInModalWindow.title }
                    updateContentComponent = { this.updateContentComponent }
                    vote_average = { movieInModalWindow.vote_average }
                />
            )
            : null;

        const { moviesList } = this.props;

        const wishListTrigger = wishList
            ? <WishList
                updateContentComponent = { this.updateContentComponent }
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
