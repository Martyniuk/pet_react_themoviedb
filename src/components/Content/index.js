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
        this.addMovieToWishList = ::this._addMovieToWishList;
        this.isMovieInWishList = ::this._isMovieInWishList;
    }

    state = {
        isModalWindowTriggered: false,
        movieInModalWindow:     null,
        imagePath:              '',
        wishListTrigger:        false,
        wishList:               [],
        isIncludedToWishList:   false
    };

    _triggerModalWindow () {
        this.isMovieInWishList();

        this.setState(() => ({ isModalWindowTriggered: true }));
    }

    _closeModalWindow () {
        this.isMovieInWishList();

        this.setState(() => ({ isModalWindowTriggered: false }));
    }

    _getMovieInfo (movieComponent, imagePath) {

        this.setState(() => ({
            movieInModalWindow: movieComponent,
            imagePath
        }));

        this.triggerModalWindow();
    }

    _addMovieToWishList (movie) {
        const { wishList } = this.state;

        this.isMovieInWishList();

        this.setState(() => {
            wishList.push(movie);

            return wishList;
        });

        localStorage.setItem('wishList', JSON.stringify(this.state.wishList));
    }

    /*_deleteMovieFromWishList (id) {
        const { wishList } = this.state;

    }*/

    _isMovieInWishList () {
        const { movieInModalWindow, wishList } = this.state;

        if (!wishList || !movieInModalWindow) {
            console.log(`wish list is empty --> ${wishList}`);
            console.log(`CONTENT: 94L |||| movieInModalWindow --> ${movieInModalWindow}`);
            console.log(`as soon as Modal is Ticked "movieInModalWindow" cannot be null... 
            something is wrong in this method...`);

            return;
        }
        
        const wishListIds = wishList.map((item) => {
            return item.id;
        });

        this.setState(() => ({
            isIncludedToWishList: wishListIds.indexOf(movieInModalWindow.id) >= 0
        }));
    }

    render () {
        const {
            isModalWindowTriggered,
            movieInModalWindow,
            imagePath,
            wishList,
            isIncludedToWishList
        } = this.state;

        //console.log(`current state of Content is  ===> ${JSON.stringify(this.state)}`);

        console.log(`Content: 120L ||| isIncludedToWishList property works incorrect ===> ${isIncludedToWishList}`);

        const modalWindowToShow = isModalWindowTriggered
            ? (
                <ModalWindow
                    addMovieToWishList = { this.addMovieToWishList }
                    closeModalWindow = { this.closeModalWindow }
                    id = { movieInModalWindow.id }
                    imagePath = { imagePath }
                    isIncludedToWishList = { isIncludedToWishList }
                    overview = { movieInModalWindow.overview }
                    popularity = { movieInModalWindow.popularity }
                    release_date = { movieInModalWindow.release_date }
                    title = { movieInModalWindow.title }
                    vote_average = { movieInModalWindow.vote_average }
                />
            )
            : null;
        const {
            moviesListGotBySearch,
            mostPopularMoviesList,
            latestMoviesList
        } = this.props;

        const wishListTrigger = wishList.length !== 0
            ? <WishList
                deleteMovieFromWishList = { this.deleteMovieFromWishList }
                wishList = { wishList }
            />
            : null;

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
                { wishListTrigger }
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
